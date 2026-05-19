
document.getElementById('formConfirmacion').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que la página se recargue

    const personas = document.getElementById('personas').value;

    if (!personas) {
        alert('⚠️ Por favor, completa todos los campos.');
        return;
    }

    const numeroWhatsApp = '+584245419617';

    const mensaje = `🎉 *Confirmamos la Asistencia - Anyel Mathias* 🎉\n\n` +
        `👥 *Personas:* ${personas}\n` +
        `¡Gracias por invitarnos! Nos vemos el 30 de mayo.❤️❤️❤️`;

    // Genera el enlace oficial de WhatsApp
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    // Abre en nueva pestaña (funciona en móvil y PC)
    window.open(url, '_blank');
});

(function () {
    'use strict';

    /* ── COUNTDOWN ── */
    const ED = new Date('2026-05-30T17:00:00'), pad = n => String(n).padStart(2, '0');
    function tick() { const s = Math.max(0, Math.floor((ED - new Date()) / 1000)); document.getElementById('days').textContent = pad(Math.floor(s / 86400)); document.getElementById('hours').textContent = pad(Math.floor((s % 86400) / 3600)); document.getElementById('minutes').textContent = pad(Math.floor((s % 3600) / 60)); document.getElementById('seconds').textContent = pad(s % 60) }
    tick(); setInterval(tick, 1000);

    /* ── REVEAL ── */
    const io = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible') }), { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    document.querySelector('.hero').classList.add('visible');

    /* ── BG DECO ── */
    const BL = document.getElementById('BL'), CL = document.getElementById('CL');
    ['red', 'gold', 'black', 'blue'].forEach(c => { for (let i = 0; i < 4; i++) { const b = document.createElement('div'); b.className = `balloon ${c}`; b.style.cssText = `left:${Math.random() * 100}%;animation-duration:${10 + Math.random() * 14}s;animation-delay:${Math.random() * -20}s;transform:scale(${.6 + Math.random() * .9})`; BL.appendChild(b); } });
    ['red', 'gold', 'black', 'blue', 'cream'].forEach(c => { for (let i = 0; i < 8; i++) { const x = document.createElement('div'); x.className = `confetti ${c}`; x.style.cssText = `left:${Math.random() * 100}%;animation-duration:${8 + Math.random() * 10}s;animation-delay:${Math.random() * -20}s;transform:rotate(${Math.random() * 180}deg) scale(${.6 + Math.random()})`; CL.appendChild(x); } });

    /* ── HOVER TILT ── */
    document.querySelectorAll('.msg-card,.info-card,.count-box').forEach(el => {
        el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; el.style.transform = `translateY(-3px) perspective(600px) rotateX(${(-y * 3).toFixed(1)}deg) rotateY(${(x * 3).toFixed(1)}deg)`; });
        el.addEventListener('mouseleave', () => { el.style.transform = '' });
    });

    /* ── RSVP ── */
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', e => {
            e.preventDefault();
            const n = document.getElementById('fName'), p = document.getElementById('fPpl'), ph = document.getElementById('fPhone');
            const ne = document.getElementById('fNerr'), pe = document.getElementById('fPerr'), phe = document.getElementById('fPherr');
            ne.textContent = ''; pe.textContent = ''; phe.textContent = ''; let ok = true;
            if (!n.value.trim()) { ne.textContent = 'Este campo es obligatorio.'; ok = false; }
            if (!p.value) { pe.textContent = 'Selecciona una cantidad.'; ok = false; }
            if (!ph.value.trim()) { phe.textContent = 'Este campo es obligatorio.'; ok = false; }
            else if (ph.value.trim().length < 7) { phe.textContent = 'Número inválido.'; ok = false; }
            if (!ok) return;
            document.getElementById('formOk').textContent = `🎉 ¡Gracias, ${n.value.trim()}! Asistencia confirmada para ${p.value} persona(s). ¡Anyel Mathias te espera el 30 de mayo!`;
            e.target.reset();
        });
    }

    /* ── STARS & CLOUDS IN SKY ── */
    const skyBg = document.getElementById('skyBg');
    const sSt = document.createElement('style');
    sSt.textContent = `@keyframes cloudDrift{from{transform:translateX(-180px)}to{transform:translateX(calc(100vw + 180px))}}`;
    document.head.appendChild(sSt);
    for (let i = 0; i < 90; i++) { const s = document.createElement('div'); const sz = Math.random() * 3.5 + .8; s.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;border-radius:50%;background:rgba(255,255,255,${.25 + Math.random() * .8});top:${Math.random() * 88}%;left:${Math.random() * 100}%;animation:tw ${1.4 + Math.random() * 3}s ease-in-out infinite;animation-delay:${Math.random() * 3}s`; skyBg.appendChild(s); }
    for (let i = 0; i < 6; i++) { const c = document.createElement('div'); c.textContent = '☁'; c.style.cssText = `position:absolute;font-size:${2.5 + Math.random() * 4}rem;top:${8 + Math.random() * 38}%;left:-180px;opacity:${.06 + Math.random() * .1};animation:cloudDrift ${38 + Math.random() * 32}s linear infinite;animation-delay:${Math.random() * -42}s;filter:blur(1px);color:#fff`; skyBg.appendChild(c); }

    /* ═══════════════════════════════════════════
       FULLSCREEN LOGIC
    ═══════════════════════════════════════════ */
    const bOverlay = document.getElementById('balloonFS');


    function openFS(el) { el.classList.add('open'); document.body.classList.add('fs-open'); }
    function closeFS(el) {
        el.classList.remove('open'); document.body.classList.remove('fs-open');
        if (el === bOverlay && bActive) { bActive = false; clearInterval(bTimer); clearInterval(bSpawnT); resetBStart(); }
    }
    ['click', 'keydown'].forEach(ev => {
        document.getElementById('openBalloon').addEventListener(ev, e => { if (ev === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return; e.preventDefault(); openFS(bOverlay); });
    });
    document.getElementById('closeBalloon').addEventListener('click', () => closeFS(bOverlay));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { if (bOverlay.classList.contains('open')) closeFS(bOverlay); } });

    /* ═══════════════════════════════════════════
       BALLOON GAME
    ═══════════════════════════════════════════ */
    const bArea = document.getElementById('bArea');
    const bScoreEl = document.getElementById('bScore'), bHSEl = document.getElementById('bHS');
    const bTimeEl = document.getElementById('bTime'), bPoppedEl = document.getElementById('bPopped');
    const bComboEl = document.getElementById('bCombo'), bLivesEl = document.getElementById('bLives');
    const bStartBtn = document.getElementById('bStart'), bSndBtn = document.getElementById('bSnd');
    const bEndEl = document.getElementById('bEnd'), bEt = document.getElementById('bEt');
    const bEsv = document.getElementById('bEsv'), bEhs = document.getElementById('bEhs');
    const bNhs = document.getElementById('bNhs'), bEm = document.getElementById('bEm');
    const bReplay = document.getElementById('bReplay'), bCloseEnd = document.getElementById('bCloseEnd');
    const tmPill = document.getElementById('tmPill'), bgMsg = document.getElementById('bgMsg');
    const slowFX = document.getElementById('slowFX'), bFlash = document.getElementById('bFlash');

    let bSc = 0, bPop = 0, bTime = 30, bLives = 3, bComb = 0;
    let bTimer = null, bSpawnT = null, bActive = false, bSoundOn = false, bHighScore = 0, bDiff = 'easy', bSlow = false;
    let bACtx = null;

    const DIFF = { easy: { ms: 980, minD: 5.5, maxD: 9, bomb: .05 }, normal: { ms: 660, minD: 4, maxD: 7, bomb: .1 }, hard: { ms: 430, minD: 2.8, maxD: 5.2, bomb: .16 } };
    const TYPES = [{ cls: 'red', pts: 10, prob: .37, badge: '', sz: 'sm' }, { cls: 'gold', pts: 20, prob: .27, badge: '', sz: 'md' }, { cls: 'dark', pts: 30, prob: .16, badge: '', sz: 'sm' }, { cls: 'star', pts: 50, prob: .06, badge: '⭐', sz: 'md' }, { cls: 'slow', pts: 0, prob: .06, badge: '⚡', sz: 'sm' }, { cls: 'bomb', pts: -20, prob: .08, badge: '💣', sz: 'md' }];

    function beep(f = 660, d = .09, t = 'sine', v = .05) { if (!bSoundOn) return; try { bACtx = bACtx || new (window.AudioContext || window.webkitAudioContext)(); const o = bACtx.createOscillator(), g = bACtx.createGain(); o.type = t; o.frequency.value = f; g.gain.setValueAtTime(v, bACtx.currentTime); g.gain.exponentialRampToValueAtTime(.001, bACtx.currentTime + d); o.connect(g).connect(bACtx.destination); o.start(); o.stop(bACtx.currentTime + d); } catch (e) { } }
    function pPop(c) { const F = { red: 580, gold: 780, dark: 400, star: 1020, slow: 640, bomb: 160 }[c] || 600; beep(F, .06, 'triangle', .08); setTimeout(() => beep(F * .8, .05, 'sine', .05), 55); }
    function pBomb() { beep(140, .28, 'sawtooth', .14); }
    function pSlow() { beep(900, .08, 'sine', .06); setTimeout(() => beep(700, .1, 'sine', .04), 100); }
    function pCombo() { beep(880, .05, 'sine', .08); setTimeout(() => beep(1100, .07, 'sine', .06), 80); }

    function updateLives() { bLivesEl.querySelectorAll('.lh').forEach((h, i) => h.classList.toggle('lost', i >= bLives)); }
    function showMsg(t, temp = true) { bgMsg.textContent = t; bgMsg.style.opacity = '1'; if (temp) setTimeout(() => { if (bActive) bgMsg.style.opacity = '0'; }, 2400); }

    function doCombo(pts) {
        bComb++; const m = Math.min(4, 1 + Math.floor(bComb / 3)); bComboEl.textContent = `×${m}`;
        if (bComb >= 3) { const cp = document.createElement('div'); cp.className = 'combopop'; cp.textContent = `🔥 COMBO ×${m}!`; cp.style.cssText = `font-size:${1.6 + m * .2}rem;top:28%`; bArea.appendChild(cp); setTimeout(() => cp.remove(), 980); if (bComb % 3 === 0) pCombo(); }
        return m;
    }
    function breakCombo() { bComb = 0; bComboEl.textContent = '×1'; }

    function burst(x, y, c) {
        const cols = { red: 'rgba(196,30,58,.85)', gold: 'rgba(255,199,0,.9)', dark: 'rgba(80,80,80,.9)', star: 'rgba(245,158,11,.95)', slow: 'rgba(8,145,178,.85)', bomb: 'rgba(255,60,60,.9)' };
        const b = document.createElement('div'); b.className = 'burstfx'; b.style.cssText = `left:${x}px;top:${y}px;width:90px;height:90px;background:radial-gradient(circle,${cols[c] || 'rgba(255,199,0,.85)'} 0%,transparent 68%);box-shadow:0 0 40px ${cols[c] || 'rgba(255,199,0,.6)'}`; bArea.appendChild(b); setTimeout(() => b.remove(), 460);
        for (let i = 0; i < 14; i++) { const p = document.createElement('div'); const pc = ['red', 'gold', 'black', 'blue'][Math.floor(Math.random() * 4)]; p.className = 'ptcl'; const a = (Math.PI * 2 * i) / 14, v = 65 + Math.random() * 75; p.style.cssText = `left:${x}px;top:${y}px;width:10px;height:10px;background:var(--${pc});--tx:${Math.cos(a) * v}px;--ty:${Math.sin(a) * v}px`; bArea.appendChild(p); setTimeout(() => p.remove(), 700); }
    }
    function popMsg(x, y, t) { const m = document.createElement('div'); m.className = 'popmsg'; m.textContent = t; m.style.cssText = `left:${x}px;top:${y}px`; bArea.appendChild(m); setTimeout(() => m.remove(), 920); }
    function activateSlow() { if (bSlow) return; bSlow = true; slowFX.style.display = 'block'; pSlow(); showMsg('⚡ ¡SLOW activado! 3 segundos de globos lentos.', false); bArea.querySelectorAll('.gbln').forEach(b => { b.style.animationDuration = `${parseFloat(getComputedStyle(b).animationDuration) + 2.8}s`; }); setTimeout(() => { bSlow = false; slowFX.style.display = 'none'; if (bActive) showMsg('⚡ Slow terminado. ¡Sigue!', true); }, 3000); }

    function pickType() { const tt = [...TYPES]; tt[5] = { ...tt[5], prob: DIFF[bDiff].bomb }; const tot = tt.reduce((s, t) => s + t.prob, 0); let r = Math.random() * tot, cum = 0; for (const t of tt) { cum += t.prob; if (r <= cum) return t; } return tt[0]; }

    function spawnBalloon() {
        if (!bActive || bTime <= 0) return;
        const cfg = DIFF[bDiff], type = pickType();
        const sM = bSlow ? 1.9 : 1, pM = 1 + (30 - bTime) * .015;
        const dur = (cfg.minD + Math.random() * (cfg.maxD - cfg.minD)) * sM / pM;
        const b = document.createElement('div');
        b.className = `gbln ${type.cls} ${type.sz}`;
        b.style.cssText = `left:${Math.random() * 80 + 5}%;top:0;--dx:${(Math.random() * 130 - 65)}px;--dr:${(Math.random() * 26 - 13)}deg;animation-duration:${dur}s`;
        const bW = type.sz === 'lg' ? 92 : type.sz === 'md' ? 74 : 60; const bH = type.sz === 'lg' ? 114 : type.sz === 'md' ? 92 : 74;
        b.innerHTML = `<div class="gbln-ears" style="width:${bW + 16}px"></div><div class="gbln-body" style="width:${bW}px;height:${bH}px">${type.badge ? `<div class="gbadge">${type.badge}</div>` : ''}<div class="gbln-face" style="width:${bW * .6}px;height:${bH * .55}px"><div class="ge l"></div><div class="ge r"></div><div class="gn"></div><div class="gs"></div></div></div>`;
        b.addEventListener('click', ev => {
            if (b.dataset.hit || !bActive) return; b.dataset.hit = '1';
            const rect = bArea.getBoundingClientRect(), x = ev.clientX - rect.left, y = ev.clientY - rect.top;
            burst(x, y, type.cls);
            if (type.cls === 'bomb') {
                popMsg(x, y, '💣 −20 pts!'); pBomb(); breakCombo(); bSc = Math.max(0, bSc - 20); bLives = Math.max(0, bLives - 1); updateLives(); bScoreEl.textContent = bSc;
                bFlash.style.display = 'block'; bFlash.style.animation = 'none'; requestAnimationFrame(() => { bFlash.style.animation = 'flashFade .4s ease-out forwards'; }); setTimeout(() => { bFlash.style.display = 'none'; }, 430);
                showMsg(`💣 ¡Bomba! −20 pts · Vidas: ${bLives}`, false);
                if (bLives <= 0) { b.remove(); endBGame(); return; }
            } else if (type.cls === 'slow') { popMsg(x, y, '⚡ SLOW!'); activateSlow(); }
            else { const m = doCombo(type.pts); const g = type.pts * m; popMsg(x, y, m > 1 ? `+${g} ×${m}🔥!` : `+${g}`); pPop(type.cls); bSc += g; bPop++; bScoreEl.textContent = bSc; bPoppedEl.textContent = bPop; }
            b.remove();
        });
        bArea.appendChild(b);
        setTimeout(() => { if (b.parentNode && !b.dataset.hit) { b.remove(); if (type.cls !== 'bomb' && type.cls !== 'slow') breakCombo(); } }, dur * 1000);
    }

    function spawnFW() {
        const cols = ['#FFC700', '#C41E3A', '#fff', '#66aaff', '#ff7a8a'];
        for (let i = 0; i < 7; i++) { setTimeout(() => { const fw = document.createElement('div'); const x = 12 + Math.random() * 76, y = 8 + Math.random() * 65, c = cols[Math.floor(Math.random() * cols.length)]; fw.style.cssText = `position:absolute;left:${x}%;top:${y}%;width:90px;height:90px;background:radial-gradient(circle,${c} 0%,transparent 68%);transform-origin:center;z-index:600;pointer-events:none;animation:fwE .85s ease-out forwards`; bArea.appendChild(fw); for (let j = 0; j < 10; j++) { const p = document.createElement('div'); const a = (Math.PI * 2 * j) / 10, v = 90 + Math.random() * 70; p.style.cssText = `position:absolute;left:calc(${x}% + 45px);top:calc(${y}% + 45px);width:8px;height:8px;border-radius:50%;background:${c};--tx:${Math.cos(a) * v}px;--ty:${Math.sin(a) * v}px;z-index:601;pointer-events:none;animation:pf .95s ease-out forwards`; bArea.appendChild(p); setTimeout(() => p.remove(), 1000); } setTimeout(() => fw.remove(), 900); }, i * 260); }
    }

    function endBGame() {
        bActive = false; clearInterval(bTimer); clearInterval(bSpawnT);
        bArea.querySelectorAll('.gbln').forEach(el => el.remove()); slowFX.style.display = 'none';
        const isNew = bSc > bHighScore; if (isNew) { bHighScore = bSc; bHSEl.textContent = bHighScore; }
        let t, m;
        if (bLives <= 0) { t = '💔'; m = `¡Sin vidas! Conseguiste ${bSc} pts y reventaste ${bPop} globos. ¡La próxima lo logras!`; }
        else if (bSc >= 500) { t = '👑'; m = `¡LEYENDA! ${bPop} globos. ¡Eres el campeón de la fiesta de Anyel!`; }
        else if (bSc >= 300) { t = '🏆'; m = `¡Increíble! ${bPop} globos y ${bSc} pts. ¡Nos vemos el 30 de mayo!`; }
        else if (bSc >= 150) { t = '🌟'; m = `¡Muy bien! ${bPop} globos reventados. ¡Sigue practicando!`; }
        else { t = '🎈'; m = `¡Buen intento! ${bPop} globos. ¡Te esperamos el 30 de mayo!`; }
        bEt.textContent = t; bEsv.textContent = bSc; bEhs.textContent = `Récord: ${bHighScore} pts`; bNhs.style.display = isNew ? 'inline-flex' : 'none'; bEm.textContent = m; bEndEl.classList.add('show');
        if (isNew || bSc >= 300) spawnFW();
        if (bSoundOn) { beep(520, .05); setTimeout(() => beep(660, .05), 90); setTimeout(() => beep(880, .15), 180); }
    }

    function resetBStart() { bStartBtn.textContent = '▶ Jugar'; bStartBtn.disabled = false; bStartBtn.style.opacity = '1'; }

    function startBGame() {
        bSc = 0; bPop = 0; bTime = 30; bLives = 3; bComb = 0; bSlow = false;
        bScoreEl.textContent = 0; bPoppedEl.textContent = 0; bTimeEl.textContent = 30; bComboEl.textContent = '×1';
        tmPill.classList.remove('urg'); updateLives(); bEndEl.classList.remove('show'); slowFX.style.display = 'none'; bFlash.style.display = 'none';
        bArea.querySelectorAll('.gbln,.burstfx,.ptcl,.popmsg,.combopop').forEach(el => el.remove());
        bActive = true; clearInterval(bTimer); clearInterval(bSpawnT);
        showMsg('🚀 ¡A jugar! Revienta globos y evita las 💣 bombas.', false);
        if (bSoundOn) { beep(520, .05); setTimeout(() => beep(660, .05), 80); setTimeout(() => beep(880, .1), 160); }
        const ic = { easy: 3, normal: 4, hard: 5 }[bDiff];
        for (let i = 0; i < ic; i++)setTimeout(spawnBalloon, i * 330);
        bSpawnT = setInterval(spawnBalloon, DIFF[bDiff].ms);
        bTimer = setInterval(() => { bTime--; bTimeEl.textContent = bTime; if (bTime <= 10) { tmPill.classList.add('urg'); if (bSoundOn && bTime <= 5) beep(700 + bTime * 25, .04, 'square', .03); } if (bTime <= 0) { bTimeEl.textContent = 0; endBGame(); } }, 1000);
        bStartBtn.textContent = '⏳ Jugando…'; bStartBtn.disabled = true; bStartBtn.style.opacity = '.5';
    }

    document.querySelectorAll('.dbtn').forEach(b => { b.addEventListener('click', () => { if (bActive) return; document.querySelectorAll('.dbtn').forEach(x => x.classList.remove('on')); b.classList.add('on'); bDiff = b.dataset.diff; }); });
    bStartBtn.addEventListener('click', () => { if (!bActive) startBGame(); });
    bReplay.addEventListener('click', () => { resetBStart(); startBGame(); });
    bCloseEnd.addEventListener('click', () => { resetBStart(); closeFS(bOverlay); });
    bSndBtn.addEventListener('click', () => { bSoundOn = !bSoundOn; bSndBtn.textContent = bSoundOn ? '🔊 Sonido' : '🔇 Sonido'; if (bSoundOn) { beep(520, .05); setTimeout(() => beep(780, .06), 110); } });

    /* ═══════════════════════════════════════════
       WHEEL
    ═══════════════════════════════════════════ */
    const wMain = document.getElementById('wMain'), wRes = document.getElementById('wRes');
    const wSpinBtn = document.getElementById('wSpin'), wSndBtn = document.getElementById('wSnd');
    const bulbRing = document.getElementById('bulbRing');
    let wDeg = 0, wSpinning = false, wSoundOn = false, wACtx = null;
    const PRIZES = ['🎁 ¡Sorpresa especial del día!', '🍭 ¡Bolsa de dulces de Mickey!', '🎈 ¡Un globo de Mickey Mouse!', '⭐ ¡Premio dorado de la fiesta!', '🎊 ¡Lluvia de confeti para ti!', '🏆 ¡Eres el campeón de la fiesta de Anyel!'];
    const BCOLS = ['#FFC700', '#C41E3A', '#fff', '#66aaff', '#FFC700', '#22c55e', '#ff7a8a', '#ff6b35'];

    // Build bulbs
    for (let i = 0; i < 28; i++) { const b = document.createElement('div'); b.className = 'bulb'; const a = (i / 28) * 360 * Math.PI / 180; const r = 49; b.style.cssText = `left:calc(50% + ${r * Math.cos(a - Math.PI / 2)}% - 7px);top:calc(50% + ${r * Math.sin(a - Math.PI / 2)}% - 7px);width:13px;height:13px;background:${BCOLS[i % BCOLS.length]};color:${BCOLS[i % BCOLS.length]};animation-delay:${(i * .075) % 1}s;animation-duration:${.75 + Math.random() * .55}s`; bulbRing.appendChild(b); }

    function wBeep(f = 660, d = .08) { if (!wSoundOn) return; try { wACtx = wACtx || new (window.AudioContext || window.webkitAudioContext)(); const o = wACtx.createOscillator(), g = wACtx.createGain(); o.type = 'sine'; o.frequency.value = f; g.gain.setValueAtTime(.06, wACtx.currentTime); g.gain.exponentialRampToValueAtTime(.001, wACtx.currentTime + d); o.connect(g).connect(wACtx.destination); o.start(); o.stop(wACtx.currentTime + d); } catch (e) { } }
    function wConfetti() { const C = ['#FFC700', '#C41E3A', '#fff', '#66aaff', '#ff7a8a', '#22c55e', '#ff6b35']; for (let i = 0; i < 70; i++) { const c = document.createElement('div'); c.className = 'wconf'; c.style.cssText = `position:absolute;left:${Math.random() * 100}%;top:-30px;width:${6 + Math.random() * 10}px;height:${10 + Math.random() * 14}px;background:${C[Math.floor(Math.random() * C.length)]};border-radius:2px;animation:wcf ${1.8 + Math.random() * 2.2}s linear forwards;animation-delay:${Math.random() * .9}s;z-index:300;pointer-events:none`; setTimeout(() => c.remove(), 5000); } }
    function bulbFlash(fast) { bulbRing.querySelectorAll('.bulb').forEach(b => { b.style.animationDuration = fast ? `${.18 + Math.random() * .25}s` : `${.75 + Math.random() * .55}s`; }); }

    wSpinBtn.addEventListener('click', () => {
        if (wSpinning) return; wSpinning = true; wSpinBtn.disabled = true; wRes.textContent = '🎡 Girando…'; wRes.classList.remove('win'); bulbFlash(true);
        if (wSoundOn) { let t = 0; const iv = setInterval(() => { wBeep(400 + t * 30, .04); t++; if (t > 10) clearInterval(iv); }, 160); }
        wDeg += 1440 + Math.floor(Math.random() * 6) * 60; wMain.style.transform = `rotate(${wDeg}deg)`;
        setTimeout(() => {
            const idx = Math.floor(((360 - (wDeg % 360) + 30) / 60) % 6);
            wRes.textContent = PRIZES[Math.max(0, Math.min(5, idx))]; wRes.classList.add('win');
            wSpinning = false; wSpinBtn.disabled = false; bulbFlash(false); wConfetti();
            if (wSoundOn) { wBeep(880, .06); setTimeout(() => wBeep(1100, .08), 100); setTimeout(() => wBeep(1320, .15), 200); }
        }, 5100);
    });
    wSndBtn.addEventListener('click', () => { wSoundOn = !wSoundOn; wSndBtn.textContent = wSoundOn ? '🔊' : '🔇'; if (wSoundOn) { wBeep(520, .05); setTimeout(() => wBeep(780, .06), 100); } });
})();