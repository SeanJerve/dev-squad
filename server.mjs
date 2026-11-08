/**
 * DEV-SQUAD LOCAL COMMAND SERVER
 * Zero-dependency Node.js HTTP Server for local dashboards, gym demos, and API telemetry.
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { scanCodebase } from './scanner.mjs';
import { SKILL_METADATA } from './packager.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TOOL_DIR = __dirname;
const CWD = process.cwd();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.zip': 'application/zip'
};

export function startDevServer(port = 3333) {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${port}`);
    let pathname = decodeURIComponent(url.pathname);

    // 1. API Endpoints
    if (pathname === '/api/status') {
      const cfgPath = path.join(CWD, 'dev-squad.config.json');
      let config = { profile: 'dost-gov' };
      if (fs.existsSync(cfgPath)) {
        try { config = JSON.parse(fs.readFileSync(cfgPath, 'utf8')); } catch {}
      }

      const featDir = path.join(CWD, 'features');
      const features = [];
      if (fs.existsSync(featDir)) {
        const entries = fs.readdirSync(featDir, { withFileTypes: true }).filter(e => e.isDirectory());
        for (const entry of entries) {
          const fPath = path.join(featDir, entry.name);
          features.push({
            name: entry.name,
            hasSpec: fs.existsSync(path.join(fPath, 'spec.md')),
            hasPlan: fs.existsSync(path.join(fPath, 'plan.md')),
            hasAudit: fs.existsSync(path.join(fPath, 'audit.md'))
          });
        }
      }

      const issues = scanCodebase(CWD, config.profile);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        profile: config.profile,
        features,
        security_score: Math.max(0, 100 - (issues.length * 15)),
        violations: issues,
        server_time: new Date().toISOString()
      }, null, 2));
      return;
    }

    if (pathname === '/api/marketplace') {
      const distDir = path.join(TOOL_DIR, 'dist', 'marketplace');
      const skills = Object.entries(SKILL_METADATA).map(([id, meta]) => {
        const zipFile = path.join(distDir, `${id}.zip`);
        return {
          id,
          ...meta,
          hasZip: fs.existsSync(zipFile),
          zipUrl: `/dist/marketplace/${id}.zip`
        };
      });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ skills }, null, 2));
      return;
    }

    // 2. Convenience Route Aliases
    if (pathname === '/' || pathname === '/dashboard') {
      pathname = '/dashboard.html';
    } else if (pathname === '/gym/tier1') {
      pathname = '/agency/gym-engine/tier1-static/index.html';
    } else if (pathname === '/gym/tier2') {
      pathname = '/agency/gym-engine/tier2-dynamic/index.html';
    } else if (pathname === '/gym/tier2/admin') {
      pathname = '/agency/gym-engine/tier2-dynamic/admin.html';
    } else if (pathname === '/gym/tier3') {
      pathname = '/agency/gym-engine/tier3-system/index.html';
    }

    // 3. Static File Resolution
    let filePath = path.join(CWD, pathname);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(TOOL_DIR, pathname);
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    // 404 Fallback
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`404 Not Found: ${pathname}`);
  });

  server.listen(port, () => {
    console.log(`\n╔════════════════════════════════════════════════════════════════════════╗`);
    console.log(`║   DEV-SQUAD LOCAL COMMAND SERVER &bull; ONLINE                            ║`);
    console.log(`║   Dashboard:    http://localhost:${port}/dashboard                         ║`);
    console.log(`║   Gym Tier 1:   http://localhost:${port}/gym/tier1                         ║`);
    console.log(`║   Gym Tier 2:   http://localhost:${port}/gym/tier2                         ║`);
    console.log(`║   Gym Tier 3:   http://localhost:${port}/gym/tier3                         ║`);
    console.log(`║   Marketplace:  http://localhost:${port}/api/marketplace                   ║`);
    console.log(`╚════════════════════════════════════════════════════════════════════════╝\n`);
  });

  return server;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = parseInt(process.argv[2] || '3333', 10);
  startDevServer(port);
}
