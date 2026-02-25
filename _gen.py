#!/usr/bin/env python3
"""Generate ai-unit-test.html"""
import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ai-unit-test.html')

head = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>AI Unit Test Generator - Generate Tests Instantly | Lifa AI Tools</title>
<meta name="description" content="Free AI-powered unit test generator. Paste your code, select language and framework, get comprehensive unit tests with edge cases instantly.">
<meta name="keywords" content="unit test generator,AI testing,Jest,pytest,JUnit,Vitest,Mocha,Go test,code testing">
<meta name="author" content="Lifa Su">
<meta name="robots" content="index,follow">
<link rel="canonical" href="https://lifa-sugithubio.vercel.app/ai-unit-test.html">
<meta property="og:type" content="website">
<meta property="og:title" content="AI Unit Test Generator - Generate Tests Instantly">
<meta property="og:description" content="Free AI-powered unit test generator. Paste code, get comprehensive unit tests with edge cases.">
<meta property="og:url" content="https://lifa-sugithubio.vercel.app/ai-unit-test.html">
<meta property="og:site_name" content="Lifa AI Tools">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="AI Unit Test Generator - Generate Tests Instantly">
<meta name="twitter:description" content="Free AI-powered unit test generator with edge cases and error handling.">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebApplication","name":"AI Unit Test Generator","description":"Free AI-powered unit test generator supporting JavaScript, TypeScript, Python, Java, Go, Rust, C#","url":"https://lifa-sugithubio.vercel.app/ai-unit-test.html","applicationCategory":"DeveloperApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"author":{"@type":"Person","name":"Lifa Su"}}</script>
'''

css = '''<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0a0a0f;--surface:#111118;--card:#14141e;--border:#1e1e2e;--accent:#6c5ce7;--accent2:#00cec9;--text:#e2e2e8;--muted:#8888a0;--radius:14px;--glow:0 0 20px rgba(108,92,231,.3)}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.6;min-height:100vh}
nav{position:sticky;top:0;z-index:100;background:rgba(10,10,15,.8);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid var(--border);padding:14px 24px}
nav a{color:var(--text);text-decoration:none;font-weight:600;font-size:15px;transition:color .2s}
nav a:hover{color:var(--accent)}
.container{max-width:1200px;margin:0 auto;padding:24px 20px}
h1{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:8px}
.subtitle{color:var(--muted);font-size:15px;margin-bottom:32px}
.controls{display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap;align-items:center}
.controls select,.controls button{padding:10px 18px;border-radius:10px;border:1px solid var(--border);background:var(--card);color:var(--text);font-size:14px;cursor:pointer;transition:all .2s}
.controls select:hover,.controls select:focus{border-color:var(--accent);outline:none}
.btn-gen{background:linear-gradient(135deg,var(--accent),var(--accent2))!important;border:none!important;font-weight:700;color:#fff!important;padding:10px 28px!important;box-shadow:var(--glow)}
.btn-gen:hover{transform:translateY(-2px);box-shadow:0 0 30px rgba(108,92,231,.5)}
.btn-gen:active{transform:translateY(0)}
.split{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:32px}
@media(max-width:768px){.split{grid-template-columns:1fr}.controls{flex-direction:column;align-items:stretch}}
.panel{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;transition:border-color .3s}
.panel:hover{border-color:rgba(108,92,231,.3)}
.ph{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:var(--surface);border-bottom:1px solid var(--border);font-size:13px;font-weight:600;color:var(--muted)}
.ph button{background:var(--card);border:1px solid var(--border);color:var(--text);padding:5px 14px;border-radius:8px;font-size:12px;cursor:pointer;transition:all .2s}
.ph button:hover{border-color:var(--accent);color:var(--accent)}
.ca{position:relative;font-family:'SF Mono',Monaco,'Cascadia Code','Fira Code',Consolas,monospace;font-size:13px;line-height:1.7}
.ca textarea{width:100%;min-height:350px;padding:16px 16px 16px 56px;background:transparent;border:none;color:var(--text);font-family:inherit;font-size:inherit;line-height:inherit;resize:vertical;outline:none;tab-size:2}
.ca textarea::placeholder{color:var(--muted)}
.ln{position:absolute;left:0;top:0;bottom:0;width:44px;padding:16px 8px 16px 0;text-align:right;color:rgba(136,136,160,.4);font-family:inherit;font-size:inherit;line-height:inherit;pointer-events:none;user-select:none;overflow:hidden}
.ow{position:relative;min-height:350px;overflow:auto;max-height:600px}
.ow pre{padding:16px 16px 16px 56px;margin:0;font-family:'SF Mono',Monaco,'Cascadia Code','Fira Code',Consolas,monospace;font-size:13px;line-height:1.7;white-space:pre;overflow-x:auto;color:var(--text)}
.ow .ln{padding-top:16px}
.empty{display:flex;align-items:center;justify-content:center;min-height:350px;color:var(--muted);font-size:14px;text-align:center;padding:40px}
.cov{margin-bottom:32px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:20px 24px;display:none}
.cov h3{font-size:14px;color:var(--muted);margin-bottom:12px;font-weight:600}
.cov-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px}
.cov-item{text-align:center}
.cov-item .val{font-size:28px;font-weight:800;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.cov-item .lbl{font-size:12px;color:var(--muted);margin-top:2px}
.bar{height:6px;background:var(--border);border-radius:3px;margin-top:8px;overflow:hidden}
.bar-fill{height:100%;background:linear-gradient(90deg,var(--accent),var(--accent2));border-radius:3px;transition:width .6s ease}
.pro{margin-bottom:32px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:28px;position:relative;overflow:hidden}
.pro::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--accent),var(--accent2))}
.pro h2{font-size:18px;margin-bottom:6px}
.pro>p{color:var(--muted);font-size:14px;margin-bottom:18px}
.pro-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:20px}
.pro-card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:16px;opacity:.7}
.pro-card h4{font-size:14px;margin-bottom:4px}
.pro-card p{font-size:12px;color:var(--muted);margin:0}
.btn-up{display:inline-block;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;padding:10px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px;transition:all .2s;box-shadow:var(--glow)}
.btn-up:hover{transform:translateY(-2px);box-shadow:0 0 30px rgba(108,92,231,.5);color:#fff}
.lock{margin-right:6px}
footer{text-align:center;padding:32px 20px;color:var(--muted);font-size:13px;border-top:1px solid var(--border)}
footer a{color:var(--accent);text-decoration:none}
footer a:hover{text-decoration:underline}
.copied{position:fixed;top:80px;right:20px;background:var(--accent);color:#fff;padding:10px 20px;border-radius:10px;font-size:13px;font-weight:600;z-index:200;animation:fadeio 2s ease forwards}
@keyframes fadeio{0%{opacity:0;transform:translateY(-10px)}10%{opacity:1;transform:translateY(0)}80%{opacity:1}100%{opacity:0}}
.kw{color:#c792ea}.fn{color:#82aaff}.st{color:#c3e88d}.cm{color:#546e7a}.nu{color:#f78c6c}.op{color:#89ddff}.ty{color:#ffcb6b}
</style>
</head>
'''

with open(OUT, 'w') as f:
    f.write(head)
    f.write(css)
print(f"Part 1 written: {os.path.getsize(OUT)} bytes")
