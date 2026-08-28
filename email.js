// ── EMAIL APP ──────────────────────────────────────────────────
APPS.email = function(body) {
  let activeId = null;

  const render = () => {
    const emails = STATE.case.emails;
    const active = activeId ? emails.find(e => e.id === activeId) : null;

    body.innerHTML = `
    <div class="msg-layout">
      <div class="msg-sidebar">
        <div class="sidebar-header">INBOX</div>
        ${emails.map(em => {
          const read = STATE.emailsRead.has(em.id);
          return `
          <div class="email-item ${!read?'unread':''} ${em.id===activeId?'active':''}" data-id="${em.id}">
            <div class="contact-avatar">${em.emoji}</div>
            <div style="min-width:0">
              <div class="email-sender">${em.sender}</div>
              <div class="email-subject">${em.subject}</div>
              <div class="email-preview">${em.time}</div>
            </div>
          </div>`;
        }).join('')}
      </div>
      <div class="msg-main">
        ${active ? `
        <div class="email-detail">
          <div class="email-header">
            <div class="email-from">FROM: ${active.from}</div>
            <div class="email-from">TIME: ${active.time}</div>
            <div class="email-subject-h">${active.subject}</div>
          </div>
          <div class="email-body-text">${active.body}</div>
        </div>` : `
        <div class="empty-state" style="height:100%;justify-content:center">
          <div class="empty-icon">📧</div>
          <div>Select an email to read it</div>
        </div>`}
      </div>
    </div>`;

    body.querySelectorAll('.email-item').forEach(item => {
      item.addEventListener('click', () => {
        activeId = item.dataset.id;
        STATE.markEmailRead(activeId);
        // Check if unlocking evidence
        const wasUnread = !STATE.emailsRead.has(activeId);
        if (activeId === 'e002') {
          NOTIF.show('EVIDENCE UNLOCKED', 'EV-006: Ryan\'s browsing history is now available.', 'cyan');
        }
        if (activeId === 'e005') {
          NOTIF.show('EVIDENCE UNLOCKED', 'EV-007: Insurance policy details are now available.', 'amber');
        }
        render();
      });
    });
  };

  render();
};
