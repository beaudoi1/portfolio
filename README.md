# Aaron Beaudoin Portfolio

Static site built with [Eleventy](https://www.11ty.dev/), hosted on GitHub Pages.

## Run it locally

```bash
npm install
npm start
```

Open http://localhost:8080. Drafts and placeholders show here, highlighted in yellow.

## Edit content

| What | File |
|---|---|
| Email, LinkedIn, GitHub, location, resume link, nav | `src/_data/site.js` |
| Project cards (Design index + Home) | `src/_data/projects.js` |
| Research page | `src/research.md` |
| STiX page | `src/design/stix-crafthouse.md` |
| Home page | `src/index.njk` |
| Colors and layout | `src/css/style.css` (colors are at the top) |
| Images | `src/img/` |

In any page:
- `{% figure "img/folder/file.jpg", "Alt text", "Caption" %}` adds an image with a caption.
- `{% todo "what's missing" %}` marks a gap.
- `{% proposed %}…{% endproposed %}` marks copy that still needs approval.
- `draft: true` at the top of a page keeps it off the live site.

## Publishing safeguards

- `npm run build` makes the live version. **It fails if any published page still has a TODO or proposed copy**, so placeholders can't go live by accident.
- `npm run todos` writes every open item to `TODO.md`.
- Pushing to `main` deploys automatically (`.github/workflows/deploy.yml`).
