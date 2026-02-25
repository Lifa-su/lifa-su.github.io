(function () {
  'use strict';

  const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
  const STOP_WORDS = new Set([
    'the','be','to','of','and','a','in','that','have','i','it','for','not','on','with',
    'he','as','you','do','at','this','but','his','by','from','they','we','her','she',
    'or','an','will','my','one','all','would','there','their','what','so','up','out',
    'if','about','who','get','which','go','me','when','make','can','like','time','no',
    'just','him','know','take','people','into','year','your','good','some','could',
    'them','see','other','than','then','now','look','only','come','its','over','think',
    'also','back','after','use','two','how','our','work','first','well','way','even',
    'new','want','because','any','these','give','day','most','us','is','are','was',
    'were','been','has','had','did','does','am','being','more','very','much','own',
    'may','should','shall','each','every','such','here','where','why','let','still',
    'too','same','through','during','before','between','under','again','further',
    'once','both','few','those','own','same','while','above','below','each','few',
    'more','most','other','some','such','nor','not','only','own','same','so','than',
    'too','very','just','don','should','now','www','http','https','com','org','net',
    'page','site','web','click','home','menu','search','login','sign','skip','main',
    'content','navigation','footer','header','sidebar','copyright','privacy','terms',
    'contact','about','blog','news','help','faq','support','read','learn','view',
  ]);

  // ─── DOM refs ──────────────────────────────────────────
  const form = document.getElementById('analyzeForm');
  const urlInput = document.getElementById('urlInput');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const btnText = analyzeBtn.querySelector('.btn-text');
  const btnLoading = analyzeBtn.querySelector('.btn-loading');
  const loadingSkeleton = document.getElementById('loadingSkeleton');
  const resultsSection = document.getElementById('resultsSection');
  const scoreGauge = document.getElementById('scoreGauge');
  const scoreValue = document.getElementById('scoreValue');
  const analyzedUrl = document.getElementById('analyzedUrl');
  const scoreGrid = document.getElementById('scoreGrid');
  const findingsList = document.getElementById('findingsList');
  const keywordsList = document.getElementById('keywordsList');
  const recommendationsList = document.getElementById('recommendationsList');

  // ─── Form submit ───────────────────────────────────────
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let url = urlInput.value.trim();
    if (!url) return;
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    try { new URL(url); } catch { return alert('Please enter a valid URL.'); }
    await runAnalysis(url);
  });

  // ─── Main analysis ────────────────────────────────────
  async function runAnalysis(url) {
    showLoading(true);
    try {
      const html = await fetchPage(url);
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const results = analyze(doc, url);
      render(results, url);
    } catch (err) {
      console.error(err);
      alert('Could not fetch the page. The site may block external requests. Try another URL.');
    } finally {
      showLoading(false);
    }
  }

  function showLoading(on) {
    analyzeBtn.disabled = on;
    btnText.style.display = on ? 'none' : '';
    btnLoading.style.display = on ? '' : 'none';
    loadingSkeleton.style.display = on ? '' : 'none';
    if (on) resultsSection.style.display = 'none';
  }

  async function fetchPage(url) {
    const res = await fetch(CORS_PROXY + encodeURIComponent(url));
    if (!res.ok) throw new Error('Fetch failed: ' + res.status);
    return await res.text();
  }

  // ─── Analysis engine ──────────────────────────────────
  function analyze(doc, url) {
    const findings = [];
    const recs = [];

    // --- Meta Tags ---
    let metaScore = 100;

    // Title
    const title = doc.querySelector('title');
    const titleText = title ? title.textContent.trim() : '';
    if (!titleText) {
      findings.push({ status: 'fail', text: 'Missing <title> tag' });
      recs.push({ icon: '🏷️', title: 'Add a title tag', desc: 'Every page needs a unique, descriptive title between 30-60 characters.' });
      metaScore -= 25;
    } else if (titleText.length < 30) {
      findings.push({ status: 'warn', text: `Title too short (${titleText.length} chars). Aim for 30-60.` });
      recs.push({ icon: '🏷️', title: 'Lengthen your title', desc: `Current: ${titleText.length} chars. Add more descriptive keywords.` });
      metaScore -= 10;
    } else if (titleText.length > 60) {
      findings.push({ status: 'warn', text: `Title too long (${titleText.length} chars). Aim for 30-60.` });
      recs.push({ icon: '🏷️', title: 'Shorten your title', desc: `Current: ${titleText.length} chars. Search engines may truncate it.` });
      metaScore -= 8;
    } else {
      findings.push({ status: 'pass', text: `Title tag present (${titleText.length} chars) ✓` });
    }

    // Meta description
    const metaDesc = doc.querySelector('meta[name="description"]');
    const descText = metaDesc ? (metaDesc.getAttribute('content') || '').trim() : '';
    if (!descText) {
      findings.push({ status: 'fail', text: 'Missing meta description' });
      recs.push({ icon: '📝', title: 'Add a meta description', desc: 'Write a compelling description between 120-160 characters.' });
      metaScore -= 25;
    } else if (descText.length < 120) {
      findings.push({ status: 'warn', text: `Meta description short (${descText.length} chars). Aim for 120-160.` });
      metaScore -= 8;
    } else if (descText.length > 160) {
      findings.push({ status: 'warn', text: `Meta description long (${descText.length} chars). Aim for 120-160.` });
      metaScore -= 5;
    } else {
      findings.push({ status: 'pass', text: `Meta description present (${descText.length} chars) ✓` });
    }

    // Viewport
    const viewport = doc.querySelector('meta[name="viewport"]');
    if (viewport) {
      findings.push({ status: 'pass', text: 'Viewport meta tag present ✓' });
    } else {
      findings.push({ status: 'fail', text: 'Missing viewport meta tag' });
      recs.push({ icon: '📱', title: 'Add viewport meta tag', desc: 'Required for mobile-friendly rendering.' });
      metaScore -= 15;
    }

    // Canonical
    const canonical = doc.querySelector('link[rel="canonical"]');
    if (canonical) {
      findings.push({ status: 'pass', text: 'Canonical URL set ✓' });
    } else {
      findings.push({ status: 'warn', text: 'No canonical URL found' });
      recs.push({ icon: '🔗', title: 'Add a canonical URL', desc: 'Prevents duplicate content issues in search engines.' });
      metaScore -= 8;
    }

    // Robots
    const robots = doc.querySelector('meta[name="robots"]');
    if (robots) {
      const val = (robots.getAttribute('content') || '').toLowerCase();
      if (val.includes('noindex')) {
        findings.push({ status: 'warn', text: 'Robots meta set to noindex — page won\'t be indexed' });
        metaScore -= 15;
      } else {
        findings.push({ status: 'pass', text: 'Robots meta tag present ✓' });
      }
    } else {
      findings.push({ status: 'warn', text: 'No robots meta tag (defaults to index, follow)' });
      metaScore -= 3;
    }

    // Language
    const lang = doc.documentElement.getAttribute('lang');
    if (lang) {
      findings.push({ status: 'pass', text: `Language attribute set: "${lang}" ✓` });
    } else {
      findings.push({ status: 'warn', text: 'Missing lang attribute on <html>' });
      recs.push({ icon: '🌐', title: 'Add lang attribute', desc: 'Helps search engines understand the page language.' });
      metaScore -= 5;
    }

    metaScore = clamp(metaScore);

    // --- Content Quality ---
    let contentScore = 100;

    // H1
    const h1s = doc.querySelectorAll('h1');
    if (h1s.length === 0) {
      findings.push({ status: 'fail', text: 'No H1 tag found' });
      recs.push({ icon: '📰', title: 'Add an H1 heading', desc: 'Every page should have exactly one H1 that describes the main topic.' });
      contentScore -= 25;
    } else if (h1s.length > 1) {
      findings.push({ status: 'warn', text: `Multiple H1 tags found (${h1s.length}). Use only one.` });
      recs.push({ icon: '📰', title: 'Use a single H1', desc: `Found ${h1s.length} H1 tags. Consolidate into one primary heading.` });
      contentScore -= 10;
    } else {
      findings.push({ status: 'pass', text: 'Single H1 tag present ✓' });
    }

    // Heading hierarchy
    const headings = doc.querySelectorAll('h1,h2,h3,h4,h5,h6');
    const headingLevels = Array.from(headings).map(h => parseInt(h.tagName[1]));
    let hierarchyOk = true;
    for (let i = 1; i < headingLevels.length; i++) {
      if (headingLevels[i] > headingLevels[i - 1] + 1) { hierarchyOk = false; break; }
    }
    if (headings.length > 1 && hierarchyOk) {
      findings.push({ status: 'pass', text: `Heading hierarchy looks good (${headings.length} headings) ✓` });
    } else if (headings.length > 1) {
      findings.push({ status: 'warn', text: 'Heading hierarchy has gaps (e.g. H1 → H3)' });
      recs.push({ icon: '📊', title: 'Fix heading hierarchy', desc: 'Don\'t skip heading levels. Go H1 → H2 → H3 in order.' });
      contentScore -= 8;
    }

    // Word count
    const bodyText = (doc.body ? doc.body.textContent : '').replace(/\s+/g, ' ').trim();
    const wordCount = bodyText.split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount < 300) {
      findings.push({ status: 'warn', text: `Low word count (${wordCount}). Aim for 300+ words.` });
      recs.push({ icon: '✍️', title: 'Add more content', desc: `Only ${wordCount} words found. Search engines prefer substantial content.` });
      contentScore -= 15;
    } else if (wordCount >= 300 && wordCount < 600) {
      findings.push({ status: 'pass', text: `Word count: ${wordCount} (acceptable)` });
    } else {
      findings.push({ status: 'pass', text: `Word count: ${wordCount} (good) ✓` });
      contentScore += 5;
    }

    // Images & alt tags
    const images = doc.querySelectorAll('img');
    const imgsWithAlt = Array.from(images).filter(img => img.getAttribute('alt') && img.getAttribute('alt').trim());
    if (images.length === 0) {
      findings.push({ status: 'warn', text: 'No images found on the page' });
      contentScore -= 5;
    } else {
      const altPct = Math.round((imgsWithAlt.length / images.length) * 100);
      if (altPct === 100) {
        findings.push({ status: 'pass', text: `All ${images.length} images have alt text ✓` });
      } else if (altPct >= 70) {
        findings.push({ status: 'warn', text: `${altPct}% of images have alt text (${imgsWithAlt.length}/${images.length})` });
        contentScore -= 8;
      } else {
        findings.push({ status: 'fail', text: `Only ${altPct}% of images have alt text (${imgsWithAlt.length}/${images.length})` });
        recs.push({ icon: '🖼️', title: 'Add alt text to images', desc: 'Alt text improves accessibility and helps search engines understand images.' });
        contentScore -= 15;
      }
    }

    contentScore = clamp(contentScore);

    // --- Technical SEO ---
    let techScore = 100;

    // OG tags
    const ogTitle = doc.querySelector('meta[property="og:title"]');
    const ogDesc = doc.querySelector('meta[property="og:description"]');
    const ogImage = doc.querySelector('meta[property="og:image"]');
    const ogCount = [ogTitle, ogDesc, ogImage].filter(Boolean).length;
    if (ogCount === 3) {
      findings.push({ status: 'pass', text: 'Open Graph tags complete (title, description, image) ✓' });
    } else if (ogCount > 0) {
      findings.push({ status: 'warn', text: `Open Graph partially set (${ogCount}/3 tags)` });
      recs.push({ icon: '📢', title: 'Complete Open Graph tags', desc: 'Add og:title, og:description, and og:image for better social sharing.' });
      techScore -= 8;
    } else {
      findings.push({ status: 'fail', text: 'No Open Graph tags found' });
      recs.push({ icon: '📢', title: 'Add Open Graph tags', desc: 'Essential for social media sharing previews.' });
      techScore -= 15;
    }

    // Twitter Card
    const twCard = doc.querySelector('meta[name="twitter:card"]');
    if (twCard) {
      findings.push({ status: 'pass', text: 'Twitter Card meta tag present ✓' });
    } else {
      findings.push({ status: 'warn', text: 'No Twitter Card meta tag' });
      techScore -= 5;
    }

    // Links
    const links = doc.querySelectorAll('a[href]');
    let internal = 0, external = 0;
    const baseHost = (() => { try { return new URL(url).hostname; } catch { return ''; } })();
    links.forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href.startsWith('#') || href.startsWith('javascript')) return;
      try {
        const linkHost = new URL(href, url).hostname;
        if (linkHost === baseHost) internal++; else external++;
      } catch { internal++; }
    });
    findings.push({ status: 'pass', text: `Links: ${internal} internal, ${external} external` });
    if (internal === 0 && links.length > 0) {
      recs.push({ icon: '🔗', title: 'Add internal links', desc: 'Internal linking helps search engines discover and rank your pages.' });
      techScore -= 8;
    }

    techScore = clamp(techScore);

    // --- Keywords ---
    let keywordScore = 80;
    const keywords = extractKeywords(bodyText);
    if (keywords.length >= 5) {
      keywordScore = 85;
      findings.push({ status: 'pass', text: `Found ${keywords.length} relevant keywords ✓` });
    } else if (keywords.length > 0) {
      findings.push({ status: 'warn', text: `Only ${keywords.length} keywords detected` });
      recs.push({ icon: '🔑', title: 'Improve keyword variety', desc: 'Use more relevant keywords naturally throughout your content.' });
      keywordScore = 55;
    } else {
      findings.push({ status: 'fail', text: 'No meaningful keywords detected' });
      keywordScore = 20;
    }

    // Check if title keywords appear in content
    if (titleText) {
      const titleWords = titleText.toLowerCase().split(/\s+/).filter(w => w.length > 3 && !STOP_WORDS.has(w));
      const bodyLower = bodyText.toLowerCase();
      const matched = titleWords.filter(w => bodyLower.includes(w));
      if (matched.length > 0 && titleWords.length > 0) {
        const pct = Math.round((matched.length / titleWords.length) * 100);
        if (pct >= 70) {
          findings.push({ status: 'pass', text: `Title keywords appear in content (${pct}%) ✓` });
          keywordScore += 5;
        } else {
          findings.push({ status: 'warn', text: `Only ${pct}% of title keywords found in content` });
        }
      }
    }

    keywordScore = clamp(keywordScore);

    // --- Performance (heuristic) ---
    let perfScore = 100;

    // Inline styles count
    const inlineStyles = doc.querySelectorAll('[style]');
    if (inlineStyles.length > 10) {
      findings.push({ status: 'warn', text: `${inlineStyles.length} inline styles found — consider external CSS` });
      perfScore -= 8;
    }

    // Script count
    const scripts = doc.querySelectorAll('script[src]');
    if (scripts.length > 15) {
      findings.push({ status: 'warn', text: `${scripts.length} external scripts — may slow page load` });
      recs.push({ icon: '⚡', title: 'Reduce external scripts', desc: `${scripts.length} scripts detected. Combine or defer non-critical scripts.` });
      perfScore -= 12;
    } else if (scripts.length > 8) {
      findings.push({ status: 'warn', text: `${scripts.length} external scripts detected` });
      perfScore -= 5;
    } else {
      findings.push({ status: 'pass', text: `${scripts.length} external scripts (reasonable) ✓` });
    }

    // Large images (no srcset)
    const imgsNoSrcset = Array.from(images).filter(img => !img.getAttribute('srcset') && !img.getAttribute('loading'));
    if (images.length > 0 && imgsNoSrcset.length > 3) {
      findings.push({ status: 'warn', text: `${imgsNoSrcset.length} images without lazy loading or srcset` });
      recs.push({ icon: '🖼️', title: 'Optimize images', desc: 'Add loading="lazy" and srcset for responsive images.' });
      perfScore -= 10;
    }

    perfScore = clamp(perfScore);

    // --- Overall ---
    const overall = Math.round(
      metaScore * 0.25 +
      contentScore * 0.25 +
      techScore * 0.2 +
      keywordScore * 0.15 +
      perfScore * 0.15
    );

    return {
      overall: clamp(overall),
      categories: [
        { label: 'Meta Tags', score: metaScore },
        { label: 'Content Quality', score: contentScore },
        { label: 'Technical SEO', score: techScore },
        { label: 'Keywords', score: keywordScore },
        { label: 'Performance', score: perfScore },
      ],
      findings,
      keywords,
      recommendations: recs,
    };
  }

  // ─── Keyword extraction ────────────────────────────────
  function extractKeywords(text) {
    const words = text.toLowerCase().replace(/[^a-z0-9\s'-]/g, ' ').split(/\s+/).filter(w => w.length > 3 && !STOP_WORDS.has(w));
    const freq = {};
    words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));
  }

  function clamp(v) { return Math.max(0, Math.min(100, Math.round(v))); }

  // ─── Render results ───────────────────────────────────
  function render(results, url) {
    resultsSection.style.display = '';

    // Scroll to results
    setTimeout(() => resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);

    // Overall score gauge
    analyzedUrl.textContent = url;
    animateScore(results.overall);

    // Category cards
    scoreGrid.innerHTML = results.categories.map((cat, i) => {
      const cls = cat.score >= 70 ? 'score-green' : cat.score >= 40 ? 'score-yellow' : 'score-red';
      return `<div class="score-card ${cls}" style="animation-delay:${i * 0.08}s">
        <div class="score-card-value">${cat.score}</div>
        <div class="score-card-label">${cat.label}</div>
      </div>`;
    }).join('');

    // Findings
    findingsList.innerHTML = results.findings.map(f => {
      const icon = f.status === 'pass' ? '✅' : f.status === 'warn' ? '⚠️' : '❌';
      return `<li><span class="finding-icon">${icon}</span><span>${f.text}</span></li>`;
    }).join('');

    // Keywords
    if (results.keywords.length > 0) {
      keywordsList.innerHTML = results.keywords.map(k =>
        `<span class="keyword-tag">${k.word}<span class="keyword-count">${k.count}</span></span>`
      ).join('');
    } else {
      keywordsList.innerHTML = '<p style="color:var(--text-muted);font-size:14px;">No significant keywords detected.</p>';
    }

    // Recommendations
    if (results.recommendations.length > 0) {
      recommendationsList.innerHTML = results.recommendations.map(r =>
        `<div class="rec-item"><span class="rec-icon">${r.icon}</span><div class="rec-text"><strong>${r.title}</strong><span>${r.desc}</span></div></div>`
      ).join('');
    } else {
      recommendationsList.innerHTML = '<div class="rec-item"><span class="rec-icon">🎉</span><div class="rec-text"><strong>Great job!</strong><span>No critical issues found. Keep up the good work.</span></div></div>';
    }
  }

  // ─── Score animation ──────────────────────────────────
  function animateScore(target) {
    const duration = 1200;
    const start = performance.now();
    const gaugeColor = target >= 70 ? 'var(--green)' : target >= 40 ? 'var(--yellow)' : 'var(--red)';

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(target * eased);
      const deg = Math.round((current / 100) * 360);

      scoreValue.textContent = current;
      scoreGauge.style.background = `conic-gradient(${gaugeColor} ${deg}deg, var(--surface-2) ${deg}deg)`;

      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
})();
