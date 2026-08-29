// ── PHONE APP ──────────────────────────────────────────────────
APPS.phone = function(body) {
  const phone = STATE.case.phone;
  let screen = 'home'; // home | calls | photos | notes

  const statusBar = () => `
    <div class="phone-statusbar">
      <span>${phone.network}</span>
      <span>🔋 ${phone.battery}</span>
    </div>`;

  const render = () => {
    let screenContent = '';

    if (screen === 'home') {
      screenContent = `
        ${statusBar()}
        <div style="padding:var(--gap-md);font-family:var(--font-mono);font-size:10px;color:var(--text-dim);letter-spacing:2px;text-align:center;margin-top:var(--gap-sm)">
          RYAN KUO — iPHONE 14
        </div>
        <div class="phone-app-grid">
          <div class="phone-app-icon" data-screen="calls">
            <div class="phone-icon-img" style="background:rgba(80,250,123,0.15)">📞</div>
            <div class="phone-icon-label">Calls</div>
          </div>
          <div class="phone-app-icon" data-screen="messages">
            <div class="phone-icon-img" style="background:rgba(78,205,196,0.15)">💬</div>
            <div class="phone-icon-label">Msgs</div>
          </div>
          <div class="phone-app-icon" data-screen="photos">
            <div class="phone-icon-img" style="background:rgba(189,147,249,0.15)">📷</div>
            <div class="phone-icon-label">Photos</div>
          </div>
          <div class="phone-app-icon" data-screen="notes">
            <div class="phone-icon-img" style="background:rgba(245,166,35,0.15)">📝</div>
            <div class="phone-icon-label">Notes</div>
          </div>
          <div class="phone-app-icon" data-screen="calendar">
            <div class="phone-icon-img" style="background:rgba(232,64,64,0.15)">📅</div>
            <div class="phone-icon-label">Calendar</div>
          </div>
          <div class="phone-app-icon" data-screen="maps">
            <div class="phone-icon-img" style="background:rgba(78,205,196,0.1)">📍</div>
            <div class="phone-icon-label">Maps</div>
          </div>
        </div>
        <div style="padding:var(--gap-md);margin-top:var(--gap-sm)">
          <div style="background:var(--red-glow);border:1px solid var(--red-dim);border-radius:var(--radius-sm);padding:var(--gap-sm);font-family:var(--font-mono);font-size:10px;color:var(--red);text-align:center">
            ⚠ RECOVERED DEVICE — FORENSIC EVIDENCE
          </div>
        </div>`;
    }

    else if (screen === 'calls') {
      screenContent = `
        ${statusBar()}
        <div class="phone-subscreen-header">
          <span class="phone-back-btn" data-back="home">← Back</span>
          <span class="phone-sub-title">Recent Calls</span>
        </div>
        ${phone.calls.map(c => `
          <div style="display:flex;align-items:center;gap:var(--gap-md);padding:var(--gap-sm) var(--gap-md);border-bottom:1px solid var(--border)">
            <span style="font-size:20px">${c.type==='incoming'?'📲':'📤'}</span>
            <div>
              <div style="font-family:var(--font-mono);font-size:12px;color:${c.contact==='Unknown'?'var(--red)':'var(--text-primary)'}">${c.contact}</div>
              <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim)">${c.number}</div>
            </div>
            <div style="margin-left:auto;text-align:right">
              <div style="font-family:var(--font-mono);font-size:11px;color:var(--amber)">${c.time}</div>
              <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim)">${c.duration}</div>
            </div>
          </div>`).join('')}
        <div style="padding:var(--gap-md)">
          <div style="background:var(--red-glow);border:1px solid var(--red-dim);border-radius:var(--radius-sm);padding:var(--gap-sm);font-family:var(--font-mono);font-size:10px;color:var(--red)">
            ⚠ CALL TO UNKNOWN NUMBER AT 4:33 PM — DURING THEFT WINDOW
          </div>
        </div>`;
    }

    else if (screen === 'photos') {
      screenContent = `
        ${statusBar()}
        <div class="phone-subscreen-header">
          <span class="phone-back-btn" data-back="home">← Back</span>
          <span class="phone-sub-title">Photos (${phone.photos.length})</span>
        </div>
        ${phone.photos.map(p => `
          <div style="display:flex;align-items:flex-start;gap:var(--gap-md);padding:var(--gap-sm) var(--gap-md);border-bottom:1px solid var(--border);${p.suspicious?'background:var(--red-glow)':''}">
            <span style="font-size:24px;flex-shrink:0">🖼️</span>
            <div>
              <div style="font-family:var(--font-mono);font-size:11px;color:${p.suspicious?'var(--red)':'var(--text-secondary)'}">${p.name}</div>
              <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);margin-top:3px;line-height:1.4">${p.desc}</div>
              ${p.suspicious?'<div style="font-family:var(--font-mono);font-size:9px;color:var(--red);margin-top:4px">⚠ FLAGGED AS SUSPICIOUS</div>':''}
            </div>
          </div>`).join('')}`;
    }

    else if (screen === 'notes') {
      screenContent = `
        ${statusBar()}
        <div class="phone-subscreen-header">
          <span class="phone-back-btn" data-back="home">← Back</span>
          <span class="phone-sub-title">Notes (${phone.notes.length})</span>
        </div>
        ${phone.notes.map(n => `
          <div style="padding:var(--gap-md);border-bottom:1px solid var(--border);${n.suspicious?'background:var(--red-glow)':''}">
            <div style="font-family:var(--font-mono);font-size:11px;color:${n.suspicious?'var(--red)':'var(--amber)'};margin-bottom:4px">
              ${n.suspicious?'⚠ ':''}"${n.title}"
            </div>
            <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-secondary);line-height:1.6">${n.content}</div>
          </div>`).join('')}`;
    }

    else if (screen === 'calendar') {
      screenContent = `
        ${statusBar()}
        <div class="phone-subscreen-header">
          <span class="phone-back-btn" data-back="home">← Back</span>
          <span class="phone-sub-title">Calendar</span>
        </div>
        <div style="padding:var(--gap-md);display:flex;flex-direction:column;gap:var(--gap-sm)">
          <div style="font-family:var(--font-mono);font-size:11px;color:var(--amber);letter-spacing:1px">OCTOBER 14</div>
          <div style="background:var(--card-hi);border-radius:var(--radius-sm);padding:var(--gap-sm) var(--gap-md)">
            <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-primary)">3:00 PM — CS Lecture</div>
            <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim)">Room 101, CS Building</div>
          </div>
          <div style="background:var(--red-glow);border:1px solid var(--red-dim);border-radius:var(--radius-sm);padding:var(--gap-sm) var(--gap-md)">
            <div style="font-family:var(--font-mono);font-size:11px;color:var(--red)">4:30 PM — Study Group (?)</div>
            <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim)">Room 210 — NOTE: Added same morning. No group confirmed this time.</div>
          </div>
        </div>`;
    }

    else if (screen === 'maps') {
      screenContent = `
        ${statusBar()}
        <div class="phone-subscreen-header">
          <span class="phone-back-btn" data-back="home">← Back</span>
          <span class="phone-sub-title">Maps</span>
        </div>
        <div style="padding:var(--gap-md)">
          <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);margin-bottom:var(--gap-sm)">RECENT SEARCHES</div>
          ${[
            ['CS Lab B East Entrance', '⚠'],
            ['Side alley Riverside College', '⚠'],
            ['Cash exchange downtown', '⚠'],
            ['Home', ''],
          ].map(([s, flag]) => `
            <div style="padding:8px 0;border-bottom:1px solid var(--border);font-family:var(--font-mono);font-size:11px;color:${flag?'var(--red)':'var(--text-secondary)'};display:flex;justify-content:space-between">
              <span>📍 ${s}</span>${flag?'<span style="color:var(--red)">⚠</span>':''}
            </div>`).join('')}
        </div>`;
    }

    body.innerHTML = `
    <div style="padding:var(--gap-md);display:flex;justify-content:center">
      <div class="phone-frame">
        <div class="phone-notch"><div class="phone-notch-bar"></div></div>
        <div class="phone-screen">
          ${screenContent}
        </div>
        <div class="phone-home-btn"><div class="phone-home-circle"></div></div>
      </div>
    </div>
    <div style="padding:var(--gap-md);background:var(--deep);border-top:1px solid var(--border);font-family:var(--font-mono);font-size:10px;color:var(--amber);text-align:center;letter-spacing:1px">
      ⚠ FORENSIC DEVICE RECOVERY — RYAN KUO'S PHONE — EVIDENCE LOG
    </div>`;

    body.querySelectorAll('[data-screen]').forEach(el => {
      el.addEventListener('click', () => { screen = el.dataset.screen; render(); });
    });
    body.querySelectorAll('[data-back]').forEach(el => {
      el.addEventListener('click', () => { screen = el.dataset.back; render(); });
    });
  };

  render();
};
