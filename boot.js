// ── BOOT SEQUENCE ─────────────────────────────────────────────
const BOOT_LINES = [
  "[ OK ] Loading kernel modules...",
  "[ OK ] Mounting encrypted storage...",
  "[ OK ] Initializing case management system...",
  "[ OK ] Connecting to Riverside College network...",
  "[ OK ] Decrypting case file #001...",
  "[ OK ] Loading suspect database...",
  "[ OK ] Evidence locker: 8 items indexed",
  "[ OK ] Timeline reconstructed from logs",
  "[ OK ] Secure channel established",
  "[ >> ] DETECTIVE OS READY — Welcome, Detective.",
];

function runBoot() {
  const bar  = document.getElementById('boot-bar');
  const log  = document.getElementById('boot-log');
  const boot = document.getElementById('boot-screen');

  let step = 0;
  const interval = setInterval(() => {
    if (step < BOOT_LINES.length) {
      const line = document.createElement('div');
      line.textContent = BOOT_LINES[step];
      if (step === BOOT_LINES.length - 1) line.style.color = 'var(--amber)';
      log.appendChild(line);
      log.scrollTop = log.scrollHeight;
      bar.style.width = ((step + 1) / BOOT_LINES.length * 100) + '%';
      step++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        boot.classList.add('fade-out');
        setTimeout(() => {
          boot.style.display = 'none';
          document.getElementById('desktop').classList.remove('hidden');
          DESKTOP.init();
        }, 800);
      }, 600);
    }
  }, 200);
}
