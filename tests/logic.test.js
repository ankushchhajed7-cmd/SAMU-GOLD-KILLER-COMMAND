// App ki logic + files ki jaanch:  node tests/logic.test.js
const fs = require('fs'), vm = require('vm');
let fail = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fail++; };
const html = fs.readFileSync('index.html', 'utf8');
const logic = html.match(/<script id="logic">([\s\S]*?)<\/script>/)[1];
const ctx = { btoa: s => Buffer.from(s, 'binary').toString('base64'), atob: s => Buffer.from(s, 'base64').toString('binary'), module: {} };
vm.createContext(ctx); vm.runInContext(logic, ctx);
const L = ctx.module.exports;

// version: index.html aur sw.js saath
const av = (html.match(/APP_VERSION = '([\d.]+)'/) || [])[1], sv = (fs.readFileSync('sw.js', 'utf8').match(/sgkc-v([\d.]+)/) || [])[1];
ok(av && av === sv, 'APP_VERSION ' + av + ' = sw VERSION ' + sv);
ok(html.includes('id="refresh"') && html.includes('id="ver"'), 'header me Refresh button + version');

// har $('id') ka element maujood
const ids = new Set([...html.matchAll(/id="([\w-]+)"/g)].map(m => m[1]));
const used = [...new Set([...html.matchAll(/\$\('([\w-]+)'\)/g)].map(m => m[1]))].filter(x => !['pinAsk'].includes(x));
const missing = used.filter(x => !ids.has(x)); ok(!missing.length, 'sab $(id) element maujood ' + missing.join(','));

// time
ok(L.istMin(0) === 330, 'GMT 00:00 = IST 05:30');
ok(L.hm(545) === '09:05' && L.hm(-5) === '23:55', 'hm format');
ok(L.money(-1234.5) === '−$1,234.50' && L.money(12, true) === '+$12.00', 'money format');

// range
const t0 = 1_800_000_000; const bars = []; for (let i = 0; i < 120; i++) bars.push([t0 + i * 60, 100, 100 + (i >= 90 ? 3 : 1), 100 - (i >= 90 ? 1 : 0.5), 100]);
const now = t0 + 120 * 60;
ok(L.range(bars, 30, now) === 4, 'pichhle 30 min range = $4');
ok(L.range(bars, 60, now) === 4 && L.range(bars, 120, now) === 4, '60/120 min range');
ok(L.range([], 30, now) === null, 'khali bars = null');
ok(L.regime(3) === 'calm' && L.regime(7) === 'normal' && L.regime(12) === 'fast', 'regime');

// history.json
const H = JSON.parse(fs.readFileSync('data/history.json', 'utf8'));
ok(Object.keys(H.slots).length === 48, 'history: 48 slot');
const s9 = L.slotStats(H, 545, 'normal'); ok(s9 && s9.n >= 8 && 'big15' in s9 && 'plWorst' in s9, 'slot 09:00 normal stats');
ok(L.slotStats(H, 545, 'calm').used === 'all', 'kam din wala regime -> sab din');

// news
const nn = L.newsNear([[now + 1800, 'USD CPI'], [now + 9000, 'USD X'], [now - 600, 'USD Old']], now);
ok(nn.minsTo === 30 && nn.next[1] === 'USD CPI' && nn.recent[1] === 'USD Old', 'news: agli 30 min, abhi 10 min pehle');

// verdict
const slotOk = { n: 70, win: 99, big15: 10, big25: 0, plWorst: 5, deep8: 50 };
let v = L.verdict({ online: true, r30: 3, r60: 6, spread: 0.16, news: { minsTo: null }, slot: slotOk });
ok(v.level === 'GREEN', 'shaant market = GREEN (' + v.score + ')');
v = L.verdict({ online: true, r30: 6, r60: 8, spread: 0.16, news: { minsTo: null }, slot: slotOk });
ok(v.level === 'YELLOW', '30m $6 = YELLOW');
v = L.verdict({ online: true, r30: 12, r60: 14, spread: 0.16, news: { minsTo: null }, slot: slotOk });
ok(v.level === 'RED', '30m $12 = RED');
v = L.verdict({ online: true, r30: 3, r60: 6, spread: 0.16, news: { minsTo: 40, next: [0, 'USD CPI'] }, slot: slotOk });
ok(v.level === 'RED' && v.reasons.some(r => /CPI/.test(r.text)), 'news 40 min me = RED');
v = L.verdict({ online: true, r30: 3, r60: 6, spread: 0.16, news: { minsTo: null }, slot: { n: 70, win: 96, big15: 30, big25: 25, plWorst: -2410, deep8: 60 } });
ok(v.level === 'RED', 'itihaas me -$2.4k = RED');
v = L.verdict({ online: false });
ok(v.level === 'RED' && v.score === 100, 'EA offline = RED');

// command
const c = L.cmd('START', { win: 60, maxTP: 2 }, 1764080000123);
ok(c.id === 1764080000123 && c.ts === 1764080000 && c.cmd === 'START' && c.win === 60, 'START command banta hai');
ok(L.unb64(L.b64('·₹ START')) === '·₹ START', 'base64 UTF-8 aana-jaana');

// demo status = EA status keys
const D = JSON.parse(fs.readFileSync('data/demo-status.json', 'utf8'));
const ea = fs.readFileSync('ea/SAMU GOLD KILLER v1.05.mq5', 'utf8');
const miss = Object.keys(D).filter(k => !ea.includes('\\"' + k + '\\":'));
ok(!miss.length, 'demo ke sab keys EA bhejta hai ' + miss.join(','));
ok(D.bars.length === 120 && D.bars[0].length === 5, 'demo 120 bars');

// manifest + sw shell files maujood
const man = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
ok(man.icons.every(i => fs.existsSync(i.src)), 'manifest icons maujood');
const shell = (fs.readFileSync('sw.js', 'utf8').match(/SHELL = \[([^\]]+)\]/) || [])[1].match(/'([^']+)'/g).map(x => x.slice(1, -1)).filter(x => x !== './');
ok(shell.every(f => fs.existsSync(f)), 'sw shell files maujood');

console.log(fail ? fail + ' FAIL' : 'ALL PASS'); process.exit(fail ? 1 : 0);
