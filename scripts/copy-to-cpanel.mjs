import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const cpanelDir = path.join(root, "cpanel");

if (!existsSync(distDir)) {
  console.error("dist/ not found. Run vite build first.");
  process.exit(1);
}

rmSync(cpanelDir, { recursive: true, force: true });
mkdirSync(cpanelDir, { recursive: true });
cpSync(distDir, cpanelDir, { recursive: true });

const htaccess = `RewriteEngine On
RewriteBase /
RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
`;

writeFileSync(path.join(cpanelDir, ".htaccess"), htaccess, "utf8");
console.log("Copied dist/ → cpanel/ (with .htaccess SPA fallback)");
