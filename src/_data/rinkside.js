// Rinkside B2C case study: content drawn as real text instead of pictures.
// Flows: copied from Aaron's FigJam boards (Oct 2026). Matrix: competitive audit, July 2026.
// Themes: the alpha's palette, from mobile/src/theme.ts.

// A step is a string. Other nodes:
//   { start: "…" } / { end: "…" }  rounded start and end points
//   { q: "…?", branches: [{ label, steps: [...] }] }  a decision
//   { back: "…" }  loops back to an earlier step
const flows = {
  discover: [
    { start: "Open Rinkside" },
    "Home: hero and previews",
    { q: "Browse or search?", branches: [
      { label: "Search", steps: ["Search results"] },
      { label: "Browse", steps: ["Explore: rinks and activities", { q: "Sessions available nearby?", branches: [
        { label: "Yes", steps: [] },
        { label: "No", steps: [{ end: "Empty state: no sessions nearby" }] },
      ] }] },
    ] },
    "Session list with live spot counts",
    "Session detail",
    "Proceed to checkout",
    { end: "Booking confirmed" },
  ],
  team: [
    { start: "Rink publishes its schedule" },
    "The game fills in under My Teams",
    "Push notification: new game scheduled",
    "Player opens My Teams",
    "Sees the game: date, time, venue",
    { q: "In or out?", branches: [
      { label: "In", steps: ["Marked in, live count updates"] },
      { label: "Out", steps: [{ end: "Marked out, live count updates" }] },
      { label: "No answer by the deadline", steps: ["Automated nudge", { back: "In or out?" }] },
    ] },
    "Game day",
    "QR check-in at the rink",
    { end: "On the ice" },
  ],
  checkout: [
    { start: "Enter from session detail" },
    "Pick who's going: you or a dependent",
    { q: "Price tier?", branches: [
      { label: "Under the threshold", steps: ["Flat $0.99 fee"] },
      { label: "Over the threshold", steps: ["Capped percentage fee"] },
    ] },
    "Show the all-in total before paying",
    { q: "Saved payment method?", branches: [
      { label: "Yes", steps: [] },
      { label: "No", steps: ["Add one through Stripe"] },
    ] },
    "Pay",
    { q: "Payment result?", branches: [
      { label: "Success", steps: [{ end: "Confirmation and QR credential" }] },
      { label: "Failed", steps: ["Error: payment failed", { back: "Pay" }] },
      { label: "Session filled during checkout", steps: ["Error: session filled", { end: "Waitlist offer" }] },
    ] },
  ],
  cancelV1: [
    { start: "Tap Cancel booking" },
    { q: "Is anyone on the waitlist right now?", branches: [
      { label: "Yes", steps: ["Show: you'll be refunded, someone can take your spot"] },
      { label: "No", steps: ["Show: you won't be refunded, the spot may go unfilled"] },
    ] },
    { q: "Confirm the cancellation?", branches: [
      { label: "No", steps: [{ end: "Booking kept" }] },
      { label: "Yes, waitlist", steps: ["Refund issued", "Next person on the waitlist is promoted", "They're charged and their spot is confirmed", { end: "Cancellation complete" }] },
      { label: "Yes, no waitlist", steps: ["Booking canceled, no refund", "Spot opens, nobody to fill it", { end: "Cancellation complete" }] },
    ] },
  ],
  cancelV2: [
    { start: "Tap Cancel booking" },
    { q: "Is the session full right now?", branches: [
      { label: "Yes, with a waitlist", steps: ["Show: you'll be refunded now, N people waiting"] },
      { label: "No", steps: ["Show: not refunded now, but refunded if this fills before it starts"] },
    ] },
    { q: "Confirm the cancellation?", branches: [
      { label: "No", steps: [{ end: "Booking kept" }] },
      { label: "Yes, full", steps: ["Refund issued right away", "Next person on the waitlist is promoted", "They're charged and their spot is confirmed", { end: "Cancellation complete" }] },
      { label: "Yes, not full", steps: ["Booking canceled, spot opens, refund pending", { q: "Does it fill before it starts?", branches: [
        { label: "Yes", steps: ["Refund paid", { end: "Cancellation complete" }] },
        { label: "No", steps: ["Pending closes: no refund", { end: "Cancellation complete" }] },
      ] }] },
    ] },
  ],
};

// y = works, p = partly (works, but compromised), n = missing, na = doesn't apply
const matrix = {
  columns: ["CommunityPass", "rec.us", "EZFacility", "SportsEngine", "BenchApp", "Rinkside"],
  rows: [
    ["Shows more than one rink", "n n n n n y", true],
    ["Availability before you log in", "n n p n na y"],
    ["Live spot count in the list", "n n p n na y"],
    ["Only shows sessions you can book", "n n n n na y"],
    ["Single session, no membership", "p n n n na y"],
    ["Built for phones, start to finish", "n y p p y y"],
    ["One official schedule", "y y p p n y"],
    ["One all-in price", "y p p na na y"],
    ["Push alert when something changes", "n n n p p y"],
    ["Waitlist that moves people up", "n p n n p y"],
    ["Team roster and attendance", "n n n y y y"],
    ["Team schedule filled in from the rink", "n n n n n y", true],
    ["QR or digital check-in", "n n p n n y"],
    ["Dashboard for rink staff", "y y y y n y"],
  ].map(([label, cells, key]) => ({ label, cells: cells.split(" "), key: !!key })),
};

// WCAG contrast ratio between two hex colors.
function lum(hex) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (Math.floor(((x + 0.05) / (y + 0.05)) * 10) / 10).toFixed(1);
};

const palettes = {
  Dark: { bg: "#070d13", surface: "#26445e", accent: "#5fd0ff", text: "#ffffff", textMuted: "#b9d6e6", green: "#4ade80", amber: "#fbbf24", red: "#fca5a5" },
  Light: { bg: "#e7edf3", surface: "#ffffff", accent: "#075985", text: "#0b1824", textMuted: "#3d5a6c", green: "#166534", amber: "#92400e", red: "#a31b1b" },
  Warm: { bg: "#14120f", surface: "#332b21", accent: "#fb923c", text: "#faf6f0", textMuted: "#d1b190", green: "#4ade80", amber: "#fbbf24", red: "#f87171" },
};
const textRoles = [["text", "Text"], ["textMuted", "Muted text"], ["accent", "Accent"], ["green", "Green"], ["amber", "Amber"], ["red", "Red"]];
const themes = Object.entries(palettes).map(([name, p]) => ({
  name,
  bg: p.bg,
  surface: p.surface,
  text: p.text,
  swatches: textRoles.map(([key, label]) => ({ label, hex: p[key], ratio: ratio(p[key], p.surface) })),
}));

export default { flows, matrix, themes };
