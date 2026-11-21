export default {
  async fetch(request, env = {}) {
    const url = new URL(request.url);
    
    const showResult = url.pathname === '/session/';
    if (url.pathname === '/' || showResult) {
      return new Response(getHTML(showResult, env.DONATION_URL || 'https://buy.stripe.com/bJe28k6Shdbb3mS83Xbwk05'), {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' },
      });
    }
    
    return new Response('Not found', { status: 404 });
  },
};

function getHTML(showResult, donationUrl) {
  let giveButton = '<button class="donate-btn" disabled>Give Now</button>';
  if (donationUrl) {
    const url = URL.canParse(donationUrl) ? new URL(donationUrl) : null;
    if (url?.protocol === 'https:') {
      const href = url.href.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
      giveButton = `<a class="donate-btn" href="${href}">Give Now</a>`;
    }
  }

  const prompt = `
    <div id="prompt">
      <div class="steps">
        <div class="step">
          <svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Tell us
        </div>
        <div class="step">
          <svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          Session
        </div>
        <div class="step">
          <svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M4 8h16M4 12h16M4 16h16"/></svg>
          Done
        </div>
      </div>
      <label class="tagline" for="problem">So what’s the problem you’re having?</label>
      <form id="form" action="/session/" method="get">
        <textarea id="problem" autocomplete="off" placeholder="Tell me about it..." required></textarea>
        <button type="submit">Begin Free Session</button>
      </form>
    </div>`;
  const result = `
    <div>
      <h2 class="stop-it">Stop it!</h2>
      <p class="donation">If this session has been helpful, please give $5.</p>
      ${giveButton}
    </div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${showResult ? 'Stop it! | Free Therapy Now' : 'Free Therapy Now'}</title>
  ${showResult ? '<meta name="robots" content="noindex, follow">' : `
  <meta name="description" content="Enter a problem anonymously and get a brief response. Free Therapy Now does not provide therapy or mental health services.">
  <link rel="canonical" href="https://freetherapynow.com/">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://freetherapynow.com/">
  <meta property="og:title" content="Free Therapy Now">
  <meta property="og:description" content="Enter a problem anonymously and get a brief response. Free Therapy Now does not provide therapy or mental health services.">
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Free Therapy Now",
      "url": "https://freetherapynow.com/",
      "description": "Enter a problem anonymously and get a brief response. Free Therapy Now does not provide therapy or mental health services."
    }
  </script>`}
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #f7f7f7;
      color: #111;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
    }
    .logo {
      text-align: center;
      margin-bottom: 2rem;
    }
    .logo svg {
      width: 72px;
      height: 72px;
    }
    .site-description {
      margin-top: 0.5rem;
      color: #555;
      font-size: 0.875rem;
    }
    .logo h1 {
      font-size: 1.8rem;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin-top: 0.5rem;
    }
    .container {
      max-width: 480px;
      width: 100%;
      background: white;
      padding: 2.5rem 2rem;
      border-radius: 16px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.06);
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .steps {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-bottom: 2rem;
      font-size: 0.85rem;
      color: #666;
    }
    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.3rem;
    }
    .step svg { width: 28px; height: 28px; }
    .tagline {
      display: block;
      font-size: 1.15rem;
      color: #444;
      margin-bottom: 1.5rem;
    }
    textarea {
      width: 100%;
      height: 110px;
      padding: 1rem;
      border: 1.5px solid #e0e0e0;
      border-radius: 10px;
      font-size: 1rem;
      resize: vertical;
      margin-bottom: 1.2rem;
      font-family: inherit;
    }
    textarea:focus { outline: none; border-color: #111; }
    button, .donate-btn {
      background: #111;
      color: white;
      border: none;
      padding: 1rem 2rem;
      font-size: 1.05rem;
      border-radius: 10px;
      cursor: pointer;
      width: 100%;
      font-weight: 600;
    }
    button:hover:not(:disabled), a.donate-btn:hover { background: #222; }
    .stop-it {
      font-size: clamp(5rem, 20vw, 6.4rem);
      font-weight: 900;
      letter-spacing: -1px;
    }
    .donation {
      font-size: 0.875rem;
      color: #555;
      margin: 0.75rem 0 1rem;
    }
    .donate-btn {
      display: inline-block;
      width: auto;
      padding: 0.75rem 1.25rem;
      text-decoration: none;
    }
    .donate-btn:disabled { opacity: 0.55; cursor: default; }
    footer {
      max-width: 480px;
      margin-top: 1.5rem;
      color: #555;
      font-size: 0.875rem;
      line-height: 1.5;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="logo">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#111"/>
      <path d="M50 22c-8 0-14 6-14 14v28c0 3 2 5 5 5h4v12h10V69h4c3 0 5-2 5-5V36c0-8-6-14-14-14zm0 6c4.4 0 8 3.6 8 8v22H42V36c0-4.4 3.6-8 8-8z" fill="white"/>
      <path d="M62 38c2 0 4 1.5 4 4v8c0 1-1 2-2 2h-4V38h2z" fill="white"/>
    </svg>
    <h1>FREE THERAPY NOW</h1>
    ${showResult ? '' : '<p class="site-description">Enter a problem anonymously and get a brief response.</p>'}
  </div>

  <div class="container" id="session">
    ${showResult ? result : prompt}
  </div>

  <footer>The problem you enter is anonymous and no information will be saved by this website.</footer>

  ${showResult ? '' : `<script>
    const form = document.getElementById('form');
    const problem = document.getElementById('problem');

    problem.addEventListener('input', () => problem.setCustomValidity(''));
    form.addEventListener('submit', (event) => {
      if (!problem.value.trim()) {
        event.preventDefault();
        problem.setCustomValidity('Tell me about it first.');
        problem.reportValidity();
        return;
      }

      form.reset();
    });
  </script>`}
</body>
</html>`;
}
