// ── EVIDENCE LOCKER APP ────────────────────────────────────────
APPS.evidence = function(body) {
  const renderEvidence = () => {
    const unlocked = STATE.case.evidence.filter(e => e.unlocked);
    const locked   = STATE.case.evidence.filter(e => !e.unlocked);
    body.innerHTML = `
    <div class="app-layout">
      <div class="app-sidebar">
        <div class="sidebar-header">FILTER</div>
        <div class="sidebar-item active" data-filter="all"><span class="item-icon">📂</span>All Items<span class="item-badge">${unlocked.length}</span></div>
        <div class="sidebar-item" data-filter="new"><span class="item-icon">🆕</span>New</div>
        <div class="sidebar-item" data-filter="SECURITY FOOTAGE"><span class="item-icon">📹</span>Footage</div>
        <div class="sidebar-item" data-filter="WITNESS STATEMENT"><span class="item-icon">📄</span>Statements</div>
        <div class="sidebar-item" data-filter="DIGITAL EVIDENCE"><span class="item-icon">💾</span>Digital</div>
        <div class="sidebar-item" data-filter="PHYSICAL EVIDENCE"><span class="item-icon">🔬</span>Physical</div>
        <div class="sidebar-item" data-filter="CONTRADICTION"><span class="item-icon">⚠️</span>Contradictions</div>
        <div class="sidebar-header" style="margin-top:auto">LOCKED</div>
        <div class="sidebar-item"><span class="item-icon">🔒</span>Locked<span class="item-badge">${locked.length}</span></div>
      </div>
      <div class="app-main">
        <div class="section-header">
          <div class="section-title">EVIDENCE LOCKER</div>
          <div class="section-subtitle">CASE #001</div>
          <div class="section-tag">${unlocked.length} / ${STATE.case.evidence.length} ITEMS</div>
        </div>
        <div class="evidence-list stagger" id="ev-list"></div>
        ${locked.length ? `
        <div style="margin-top:var(--gap-lg)">
          <div class="section-header"><div class="section-title" style="color:var(--text-dim)">LOCKED ITEMS</div></div>
          <div class="evidence-list stagger">
            ${locked.map(ev => `
            <div class="evidence-card card-locked">
              <div class="evidence-card-head">
                <span class="ev-id">${ev.id}</span>
                <span class="ev-type">${ev.type}</span>
              </div>
              <div class="evidence-card-body">
                <div class="ev-title">🔒 ${ev.title}</div>
                <div class="ev-summary" style="color:var(--amber-dim)">${ev.lockHint || 'Requires further investigation to unlock.'}</div>
              </div>
            </div>`).join('')}
          </div>
        </div>` : ''}
      </div>
    </div>`;

    const list = body.querySelector('#ev-list');
    const renderList = (items) => {
      list.innerHTML = items.map(ev => `
        <div class="evidence-card ${ev.isNew ? 'new' : ''}" data-id="${ev.id}" data-type="${ev.type}">
          <div class="evidence-card-head">
            <span class="ev-id">${ev.id}</span>
            <div style="display:flex;gap:var(--gap-sm);align-items:center">
              ${ev.isNew ? '<span class="badge badge-cyan">NEW</span>' : ''}
              <span class="ev-type">${ev.type}</span>
            </div>
          </div>
          <div class="evidence-card-body">
            <div class="ev-title">${ev.title}</div>
            <div class="ev-summary">${ev.summary}</div>
          </div>
          <div class="ev-detail">${ev.detail}</div>
        </div>`).join('');

      list.querySelectorAll('.evidence-card').forEach(card => {
        card.addEventListener('click', () => {
          const wasExpanded = card.classList.contains('expanded');
          list.querySelectorAll('.evidence-card').forEach(c => c.classList.remove('expanded'));
          if (!wasExpanded) {
            card.classList.add('expanded');
            STATE.markEvidence(card.dataset.id);
            const badge = card.querySelector('.badge-cyan');
            if (badge) badge.remove();
            card.classList.remove('new');
          }
        });
      });
    };

    renderList(unlocked);

    body.querySelectorAll('.sidebar-item[data-filter]').forEach(item => {
      item.addEventListener('click', () => {
        body.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const f = item.dataset.filter;
        if (f === 'all') renderList(unlocked);
        else if (f === 'new') renderList(unlocked.filter(e => e.isNew));
        else renderList(unlocked.filter(e => e.type === f));
      });
    });
  };

  renderEvidence();
};
