// ── EVIDENCE BOARD APP ─────────────────────────────────────────
APPS.board = function(body) {
  const DEFAULT_CARDS = [
    { id: 'c1',  x: 40,  y: 40,  label: 'MAYA',       text: 'Lied about library location at 4:19 PM', color: 'var(--red)' },
    { id: 'c2',  x: 240, y: 40,  label: 'FOOTAGE',     text: 'Unidentified figure in corridor at 4:21 PM', color: 'var(--amber)' },
    { id: 'c3',  x: 440, y: 40,  label: 'RYAN',        text: 'Entered Lab B at 4:27. No exit scan on keycard log.', color: 'var(--red)' },
    { id: 'c4',  x: 40,  y: 220, label: 'WINDOW',      text: 'East window unlatched. Scuff marks on sill.', color: 'var(--cyan)' },
    { id: 'c5',  x: 240, y: 220, label: 'BROWSING',    text: 'Ryan searched MacBook resale at 11:07 AM — hours before theft.', color: 'var(--red)' },
    { id: 'c6',  x: 440, y: 220, label: 'MOTIVE',      text: 'Ryan rejected from research role given to Alex.', color: 'var(--amber)' },
    { id: 'c7',  x: 140, y: 380, label: 'DANIEL',      text: 'Entered at 4:41, left 4:48. Saw open window, said nothing.', color: 'var(--amber)' },
    { id: 'c8',  x: 360, y: 380, label: 'PHONE DATA',  text: 'Draft listing: "MacBook Pro 16 Silver — $1,100 cash only"', color: 'var(--red)' },
    { id: 'c9',  x: 600, y: 140, label: 'INSURANCE',   text: 'Alex upgraded coverage 3 days before theft. Self-staged?', color: 'var(--amber)' },
  ];

  const CONNECTIONS = [
    ['c1', 'c2'], ['c2', 'c3'], ['c3', 'c4'],
    ['c3', 'c5'], ['c5', 'c8'], ['c6', 'c3'],
    ['c4', 'c8'], ['c7', 'c4'],
  ];

  const cards = STATE.boardCards
    ? STATE.boardCards.map(sc => DEFAULT_CARDS.find(d => d.id === sc.id)
        ? { ...DEFAULT_CARDS.find(d => d.id === sc.id), x: sc.x, y: sc.y }
        : sc)
    : [...DEFAULT_CARDS];

  body.style.position = 'relative';
  body.innerHTML = `
  <div class="board-wrap" id="board-bg">
    <canvas id="board-canvas"></canvas>
    <div class="board-toolbar">
      <button class="btn btn-dim" id="board-reset" style="font-size:11px;padding:4px 10px">↺ Reset Layout</button>
      <button class="btn btn-amber" id="board-save" style="font-size:11px;padding:4px 10px">💾 Save</button>
    </div>
    <div id="board-cards-layer"></div>
  </div>`;

  const canvas  = body.querySelector('#board-canvas');
  const layer   = body.querySelector('#board-cards-layer');
  const bg      = body.querySelector('#board-bg');

  const resize = () => {
    canvas.width  = bg.offsetWidth;
    canvas.height = bg.offsetHeight;
    drawLines();
  };

  const drawLines = () => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    CONNECTIONS.forEach(([aId, bId]) => {
      const a = cards.find(c => c.id === aId);
      const b = cards.find(c => c.id === bId);
      if (!a || !b) return;
      const ax = a.x + 80, ay = a.y + 40;
      const bx = b.x + 80, by = b.y + 40;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.strokeStyle = 'rgba(245,166,35,0.25)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]);
      ctx.stroke();
      // Arrow tip
      const angle = Math.atan2(by - ay, bx - ax);
      const tipX = bx - 12 * Math.cos(angle);
      const tipY = by - 12 * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(tipX, tipY);
      ctx.lineTo(tipX - 8 * Math.cos(angle - 0.4), tipY - 8 * Math.sin(angle - 0.4));
      ctx.lineTo(tipX - 8 * Math.cos(angle + 0.4), tipY - 8 * Math.sin(angle + 0.4));
      ctx.closePath();
      ctx.fillStyle = 'rgba(245,166,35,0.4)';
      ctx.fill();
    });
  };

  const renderCards = () => {
    layer.innerHTML = '';
    cards.forEach(card => {
      const el = document.createElement('div');
      el.className = 'board-card';
      el.dataset.id = card.id;
      el.style.cssText = `left:${card.x}px;top:${card.y}px;border-left:3px solid ${card.color}`;
      el.innerHTML = `
        <div class="board-card-label">${card.label}</div>
        <div class="board-card-text">${card.text}</div>`;
      layer.appendChild(el);
      makeDraggable(el, card);
    });
  };

  const makeDraggable = (el, card) => {
    let sx, sy, ox, oy;
    el.addEventListener('mousedown', e => {
      sx = e.clientX; sy = e.clientY;
      ox = card.x; oy = card.y;
      el.style.zIndex = 50;
      const move = mv => {
        card.x = Math.max(0, ox + mv.clientX - sx);
        card.y = Math.max(0, oy + mv.clientY - sy);
        el.style.left = card.x + 'px';
        el.style.top  = card.y + 'px';
        drawLines();
      };
      const up = () => {
        el.style.zIndex = '';
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
      };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
      e.preventDefault();
    });
  };

  body.querySelector('#board-save').onclick = () => {
    STATE.boardCards = cards.map(c => ({ id: c.id, x: c.x, y: c.y }));
    STATE.save();
    NOTIF.show('BOARD SAVED', 'Your evidence board layout has been saved.', 'cyan');
  };

  body.querySelector('#board-reset').onclick = () => {
    DEFAULT_CARDS.forEach((d, i) => {
      cards[i].x = d.x;
      cards[i].y = d.y;
    });
    STATE.boardCards = null;
    STATE.save();
    renderCards();
    drawLines();
  };

  renderCards();
  setTimeout(() => { resize(); window.addEventListener('resize', resize); }, 50);
};
