import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

export default defineConfig({
  site,
  integrations: [
    tailwind(),
    sitemap()
  ],
  output: 'static'
});