// ══════════════════════════════════════════════════════════════
//  CASE #001 — THE MISSING LAPTOP
//  All case data: suspects, evidence, timeline, messages, emails
// ══════════════════════════════════════════════════════════════

const CASE_001 = {
  id: "001",
  title: "The Missing Laptop",
  status: "OPEN",
  location: "Riverside College, Computer Lab B",
  date: "October 14",
  time: "4:10 PM – 5:00 PM",
  victim: "Alex Carter",
  missing: "MacBook Pro 16\" (Silver) — Serial: MPB-2024-7741",
  detective: "YOU",
  brief: `At 4:52 PM, second-year student Alex Carter reported their MacBook Pro missing from Computer Lab B at Riverside College. The lab had been locked between 4:10 PM and 4:52 PM, accessible only with a keycard.

Security cameras cover the corridor outside but not the lab interior. The laptop was last confirmed present at 4:10 PM when Alex logged out and left for a 30-minute break.

Five individuals are known to have had access to the building during the window. Campus security has interviewed all of them. Every person has an alibi. But the footage and the statements don't quite add up.`,

  objectives: [
    { id: "who",  text: "Who took the laptop?",               done: false },
    { id: "how",  text: "How did they access the locked lab?", done: false },
    { id: "why",  text: "Why did they steal it?",              done: false },
  ],

  // ── SUSPECTS ──────────────────────────────────────────────────
  suspects: [
    {
      id: "alex",
      name: "Alex Carter",
      age: 20,
      emoji: "🧑",
      role: "Victim",
      occupation: "Computer Science Student",
      relationship: "Victim",
      alibi: "Claims to have been in the campus cafeteria from 4:10 to 4:50 PM. Says they returned to find the laptop gone.",
      lastSeen: "Cafeteria — 4:48 PM (CCTV confirmed)",
      associates: ["Maya", "Ryan"],
      notes: "Had significant debt according to financial aid records. Laptop was insured for $3,200.",
      locked: false,
      suspicious: null,
      unlocked_info: "Alex recently took out a $1,200 cash advance. The laptop insurance policy was upgraded 3 days before the theft."
    },
    {
      id: "maya",
      name: "Maya Reyes",
      age: 21,
      emoji: "👩",
      role: "Classmate",
      occupation: "Computer Science Student",
      relationship: "Alex's classmate and study partner",
      alibi: "Claims she went straight to the library after the 3 PM lecture. Says she never went near Lab B.",
      lastSeen: "Lab B Corridor — 4:21 PM (Security camera)",
      associates: ["Alex", "Ryan"],
      notes: "Has a keycard for Lab B as part of the CS lab assistant program.",
      locked: false,
      suspicious: null,
      unlocked_info: "Maya sent a message at 4:19 PM saying she was at the library — but security footage places her in the Lab B corridor at 4:21 PM. She cannot have been in both places."
    },
    {
      id: "ryan",
      name: "Ryan Kuo",
      age: 22,
      emoji: "👨",
      role: "Lab Assistant",
      occupation: "Part-time Lab Assistant / CS Student",
      relationship: "Works in Lab B, knows Alex",
      alibi: "Says he entered Lab B at 4:27 PM to restock equipment, then left by 4:35 PM to attend a study group in Room 210.",
      lastSeen: "Lab B — 4:27 PM (keycard log)",
      associates: ["Alex", "Maya", "Daniel"],
      notes: "Has master keycard access. Was recently passed over for a paid research position that Alex applied for.",
      locked: false,
      suspicious: null,
      unlocked_info: "Ryan's 4:27 PM keycard entry is confirmed, but the study group in Room 210 had no record of him attending. He cannot verify his 4:35 PM departure claim."
    },
    {
      id: "sara",
      name: "Sara Whitfield",
      age: 20,
      emoji: "👩‍🦱",
      role: "Friend",
      occupation: "Media Arts Student",
      relationship: "Alex's close friend",
      alibi: "Claims she was in the Media Arts studio all afternoon, has sign-in log to prove it.",
      lastSeen: "Media Arts Building — 3:55 PM (sign-in log)",
      associates: ["Alex"],
      notes: "No keycard for Lab B. Alibi verified by studio supervisor.",
      locked: false,
      suspicious: null,
      unlocked_info: "Sara's alibi checks out. The Media Arts building sign-in log and studio supervisor both confirm she was there from 3:55 PM to 5:30 PM. She could not have accessed Lab B."
    },
    {
      id: "daniel",
      name: "Daniel Ortiz",
      age: 34,
      emoji: "👮",
      role: "Security Guard",
      occupation: "Campus Security Officer",
      relationship: "Patrols the CS building",
      alibi: "Says he entered Lab B at 4:41 PM on a routine check, found nothing unusual, and left at 4:48 PM.",
      lastSeen: "Lab B — 4:41–4:48 PM (keycard log + camera)",
      associates: ["Ryan"],
      notes: "Has master keycard. Knows the camera blind spots. Was seen having an argument with Ryan last week.",
      locked: false,
      suspicious: null,
      unlocked_info: "Daniel's argument with Ryan was over a stolen parking permit. Unrelated. However, Daniel's patrol log shows he skipped his 4:15 PM checkpoint — he claims he was helping a student, but no student was reported needing assistance."
    },
  ],

  // ── EVIDENCE ──────────────────────────────────────────────────
  evidence: [
    {
      id: "EV-001",
      type: "SECURITY FOOTAGE",
      title: "Corridor Camera Report — Lab B",
      summary: "Security camera timestamps for the Lab B corridor.",
      detail: `CAMERA: CS-B-CORRIDOR-04
RECORDING: ACTIVE
DATE: OCTOBER 14

16:10 — ALEX CARTER exits Lab B, heads toward cafeteria
16:21 — UNIDENTIFIED FIGURE enters corridor (FACE NOT VISIBLE)
16:22 — Figure approaches Lab B door
16:27 — RYAN KUO enters Lab B (keycard #RK-227)
16:34 — Interior lights flicker (power fluctuation logged)
16:41 — DANIEL ORTIZ enters Lab B (master keycard #DO-001)
16:48 — DANIEL ORTIZ exits Lab B
16:52 — ALEX CARTER returns, reports laptop missing`,
      unlocked: true,
      isNew: true
    },
    {
      id: "EV-002",
      type: "KEYCARD LOG",
      title: "Lab B Electronic Access Records",
      summary: "Official keycard access log for Computer Lab B.",
      detail: `RIVERSIDE COLLEGE — KEYCARD ACCESS LOG
ROOM: CS LAB B
DATE: OCTOBER 14

TIME     | CARD ID  | HOLDER          | ACTION
---------|----------|-----------------|--------
08:32    | AC-114   | Alex Carter     | ENTER
08:58    | AC-114   | Alex Carter     | EXIT
11:05    | RK-227   | Ryan Kuo        | ENTER
11:41    | RK-227   | Ryan Kuo        | EXIT
13:22    | AC-114   | Alex Carter     | ENTER
16:10    | AC-114   | Alex Carter     | EXIT
16:27    | RK-227   | Ryan Kuo        | ENTER
16:41    | DO-001   | Daniel Ortiz    | ENTER
16:48    | DO-001   | Daniel Ortiz    | EXIT

NOTE: The 16:21 corridor figure did not trigger the
keycard reader. The door was NOT opened at that time.
They may have attempted entry and failed.`,
      unlocked: true,
      isNew: false
    },
    {
      id: "EV-003",
      type: "WITNESS STATEMENT",
      title: "Maya Reyes — Written Statement",
      summary: "Maya's official statement to campus security.",
      detail: `WITNESS STATEMENT
NAME: Maya Reyes
DATE: October 14, 5:15 PM

"After the 3 PM lecture with Professor Adams, I went directly
to the college library. I did not go near Lab B at any point.
I was at the library from around 4:05 PM until 5 PM.

I had no reason to be in that corridor. I was studying for
our midterm. If you check the library's sign-in system,
you'll see I was there."

Signed: Maya Reyes

INVESTIGATOR NOTE: Library sign-in system was offline for
maintenance from 3:50 PM to 5:10 PM. Entry unverifiable.`,
      unlocked: true,
      isNew: false
    },
    {
      id: "EV-004",
      type: "CONTRADICTION",
      title: "⚠ Maya — Library vs. Corridor",
      summary: "Maya claims she was at the library. Footage says otherwise.",
      detail: `⚠ CONTRADICTION DETECTED

MAYA REYES STATED:
"I did not go near Lab B at any point."
"I was at the library from around 4:05 PM until 5 PM."

SECURITY CAMERA SHOWS:
16:21 — Unidentified figure enters Lab B corridor.
The figure's build and jacket match Maya Reyes.

LIBRARY RECORDS:
System was offline. Cannot confirm or deny her presence.

ASSESSMENT:
Maya cannot prove she was at the library.
Security footage places someone matching her description
at Lab B corridor at the exact time she claims to be elsewhere.

This is a MATERIAL CONTRADICTION in her statement.`,
      unlocked: true,
      isNew: true
    },
    {
      id: "EV-005",
      type: "PHYSICAL EVIDENCE",
      title: "Lab B Inventory Check",
      summary: "Items confirmed present and missing after the incident.",
      detail: `ROOM INVENTORY REPORT — LAB B
CONDUCTED BY: Daniel Ortiz, 4:48 PM

EQUIPMENT STATUS:
[✓] 24 Desktop PCs — ALL PRESENT
[✓] Charging stations — ALL PRESENT
[✓] Cables and peripherals — ALL PRESENT
[✗] MacBook Pro 16" (Silver) — MISSING
    Last confirmed present: 4:10 PM (Alex Carter's login)
    Serial: MPB-2024-7741

OTHER OBSERVATIONS:
— Window on east wall was unlatched (normally kept closed)
— Laptop charging cable still plugged in at the desk
— Alex Carter's notebook and water bottle left on desk
— No signs of forced entry on the door

DANIEL ORTIZ NOTE: "Everything looked normal to me.
I didn't notice the laptop missing during my check."`,
      unlocked: true,
      isNew: false
    },
    {
      id: "EV-006",
      type: "DIGITAL EVIDENCE",
      title: "Ryan's Browsing History (IT Recovered)",
      summary: "IT department recovered browsing data from Ryan's lab session.",
      detail: `IT FORENSICS REPORT
WORKSTATION: LAB-B-PC-07
SESSION: Ryan Kuo — 11:05 AM to 11:41 AM

BROWSING HISTORY:
11:07 — google.com/search?q=MacBook+Pro+resale+value
11:09 — swapmart.com/listings/macbook-pro-16
11:14 — craigslist.org/... (listing: MacBook 16" like new)
11:22 — reddit.com/r/hardwareswap
11:31 — google.com/search?q=how+to+wipe+MacBook+factory+reset

NOTES FROM IT:
Browsing history is from the MORNING of October 14 —
before the laptop was reported missing.

Ryan was researching MacBook resale values and how to
factory reset one several hours before the theft.`,
      unlocked: false,
      isNew: false,
      lockHint: "Requires IT Department email authorization. Check your inbox."
    },
    {
      id: "EV-007",
      type: "INSURANCE DOCUMENT",
      title: "Laptop Insurance Policy",
      summary: "Alex's laptop insurance details.",
      detail: `ELECTRONICS INSURANCE POLICY
POLICYHOLDER: Alex Carter
ITEM: MacBook Pro 16" — Serial MPB-2024-7741
COVERAGE: $3,200 replacement value

POLICY HISTORY:
— Original policy: August 2023 ($1,800 coverage)
— UPGRADED: October 11 (3 DAYS AGO) to $3,200

CLAIM STATUS: PENDING

NOTE: Policy was upgraded 72 hours before the theft.
Market value of the laptop is approximately $1,400
for a used 2023 model of this type.

The upgrade increased Alex's potential payout by $1,800.`,
      unlocked: false,
      isNew: false,
      lockHint: "Unlock by investigating the financial records."
    },
    {
      id: "EV-008",
      type: "PHYSICAL EVIDENCE",
      title: "The Unlatched Window",
      summary: "East window was found open. Lab is on the ground floor.",
      detail: `PHYSICAL EXAMINATION NOTE
ITEM: East-facing window, Lab B
EXAMINER: Campus Security (post-incident)

OBSERVATIONS:
— Window was unlatched when Daniel Ortiz checked at 4:41 PM
— Daniel states he noticed it but "assumed a student had
  opened it earlier"
— Window opens to a narrow side alley (dead-end, no cameras)
— Fresh scuff marks on the exterior sill (consistent with
  someone climbing through)
— The alley has a gate that is locked at 5:30 PM but was
  unlocked during the incident window

HYPOTHESIS:
If the perpetrator could not use the keycard door,
this window may be the actual entry/exit point.
The figure seen at 4:21 in the corridor may have
been a DECOY or MISDIRECTION.`,
      unlocked: true,
      isNew: false
    },
  ],

  // ── TIMELINE ──────────────────────────────────────────────────
  timeline: [
    { time: "4:10", label: "Alex exits Lab B", who: "Alex", alert: false, detail: "Alex logs out, leaves laptop charging. Lab door locks behind them." },
    { time: "4:21", label: "Figure enters corridor", who: "Unknown", alert: true, detail: "Security camera picks up figure approaching Lab B. Face partially obscured. Build matches Maya Reyes." },
    { time: "4:27", label: "Ryan enters Lab B", who: "Ryan", alert: false, detail: "Ryan's keycard RK-227 unlocks Lab B. Claims to be restocking equipment." },
    { time: "4:34", label: "⚠ Power flicker", who: "—", alert: true, detail: "Lights flicker in Lab B. Logged as a minor power fluctuation. Security cameras momentarily scrambled (2-second gap in footage)." },
    { time: "4:35", label: "Ryan claims to have left", who: "Ryan", alert: true, detail: "Ryan says he exited around 4:35. But the keycard log shows NO EXIT SCAN. The door can be held open manually from inside." },
    { time: "4:41", label: "Daniel enters Lab B", who: "Daniel", alert: false, detail: "Security officer Daniel Ortiz enters for routine patrol check." },
    { time: "4:48", label: "Daniel exits — notices window", who: "Daniel", alert: false, detail: "Daniel exits. Later reports the east window was open but did not report it at the time." },
    { time: "4:52", label: "Laptop reported missing", who: "Alex", alert: true, detail: "Alex returns and immediately notices the MacBook Pro is gone. Cable still in place. Police called." },
  ],

  // ── MESSAGES ──────────────────────────────────────────────────
  messages: {
    maya: {
      name: "Maya Reyes",
      emoji: "👩",
      thread: [
        { from: "maya",  time: "3:58 PM", text: "Hey, heading out after class. Library?" },
        { from: "alex",  time: "4:00 PM", text: "Yeah I'm just gonna grab a coffee first. Meet you there in 20?" },
        { from: "maya",  time: "4:05 PM", text: "I'm going straight home after class actually. Change of plans" },
        { from: "alex",  time: "4:09 PM", text: "Oh ok no worries" },
        { from: "maya",  time: "4:18 PM", text: "Where are you right now?" },
        { from: "alex",  time: "4:19 PM", text: "Cafeteria. Why?" },
        { from: "maya",  time: "4:19 PM", text: "At the library." },
        { from: "alex",  time: "4:44 PM", text: "Hey my laptop is gone??? Did you see anyone near the lab?" },
        { from: "maya",  time: "4:50 PM", text: "What? I wasn't anywhere near the lab", suspicious: true },
      ]
    },
    ryan: {
      name: "Ryan Kuo",
      emoji: "👨",
      thread: [
        { from: "alex",  time: "3:45 PM", text: "Ryan did you move anything in the lab earlier?" },
        { from: "ryan",  time: "3:47 PM", text: "Nah just checked in. Why?" },
        { from: "alex",  time: "4:52 PM", text: "My laptop is gone. Were you in Lab B this afternoon?" },
        { from: "ryan",  time: "5:01 PM", text: "Yeah I was in there for a few minutes around 4:30. Just restocking." },
        { from: "ryan",  time: "5:02 PM", text: "Your laptop was there when I left. I promise." },
        { from: "alex",  time: "5:03 PM", text: "The log shows you went in at 4:27. When did you leave?" },
        { from: "ryan",  time: "5:05 PM", text: "I don't know exactly. 4:35 maybe? There's no exit scan, I just let the door close", suspicious: true },
      ]
    },
    sara: {
      name: "Sara Whitfield",
      emoji: "👩‍🦱",
      thread: [
        { from: "alex",  time: "5:00 PM", text: "Sara someone stole my laptop from the lab" },
        { from: "sara",  time: "5:02 PM", text: "WHAT?? That's terrible, I'm so sorry" },
        { from: "sara",  time: "5:03 PM", text: "I was in the studio all afternoon, I didn't see anything" },
        { from: "alex",  time: "5:04 PM", text: "Did you hear Ryan or Maya mention anything weird today?" },
        { from: "sara",  time: "5:06 PM", text: "Actually... Ryan seemed kind of stressed this morning. Said something about money." },
        { from: "sara",  time: "5:07 PM", text: "And I saw him googling 'Mac resale' in the library last week but I figured it was for his own laptop" },
      ]
    }
  },

  // ── EMAILS ─────────────────────────────────────────────────────
  emails: [
    {
      id: "e001",
      from: "Security Office <security@riverside.edu>",
      sender: "Security Office",
      emoji: "🏫",
      subject: "Incident Report — Lab B Laptop Theft",
      time: "5:22 PM",
      unread: false,
      body: `Detective,

Please find the preliminary incident report attached.

Timeline and keycard logs have been provided. The security camera covering the Lab B corridor has been preserved as evidence.

Note that the interior of Lab B is NOT covered by any camera. This is a known gap in our security infrastructure that has been escalated for remediation.

All five persons of interest have been interviewed and have provided statements.

Regards,
Campus Security Office
Riverside College`
    },
    {
      id: "e002",
      from: "IT Department <it@riverside.edu>",
      sender: "IT Department",
      emoji: "💻",
      subject: "RE: Lab B Workstation Forensics Request",
      time: "5:47 PM",
      unread: true,
      body: `Detective,

As requested, we have pulled the session logs for Lab B workstations on October 14.

We found one item of interest on PC-07, which was used by Ryan Kuo during his 11:05–11:41 AM session.

The browsing history shows searches related to MacBook Pro resale and factory resets — conducted several hours before the reported theft.

We have flagged EVIDENCE #EV-006 in your evidence locker.

⚠ EVIDENCE UNLOCKED: EV-006 (Ryan's Browsing History)

This data has been preserved and is admissible.

Best,
IT Department`
    },
    {
      id: "e003",
      from: "unknown@protonmail.com",
      sender: "Unknown Sender",
      emoji: "❓",
      subject: "I know what you're looking for",
      time: "6:02 PM",
      unread: true,
      body: `Detective,

The laptop didn't walk out through the door.

Think about what the camera DOESN'T show.

The figure at 4:21 was a distraction. The real question is: who had the time, the motive, and no solid alibi between 4:27 and 4:48?

You're closer than you think.

— A friend`
    },
    {
      id: "e004",
      from: "Prof. L. Adams <l.adams@riverside.edu>",
      sender: "Prof. Adams",
      emoji: "👨‍🏫",
      subject: "Research Position Decision",
      time: "10:15 AM",
      unread: false,
      body: `Dear Ryan,

I wanted to personally inform you of the outcome of the undergraduate research position selection.

After careful consideration, we have offered the position to Alex Carter. Alex's project proposal showed exceptional promise, and we felt it was the stronger fit for our lab's current direction.

I know this is disappointing news. You remain a valued part of our program and I encourage you to apply again next semester.

Best wishes,
Professor Adams`,
    },
    {
      id: "e005",
      from: "insurance@covershield.com",
      sender: "CoverShield Insurance",
      emoji: "📋",
      subject: "Policy Upgrade Confirmation — MPB-2024-7741",
      time: "October 11, 9:30 AM",
      unread: false,
      body: `Dear Alex Carter,

Your electronics insurance policy has been updated as requested.

Item: MacBook Pro 16" (Silver)
Serial: MPB-2024-7741

Previous coverage: $1,800
New coverage: $3,200
Effective date: October 11

⚠ EVIDENCE UNLOCKED: EV-007 (Insurance Policy)

Please review your updated policy documents.

Thank you for choosing CoverShield.

— CoverShield Insurance`
    }
  ],

  // ── LOCATIONS ──────────────────────────────────────────────────
  locations: [
    {
      id: "lab",
      name: "Computer Lab B",
      x: 340, y: 180,
      icon: "💻",
      details: "Primary crime scene. Keycard access only. East window found unlatched. No interior camera. Laptop was stolen between 4:10–4:52 PM.",
      status: "CRIME SCENE",
      statusColor: "red"
    },
    {
      id: "corridor",
      name: "Lab B Corridor",
      x: 340, y: 120,
      icon: "🚶",
      details: "Covered by Security Camera CS-B-CORRIDOR-04. Unidentified figure seen at 4:21 PM approaching Lab B. Figure's face not clearly visible.",
      status: "MONITORED",
      statusColor: "amber"
    },
    {
      id: "cafeteria",
      name: "Cafeteria",
      x: 160, y: 300,
      icon: "☕",
      details: "Alex Carter confirmed here by CCTV 4:15–4:50 PM. Solid alibi for Alex during the theft window.",
      status: "VERIFIED",
      statusColor: "green"
    },
    {
      id: "library",
      name: "Library",
      x: 520, y: 80,
      icon: "📚",
      details: "Maya claimed to be here from 4:05–5:00 PM. System was OFFLINE for maintenance. Her presence CANNOT be verified.",
      status: "UNVERIFIED",
      statusColor: "amber"
    },
    {
      id: "security",
      name: "Security Office",
      x: 160, y: 160,
      icon: "🏢",
      details: "Daniel Ortiz's base. He left on patrol at approximately 4:38 PM. His 4:15 checkpoint was SKIPPED with no explanation.",
      status: "SUSPICIOUS",
      statusColor: "red"
    },
    {
      id: "alley",
      name: "East Alley",
      x: 480, y: 260,
      icon: "🚪",
      details: "Narrow alley outside Lab B's east window. No camera coverage. Scuff marks found on the window sill. Could be used as covert entry/exit point.",
      status: "KEY LOCATION",
      statusColor: "cyan"
    },
    {
      id: "media",
      name: "Media Arts Building",
      x: 80, y: 420,
      icon: "🎬",
      details: "Sara Whitfield confirmed here all afternoon. Sign-in log and studio supervisor both verify her presence. Sara is cleared.",
      status: "CLEARED",
      statusColor: "green"
    },
    {
      id: "room210",
      name: "Room 210 (Study Room)",
      x: 420, y: 360,
      icon: "📖",
      details: "Ryan claims he attended a study group here after leaving Lab B at ~4:35. Study group has NO RECORD of Ryan being present.",
      status: "SUSPICIOUS",
      statusColor: "red"
    },
  ],

  // ── PUZZLES ────────────────────────────────────────────────────
  puzzles: [
    {
      id: "p001",
      name: "Encrypted Message",
      type: "caesar",
      badge: "CAESAR CIPHER",
      ciphertext: "PHHW PH DW WKH EDFN JDWH",
      answer: "MEET ME AT THE BACK GATE",
      shift: 3,
      hint: "Each letter has been shifted forward 3 positions in the alphabet.",
      solved: false,
      reward: "Decrypted note found in Lab B trash. Was this arranging the theft?"
    },
    {
      id: "p002",
      name: "Locker Code",
      type: "pattern",
      badge: "PATTERN LOCK",
      pattern: "2 — 4 — 8 — 16 — ?",
      answer: "32",
      hint: "What's the rule linking each number to the next?",
      solved: false,
      reward: "Ryan's locker combination. Inside: a receipt for a SSD enclosure — used to extract data from stolen laptops."
    },
    {
      id: "p003",
      name: "Morse Code Signal",
      type: "morse",
      badge: "MORSE CODE",
      ciphertext: ".-. -.-- .- -..",
      answer: "RYAD",
      hint: "Use standard Morse code. Dots (.) and dashes (-).",
      solved: false,
      reward: "Signal intercepted on campus walkie-talkie at 4:33 PM. Partial callsign — possibly confirming the theft was coordinated."
    },
    {
      id: "p004",
      name: "File Password",
      type: "text",
      badge: "PASSWORD",
      question: "Ryan's encrypted file needs a password. His profile says his favorite number appears in his student ID. His ID is RK-2024-7. What is the number?",
      answer: "7",
      hint: "Look at the last digit of Ryan's student ID number.",
      solved: false,
      reward: "Encrypted file unlocked: A draft listing for 'MacBook Pro 16 Silver — Like New — $1,100' posted the night of October 14."
    },
  ],

  // ── SOLUTION ────────────────────────────────────────────────────
  solution: {
    culprit: "ryan",
    method: "window",
    motive: "resell",
    explanation: `Ryan Kuo stole the laptop. He entered Lab B at 4:27 PM using his keycard, which is confirmed in the access log. However, he did NOT leave through the door — the keycard log shows no exit scan after his entry.

Ryan stayed hidden in Lab B until Daniel Ortiz completed his check at 4:48 PM. After Daniel left, Ryan took the laptop and exited through the east-facing window, which he had unlatched during his earlier morning visit to the lab.

The figure seen at 4:21 in the corridor was Maya, who did lie about being at the library — but she was simply embarrassed about being caught near the lab (she had come to talk to Alex but found the lab locked and left). She had nothing to do with the theft.

Ryan's motive: He was passed over for the research position given to Alex, and was in financial difficulty. The browsing history confirms he had been researching MacBook resale values that same morning. He intended to sell the laptop through an anonymous online listing.`,
    wrongSuspect: {
      maya: "Maya lied about being at the library, but her lie was about something unrelated. She was there to see Alex, found the lab locked, and left. She is not the thief.",
      daniel: "Daniel skipped his 4:15 checkpoint, but he genuinely forgot. His 4:41–4:48 search was routine. He has no connection to the laptop's value.",
      alex: "A staged theft is possible — Alex upgraded the insurance 3 days prior — but the physical evidence points away from a self-staged theft. The exit through the window, the online listing draft, and Ryan's motive are conclusive.",
      sara: "Sara's alibi is ironclad. She could not have accessed Lab B."
    }
  },

  // ── PHONE DATA ──────────────────────────────────────────────────
  phone: {
    owner: "Ryan Kuo",
    battery: "73%",
    network: "Riverside 4G",
    calls: [
      { contact: "Unknown", number: "+1-555-0142", time: "4:33 PM", duration: "0:47", type: "outgoing" },
      { contact: "Mom", number: "+1-555-0891", time: "3:12 PM", duration: "2:15", type: "incoming" },
      { contact: "Daniel O.", number: "+1-555-0234", time: "2:58 PM", duration: "1:02", type: "outgoing" },
    ],
    photos: [
      { name: "lab_east_window.jpg", desc: "Photo of east-facing window in Lab B — taken 11:10 AM (during Ryan's morning session)", suspicious: true },
      { name: "laptop_desk.jpg", desc: "Close-up of Alex's desk and MacBook — taken 11:15 AM", suspicious: true },
      { name: "campus_map.jpg", desc: "Photo of a campus map with the alley behind Lab B circled", suspicious: true },
    ],
    notes: [
      { title: "Listing Draft", content: "MacBook Pro 16\" Silver (2023). Like new. Factory reset. $1,100 OBO. Cash only. No questions.", suspicious: true },
      { title: "Reminder", content: "Study group Room 210 — tell Prof Adams you have class conflict (cover)" },
      { title: "Lab codes", content: "B-wing east window latch — broken since Sept, won't alarm" },
    ]
  }
};
