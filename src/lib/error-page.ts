export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load | Naethra Technologies</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        background-color: #f4f7fc;
        color: #142033;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        margin: 0;
        padding: 1.5rem;
        box-sizing: border-box;
      }
      .card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 1.5rem;
        max-width: 28rem;
        width: 100%;
        text-align: center;
        padding: 2.5rem 2rem;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
      }
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        background: #fee2e2;
        border: 1px solid #fca5a5;
        color: #dc2626;
        font-size: 0.75rem;
        font-weight: 600;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        margin-bottom: 1rem;
      }
      h1 { font-size: 1.5rem; font-weight: 700; margin: 0 0 0.5rem; color: #142033; }
      p { color: #64748b; font-size: 0.9375rem; line-height: 1.5; margin: 0 0 1.75rem; }
      .actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
      a, button {
        padding: 0.75rem 1.25rem;
        border-radius: 0.75rem;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none;
        transition: all 0.2s ease;
        border: 1px solid transparent;
      }
      .primary {
        background: #005b96;
        color: #ffffff;
        box-shadow: 0 4px 12px rgba(0, 91, 150, 0.25);
      }
      .primary:hover { background: #004877; }
      .secondary {
        background: #ffffff;
        color: #334155;
        border-color: #cbd5e1;
      }
      .secondary:hover { background: #f8fafc; border-color: #94a3b8; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="badge">
        <span>●</span> System Interruption
      </div>
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing the page or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
