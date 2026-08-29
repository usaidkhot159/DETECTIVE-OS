// ── MESSAGES APP ───────────────────────────────────────────────
APPS.messages = function(body) {
  const threads = STATE.case.messages;
  let active = 'maya';

  const render = () => {
    const t = threads[active];
    body.innerHTML = `
    <div class="msg-layout">
      <div class="msg-sidebar">
        <div class="sidebar-header">CONTACTS</div>
        ${Object.entries(threads).map(([id, th]) => `
          <div class="msg-contact-item ${id===active?'active':''}" data-id="${id}">
            <div class="contact-avatar">${th.emoji}</div>
            <div>
              <div class="contact-name">${th.name}</div>
              <div class="contact-preview">${th.thread[th.thread.length-1].text.slice(0,28)}…</div>
            </div>
          </div>`).join('')}
      </div>
      <div class="msg-main">
        <div class="msg-thread-header">
          <div class="contact-avatar">${t.emoji}</div>
          <div>
            <div class="msg-thread-name">${t.name}</div>
            <div class="msg-thread-status">EVIDENCE THREAD · OCTOBER 14</div>
          </div>
        </div>
        <div class="msg-body stagger">
          ${t.thread.map(msg => `
            <div style="display:flex;flex-direction:column;align-items:${msg.from==='alex'?'flex-end':'flex-start'}">
              <div class="msg-bubble ${msg.from==='alex'?'outgoing':'incoming'} ${msg.suspicious?'suspicious':''}">
                ${msg.text}
              </div>
              <div class="msg-time" style="text-align:${msg.from==='alex'?'right':'left'}">${msg.time}</div>
            </div>`).join('')}
        </div>
        ${t.thread.some(m => m.suspicious) ? `
        <div class="contradiction" style="margin:0 var(--gap-lg) var(--gap-md)">
          <div class="contradiction-title">⚠ CONTRADICTION DETECTED IN THIS THREAD</div>
          <div class="contradiction-text">One or more messages marked ⚠ conflict with physical evidence or security records. Review carefully.</div>
        </div>` : ''}
      </div>
    </div>`;

    body.querySelectorAll('.msg-contact-item').forEach(item => {
      item.addEventListener('click', () => {
        active = item.dataset.id;
        render();
      });
    });
  };

  render();
};
