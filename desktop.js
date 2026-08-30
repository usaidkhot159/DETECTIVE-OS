// ── DESKTOP ────────────────────────────────────────────────────
const DESKTOP = {
  init() {
    STATE.load();
    // Desktop icon double-click
    document.querySelectorAll('.desktop-icon').forEach(icon => {
      icon.addEventListener('dblclick', () => {
        const app = icon.dataset.app;
        WINDOWS.open(app);
      });
      icon.addEventListener('keydown', e => {
        if (e.key === 'Enter') WINDOWS.open(icon.dataset.app);
      });
    });
    // Click desktop to deselect
    document.getElementById('desktop').addEventListener('mousedown', e => {
      if (e.target === e.currentTarget || e.target.id === 'desktop-icons') {
        document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
      }
    });
    CLOCK.start();
    // Show welcome notification
    setTimeout(() => {
      NOTIF.show('NEW CASE FILE', 'Case #001 — The Missing Laptop is now active.', 'cyan');
    }, 500);
    setTimeout(() => {
      NOTIF.show('NEW EMAIL', 'You have 2 unread messages in your inbox.', 'amber');
    }, 2000);
  }
};
