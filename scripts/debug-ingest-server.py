#!/usr/bin/env python3
"""
Minimal ingest server for debug logs from the browser.
Listens on 127.0.0.1:7242, accepts POST at /ingest/<id>, appends JSON body as NDJSON to .cursor/debug-247d13.log.
Sends CORS headers so fetch() from localhost:4000 works.
"""
import json
import os
from http.server import HTTPServer, BaseHTTPRequestHandler

PORT = 7242
LOG_PATH = os.path.join(os.path.dirname(__file__), "..", ".cursor", "debug-247d13.log")

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Debug-Session-Id",
}


class IngestHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(204)
        for k, v in CORS_HEADERS.items():
            self.send_header(k, v)
        self.end_headers()

    def do_POST(self):
        if not self.path.startswith("/ingest/"):
            self.send_response(404)
            self.send_header("Content-Type", "text/plain")
            for k, v in CORS_HEADERS.items():
                self.send_header(k, v)
            self.end_headers()
            self.wfile.write(b"Not found")
            return
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length).decode("utf-8", errors="replace") if length else ""
        try:
            log_dir = os.path.dirname(LOG_PATH)
            os.makedirs(log_dir, exist_ok=True)
            with open(LOG_PATH, "a", encoding="utf-8") as f:
                f.write(body.strip() + "\n")
        except Exception as e:
            print(e)
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        for k, v in CORS_HEADERS.items():
            self.send_header(k, v)
        self.end_headers()
        self.wfile.write(b'{"ok":true}')

    def log_message(self, format, *args):
        pass


if __name__ == "__main__":
    server = HTTPServer(("127.0.0.1", PORT), IngestHandler)
    print(f"Debug ingest: http://127.0.0.1:{PORT} -> {LOG_PATH}")
    server.serve_forever()
