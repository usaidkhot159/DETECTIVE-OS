// ── PUZZLES APP ────────────────────────────────────────────────
APPS.puzzles = function(body) {
  const puzzles = STATE.case.puzzles;
  let openId = null;

  const render = () => {
    body.innerHTML = `
    <div class="app-layout">
      <div class="app-sidebar">
        <div class="sidebar-header">PUZZLES</div>
        ${puzzles.map(p => `
          <div class="sidebar-item ${openId===p.id?'active':''}" data-id="${p.id}">
            <span class="item-icon">${p.solved ? '✅' : '🔒'}</span>
            ${p.name}
          </div>`).join('')}
        <div style="padding:var(--gap-md);margin-top:auto">
          <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);letter-spacing:1px">
            SOLVED: ${puzzles.filter(p=>p.solved).length} / ${puzzles.length}
          </div>
        </div>
      </div>
      <div class="app-main">
        <div class="section-header">
          <div class="section-title">CIPHER PUZZLES</div>
          <div class="section-subtitle">EACH PUZZLE REVEALS A CLUE</div>
        </div>
        <div id="puzzle-content">
          ${!openId ? `
          <div class="empty-state" style="height:300px;justify-content:center">
            <div class="empty-icon">🧩</div>
            <div>Select a puzzle from the sidebar to begin</div>
          </div>` : renderPuzzle(puzzles.find(p => p.id === openId))}
        </div>
      </div>
    </div>`;

    body.querySelectorAll('.sidebar-item[data-id]').forEach(item => {
      item.addEventListener('click', () => {
        openId = item.dataset.id;
        render();
      });
    });

    if (openId) bindPuzzleEvents(body, puzzles.find(p => p.id === openId));
  };

  const renderPuzzle = (p) => {
    if (!p) return '';

    let inputUI = '';

    if (p.type === 'caesar') {
      inputUI = `
        <div class="puzzle-cipher">${p.ciphertext}</div>
        <div class="puzzle-hint">HINT: ${p.hint}</div>
        <div style="display:flex;gap:var(--gap-sm);align-items:center">
          <input class="input-field puzzle-input" type="text" placeholder="Type the decoded message..." data-id="${p.id}" style="text-transform:uppercase">
          <button class="btn btn-amber puzzle-submit" data-id="${p.id}">SUBMIT</button>
        </div>`;
    } else if (p.type === 'pattern') {
      inputUI = `
        <div class="puzzle-cipher">${p.pattern}</div>
        <div class="puzzle-hint">HINT: ${p.hint}</div>
        <div style="display:flex;gap:var(--gap-sm);align-items:center">
          <input class="input-field puzzle-input" type="text" placeholder="What comes next?" data-id="${p.id}" style="max-width:160px">
          <button class="btn btn-amber puzzle-submit" data-id="${p.id}">SUBMIT</button>
        </div>`;
    } else if (p.type === 'morse') {
      inputUI = `
        <div class="puzzle-cipher" style="letter-spacing:8px;font-size:16px">${p.ciphertext}</div>
        <div style="background:var(--deep);border:1px solid var(--border);border-radius:var(--radius-sm);padding:var(--gap-md);margin-bottom:var(--gap-md);font-family:var(--font-mono);font-size:10px;color:var(--text-dim);line-height:1.8">
          A:·- B:-··· C:-·-· D:-·· E:· F:··-· G:--· H:···· I:·· J:·--- K:-·- L:·-·· M:--<br>
          N:-· O:--- P:·--· Q:--·- R:·-· S:··· T:- U:··- V:···- W:·-- X:-··- Y:-·-- Z:--··
        </div>
        <div class="puzzle-hint">HINT: ${p.hint}</div>
        <div style="display:flex;gap:var(--gap-sm);align-items:center">
          <input class="input-field puzzle-input" type="text" placeholder="Decoded text..." data-id="${p.id}" style="text-transform:uppercase">
          <button class="btn btn-amber puzzle-submit" data-id="${p.id}">SUBMIT</button>
        </div>`;
    } else if (p.type === 'text') {
      inputUI = `
        <div style="background:var(--deep);border:1px solid var(--border);border-radius:var(--radius-sm);padding:var(--gap-lg);margin-bottom:var(--gap-md);font-family:var(--font-mono);font-size:12px;color:var(--text-secondary);line-height:1.7">${p.question}</div>
        <div class="puzzle-hint">HINT: ${p.hint}</div>
        <div style="display:flex;gap:var(--gap-sm);align-items:center">
          <input class="input-field puzzle-input" type="text" placeholder="Enter password..." data-id="${p.id}" style="max-width:200px">
          <button class="btn btn-amber puzzle-submit" data-id="${p.id}">UNLOCK</button>
        </div>`;
    }

    return `
    <div class="puzzle-list">
      <div class="puzzle-item open" data-id="${p.id}">
        <div class="puzzle-head">
          <span class="puzzle-name">${p.name}</span>
          <div style="display:flex;gap:var(--gap-sm)">
            <span class="badge badge-amber">${p.badge}</span>
            ${p.solved ? '<span class="badge badge-green">SOLVED ✓</span>' : ''}
          </div>
        </div>
        <div class="puzzle-body">
          ${p.solved ? `
          <div class="puzzle-solved-banner">
            ✓ PUZZLE SOLVED<br>
            <span style="color:var(--text-secondary);font-size:11px">REWARD: ${p.reward}</span>
          </div>` : inputUI}
          <div id="puzzle-feedback-${p.id}" style="margin-top:var(--gap-md)"></div>
        </div>
      </div>
    </div>`;
  };

  const bindPuzzleEvents = (body, p) => {
    if (!p || p.solved) return;

    const submit = body.querySelector(`.puzzle-submit[data-id="${p.id}"]`);
    const input  = body.querySelector(`.puzzle-input[data-id="${p.id}"]`);
    const feedback = body.querySelector(`#puzzle-feedback-${p.id}`);

    const check = () => {
      const val = input.value.trim().toUpperCase();
      const ans = p.answer.toUpperCase();
      if (val === ans) {
        STATE.solvePuzzle(p.id);
        NOTIF.show('PUZZLE SOLVED!', p.reward, 'cyan');
        render();
      } else {
        feedback.innerHTML = `<div style="background:var(--red-glow);border:1px solid var(--red-dim);border-radius:var(--radius-sm);padding:var(--gap-sm) var(--gap-md);font-family:var(--font-mono);font-size:11px;color:var(--red)">✗ Incorrect. Try again.</div>`;
        input.style.borderColor = 'var(--red)';
        setTimeout(() => { input.style.borderColor = ''; }, 1500);
      }
    };

    if (submit) submit.addEventListener('click', check);
    if (input) {
      input.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
      input.focus();
    }
  };

  render();
};
