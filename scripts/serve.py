"""Small quiet static server for local development and browser verification."""
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, _format, *args):
        return


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else int(os.environ.get("PORT", "4185"))
    ThreadingHTTPServer(("127.0.0.1", port), QuietHandler).serve_forever()
