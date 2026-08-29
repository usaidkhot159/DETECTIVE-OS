// ── SUSPECTS DATABASE APP ──────────────────────────────────────
APPS.suspects = function(body) {
  const render = (selectedId = null) => {
    const suspects = STATE.case.suspects;
    if (!selectedId) {
      // Grid view
      body.innerHTML = `
      <div class="app-main">
        <div class="section-header">
          <div class="section-title">SUSPECT DATABASE</div>
          <div class="section-subtitle">CASE #001 — ALL PERSONS OF INTEREST</div>
          <div class="section-tag">${suspects.length} SUSPECTS</div>
        </div>
        <div class="suspect-grid stagger">
          ${suspects.map(s => {
            const mark = STATE.suspectMarks[s.id];
            return `
            <div class="suspect-card" data-id="${s.id}">
              <div class="suspect-avatar">${s.emoji}</div>
              <div class="suspect-name">${s.name}</div>
              <div class="suspect-role">${s.role}</div>
              <div class="suspect-status">
                ${mark === 'suspicious' ? '<span class="badge badge-red">⚠ SUSPICIOUS</span>' :
                  mark === 'cleared'    ? '<span class="badge badge-green">✓ CLEARED</span>' :
                                         '<span class="badge badge-dim">UNREVIEWED</span>'}
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>`;
      body.querySelectorAll('.suspect-card').forEach(card => {
        card.addEventListener('click', () => render(card.dataset.id));
      });
    } else {
      // Detail view
      const s = suspects.find(x => x.id === selectedId);
      if (!s) return render(null);
      const mark = STATE.suspectMarks[s.id] || null;
      body.innerHTML = `
      <div class="app-main">
        <button class="btn btn-dim" style="margin-bottom:var(--gap-md)" id="back-btn">← Back to All Suspects</button>
        <div class="suspect-detail">
          <div class="suspect-detail-header">
            <div class="suspect-detail-avatar">${s.emoji}</div>
            <div>
              <div class="suspect-detail-name">${s.name}</div>
              <div class="suspect-detail-role">${s.occupation} &nbsp;·&nbsp; Age ${s.age}</div>
              <div style="margin-top:var(--gap-sm)">
                ${mark === 'suspicious' ? '<span class="badge badge-red">⚠ SUSPICIOUS</span>' :
                  mark === 'cleared'    ? '<span class="badge badge-green">✓ CLEARED</span>' :
                                         '<span class="badge badge-dim">STATUS: UNKNOWN</span>'}
              </div>
            </div>
          </div>

          <div class="card card-amber">
            <div class="card-title">ALIBI</div>
            <div class="alibi-box">"${s.alibi}"</div>
          </div>

          <div class="card">
            <div class="card-title">PROFILE</div>
            <div class="data-row"><span class="data-label">RELATIONSHIP</span><span class="data-value">${s.relationship}</span></div>
            <div class="data-row"><span class="data-label">LAST SEEN</span><span class="data-value">${s.lastSeen}</span></div>
            <div class="data-row"><span class="data-label">KNOWN ASSOCIATES</span><span class="data-value">${s.associates.join(', ')}</span></div>
          </div>

          <div class="card card-cyan">
            <div class="card-title">INVESTIGATOR NOTES</div>
            <div class="card-body">${s.notes}</div>
          </div>

          ${s.unlocked_info ? `
          <div class="card card-red">
            <div class="card-title">⚠ DISCOVERED INTELLIGENCE</div>
            <div class="card-body">${s.unlocked_info}</div>
          </div>` : ''}

          <div>
            <div class="card-title" style="margin-bottom:var(--gap-sm)">MARK SUSPECT</div>
            <div class="suspect-mark">
              <button class="mark-btn ${mark==='suspicious'?'suspicious':''}" id="mark-suspicious">⚠ Mark Suspicious</button>
              <button class="mark-btn ${mark==='cleared'?'cleared':''}" id="mark-cleared">✓ Mark Cleared</button>
              <button class="mark-btn" id="mark-reset">○ Reset</button>
            </div>
          </div>
        </div>
      </div>`;

      body.querySelector('#back-btn').onclick = () => render(null);
      body.querySelector('#mark-suspicious').onclick = () => {
        STATE.setSuspectMark(s.id, 'suspicious');
        render(s.id);
        NOTIF.show('SUSPECT FLAGGED', `${s.name} marked as suspicious.`, 'red');
      };
      body.querySelector('#mark-cleared').onclick = () => {
        STATE.setSuspectMark(s.id, 'cleared');
        render(s.id);
        NOTIF.show('SUSPECT CLEARED', `${s.name} marked as cleared.`);
      };
      body.querySelector('#mark-reset').onclick = () => {
        STATE.setSuspectMark(s.id, null);
        render(s.id);
      };
    }
  };
  render();
};
