// Projects shown on the Design index and Home page.
// status: "complete" | "progress" | "other"
// group:  "ux" (UX case studies) | "brand" (Brand & marketing work)
// Leave image/summary empty while missing. The card then shows a TODO in preview.
export default [
  {
    title: "Rinkside: find ice, run your team",
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
    title: "Rinkside for rinks: one system to run the whole rink",
    url: "/design/rinkside-b2b/",
    group: "ux",
    status: "progress",
    statusLabel: "In progress",
    platform: "Web dashboard + app for rink staff",
    summary: "Scheduling, point of sale, inventory, stats, staff, finances, and the building, in one platform. Research in progress.",
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
