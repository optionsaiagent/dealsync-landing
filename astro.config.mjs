import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// Static (SSG) build: Astro renders the React LandingPage to HTML at build
// time so crawlers get fully-formed content, then hydrates it client-side
// (client:load). Output to dist/.
export default defineConfig({
  site: "https://www.dealsync.me",
  integrations: [react()],
  output: "static",
  build: { format: "file" }, // emit /index.html (not /index/index.html)
});
