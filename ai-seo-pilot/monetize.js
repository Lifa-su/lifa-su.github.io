/**
 * Feifei's AI Tools — Universal Monetization Component
 * 
 * Configured for: AI SEO Pilot
 * 
 * Components:
 * - ☕ Support / Buy me a coffee button → Ko-fi
 * - 🔄 Cross-promotion banner
 * - 📤 Social share buttons
 * 
 * Usage: include before </body>
 * <script src="monetize.js"></script>
 */
(function() {
  'use strict';

  // ─── Config ───────────────────────────────────────────────────
  const DEFAULT_CONFIG = {
    gumroadUrl: 'https://ko-fi.com/feidev',
    gumroadProUrl: 'https://ko-fi.com/feidev',
    toolName: document.title || 'AI Tool',
    showSupport: true,
    showCrossPromo: true,
    showNewsletter: false,
    showProUpgrade: false,
    showShare: true,
    newsletterEndpoint: '',
    proDelay: 60000,
    supportPosition: 'bottom-right',
  };

  const CFG = Object.assign({}, DEFAULT_CONFIG, window.MONETIZE_CONFIG || {});

  // ─── Tool Registry (for cross-promotion) ──────────────────────
  const ALL_TOOLS = [
    { name:"AI Toolbox", icon:"🧰", desc:"All-in-one AI toolkit", link:"/ai-tools-hub/#ai-toolbox", cat:"business" },
    { name:"AI ID Photo", icon:"📸", desc:"Smart ID photo generator", link:"/ai-tools-hub/#ai-id-photo", cat:"design" },
    { name:"AI Translator", icon:"🌐", desc:"Multi-language translator", link:"/ai-tools-hub/#ai-translator", cat:"writing" },
    { name:"AI Resume", icon:"📄", desc:"Professional resume builder", link:"/ai-tools-hub/#ai-resume", cat:"business" },
    { name:"AI Copywriter", icon:"✏️", desc:"Marketing copy generator", link:"/ai-tools-hub/#ai-copywriter", cat:"writing" },
    { name:"QRCode Art", icon:"🎭", desc:"Artistic QR code generator", link:"/ai-tools-hub/#qrcode-art", cat:"design" },
    { name:"AI PPT Generator", icon:"🖥️", desc:"Auto-generate presentations", link:"/ai-tools-hub/#ai-ppt", cat:"business" },
    { name:"AI Diagram Generator", icon:"📐", desc:"Natural language diagrams", link:"/ai-tools-hub/#ai-diagram", cat:"design" },
    { name:"AI Code Reviewer", icon:"🔍", desc:"Smart code review", link:"/ai-tools-hub/#ai-code-reviewer", cat:"dev" },
    { name:"AI Logo Generator", icon:"💎", desc:"AI brand logo design", link:"/ai-tools-hub/#ai-logo", cat:"design" },
    { name:"AI Invoice Generator", icon:"🧾", desc:"Quick professional invoices", link:"/ai-tools-hub/#ai-invoice", cat:"business" },
    { name:"AI Cold Email", icon:"💌", desc:"High-converting emails", link:"/ai-tools-hub/#ai-cold-email", cat:"business" },
    { name:"AI JSON Toolkit", icon:"🔧", desc:"All-in-one JSON tools", link:"/ai-tools-hub/#ai-json", cat:"dev" },
    { name:"AI SQL Generator", icon:"🗃️", desc:"Natural language to SQL", link:"/ai-tools-hub/#ai-sql", cat:"dev" },
    { name:"AI Contract", icon:"📑", desc:"AI contract generator", link:"/ai-contract/", cat:"business" },
    { name:"AI Blog Writer", icon:"✍️", desc:"AI blog post writer", link:"/ai-blog-writer/", cat:"writing" },
  ];

  // ─── Styles ───────────────────────────────────────────────────
  const STYLES = `
    .mtz-reset,.mtz-reset *{margin:0;padding:0;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Noto Sans SC',sans-serif}

    /* ☕ Support Button (Floating) */
    .mtz-support-btn{
      position:fixed;z-index:9999;
      ${CFG.supportPosition === 'bottom-left' ? 'left:20px' : 'right:20px'};
      bottom:20px;display:flex;align-items:center;gap:8px;
      padding:12px 20px;border-radius:50px;border:none;cursor:pointer;
      background:linear-gradient(135deg,#6c5ce7,#a855f7);color:#fff;
      font-size:14px;font-weight:600;text-decoration:none;
      box-shadow:0 4px 20px rgba(108,92,231,.4);
      transition:all .3s ease;animation:mtz-float-in .5s ease-out;
    }
    .mtz-support-btn:hover{transform:translateY(-2px) scale(1.03);box-shadow:0 6px 28px rgba(108,92,231,.55)}
    .mtz-support-btn .mtz-heart{font-size:18px;animation:mtz-beat 1.5s ease-in-out infinite}
    @keyframes mtz-beat{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}
    @keyframes mtz-float-in{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

    /* 📤 Share Buttons */
    .mtz-share-bar{
      position:fixed;z-index:9998;
      ${CFG.supportPosition === 'bottom-left' ? 'left:20px' : 'right:20px'};
      bottom:72px;display:flex;flex-direction:column;gap:8px;
      animation:mtz-float-in .5s ease-out .2s both;
    }
    .mtz-share-btn{
      width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.1);
      background:rgba(18,18,26,.9);backdrop-filter:blur(10px);
      color:#e0e0e8;font-size:16px;cursor:pointer;
      display:flex;align-items:center;justify-content:center;
      transition:all .25s;text-decoration:none;
    }
    .mtz-share-btn:hover{background:rgba(108,92,231,.3);border-color:rgba(108,92,231,.5);transform:scale(1.1)}

    /* 🔄 Cross-Promotion Banner */
    .mtz-cross-promo{
      background:linear-gradient(135deg,rgba(18,18,26,.95),rgba(26,26,46,.95));
      backdrop-filter:blur(10px);
      border:1px solid rgba(108,92,231,.2);border-radius:16px;
      padding:28px;margin:40px auto;max-width:900px;
    }
    .mtz-cross-promo h3{font-size:16px;color:#a855f7;margin-bottom:16px;display:flex;align-items:center;gap:8px}
    .mtz-cross-promo-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}
    .mtz-promo-card{
      display:flex;align-items:center;gap:10px;padding:12px 14px;
      border-radius:10px;background:rgba(42,42,62,.5);border:1px solid rgba(42,42,62,.8);
      text-decoration:none;color:#e0e0e8;transition:all .25s;
    }
    .mtz-promo-card:hover{background:rgba(108,92,231,.15);border-color:rgba(108,92,231,.3);transform:translateY(-1px)}
    .mtz-promo-card .mtz-pi{font-size:1.4rem}
    .mtz-promo-card .mtz-pn{font-size:13px;font-weight:600}
    .mtz-promo-card .mtz-pd{font-size:11px;color:#8888a0}

    /* Responsive */
    @media(max-width:640px){
      .mtz-support-btn{padding:10px 16px;font-size:13px;bottom:16px;right:16px}
      .mtz-share-bar{bottom:64px;right:16px}
      .mtz-cross-promo{margin:24px 16px;padding:20px}
      .mtz-cross-promo-grid{grid-template-columns:1fr}
    }
  `;

  // ─── Inject Styles ────────────────────────────────────────────
  function injectStyles() {
    const style = document.createElement('style');
    style.id = 'mtz-styles';
    style.textContent = STYLES;
    document.head.appendChild(style);
  }

  // ─── ☕ Support Button ────────────────────────────────────────
  function createSupportButton() {
    if (!CFG.showSupport) return;
    const btn = document.createElement('a');
    btn.className = 'mtz-support-btn mtz-reset';
    btn.href = CFG.gumroadUrl;
    btn.target = '_blank';
    btn.rel = 'noopener';
    btn.innerHTML = '<span class="mtz-heart">☕</span> Support this project';
    btn.setAttribute('aria-label', 'Support this project on Ko-fi');
    document.body.appendChild(btn);
  }

  // ─── 📤 Share Buttons ────────────────────────────────────────
  function createShareButtons() {
    if (!CFG.showShare) return;
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(CFG.toolName + ' — Free AI Tool');
    const bar = document.createElement('div');
    bar.className = 'mtz-share-bar mtz-reset';
    bar.innerHTML = `
      <a class="mtz-share-btn" href="https://twitter.com/intent/tweet?url=${url}&text=${title}" target="_blank" rel="noopener" aria-label="Share on Twitter" title="Share on X/Twitter">𝕏</a>
      <a class="mtz-share-btn" href="https://www.linkedin.com/sharing/share-offsite/?url=${url}" target="_blank" rel="noopener" aria-label="Share on LinkedIn" title="Share on LinkedIn">in</a>
      <a class="mtz-share-btn" href="https://www.reddit.com/submit?url=${url}&title=${title}" target="_blank" rel="noopener" aria-label="Share on Reddit" title="Share on Reddit">📣</a>
      <button class="mtz-share-btn" onclick="navigator.clipboard.writeText(window.location.href).then(()=>{this.textContent='✓';setTimeout(()=>this.textContent='🔗',1500)})" aria-label="Copy link" title="Copy link">🔗</button>
    `;
    document.body.appendChild(bar);
  }

  // ─── 🔄 Cross-Promotion ──────────────────────────────────────
  function createCrossPromo() {
    if (!CFG.showCrossPromo) return;
    const currentName = CFG.toolName;
    const others = ALL_TOOLS.filter(t => !currentName.includes(t.name));
    const picks = shuffle(others).slice(0, 4);
    if (picks.length === 0) return;

    const section = document.createElement('div');
    section.className = 'mtz-cross-promo mtz-reset';
    section.innerHTML = `
      <h3>✨ Discover More AI Tools</h3>
      <div class="mtz-cross-promo-grid">
        ${picks.map(t => `
          <a class="mtz-promo-card" href="${t.link}">
            <span class="mtz-pi">${t.icon}</span>
            <div>
              <div class="mtz-pn">${t.name}</div>
              <div class="mtz-pd">${t.desc}</div>
            </div>
          </a>
        `).join('')}
      </div>
    `;

    const footer = document.querySelector('footer');
    if (footer) {
      footer.parentNode.insertBefore(section, footer);
    } else {
      document.body.appendChild(section);
    }
  }

  // ─── Helpers ──────────────────────────────────────────────────
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ─── Init ─────────────────────────────────────────────────────
  function init() {
    if (document.getElementById('mtz-styles')) return;
    injectStyles();
    createSupportButton();
    createShareButtons();
    createCrossPromo();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
