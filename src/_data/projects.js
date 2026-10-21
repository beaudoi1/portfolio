// Projects shown on the Design index and Home page.
// status: "complete" | "progress" | "other"
// group:  "ux" (UX case studies) | "brand" (Brand & marketing work)
// Leave image/summary empty while missing. The card then shows a TODO in preview.
export default [
  {
    title: "Rinkside B2C",
    url: "/design/rinkside-b2c/",
    group: "ux",
    status: "progress",
    statusLabel: "Alpha · Testing in progress",
    platform: "iOS & Android app + web app",
    summary: "Find ice sessions near you and keep your team's schedule, RSVPs, and scores in one place.",
    image: "img/rinkside/hero-alpha.jpg",
    imageAlt: "",
    featured: true,
  },
  {
    title: "Rinkside B2B",
    url: "/design/rinkside-b2b/",
    group: "ux",
    status: "progress",
    statusLabel: "In progress",
    platform: "Web dashboard + app for rink staff",
    summary: "The rink side of Rinkside: enter a session once, and it shows up everywhere.",
    image: "img/rinkside/b2b-dashboard-concept.png",
    imageAlt: "",
  },
  {
    title: "STiX Crafthouse",
    url: "/design/stix-crafthouse/",
    group: "brand",
    status: "other",
    statusLabel: "Brand & marketing",
    platform: "Logo, event flyers, social media",
    summary: "Branding and social media for the hockey bar I co-founded in Arvada, Colorado.",
    image: "img/stix/stix-logo.png",
    imageAlt: "",
    imageContain: true,
    imageLight: true,
  },
];
