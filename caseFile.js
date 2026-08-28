// ── CASE FILE APP ─────────────────────────────────────────────
const APPS = {};

APPS.caseFile = function(body) {
  const c = STATE.case;
  body.innerHTML = `
  <div class="casefile-wrap stagger">
    <div class="case-header-card">
      <div class="case-number">CASE #${c.id} &nbsp;·&nbsp; STATUS: <span style="color:var(--red)">${c.status}</span></div>
      <div class="case-name">${c.title.toUpperCase()}</div>
      <div class="case-meta-grid">
        <div class="case-meta-item">
          <div class="meta-label">Location</div>
          <div class="meta-value">${c.location}</div>
        </div>
        <div class="case-meta-item">
          <div class="meta-label">Date</div>
          <div class="meta-value">${c.date}</div>
        </div>
        <div class="case-meta-item">
          <div class="meta-label">Time Window</div>
          <div class="meta-value">${c.time}</div>
        </div>
        <div class="case-meta-item">
          <div class="meta-label">Victim</div>
          <div class="meta-value">${c.victim}</div>
        </div>
        <div class="case-meta-item">
          <div class="meta-label">Missing Item</div>
          <div class="meta-value">${c.missing}</div>
        </div>
        <div class="case-meta-item">
          <div class="meta-label">Assigned Detective</div>
          <div class="meta-value" style="color:var(--amber)">YOU</div>
        </div>
      </div>
    </div>

    <div class="objectives-card">
      <div class="obj-title">▶ INVESTIGATION OBJECTIVES</div>
      ${c.objectives.map(o => `
        <div class="obj-item ${o.done ? 'done' : ''}">
          <span class="obj-check">${o.done ? '✓' : '○'}</span>
          <span>${o.text}</span>
        </div>
      `).join('')}
    </div>

    <div class="case-brief">
      ${c.brief.split('\n\n').map(p => `<p>${p.replace(/\n/g,'<br>')}</p>`).join('')}
    </div>

    <div class="card" style="text-align:center; padding:var(--gap-lg)">
      <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);letter-spacing:2px;margin-bottom:var(--gap-md)">QUICK ACCESS</div>
      <div style="display:flex;gap:var(--gap-sm);justify-content:center;flex-wrap:wrap">
        ${[['evidence','🔎 Evidence'],['suspects','👥 Suspects'],['timeline','🕐 Timeline'],['messages','💬 Messages']].map(([id,label]) =>
          `<button class="btn btn-dim" onclick="WINDOWS.open('${id}')">${label}</button>`
        ).join('')}
      </div>
    </div>
  </div>`;
};
