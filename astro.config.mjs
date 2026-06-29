import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// Static (SSG) build: Astro renders the React LandingPage to HTML at build
// time so crawlers get fully-formed content, then hydrates it client-side
// (client:load). Output to dist/.
export default defineConfig({
  site: "https://www.dealsync.me",
  integrations: [react()],
  output: "static",
  // Default "directory" format emits pages as <route>/index.html, which is
  // what Vercel's static hosting resolves clean URLs to (/blog →
  // /blog/index.html). "file" format breaks clean sub-page URLs on Vercel.
});
