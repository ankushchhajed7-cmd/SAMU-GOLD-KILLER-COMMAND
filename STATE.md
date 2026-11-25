# STATE — SAMU GOLD KILLER COMMAND

## Abhi
**v1.0.0** (branch `feature-v1.0.0`), 25 Nov 2026 — pehla build: app + EA v1.05 + live branch workflow.

## Version history
| Version | Date | Kya |
|---|---|---|
| v1.0.0 | 25 Nov 2026 | App (COMMAND / ANALYSIS / TRADES / STRATEGY / SETTINGS, Gold Luxe, risk ring + START, blink/awaaz/vibrate/notification option, token PIN se AES lock, ⟳ Refresh, demo `?demo=1`). EA `SAMU GOLD KILLER v1.05` (APP mode START/STOP/CLOSE via GitHub, max 2 TP, window ke baad $1 profit close, 30 min < $5 shaant check, deep bounce L8, status har 30 sec). Workflow `live.yml` (ForexFactory USD news har ghante, roz branch saaf). Itihaas data 101 din (Lab). |

## Ek baar ka setup
1. Repo Settings → Pages → Branch `main` / root (app ka link: README).
2. GitHub → Settings → Developer settings → Fine-grained token → sirf is repo → Contents: Read and write. Expiry 90 din.
3. App → SETTINGS → token + PIN save → "Connection jaancho".
4. VPS MT5 → Tools → Options → Expert Advisors → Allow WebRequest → `https://api.github.com`.
5. `ea/SAMU GOLD KILLER v1.05.mq5` compile → XAUUSDm chart → inputs: `GitHubToken`, `ControlMode = APP`.
6. App me hara "EA LIVE" dikhe → START.

## Faisle
- Market ka "agla 1 ghanta" bhavishyavaani nahi — app pichhle data (range, news, isi samay ka itihaas) se GREEN / YELLOW / RED deta hai. START owner dabata hai.
- RED par bhi START ho sakta hai, par alag se "Phir bhi START" poochta hai.
- EA ka command 10 min se purana ho to ignore. Ek command ka jawab aane tak app agla command nahi bhejta (zabardasti bhej sakte ho).
- CLOSE ALL = sab band + START band. STOP = nayi basket band, khuli basket $1+ profit par band.
- Repo public hai: live branch me equity / basket dikh sakta hai (account no. sirf aakhri 4 ank). Chhupana ho to live data alag private repo me (app + EA me repo badal sakte hain).

## Baaki
- EA v1.05 abhi sirf is repo me. Demo 1546 par 1–2 hafte test, phir VPS Helper (samusignal/vps-ea).
- MetaEditor me compile check (yahan compile nahi hota; tests/ea-check.js saadhi jaanch karta hai).
- Tester me APP mode = Session1/Session2 shuru par khud START (Lab jaisa).
