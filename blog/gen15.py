#!/usr/bin/env python3
"""Generate batch 15 blog articles for Lifa AI Tools."""
import os

BLOG_DIR = os.path.dirname(os.path.abspath(__file__))

STYLE = """*{margin:0;padding:0;box-sizing:border-box}:root{--bg:#0a0a0f;--card:#12121a;--border:#1e1e2e;--text:#e2e2e8;--muted:#8888a0;--accent:#6c5ce7;--accent2:#00cec9}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.8}a{color:var(--accent2);text-decoration:none}a:hover{text-decoration:underline}nav{max-width:800px;margin:0 auto;padding:20px;display:flex;justify-content:space-between;align-items:center}nav a.logo{font-weight:700;font-size:1.1rem;color:#fff}nav .links a{margin-left:20px;color:var(--muted);font-size:0.9rem}nav .links a:hover{color:var(--accent2)}.article{max-width:800px;margin:0 auto;padding:20px 20px 80px}.article .meta{color:var(--muted);font-size:0.85rem;margin-bottom:24px}.article h1{font-size:2.2rem;font-weight:800;line-height:1.3;margin-bottom:12px;background:linear-gradient(135deg,#fff,var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}.article h2{font-size:1.5rem;font-weight:700;margin:40px 0 16px;color:#fff}.article h3{font-size:1.2rem;font-weight:600;margin:28px 0 12px;color:var(--accent2)}.article p{margin-bottom:16px;font-size:1rem}.article ul,.article ol{margin:0 0 16px 24px}.article li{margin-bottom:8px}.article code{background:rgba(108,92,231,0.15);padding:2px 6px;border-radius:4px;font-size:0.9rem}.article pre{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:16px;overflow-x:auto;margin:16px 0}.article pre code{background:none;padding:0}.tip{background:rgba(0,206,201,0.08);border:1px solid rgba(0,206,201,0.3);border-radius:8px;padding:16px;margin:16px 0}.tip strong{color:var(--accent2)}.cta-box{background:linear-gradient(135deg,rgba(108,92,231,0.15),rgba(0,206,201,0.1));border:1px solid var(--accent);border-radius:12px;padding:24px;margin:32px 0;text-align:center}.cta-box a{display:inline-block;padding:10px 24px;background:var(--accent);color:#fff;border-radius:8px;font-weight:600;margin-top:12px}.cta-box a:hover{background:#5a4bd1;text-decoration:none}footer{text-align:center;padding:40px 20px;border-top:1px solid var(--border);color:var(--muted);font-size:0.85rem;max-width:800px;margin:0 auto}@media(max-width:640px){.article h1{font-size:1.6rem}.article h2{font-size:1.3rem}}"""

def wrap(title, desc, og_title, og_desc, keywords, canonical, body_html):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} | Lifa AI Tools Blog</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="{og_title}">
<meta property="og:description" content="{og_desc}">
<meta property="og:type" content="article">
<meta name="keywords" content="{keywords}">
<link rel="canonical" href="https://lifa-su.github.io/blog/{canonical}">
<style>
{STYLE}
</style>
</head>
<body>
<nav><a class="logo" href="https://lifa-su.github.io/">&#9889; Lifa AI Tools</a><div class="links"><a href="https://lifa-su.github.io/">Home</a><a href="https://lifa-su.github.io/blog/">Blog</a><a href="https://lifa-su.github.io/about.html">About</a></div></nav>
<article class="article">
{body_html}
</article>
<footer>&copy; 2026 Lifa AI Tools. Built with &#10084;&#65039; for the developer community. <a href="https://lifa-su.github.io/about.html">About</a> &middot; <a href="https://lifa-su.github.io/privacy.html">Privacy</a> &middot; <a href="https://lifa-su.github.io/terms.html">Terms</a> &middot; <a href="https://lifa-su.github.io/contact.html">Contact</a></footer>
</body>
</html>"""

# Will be continued in gen15_articles.py
if __name__ == "__main__":
    from gen15_articles import ARTICLES
    for filename, html in ARTICLES.items():
        path = os.path.join(BLOG_DIR, filename)
        with open(path, 'w') as f:
            f.write(html)
        print(f"Written: {filename} ({len(html)} bytes)")
    print("Done! All 5 articles generated.")
