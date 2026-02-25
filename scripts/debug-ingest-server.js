#!/usr/bin/env node
/**
 * Minimal ingest server for debug logs from the browser.
 * Listens on 127.0.0.1:7242, accepts POST at /ingest/:id, appends JSON body as NDJSON to .cursor/debug-247d13.log.
 * Sends CORS headers so fetch() from localhost:4000 works.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 7242;
const LOG_PATH = path.join(__dirname, "..", ".cursor", "debug-247d13.log");

const server = http.createServer((req, res) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Debug-Session-Id",
  };

  if (req.method === "OPTIONS") {
    res.writeHead(204, cors);
    res.end();
    return;
  }

  if (req.method !== "POST" || !/^\/ingest\/.+/.test(req.url)) {
    res.writeHead(404, { "Content-Type": "text/plain", ...cors });
    res.end("Not found");
    return;
  }

  let body = "";
  req.on("data", (chunk) => { body += chunk; });
  req.on("end", () => {
    try {
      const dir = path.dirname(LOG_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.appendFileSync(LOG_PATH, body.trim() + "\n", "utf8");
    } catch (e) {
      console.error(e);
    }
    res.writeHead(200, { "Content-Type": "application/json", ...cors });
    res.end(JSON.stringify({ ok: true }));
  });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Debug ingest: http://127.0.0.1:${PORT} -> ${LOG_PATH}`);
});
