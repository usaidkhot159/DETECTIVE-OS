// ── MAP APP ────────────────────────────────────────────────────
APPS.map = function(body) {
  const locations = STATE.case.locations;
  let activeId = null;

  const statusColors = {
    red:   'var(--red)',
    amber: 'var(--amber)',
    green: 'var(--green)',
    cyan:  'var(--cyan)',
  };

  const render = () => {
    const active = activeId ? locations.find(l => l.id === activeId) : null;
    body.innerHTML = `
    <div class="map-wrap">
      <div class="section-header">
        <div class="section-title">LOCATION MAP</div>
        <div class="section-subtitle">RIVERSIDE COLLEGE CAMPUS</div>
        <div class="section-tag">CLICK A LOCATION</div>
      </div>

      <div class="map-svg-wrap scan-wrapper">
        <svg viewBox="0 0 620 440" xmlns="http://www.w3.org/2000/svg" style="background:#0a0a10">
          <!-- Grid lines -->
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="620" height="440" fill="url(#grid)"/>

          <!-- Roads -->
          <line x1="160" y1="0" x2="160" y2="440" stroke="rgba(255,255,255,0.05)" stroke-width="12"/>
          <line x1="0" y1="220" x2="620" y2="220" stroke="rgba(255,255,255,0.05)" stroke-width="12"/>
          <line x1="340" y1="80" x2="340" y2="380" stroke="rgba(255,255,255,0.05)" stroke-width="8"/>
          <line x1="160" y1="300" x2="480" y2="300" stroke="rgba(255,255,255,0.05)" stroke-width="6"/>

          <!-- Connector lines between related locations -->
          <line x1="340" y1="180" x2="340" y2="120" stroke="rgba(232,64,64,0.3)" stroke-width="1.5" stroke-dasharray="4,4"/>
          <line x1="340" y1="120" x2="520" y2="80" stroke="rgba(245,166,35,0.2)" stroke-width="1" stroke-dasharray="4,4"/>
          <line x1="340" y1="180" x2="480" y2="260" stroke="rgba(78,205,196,0.3)" stroke-width="1.5" stroke-dasharray="4,4"/>
          <line x1="160" y1="160" x2="160" y2="300" stroke="rgba(255,255,255,0.1)" stroke-width="1" stroke-dasharray="3,3"/>
          <line x1="160" y1="300" x2="340" y2="300" stroke="rgba(255,255,255,0.06)" stroke-width="1" stroke-dasharray="3,3"/>

          <!-- Location nodes -->
          ${locations.map(loc => {
            const col = statusColors[loc.statusColor] || 'var(--border-hi)';
            const isActive = loc.id === activeId;
            return `
            <g class="map-loc" data-id="${loc.id}" style="cursor:pointer">
              <circle cx="${loc.x}" cy="${loc.y}" r="${isActive?28:22}" fill="${isActive?col:'rgba(16,16,28,0.9)'}" 
                stroke="${col}" stroke-width="${isActive?2:1.5}" opacity="${isActive?1:0.8}"/>
              ${isActive ? `<circle cx="${loc.x}" cy="${loc.y}" r="34" fill="none" stroke="${col}" stroke-width="1" opacity="0.3"/>` : ''}
              <text x="${loc.x}" y="${loc.y+5}" text-anchor="middle" font-size="14" fill="${isActive?'#000':col}">${loc.icon}</text>
              <text x="${loc.x}" y="${loc.y+42}" text-anchor="middle" font-size="9" fill="${col}" 
                font-family="'Share Tech Mono',monospace" letter-spacing="0.5">${loc.name.toUpperCase()}</text>
              <text x="${loc.x}" y="${loc.y+55}" text-anchor="middle" font-size="8" fill="${col}" 
                font-family="'Share Tech Mono',monospace" opacity="0.7">[${loc.status}]</text>
            </g>`;
          }).join('')}

          <!-- Compass -->
          <text x="590" y="30" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.15)" font-family="'Share Tech Mono',monospace">N</text>
          <text x="590" y="42" text-anchor="middle" font-size="14" fill="rgba(255,255,255,0.1)">↑</text>

          <!-- Label -->
          <text x="12" y="430" font-size="8" fill="rgba(255,255,255,0.1)" font-family="'Share Tech Mono',monospace">RIVERSIDE COLLEGE — CAMPUS MAP — CASE #001</text>
        </svg>
      </div>

      <div class="location-card ${active ? 'visible' : ''}" id="loc-detail">
        ${active ? `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--gap-sm)">
          <div style="display:flex;align-items:center;gap:var(--gap-sm)">
            <span style="font-size:24px">${active.icon}</span>
            <div class="location-name">${active.name}</div>
          </div>
          <span class="badge badge-${active.statusColor==='red'?'red':active.statusColor==='green'?'green':active.statusColor==='cyan'?'cyan':'amber'}">${active.status}</span>
        </div>
        <div class="card-body">${active.details}</div>` : ''}
      </div>
    </div>`;

    body.querySelectorAll('.map-loc').forEach(node => {
      node.addEventListener('click', () => {
        activeId = node.dataset.id;
        STATE.markEvidence(`MAP-${activeId}`);
        render();
      });
    });
  };

  render();
};
