// EA file ki saadhi jaanch (MetaEditor yahan nahi): brackets, zaroori functions/inputs, version
const fs = require('fs');
const f = 'ea/SAMU GOLD KILLER v1.06.mq5';
const src = fs.readFileSync(f, 'utf8');
let code = '', i = 0, n = src.length;
while (i < n) {                                  // strings, chars, comments hatao
  const c = src[i], d = src[i + 1];
  if (c === '/' && d === '/') { while (i < n && src[i] !== '\n') i++; continue; }
  if (c === '/' && d === '*') { i += 2; while (i < n && !(src[i] === '*' && src[i + 1] === '/')) i++; i += 2; continue; }
  if (c === '"' || c === "'") { const q = c; i++; while (i < n && src[i] !== q) { if (src[i] === '\\') i++; i++; } i++; code += q + q; continue; }
  code += c; i++;
}
let fail = 0;
const ok = (cond, msg) => { console.log((cond ? 'PASS ' : 'FAIL ') + msg); if (!cond) fail++; };
const st = []; const pairs = { ')': '(', ']': '[', '}': '{' }; let bad = null, line = 1;
for (const ch of code) { if (ch === '\n') line++; if ('([{'.includes(ch)) st.push([ch, line]); else if (pairs[ch]) { const t = st.pop(); if (!t || t[0] !== pairs[ch]) { bad = line; break; } } }
ok(!bad && st.length === 0, 'brackets barabar' + (bad ? ' (line ' + bad + ')' : st.length ? ' (khula: line ' + st[st.length - 1][1] + ')' : ''));
ok(/#property version\s+"1\.06"/.test(src), 'property version 1.06');
ok(src.includes('v1.06"') || src.includes('·  v1.06'), 'dashboard par v1.06');
for (const fn of ['Banner', 'RemoteOn', 'WindowOpen', 'Arm', 'Disarm', 'SaveArm', 'LoadArm', 'UpdateCalm', 'GhReq', 'PollControl', 'HandleCmd', 'PushStatus', 'BuildStatus', 'DeepCount', 'Base64', 'JStr', 'JEsc', 'InitToken', 'MakePairCode', 'ResetToken', 'PairDecrypt', 'PollPair', 'Sha', 'Unhex', 'HexOf'])
  ok(new RegExp('\\b(void|bool|int|string|double)\\s+' + fn + '\\s*\\(').test(code), 'function ' + fn);
const defs = {}; for (const m of code.matchAll(/\b(?:void|bool|int|string|double|long)\s+([A-Za-z_]\w*)\s*\([^;{]*\)\s*\{/g)) defs[m[1]] = (defs[m[1]] || 0) + 1;
ok(Object.values(defs).every(v => v === 1), 'koi function do baar nahi' + JSON.stringify(Object.entries(defs).filter(([, v]) => v > 1)));
for (const inp of ['ControlMode', 'GitHubToken', 'GitHubRepo', 'GitHubBranch', 'PollSec', 'StatusSec', 'CmdExpiryMin', 'DefaultWindowMin', 'DefaultMaxTP', 'EndCloseUSD', 'CalmRangeUSD', 'CalmMinutes', 'UseDeepBounce', 'DeepFromLevel', 'DeepLot', 'DeepDistance', 'DeepGap', 'DeepMaxTrades', 'DeepTP_USD', 'DeepHardLossUSD'])
  ok(new RegExp('input\\s+\\w+\\s+' + inp + '\\s*=').test(src), 'input ' + inp);
// defaults = Lab ka sabse safe set
const val = k => (src.match(new RegExp('input\\s+\\w+\\s+' + k + '\\s*=\\s*([^;]+);')) || [])[1];
ok(val('CalmRangeUSD') === '5.0' && val('CalmMinutes') === '30', 'shaant check $5 / 30 min');
ok(val('DefaultMaxTP') === '2' && val('EndCloseUSD') === '1.0', 'max 2 TP, window ke baad $1');
ok(val('DeepFromLevel') === '8' && val('DeepLot') === '0.20' && val('DeepTP_USD') === '15.0' && val('DeepHardLossUSD') === '4000.0', 'deep bounce L8 / 0.20 / $15 / $4000');
// status.json me app ke zaroori keys
for (const k of ['ea', 't', 'acc', 'bid', 'sp', 'bal', 'eq', 'fl', 'tp', 'mode', 'armed', 'armEnd', 'tpDone', 'maxTP', 'endClose', 'calm', 'news', 'buy', 'sell', 'deep', 'today', 'lastCmd', 'banner', 'trades', 'bars'])
  ok(src.includes('\\"' + k + '\\":'), 'status key ' + k);
for (const c of ['START', 'STOP', 'CLOSE_BUY', 'CLOSE_SELL', 'CLOSE_ALL']) ok(src.includes('cmd == "' + c + '"'), 'command ' + c);
ok(!/k8l", "k8v"/.test(src), 'naya 9va DETAILS row delete nahi hota');
ok(/TP .*armTP\+\+/s.test(src.slice(src.indexOf('void HandleSide'), src.indexOf('int DeepCount'))), 'TP par armTP++');
ok(src.includes('!WindowOpen() && s.profit >= EndCloseUSD'), 'window ke baad profit close');
ok(src.includes('calmBlock'), 'nayi basket par shaant check');
ok(/Authorization: Bearer " \+ ghTok/.test(src) && !/Bearer " \+ GitHubToken/.test(src), 'requests ghTok se (file / input)');
ok(src.includes('GhUrl("pair.json", true)') && src.includes('"DELETE"'), 'pair.json padh ke mitata hai');
ok(src.includes('c == 401 && tokFromFile'), '401 par naya code');
console.log(fail ? fail + ' FAIL' : 'ALL PASS'); process.exit(fail ? 1 : 0);
