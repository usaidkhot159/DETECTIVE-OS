// ── FINAL ACCUSATION APP ───────────────────────────────────────
APPS.accuse = function(body) {
  const sol = STATE.case.solution;
  const suspects = STATE.case.suspects;
  let submitted = false;

  const methods = [
    { value: 'window',   label: 'Through the east-facing window' },
    { value: 'keycard',  label: 'Using a stolen or duplicate keycard' },
    { value: 'door',     label: 'Slipped out the door undetected' },
    { value: 'accomplice', label: 'Had an accomplice let them in/out' },
  ];

  const motives = [
    { value: 'resell',   label: 'To sell it for money' },
    { value: 'sabotage', label: 'To sabotage a rival\'s work' },
    { value: 'personal', label: 'Personal grudge against the victim' },
    { value: 'insurance',label: 'Insurance fraud (staged by victim)' },
  ];

  const render = (result = null) => {
    body.innerHTML = `
    <div class="accuse-wrap">
      <div class="accuse-header">
        <div class="accuse-title">FILE FINAL REPORT</div>
        <div class="accuse-subtitle">CASE #001 — THE MISSING LAPTOP</div>
      </div>

      ${!result ? `
      <div style="background:var(--red-glow);border:1px solid var(--red-dim);border-radius:var(--radius-md);padding:var(--gap-md);font-family:var(--font-mono);font-size:11px;color:var(--red);text-align:center;letter-spacing:1px">
        ⚠ THIS ACTION IS FINAL. CHOOSE CAREFULLY.
      </div>

      <div class="accuse-field">
        <label>WHO IS RESPONSIBLE?</label>
        <select class="accuse-select" id="acc-who">
          <option value="">— Select suspect —</option>
          ${suspects.map(s => `<option value="${s.id}">${s.emoji} ${s.name} — ${s.role}</option>`).join('')}
        </select>
      </div>

      <div class="accuse-field">
        <label>HOW DID THEY DO IT?</label>
        <select class="accuse-select" id="acc-how">
          <option value="">— Select method —</option>
          ${methods.map(m => `<option value="${m.value}">${m.label}</option>`).join('')}
        </select>
      </div>

      <div class="accuse-field">
        <label>WHY DID THEY DO IT?</label>
        <select class="accuse-select" id="acc-why">
          <option value="">— Select motive —</option>
          ${motives.map(m => `<option value="${m.value}">${m.label}</option>`).join('')}
        </select>
      </div>

      <div class="card" style="padding:var(--gap-md)">
        <div class="card-title">INVESTIGATION SUMMARY</div>
        <div class="data-row"><span class="data-label">TIME ELAPSED</span><span class="data-value" style="color:var(--amber)">${STATE.getElapsedMinutes()} min</span></div>
        <div class="data-row"><span class="data-label">EVIDENCE REVIEWED</span><span class="data-value" style="color:var(--amber)">${STATE.evidenceFound.size} items</span></div>
        <div class="data-row"><span class="data-label">PUZZLES SOLVED</span><span class="data-value" style="color:var(--amber)">${STATE.puzzlesSolved.size} / ${STATE.case.puzzles.length}</span></div>
        <div class="data-row"><span class="data-label">SUSPECTS MARKED</span><span class="data-value" style="color:var(--amber)">${Object.keys(STATE.suspectMarks).length}</span></div>
      </div>

      <button class="accuse-submit-btn" id="acc-submit">⚖ SUBMIT ACCUSATION</button>` :

      renderResult(result)}
    </div>`;

    if (!result) {
      body.querySelector('#acc-submit').addEventListener('click', () => {
        const who = body.querySelector('#acc-who').value;
        const how = body.querySelector('#acc-how').value;
        const why = body.querySelector('#acc-why').value;
        if (!who || !how || !why) {
          NOTIF.show('INCOMPLETE', 'Please fill in all three fields before submitting.', 'red');
          return;
        }
        const whoCorrect = who === sol.culprit;
        const howCorrect = how === sol.method;
        const whyCorrect = why === sol.motive;
        render({ who, how, why, whoCorrect, howCorrect, whyCorrect });
      });
    }
  };

  const renderResult = ({ who, how, why, whoCorrect, howCorrect, whyCorrect }) => {
    const allCorrect  = whoCorrect && howCorrect && whyCorrect;
    const twoCorrect  = [whoCorrect, howCorrect, whyCorrect].filter(Boolean).length === 2;
    const score       = STATE.getScore();
    const elapsed     = STATE.getElapsedMinutes();
    const suspect     = suspects.find(s => s.id === who);

    const rank = allCorrect
      ? (score >= 90 ? '★★★★★ MASTER DETECTIVE' :
         score >= 70 ? '★★★★☆ SENIOR DETECTIVE' :
                       '★★★☆☆ DETECTIVE')
      : twoCorrect ? '★★☆☆☆ JUNIOR DETECTIVE'
      : '★☆☆☆☆ TRAINEE';

    const bannerClass  = allCorrect ? 'correct' : twoCorrect ? 'partial' : 'wrong';
    const bannerText   = allCorrect ? '✓ CASE CLOSED' : twoCorrect ? '◑ PARTIAL SOLUTION' : '✗ CASE UNSOLVED';

    return `
    <div class="result-card visible">
      <div class="result-banner ${bannerClass}">${bannerText}</div>

      <div style="padding:var(--gap-lg);display:flex;flex-direction:column;gap:var(--gap-md)">
        <!-- Field results -->
        ${[
          { label: 'SUSPECT', correct: whoCorrect, yours: suspect?.name, ans: suspects.find(s=>s.id===sol.culprit)?.name },
          { label: 'METHOD',  correct: howCorrect, yours: ['window','keycard','door','accomplice'].find(v=>v===how), ans: 'window (east-facing)' },
          { label: 'MOTIVE',  correct: whyCorrect, yours: who === 'alex' ? 'insurance' : 'resell', ans: 'to sell it for money' },
        ].map(f => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:var(--gap-sm) 0;border-bottom:1px solid var(--border)">
          <span style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);letter-spacing:1px">${f.label}</span>
          <span class="badge ${f.correct?'badge-green':'badge-red'}">${f.correct ? '✓ CORRECT' : '✗ WRONG'}</span>
        </div>`).join('')}

        <!-- Score grid -->
        <div class="score-grid">
          <div class="score-cell"><div class="score-num">${score}%</div><div class="score-label">SCORE</div></div>
          <div class="score-cell"><div class="score-num">${elapsed}m</div><div class="score-label">TIME</div></div>
          <div class="score-cell"><div class="score-num">${STATE.evidenceFound.size}</div><div class="score-label">EVIDENCE FOUND</div></div>
          <div class="score-cell"><div class="score-num">${STATE.puzzlesSolved.size}/${STATE.case.puzzles.length}</div><div class="score-label">PUZZLES SOLVED</div></div>
        </div>

        <div class="rank-display">${rank}</div>

        <!-- Explanation -->
        <div class="card card-${allCorrect?'cyan':'amber'}">
          <div class="card-title">${allCorrect ? '✓ CASE EXPLANATION' : 'WHAT ACTUALLY HAPPENED'}</div>
          <div class="card-body" style="line-height:1.8;font-size:12px">${sol.explanation}</div>
        </div>

        ${!whoCorrect && sol.wrongSuspect[who] ? `
        <div class="card card-red">
          <div class="card-title">WHY ${suspect?.name?.toUpperCase()} WAS WRONG</div>
          <div class="card-body" style="font-size:12px;line-height:1.7">${sol.wrongSuspect[who]}</div>
        </div>` : ''}

        <button class="btn btn-dim" style="width:100%" onclick="localStorage.removeItem('dd_state_001');location.reload()">
          ↺ Start Over (New Game)
        </button>
      </div>
    </div>`;
  };

  render();
};
