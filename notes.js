// ── DETECTIVE NOTES APP ────────────────────────────────────────
APPS.notes = function(body) {
  body.innerHTML = `
  <div class="notes-wrap">
    <div class="notes-toolbar">
      <div class="notes-title">📝 DETECTIVE NOTES — CASE #001</div>
      <div style="margin-left:auto;display:flex;gap:var(--gap-sm)">
        <button class="btn btn-dim" id="notes-clear" style="padding:4px 10px;font-size:11px">Clear</button>
        <button class="btn btn-amber" id="notes-save" style="padding:4px 10px;font-size:11px">Save</button>
      </div>
    </div>
    <textarea class="notes-textarea" id="notes-area" placeholder="// Your investigation notes...
// Who do you suspect? What contradictions have you found?
// Connect the dots.

EXAMPLE:
—— Ryan entered at 4:27, no exit scan
—— Maya lied about library (but why?)
—— Window found open = possible exit route
—— Ryan searched MacBook resale at 11 AM
—— Ryan was passed over for research role Alex got

THEORY:
...">${STATE.notes}</textarea>
    <div class="notes-save-indicator" id="save-indicator">Auto-saved · ${new Date().toLocaleTimeString()}</div>
  </div>`;

  const area    = body.querySelector('#notes-area');
  const ind     = body.querySelector('#save-indicator');
  const saveBtn = body.querySelector('#notes-save');
  const clearBtn= body.querySelector('#notes-clear');
  let saveTimer;

  const doSave = () => {
    STATE.notes = area.value;
    STATE.save();
    ind.textContent = `Saved · ${new Date().toLocaleTimeString()}`;
    ind.style.color = 'var(--green)';
    setTimeout(() => { ind.style.color = ''; }, 2000);
  };

  area.addEventListener('input', () => {
    ind.textContent = 'Unsaved changes…';
    ind.style.color = 'var(--amber)';
    clearTimeout(saveTimer);
    saveTimer = setTimeout(doSave, 1500);
  });

  saveBtn.addEventListener('click', doSave);

  clearBtn.addEventListener('click', () => {
    if (confirm('Clear all notes? This cannot be undone.')) {
      area.value = '';
      doSave();
    }
  });
};
