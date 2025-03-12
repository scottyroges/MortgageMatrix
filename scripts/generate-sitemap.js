#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the base URL of the website
const BASE_URL = 'https://mortgagematrix.me';

// Define the routes and their priorities
const routes = [
  { path: '/', priority: 0.8, changefreq: 'monthly' },
  { path: '/affordability-estimator', priority: 1.0, changefreq: 'monthly' },
  { path: '/how-it-works', priority: 0.6, changefreq: 'monthly' },
  { path: '/monthly-payment-calculator', priority: 1.0, changefreq: 'monthly' },
  { path: '/privacy-policy', priority: 0.6, changefreq: 'yearly' },
  { path: '/terms-of-service', priority: 0.6, changefreq: 'yearly' },
  { path: '/contact-us', priority: 0.6, changefreq: 'monthly' },
];

// Get the current date in YYYY-MM-DD format
const currentDate = new Date().toISOString().split('T')[0];

// Generate the sitemap XML
function generateSitemap() {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add each route to the sitemap
  routes.forEach((route) => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${BASE_URL}${route.path}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${route.priority.toFixed(1)}</priority>\n`;
    sitemap += '  </url>\n';
  });

  sitemap += '</urlset>';
  return sitemap;
}

// Write the sitemap to the public directory
async function writeSitemap() {
  try {
    const sitemap = generateSitemap();
    const publicDir = path.resolve(__dirname, '../public');
    const sitemapPath = path.join(publicDir, 'sitemap.xml');

    // Ensure the public directory exists
    await fs.ensureDir(publicDir);

    // Write the sitemap file
    await fs.writeFile(sitemapPath, sitemap, 'utf8');
    console.log(`Sitemap generated successfully at ${sitemapPath}`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

// Execute the function
writeSitemap();
