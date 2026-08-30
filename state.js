// ── GLOBAL STATE ──────────────────────────────────────────────
const STATE = {
  case: CASE_001,
  startTime: null,
  hintsUsed: 0,
  evidenceFound: new Set(),
  puzzlesSolved: new Set(),
  suspectMarks: {},    // id -> 'suspicious' | 'cleared' | null
  notes: '',
  boardCards: null,
  emailsRead: new Set(),
  openWindows: {},
  activeWindow: null,

  // Load from localStorage
  load() {
    try {
      const saved = localStorage.getItem('dd_state_001');
      if (saved) {
        const data = JSON.parse(saved);
        this.startTime   = data.startTime   || Date.now();
        this.hintsUsed   = data.hintsUsed   || 0;
        this.evidenceFound = new Set(data.evidenceFound || []);
        this.puzzlesSolved = new Set(data.puzzlesSolved || []);
        this.suspectMarks  = data.suspectMarks || {};
        this.notes         = data.notes || '';
        this.boardCards    = data.boardCards || null;
        this.emailsRead    = new Set(data.emailsRead || []);
      } else {
        this.startTime = Date.now();
        this.save();
      }
    } catch(e) { this.startTime = Date.now(); }
  },

  save() {
    try {
      localStorage.setItem('dd_state_001', JSON.stringify({
        startTime:     this.startTime,
        hintsUsed:     this.hintsUsed,
        evidenceFound: [...this.evidenceFound],
        puzzlesSolved: [...this.puzzlesSolved],
        suspectMarks:  this.suspectMarks,
        notes:         this.notes,
        boardCards:    this.boardCards,
        emailsRead:    [...this.emailsRead],
      }));
    } catch(e) {}
  },

  markEvidence(id) {
    this.evidenceFound.add(id);
    this.save();
  },

  markEmailRead(id) {
    // Unlock evidence from emails
    if (id === 'e002') this.unlockEvidence('EV-006');
    if (id === 'e005') this.unlockEvidence('EV-007');
    this.emailsRead.add(id);
    this.save();
  },

  unlockEvidence(id) {
    const ev = this.case.evidence.find(e => e.id === id);
    if (ev) { ev.unlocked = true; ev.isNew = true; }
  },

  solvePuzzle(id) {
    this.puzzlesSolved.add(id);
    const p = this.case.puzzles.find(p => p.id === id);
    if (p) p.solved = true;
    this.save();
  },

  setSuspectMark(id, mark) {
    this.suspectMarks[id] = mark;
    this.save();
  },

  getElapsedMinutes() {
    return Math.floor((Date.now() - this.startTime) / 60000);
  },

  getScore() {
    const totalEvidence = this.case.evidence.filter(e => e.unlocked).length;
    const foundEvidence = Math.min(this.evidenceFound.size, totalEvidence);
    const evScore = Math.round((foundEvidence / Math.max(totalEvidence, 1)) * 40);
    const puzzleScore = Math.round((this.puzzlesSolved.size / this.case.puzzles.length) * 30);
    const hintPenalty = this.hintsUsed * 5;
    return Math.max(0, Math.min(100, evScore + puzzleScore + 30 - hintPenalty));
  }
};
