const CLOCK = {
  start() {
    const el = document.getElementById('clock');
    const tick = () => {
      const d = new Date();
      el.textContent = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    };
    tick();
    setInterval(tick, 1000);
  }
};
