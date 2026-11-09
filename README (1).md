# ProgressTrack

**ProgressTrack** is a teacher-focused web app for tracking student progress across classwork, homework, exercises, tests, and exams. It helps you manage multiple classes and subjects, spot missing work early, and share read-only progress links with parents.

Built as a modern single-page app (HTML, CSS, JavaScript, Bootstrap 5) with optional PWA install support.

---

## Features

### Classes & students
- Manage multiple classes by **subject** and **grade level**
- Track students separately per class
- Import students from a list
- Optional **gender** field (used for balanced grouping)

### Academic periods
- Academic **years** and **terms**
- Filter work and scores by the active term

### Class work & assessment
- Create exercises, homework, exams, and other work (topic, date, total score)
- Batch grade with a class grade sheet
- Record individual scores and comments
- **Comment bank** for quick feedback phrases

### Progress tracking
- Student averages and improvement trends
- Dashboard overview of classes, students, and attention items
- Class comparison (averages, completion, missing work)
- Missing-work alerts for students who have not submitted work

### Groups & seating
- Create class groups manually
- **Balanced auto-group** by assessment marks (or class average)
- Optional **gender balance** across groups
- Simple seating chart (grid, auto-fill, clear seats)

### Parent sharing
- **Live parent link** (one link per student that updates when marks change)
  - Requires a free Firebase Realtime Database URL (one-time setup)
- Snapshot share link
- Downloadable HTML progress report for a single student

### Data & backup
- Data stored in the browser (**localStorage**)
- Backup and restore via JSON export/import
- Works offline for core classroom use after first load (PWA)

### Interface
- Desktop sidebar + mobile bottom navigation
- Dark / light mode
- Responsive layout (mobile-friendly cards and tables)
- Collapsible desktop sidebar

---

## Quick start

### Option A — Open locally
1. Download or clone this repository.
2. Open `index.html` in a modern browser  
   (Chrome, Edge, Firefox, or Safari).

> Note: Some features (PWA service worker, live parent links) work best when the app is served over **HTTPS** or `localhost`.

### Option B — Local server
```bash
# From the project folder
npx --yes serve -p 4173
# Open http://localhost:4173
```

---

## Deploy free on GitHub Pages

1. Create a public GitHub repository.
2. Upload at least:
   - `index.html`
   - `manifest.webmanifest` (if using PWA)
   - `sw.js` (if using PWA)
   - `icons/` (app icons)
3. Go to **Settings → Pages**.
4. Source: **Deploy from a branch**
5. Branch: `main`, folder: `/ (root)`
6. Save and wait a minute.

Your app will be available at:

```text
https://YOUR_USERNAME.github.io/REPO_NAME/
```

---

## PWA (install as an app)

When hosted on HTTPS (for example GitHub Pages), ProgressTrack can be installed:

- **Android (Chrome):** browser menu → **Install app** / **Add to Home screen**
- **iPhone (Safari):** Share → **Add to Home Screen**
- **Desktop (Chrome/Edge):** install icon in the address bar

Related files:

| File | Purpose |
|------|---------|
| `manifest.webmanifest` | App name, icons, display mode |
| `sw.js` | Offline caching |
| `icons/` | App icons (192, 512, Apple touch, favicon) |

---

## Live parent links (optional setup)

Live links let you send a parent **one link** that continues to show updated marks.

### One-time setup (free Firebase)
1. Open [Firebase Console](https://console.firebase.google.com) and create a free project.
2. **Build → Realtime Database → Create Database** (start in test mode is fine to begin).
3. Copy the database URL (ends with `.firebaseio.com`).
4. In ProgressTrack, open a student profile → **Share with parent**.
5. Paste the URL into **Live backend URL**.
6. In Firebase **Rules**, publish:

```json
{
  "rules": {
    "parentShares": {
      ".read": true,
      ".write": true
    }
  }
}
```

7. Turn **Enable** on → **Copy** the link → send it to the parent once.

Without Firebase, you can still:
- Copy a **snapshot** link
- Download an **HTML report** for that student

---

## Balanced auto-grouping

In a class workspace → **Groups** → **Balanced auto-group**:

- Choose number of groups
- Group by **class average** or a **specific assessment**
- Optionally balance **gender**
- Optionally replace existing groups

For best gender balance, set each student’s gender in their profile.

---

## Project structure

```text
student-tracker/
├── index.html              # Main app (UI + logic)
├── manifest.webmanifest    # PWA manifest
├── sw.js                   # Service worker
├── icons/                  # App icons
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── apple-touch-icon.png
│   └── favicon-32.png
└── README.md
```

Capacitor packaging files (for Play Store builds) may live in a separate `progress-track/` folder if you use that workflow.

---

## Data privacy

- Class and student data are stored **on the device** in browser local storage by default.
- Backup files are created only when you export them.
- Live parent links share **only that student’s** progress summary through your Firebase path.
- Do not put private school data in a public place without following your school’s data-protection rules.

---

## Browser support

- Latest Chrome, Edge, Firefox, and Safari
- Mobile and desktop layouts supported

---

## Roadmap ideas

- Multi-device sync with a full teacher account system
- Printable report cards by term
- Attendance tracking
- Richer analytics and export to CSV/PDF

---

## License

This project is provided for educational use. Add your preferred license (for example MIT) if you publish it as open source.

---

## Credits

ProgressTrack — built for teachers who need a simple, clear way to track learning progress and support every student.
