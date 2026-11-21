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
  <title>Stop It! Free Instant Therapy</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #f5f5f5;
      color: #222;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .container {
      max-width: 500px;
      width: 100%;
      background: white;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      letter-spacing: -0.5px;
    }
    .tagline {
      font-size: 1.1rem;
      color: #555;
      margin-bottom: 2rem;
    }
    textarea {
      width: 100%;
      height: 120px;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      resize: vertical;
      margin-bottom: 1.5rem;
    }
    button {
      background: #111;
      color: white;
      border: none;
      padding: 1rem 2rem;
      font-size: 1.1rem;
      border-radius: 8px;
      cursor: pointer;
      width: 100%;
    }
    button:hover { background: #333; }
    .result {
      display: none;
      margin-top: 2rem;
    }
    .stop-it {
      font-size: 3.5rem;
      font-weight: 800;
      color: #c00;
      margin: 1rem 0;
      letter-spacing: -1px;
    }
    .blinds {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 0;
      background: #111;
      transition: height 1.2s ease-in;
      z-index: 10;
    }
    .blinds.closed { height: 100%; }
    .donation {
      margin-top: 2rem;
      max-width: 500px;
      text-align: center;
      display: none;
    }
    .donation h2 {
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
    }
    .donation p {
      color: #555;
      margin-bottom: 1rem;
    }
    .donate-btn {
      background: #0a0;
      color: white;
      border: none;
      padding: 0.9rem 1.8rem;
      font-size: 1rem;
      border-radius: 8px;
      cursor: pointer;
    }
    .donate-btn:hover { background: #080; }
    .disclaimer {
      margin-top: 3rem;
      font-size: 0.85rem;
      color: #888;
      max-width: 500px;
      text-align: center;
    }
    audio { display: none; }
  </style>
</head>
<body>
  <div class="container" id="session">
    <div class="blinds" id="blinds"></div>
    <h1>Stop It!</h1>
    <p class="tagline">Free therapy. So what’s the problem you’re having?</p>
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
    <button class="donate-btn" onclick="alert('Donation link coming soon. Venmo or Stripe next.')">Donate $5</button>
  </div>

  <p class="disclaimer">
    This is not real therapy. Inspired by the classic Bob Newhart Mad TV sketch. 
    Completely free. Donations optional. Results not guaranteed. Blinds close for a reason.
  </p>

  <audio id="slap" src="https://cdn.pixabay.com/audio/2022/03/15/audio_11e0b0e0e0.mp3" preload="auto"></audio>

  <script>
    document.getElementById('form').addEventListener('submit', function(e) {
      e.preventDefault();
      const problem = document.getElementById('problem').value;
      if (!problem.trim()) return;

      document.getElementById('form').style.display = 'none';
      document.querySelector('.tagline').style.display = 'none';
      document.getElementById('result').style.display = 'block';

      // Play slap
      const slap = document.getElementById('slap');
      slap.play().catch(() => {});

      // Show donation ask after a short beat
      setTimeout(() => {
        document.getElementById('donation').style.display = 'block';
      }, 1200);

      // Close blinds a little later so they can see the ask
      setTimeout(() => {
        document.getElementById('blinds').classList.add('closed');
      }, 2200);
    });
  </script>
</body>
</html>`;
}