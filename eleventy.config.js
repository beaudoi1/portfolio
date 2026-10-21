import path from "node:path";
import Image from "@11ty/eleventy-img";

// Production build = `npm run build` (what GitHub Actions runs).
// Local preview = `npm start`, which also shows drafts and placeholders.
const isBuild = () => process.env.ELEVENTY_RUN_MODE === "build";

// Marker left in the HTML by {% todo %} and {% proposed %}. A published
// page that still contains it fails the build, so placeholders never go live.
const UNAPPROVED = "data-unapproved";

const IMG_OPTIONS = {
  formats: ["avif", "webp", "jpeg"],
  outputDir: "_site/img/",
  urlPath: "/img/",
  sharpJpegOptions: { quality: 82, progressive: true },
  sharpWebpOptions: { quality: 80 },
  sharpAvifOptions: { quality: 60 },
};

async function imageHtml(src, alt, sizes = "100vw", widths = [480, 800, 1200, 1600], cls = "", withFull = false) {
  if (alt === undefined) throw new Error(`Missing alt text for ${src}`);
  let metadata;
  try {
    // PNGs keep their transparency: PNG fallback instead of JPEG.
    const formats = src.endsWith(".png") ? ["avif", "webp", "png"] : IMG_OPTIONS.formats;
    metadata = await Image(path.join("src", src), { ...IMG_OPTIONS, formats, widths: [...widths, "auto"] });
  } catch (e) {
    console.error(`[image] ${src}: ${e.message}`);
    throw e;
  }
  const html = Image.generateHTML(metadata, {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
    ...(cls && { class: cls }),
  });
  if (!withFull) return html;
  // Largest copy in the fallback format (JPEG or PNG): what the zoom view shows.
  const fallback = metadata.jpeg || metadata.png;
  return { html, full: fallback[fallback.length - 1].url };
}

// An image that can be popped out and zoomed. Without JavaScript, "Enlarge" just opens the full-size file.
async function zoomableHtml(src, alt, sizes, widths) {
  const { html, full } = await imageHtml(src, alt, sizes, widths, "", true);
  return `<div class="zoomable">${html}<a class="zoom-btn" href="${full}" data-zoom aria-label="Enlarge image"><svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16"><path d="M12 3h5v5M8 17H3v-5M17 3l-6 6M3 17l6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="zoom-btn__text">Enlarge</span></a></div>`;
}

export default function (eleventyConfig) {
  // True in local preview, false in the live build. Use for preview-only placeholders.
  eleventyConfig.addGlobalData("isPreview", !isBuild());

  // ---- Drafts: shown when previewing, left out of the production build.
  eleventyConfig.addPreprocessor("drafts", "*", (data) => {
    if (data.draft && isBuild()) return false;
  });

  // ---- Placeholders
  // {% todo "What's missing" %}: a visible, tracked gap.
  eleventyConfig.addShortcode("todo", (text) =>
    `<span class="todo" ${UNAPPROVED}>TODO: ${text}</span>`
  );
  // {% proposed %}Copy Aaron hasn't approved yet{% endproposed %}
  eleventyConfig.addPairedShortcode("proposed", (content) =>
    `<span class="proposed" ${UNAPPROVED}><span class="proposed__label">Proposed copy, needs Aaron's OK:</span> ${content}</span>`
  );
  // copyProposed: true in front matter = the whole page's copy awaits Aaron's OK.
  eleventyConfig.addShortcode("copyBanner", (on) =>
    on ? `<p class="draft-banner" ${UNAPPROVED}>Proposed copy: the text on this page needs Aaron's OK.</p>` : ""
  );
  const blocked = new Set();
  eleventyConfig.addTransform("block-unapproved", function (content) {
    if (isBuild() && this.page.outputPath?.endsWith(".html") && content.includes(UNAPPROVED)) {
      blocked.add(this.page.inputPath);
    }
    // A broken async template prints this instead of the image. Never publish it.
    if (this.page.outputPath?.endsWith(".html") && content.includes("[object Promise]")) {
      throw new Error(`${this.page.inputPath} rendered "[object Promise]": an async shortcode was called the wrong way.`);
    }
    return content;
  });
  eleventyConfig.on("eleventy.after", () => {
    if (blocked.size) {
      const list = [...blocked].map((p) => `  - ${p}`).join("\n");
      blocked.clear();
      throw new Error(`These pages still have TODO or proposed copy. Finish them or mark them "draft: true":\n${list}`);
    }
  });

  // ---- External links and PDFs open in a new tab, and say so (WCAG G201):
  // a visible ↗ plus "(opens in a new tab)" for screen readers.
  eleventyConfig.addTransform("external-links", function (content) {
    if (!this.page.outputPath?.endsWith(".html")) return content;
    return content.replace(
      /<a\b([^>]*?)\shref="((?:https?:\/\/(?!aaronbeaudoin\.com)[^"]+)|(?:\/files\/[^"]+\.pdf))"([^>]*)>([\s\S]*?)<\/a>/g,
      (match, before, href, after, inner) => {
        if (/\starget=/.test(before + after)) return match;
        return `<a${before} href="${href}"${after} target="_blank" rel="noopener">${inner}<span class="visually-hidden"> (opens in a new tab)</span><span class="ext-icon" aria-hidden="true">↗</span></a>`;
      }
    );
  });

  // ---- Responsive images
  // {% image "img/research/x.jpg", "Alt text", "(min-width: 60rem) 50vw, 100vw" %}
  // Pass alt "" only for purely decorative images.
  eleventyConfig.addShortcode("image", async (...args) => imageHtml(...args.slice(0, 5)));
  // {% zoomImage "img/x.jpg", "Alt text", "sizes", [widths] %}: an image with the Enlarge button.
  eleventyConfig.addShortcode("zoomImage", zoomableHtml);

  // {% figure "img/x.png", "Alt text", "Caption (HTML allowed)", "light", true %}
  // variant: "" | "light" | "phone" | "wide". full=true adds an "Open full size" link.
  eleventyConfig.addShortcode("figure", async function (src, alt, caption = "", variant = "", full = false) {
    const sizes = variant === "phone" ? "(min-width: 48rem) 20rem, 80vw" : "(min-width: 48rem) 42rem, 100vw";
    // `full` is kept for older calls; every figure can now be enlarged.
    const img = await zoomableHtml(src, alt, sizes, [480, 800, 1200]);
    const cls = "figure" + (variant ? ` figure--${variant}` : "");
    const cap = caption ? `<figcaption>${caption}</figcaption>` : "";
    return `<figure class="${cls}">${img}${cap}</figure>`;
  });

  // Page background (starfield) at fixed file names so the CSS can use it.
  eleventyConfig.on("eleventy.before", async () => {
    await Image("src/img/site/starfield.jpg", {
      ...IMG_OPTIONS,
      widths: [1200, 2400],
      formats: ["webp", "jpeg"],
      sharpJpegOptions: { quality: 70, progressive: true },
      sharpWebpOptions: { quality: 65 },
      filenameFormat: (id, src, width, format) => `starfield-${width}.${format}`,
    });
  });

  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));

  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/files": "files" });
  eleventyConfig.addPassthroughCopy({ "src/media": "media" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addWatchTarget("src/css/");

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
