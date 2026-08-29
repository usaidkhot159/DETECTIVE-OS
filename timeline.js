// ── TIMELINE APP ───────────────────────────────────────────────
APPS.timeline = function(body) {
  const events = STATE.case.timeline;
  let selected = null;

  const render = () => {
    body.innerHTML = `
    <div class="timeline-container">
      <div class="section-header">
        <div class="section-title">CASE TIMELINE</div>
        <div class="section-subtitle">OCTOBER 14 · 4:00 PM – 5:00 PM</div>
      </div>

      <div class="timeline-track">
        <div class="timeline-ruler">
          <span>4:00 PM</span><span>4:15 PM</span><span>4:30 PM</span><span>4:45 PM</span><span>5:00 PM</span>
        </div>
        <div class="timeline-line">
          ${events.map(ev => {
            const mins = parseInt(ev.time.split(':')[1]);
            const pct = (mins / 60) * 100;
            return `<div style="position:absolute;left:${pct}%;top:-5px;width:12px;height:12px;border-radius:50%;background:${ev.alert?'var(--red)':'var(--amber)'};border:2px solid var(--void);box-shadow:0 0 ${ev.alert?'10px var(--red)':'6px var(--amber-dim)'};transform:translateX(-50%);cursor:pointer" data-idx="${events.indexOf(ev)}" title="${ev.time} — ${ev.label}"></div>`;
          }).join('')}
        </div>
      </div>

      <div class="section-header" style="margin-top:var(--gap-xl)">
        <div class="section-title" style="font-size:13px">EVENT LOG</div>
        <div class="section-subtitle">Click an event to see details</div>
      </div>

      <div class="timeline-events stagger" id="tl-events">
        ${events.map((ev, i) => `
          <div class="timeline-event ${ev.alert ? 'alert' : ''}" data-idx="${i}">
            <span class="ev-time">${ev.time} PM</span>
            <div class="ev-dot"></div>
            <div>
              <div class="ev-desc">${ev.label}</div>
              <div class="ev-extra">WHO: ${ev.who}</div>
            </div>
            ${ev.alert ? '<span class="badge badge-red" style="margin-left:auto">⚠ ALERT</span>' : ''}
          </div>`).join('')}
      </div>

      <div id="tl-detail" style="margin-top:var(--gap-lg);display:none">
        <div class="card card-amber" id="tl-detail-card">
          <div class="card-title" id="tl-detail-time"></div>
          <div class="card-body" id="tl-detail-text"></div>
        </div>
      </div>
    </div>`;

    const showDetail = (idx) => {
      const ev = events[idx];
      const det = body.querySelector('#tl-detail');
      const card = body.querySelector('#tl-detail-card');
      body.querySelector('#tl-detail-time').textContent = `${ev.time} PM — ${ev.label}`;
      body.querySelector('#tl-detail-text').textContent = ev.detail;
      det.style.display = 'block';
      card.className = `card ${ev.alert ? 'card-red' : 'card-amber'}`;
      STATE.markEvidence(`TL-${idx}`);
    };

    body.querySelectorAll('.timeline-event').forEach(el => {
      el.addEventListener('click', () => {
        body.querySelectorAll('.timeline-event').forEach(e => e.style.background = '');
        el.style.background = 'var(--card-hi)';
        showDetail(+el.dataset.idx);
      });
    });

    body.querySelectorAll('[data-idx]').forEach(dot => {
      dot.addEventListener('click', () => showDetail(+dot.dataset.idx));
    });
  };

  render();
};
