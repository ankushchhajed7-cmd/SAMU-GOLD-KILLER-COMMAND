# SAMU GOLD KILLER — strategy (v1.05)

Original: "GOLD KILLER V10" (MT4, InstaForex). MT5 clone, rules 2267 trades + live tick record se nikale.

## Grid (BUY side; SELL ulta, dono alag chalte hain)
1. BUY STOP market se $0.80 upar. Gold gire to stop bhi neeche khiskta hai (min $0.05 step).
2. Gold $0.80 palte → trade.
3. Agla level pichhle (sabse neeche) BUY se kam se kam $0.80 neeche.
4. Lot = 0.01 × 1.3^(level−1): 0.01 0.01 0.02 0.02 0.03 0.04 0.05 0.06 0.08 0.11 …
5. Side ka profit ≥ $30 → us side ke sab trade band.

## Kab nayi basket (v1.05 APP mode)
- Sirf START ke baad: app ya chart ka START button. Window 30/60/90 min, max TP 1/2/3 (default 60 min, 2 TP).
- Max TP ya window khatam → nayi basket band. Khuli basket ke level aur $30 TP chalte rehte hain.
- Window ke baad (ya STOP ke baad) basket $1+ profit me ho → turant band.
- Shaant check: pichhle 30 min ka gold range < $5 tabhi nayi basket.
- News: high-impact USD news se 30 min pehle / baad nayi basket nahi.
- FIXED mode = v1.04 jaisa: 09:00–10:30 aur 22:30–00:30 IST, raat ki badi news par raat band.

## Deep bounce (basket L8 par)
- Naye chhote level band. 0.20 lot ka STOP market se $2 door, pichhle trade se $2 gap, max 2.
- Side profit ≥ $15 → band. Loss ≥ $4000 → band.

## Backtest (SAMU-BACKTEST-LAB, research/gold-killer, Exness XAUUSDm M1, 10 Aug–19 Nov 2026, $10k, 3 candle path)
| Setting | Net | Account saaf | Max DD |
|---|---|---|---|
| v1.04 | −$18.1k / −$58.0k / +$23.6k | 2 / 8 / 2 | 100%+ |
| 30 min < $5 check | +$9.7k / +$18.2k / +$12.0k | 0 / 0 / 0 | 36–62% |
| v1.05 sab niyam | +$2.7k / +$3.6k / +$3.3k | 0 / 0 / 0 | 15–35% |

News filter aur app ka manual START backtest me nahi. Itihaas (data/history.json) = har din har 30-min slot par START ka nateeja, `research/gold-killer/history.mjs`.
