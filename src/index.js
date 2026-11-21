export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    if (url.pathname === '/') {
      return new Response(getHTML(), {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' },
      });
    }
    
    return new Response('Not found', { status: 404 });
  },
};

function getHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Free Therapy Now</title>
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
    button {
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
    button:hover { background: #222; }
    .result { display: none; margin-top: 1.5rem; }
    .stop-it {
      font-size: 3.2rem;
      font-weight: 900;
      color: #c00;
      letter-spacing: -1px;
    }
    .blinds {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 0;
      background: #111;
      transition: height 1.1s ease-in;
      z-index: 20;
    }
    .blinds.closed { height: 100%; }
    .donation {
      margin-top: 2rem;
      max-width: 480px;
      text-align: center;
      display: none;
    }
    .donation h2 { font-size: 1.3rem; margin-bottom: 0.4rem; }
    .donation p { color: #555; margin-bottom: 1rem; }
    .donate-btn {
      background: #0a0;
      width: auto;
      padding: 0.85rem 1.6rem;
    }
    .donate-btn:hover { background: #080; }
    .disclaimer {
      margin-top: 2.5rem;
      font-size: 0.8rem;
      color: #888;
      max-width: 480px;
      text-align: center;
      line-height: 1.5;
    }
    audio { display: none; }
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
  </div>

  <div class="container" id="session">
    <div class="blinds" id="blinds"></div>
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
    <p class="tagline">So what’s the problem you’re having?</p>
    <form id="form">
      <textarea id="problem" placeholder="Tell me about it..." required></textarea>
      <button type="submit">Begin Free Session</button>
    </form>
    <div class="result" id="result">
      <div class="stop-it">Stop it!</div>
    </div>
  </div>

  <div class="donation" id="donation">
    <h2>If that helped…</h2>
    <p>A $5 donation keeps the blinds closing for the next person.</p>
    <button class="donate-btn" onclick="alert('Donation link coming soon.')">Donate $5</button>
  </div>

  <p class="disclaimer">
    freetherapynow.com<br>
    This is not real therapy. Inspired by the Bob Newhart Mad TV sketch.<br>
    Completely free. Donations optional. Results not guaranteed.
  </p>

  <audio id="slap" src="https://cdn.pixabay.com/audio/2022/03/15/audio_11e0b0e0e0.mp3" preload="auto"></audio>

  <script>
    document.getElementById('form').addEventListener('submit', function(e) {
      e.preventDefault();
      const problem = document.getElementById('problem').value;
      if (!problem.trim()) return;

      document.getElementById('form').style.display = 'none';
      document.querySelector('.tagline').style.display = 'none';
      document.querySelector('.steps').style.display = 'none';
      document.getElementById('result').style.display = 'block';

      document.getElementById('slap').play().catch(() => {});

      setTimeout(() => {
        document.getElementById('donation').style.display = 'block';
      }, 1000);

      setTimeout(() => {
        document.getElementById('blinds').classList.add('closed');
      }, 2000);
    });
  </script>
</body>
</html>`;
}