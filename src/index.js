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
      background: #f4ebd6;
      color: #111;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
    }
    .logo {
      width: min(100%, 520px);
      text-align: center;
    }
    .logo svg {
      display: block;
      width: 48px;
      height: 48px;
      margin: 0 auto 0.75rem;
    }
    .site-description {
      max-width: 34ch;
      margin: 0.85rem auto 1.15rem;
      color: #514339;
      font-size: 0.9375rem;
      line-height: 1.5;
    }
    .logo h1 {
      padding: 0.8rem 0.4rem;
      border: 3px solid #33251b;
      border-radius: 4px 4px 2px 2px;
      background: #f2c96b;
      box-shadow: inset 0 0 0 3px #f9dda1, 0 4px 0 #33251b;
      font-size: clamp(1.45rem, 6vw, 2.25rem);
      font-weight: 900;
      line-height: 1.15;
      letter-spacing: -0.035em;
    }
    .container {
      width: min(100%, 488px);
      padding: 1.85rem clamp(0.85rem, 5vw, 2.25rem) 2rem;
      border: solid #33251b;
      border-width: 3px clamp(7px, 2vw, 12px) 0;
      border-radius: 3px 3px 0 0;
      background: #fffaf0;
      text-align: center;
    }
    .counter {
      width: min(100%, 520px);
      height: 18px;
      border: 3px solid #33251b;
      border-radius: 3px;
      background: #8b3326;
      box-shadow: inset 0 3px 0 #ac5441, 0 5px 0 #33251b;
    }
    .booth-base {
      width: min(calc(100% - 16px), 480px);
      height: clamp(26px, 6vw, 45px);
      border: solid #33251b;
      border-width: 0 3px 3px;
      border-radius: 0 0 3px 3px;
      background: repeating-linear-gradient(90deg, #b87448 0 47px, #8e5133 47px 50px);
    }
    .steps {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
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
      border: 1.5px solid #947b66;
      background: #fffdf8;
      border-radius: 10px;
      font-size: 1rem;
      resize: vertical;
      margin-bottom: 1.2rem;
      font-family: inherit;
    }
    textarea:focus { outline: none; border-color: #111; }
    button, .donate-btn {
      background: #202a23;
      color: white;
      border: none;
      padding: 1rem 2rem;
      font-size: 1.05rem;
      border-radius: 10px;
      cursor: pointer;
      width: 100%;
      font-weight: 600;
    }
    button:hover:not(:disabled), a.donate-btn:hover { background: #354138; }
    body.result-page .logo { margin-bottom: 1.15rem; }
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
  </style>
</head>
<body class="${showResult ? 'result-page' : ''}">
  <div class="logo">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#111"/>
      <path d="M50 22c-8 0-14 6-14 14v28c0 3 2 5 5 5h4v12h10V69h4c3 0 5-2 5-5V36c0-8-6-14-14-14zm0 6c4.4 0 8 3.6 8 8v22H42V36c0-4.4 3.6-8 8-8z" fill="white"/>
      <path d="M62 38c2 0 4 1.5 4 4v8c0 1-1 2-2 2h-4V38h2z" fill="white"/>
    </svg>
    <h1>FREE THERAPY NOW</h1>
    ${showResult ? '' : '<p class="site-description">Everything you enter here is anonymous and no information will be saved by this website.</p>'}
  </div>

  <main class="container" id="session">
    ${showResult ? result : prompt}
  </main>
  <div class="counter" aria-hidden="true"></div>
  <div class="booth-base" aria-hidden="true"></div>

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
