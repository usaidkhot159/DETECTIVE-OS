// ── WINDOW MANAGER ─────────────────────────────────────────────
const APP_META = {
  caseFile: { title: 'Case File #001',     icon: '📁', w: 640, h: 600 },
  evidence: { title: 'Evidence Locker',    icon: '🔎', w: 680, h: 560 },
  suspects: { title: 'Suspect Database',   icon: '👥', w: 760, h: 580 },
  timeline: { title: 'Timeline',           icon: '🕐', w: 700, h: 500 },
  messages: { title: 'Messages',           icon: '💬', w: 720, h: 560 },
  email:    { title: 'Mail',               icon: '📧', w: 740, h: 580 },
  map:      { title: 'Location Map',       icon: '🗺️', w: 760, h: 580 },
  notes:    { title: 'Detective Notes',    icon: '📝', w: 540, h: 500 },
  board:    { title: 'Evidence Board',     icon: '🧠', w: 860, h: 600 },
  phone:    { title: "Ryan's Phone",       icon: '📱', w: 360, h: 640 },
  puzzles:  { title: 'Cipher Puzzles',     icon: '🧩', w: 620, h: 540 },
  accuse:   { title: 'Final Accusation',   icon: '🎯', w: 580, h: 640 },
};

const WINDOWS = {
  _zBase: 10,
  _zNext: 10,
  _instances: {},   // appId -> DOM element

  open(appId) {
    if (this._instances[appId]) {
      this.focus(appId);
      const win = this._instances[appId];
      win.classList.remove('minimized');
      return;
    }
    const meta = APP_META[appId];
    if (!meta) return;

    const tpl = document.getElementById('tpl-window').content.cloneNode(true);
    const win = tpl.querySelector('.app-window');

    // Size + Position
    const vw = window.innerWidth, vh = window.innerHeight;
    const w = Math.min(meta.w, vw - 60);
    const h = Math.min(meta.h, vh - 100);
    const x = Math.max(220, (vw - w) / 2 + (Object.keys(this._instances).length * 24));
    const y = Math.max(10, (vh - h) / 2 - 20 + (Object.keys(this._instances).length * 20));
    win.style.cssText = `width:${w}px;height:${h}px;left:${x}px;top:${y}px;z-index:${++this._zNext}`;

    // Title bar
    win.querySelector('.window-icon').textContent = meta.icon;
    win.querySelector('.window-title-text').textContent = meta.title;
    win.dataset.appId = appId;

    // Controls
    win.querySelector('.win-close').onclick = () => this.close(appId);
    win.querySelector('.win-min').onclick   = () => this.minimize(appId);
    win.querySelector('.win-max').onclick   = () => this.maximize(appId);

    // Render content
    const body = win.querySelector('.window-body');
    const renderFn = APPS[appId];
    if (renderFn) renderFn(body);

    document.getElementById('windows-container').appendChild(win);
    this._instances[appId] = win;

    // Drag
    this._makeDraggable(win, win.querySelector('.window-titlebar'));
    // Resize
    this._makeResizable(win);
    // Focus on click
    win.addEventListener('mousedown', () => this.focus(appId));
    this.focus(appId);

    // Taskbar button
    this._addTaskbarBtn(appId, meta);
  },

  close(appId) {
    const win = this._instances[appId];
    if (!win) return;
    win.style.opacity = '0';
    win.style.transform = 'scale(0.96)';
    win.style.transition = 'opacity 0.15s, transform 0.15s';
    setTimeout(() => { win.remove(); }, 150);
    delete this._instances[appId];
    this._removeTaskbarBtn(appId);
  },

  minimize(appId) {
    const win = this._instances[appId];
    if (win) win.classList.toggle('minimized');
    this._updateTaskbarBtn(appId);
  },

  maximize(appId) {
    const win = this._instances[appId];
    if (win) win.classList.toggle('maximized');
  },

  focus(appId) {
    Object.values(this._instances).forEach(w => w.classList.remove('focused'));
    const win = this._instances[appId];
    if (win) {
      win.classList.add('focused');
      win.style.zIndex = ++this._zNext;
    }
    document.querySelectorAll('.taskbar-app-btn').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.taskbar-app-btn[data-app="${appId}"]`);
    if (btn) btn.classList.add('active');
  },

  _makeDraggable(win, handle) {
    let ox, oy, sx, sy;
    handle.addEventListener('mousedown', e => {
      if (win.classList.contains('maximized')) return;
      sx = e.clientX; sy = e.clientY;
      ox = win.offsetLeft; oy = win.offsetTop;
      const move = mv => {
        win.style.left = (ox + mv.clientX - sx) + 'px';
        win.style.top  = Math.max(0, oy + mv.clientY - sy) + 'px';
      };
      const up = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
      };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    });
  },

  _makeResizable(win) {
    let sx, sy, sw, sh;
    const onDown = e => {
      if (win.classList.contains('maximized')) return;
      sx = e.clientX; sy = e.clientY;
      sw = win.offsetWidth; sh = win.offsetHeight;
      const move = mv => {
        win.style.width  = Math.max(380, sw + mv.clientX - sx) + 'px';
        win.style.height = Math.max(260, sh + mv.clientY - sy) + 'px';
      };
      const up = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
      };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
      e.preventDefault();
    };
    win.addEventListener('mousedown', e => {
      const rect = win.getBoundingClientRect();
      if (e.clientX > rect.right - 20 && e.clientY > rect.bottom - 20) onDown(e);
    });
  },

  _addTaskbarBtn(appId, meta) {
    const btn = document.createElement('button');
    btn.className = 'taskbar-app-btn';
    btn.dataset.app = appId;
    btn.innerHTML = `${meta.icon} ${meta.title}`;
    btn.onclick = () => {
      const win = this._instances[appId];
      if (!win) return;
      if (win.classList.contains('minimized')) {
        win.classList.remove('minimized');
        this.focus(appId);
      } else if (win.classList.contains('focused')) {
        this.minimize(appId);
      } else {
        this.focus(appId);
      }
    };
    document.getElementById('taskbar-apps').appendChild(btn);
  },

  _removeTaskbarBtn(appId) {
    const btn = document.querySelector(`.taskbar-app-btn[data-app="${appId}"]`);
    if (btn) btn.remove();
  },

  _updateTaskbarBtn(appId) {
    const btn = document.querySelector(`.taskbar-app-btn[data-app="${appId}"]`);
    const win = this._instances[appId];
    if (btn && win) btn.classList.toggle('minimized-btn', win.classList.contains('minimized'));
  },
};
