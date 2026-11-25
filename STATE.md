# STATE — SAMU GOLD KILLER COMMAND

## Abhi
**v1.1.2** (branch `feature-v1.1.2`), 25 Nov 2026 — CLOSE button daba ke rakhne par text select nahi hota.

## Version history
| Version | Date | Kya |
|---|---|---|
| v1.1.2 | 25 Nov 2026 | Phone par CLOSE SELL daba ke rakhne se "CLOSE" text select ho gaya aur hold toot gaya. Buttons par user-select none + touch-callout none + touch-action none + pointer capture. Merge push par GitHub ne Pages nahi chalaya tha, dusre chhote merge se dobara. |
| v1.1.1 | 25 Nov 2026 | Pehle live test (CLOSE BUY, demo 1546, EA v1.05 token type karke): pehli baar "Unexpected end of JSON input" (GitHub 502 khaali jawab), dusri baar OK. Ab jawab safe padhte hain + 5xx / 409 / 422 / network par 2 baar khud dobara (naya sha). EA v1.05 live: status har 30 sec aa raha. |
| v1.1.0 | 25 Nov 2026 | Owner: VPS par token paste mushkil. **EA v1.06**: GitHubToken khaali → dashboard par JODO CODE (9 akshar, jaise K7M-3QX-9PA). App Settings → "EA jodo" → app token ko code se lock karke `live/pair.json` (SHA-256 KDF 5000 + XOR stream, id = SHA256("SGKID:"+code)[0..8]). EA har 30 sec bina token padhta, kholta, `MQL5\Files` (Common) `SGK_tok_<magic>.txt` me save, pair.json mitata. 401 → file mit ke naya code. Tests: JS sha256 = node crypto, Python se KDF jaanch. |
| v1.0.0 | 25 Nov 2026 | App (COMMAND / ANALYSIS / TRADES / STRATEGY / SETTINGS, Gold Luxe, risk ring + START, blink/awaaz/vibrate/notification option, token PIN se AES lock, ⟳ Refresh, demo `?demo=1`). EA `SAMU GOLD KILLER v1.05` (APP mode START/STOP/CLOSE via GitHub, max 2 TP, window ke baad $1 profit close, 30 min < $5 shaant check, deep bounce L8, status har 30 sec). Workflow `live.yml` (ForexFactory USD news har ghante, roz branch saaf). Itihaas data 101 din (Lab). |

## Ek baar ka setup
1. Repo Settings → Pages → Branch `main` / root (app ka link: README).
2. GitHub → Settings → Developer settings → Fine-grained token → sirf is repo → Contents: Read and write. Expiry 90 din.
3. App → SETTINGS → token + PIN save → "Connection jaancho".
4. VPS MT5 → Tools → Options → Expert Advisors → Allow WebRequest → `https://api.github.com`.
5. `SAMU GOLD KILLER v1.06` (VPS Helper se aata hai) → XAUUSDm chart → `ControlMode = APP`, `GitHubToken` khaali.
6. Dashboard ka JODO CODE → app Settings → "EA jodo".
7. App me hara "EA LIVE" dikhe → START.

## Faisle
- Market ka "agla 1 ghanta" bhavishyavaani nahi — app pichhle data (range, news, isi samay ka itihaas) se GREEN / YELLOW / RED deta hai. START owner dabata hai.
- RED par bhi START ho sakta hai, par alag se "Phir bhi START" poochta hai.
- EA ka command 10 min se purana ho to ignore. Ek command ka jawab aane tak app agla command nahi bhejta (zabardasti bhej sakte ho).
- CLOSE ALL = sab band + START band. STOP = nayi basket band, khuli basket $1+ profit par band.
- Repo public hai: live branch me equity / basket dikh sakta hai (account no. sirf aakhri 4 ank). Chhupana ho to live data alag private repo me (app + EA me repo badal sakte hain).

## Baaki
- EA v1.06 samusignal/vps-ea me (VPS Helper). Demo 1546 par 1–2 hafte test.
- MetaEditor me compile check (yahan compile nahi hota; tests/ea-check.js saadhi jaanch karta hai).
- Tester me APP mode = Session1/Session2 shuru par khud START (Lab jaisa).
