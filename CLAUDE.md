# Project rules (SAMU GOLD KILLER COMMAND)

Owner sirf Android phone se kaam karta hai (GitHub web + Chrome). Pehle STATE.md padho.

## Workflow
- 5 step: Discuss → Plan → Build → Verify → GitHub push.
- Har build nayi branch `feature-vX.Y.Z` par; main par seedha push nahi.
- Tests pass hon to PR khol ke main me merge (bina pooche). Test fail ya faisla baaki ho to merge nahi, owner ko batao.
- Har push par STATE.md update; badli files chat me bhi bhejo.
- Jawab Hinglish me, chhote (mobile), aakhir me IST date + time.

## App standard
- Header me hamesha ⟳ Refresh button (cache saaf, naya version, reload; user data safe) aur version number.
- `APP_VERSION` (index.html) aur `VERSION` (sw.js) saath badlo.
- Pure logic `<script id="logic">` me rakho (tests isi ko chalate hain).

## Tests (har push se pehle)
- `node tests/logic.test.js`
- `node tests/ea-check.js`

## EA
- File naam = poora naam + version, jaise `ea/SAMU GOLD KILLER v1.05.mq5`. Full-screen "Gold Luxe" dashboard.
- Strategy ka har backtest SAMU-BACKTEST-LAB repo (research/gold-killer) me hota hai, yahan nahi.
- status.json ke keys badlo to app (index.html) aur data/demo-status.json bhi saath badlo.

## Live data
- `live` branch: control.json (app), status.json (EA), news.json (workflow). Roz 18:37 IST saaf hoti hai.
- Token kabhi commit nahi. App me token PIN se AES lock hota hai.
