"""Serve the storefront locally with SPA-style clean URL fallback."""

import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path, PurePosixPath
from urllib.parse import urlsplit


ROOT = Path(__file__).resolve().parent


class StorefrontHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        requested_path = urlsplit(self.path).path
        requested_file = Path(self.translate_path(requested_path))
        is_page_path = "." not in PurePosixPath(requested_path).name
        if requested_file.exists() or not is_page_path:
            return super().send_head()

        original_path = self.path
        self.path = "/index.html"
        try:
            return super().send_head()
        finally:
            self.path = original_path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()
    handler = partial(StorefrontHandler, directory=str(ROOT))
    server = ThreadingHTTPServer(("127.0.0.1", args.port), handler)
    print(f"Serving Polytech Store Front at http://127.0.0.1:{args.port}/")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
