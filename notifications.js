const NOTIF = {
  show(title, text, type = 'amber') {
    const area = document.getElementById('notifications');
    const el = document.createElement('div');
    el.className = `notif notif-${type}`;
    el.innerHTML = `<div class="notif-title">${title}</div>${text}`;
    area.appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity 0.4s, transform 0.4s';
      el.style.opacity = '0';
      el.style.transform = 'translateX(40px)';
      setTimeout(() => el.remove(), 400);
    }, 4000);
  }
};
