#!/usr/bin/env node
/**
 * 표본 스캐폴딩 — `npm run new <slug>` (SPEC §7 콘텐츠 파이프라인 3단계)
 * 생성물:
 *   src/content/specimens/<slug>.md          스키마를 통과하는 해부 노트 템플릿
 *   public/specimens/<slug>/demo/index.html  하우스 컨벤션 데모 스켈레톤
 * 제로 디펜던시. 기존 파일은 절대 덮어쓰지 않는다.
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2];

if (!slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error('사용법: npm run new <slug>   (kebab-case, 예: liquid-marquee)');
  process.exit(1);
}

const mdPath = join(root, 'src/content/specimens', `${slug}.md`);
const demoDir = join(root, 'public/specimens', slug, 'demo');
const demoPath = join(demoDir, 'index.html');

if (existsSync(mdPath) || existsSync(demoPath)) {
  console.error(`이미 존재하는 표본: ${slug} — 덮어쓰지 않는다.`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const title = slug
  .split('-')
  .map((w) => w[0].toUpperCase() + w.slice(1))
  .join(' ');

const md = `---
title: "${title} — TODO 한 줄 정의"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/${slug}/demo"
collectedAt: ${today}
curator: "iq"
category: experimental
interaction:
  - cursor-fx
stack:
  - vanilla-js
  - canvas-2d
palette:
  - "#0A0A0A"
  - "#FFFFFF"
typography:
  display: "TODO — 디스플레이 서체 식별"
  body: "JetBrains Mono (HUD)"
  classification: sans-led
media:
  cover: "/specimens/${slug}/cover.webp"
snippet: "/specimens/${slug}/demo/"
featured: false
---

TODO — 표본 한 줄 소개. 무엇을 해부했고 핵심 기법이 무엇인지.

## 씬 구조

TODO — 씬이 몇 개로 나뉘고 클라이맥스가 어디인지.

## 모션 스펙

- TODO: \`easing\` · \`duration\` — 측정/추정값은 반드시 모노스페이스로
- TODO: 핵심 파라미터 (반경, 감쇠, 임계값 …)

## 왜 작동하는가

TODO — 3~5문장. 기법이 아니라 효과의 원리.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**

- TODO

**버릴 것**

- TODO
`;

const demo = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Specimen No.— ${title} 재현 스니펫</title>
<style>
  /* 기법 연구: TODO — 무엇을 재현하는지 한 줄. */
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { height: 100%; overflow: hidden; }
  body { background: #0a0a0a; font-family: 'Pretendard Variable', Pretendard, system-ui, sans-serif; cursor: crosshair; }
  canvas#cv { position: fixed; inset: 0; z-index: 1; }
  .title { position: fixed; inset: 0; z-index: 2; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; pointer-events: none; }
  .title h1 {
    font-weight: 900; letter-spacing: -.04em; line-height: .9; font-size: clamp(56px, 13vw, 190px);
    background: linear-gradient(120deg, #ffffff, #cccccc 60%, #888888);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .title p { margin-top: 20px; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: clamp(11px, 1.3vw, 14px); letter-spacing: .32em; color: #cccccc; opacity: .85; }
  .hud { position: fixed; z-index: 5; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px; letter-spacing: .12em; color: #dddddd; opacity: .55; }
  .hud.tl { top: 18px; left: 20px; } .hud.br { bottom: 16px; right: 20px; text-align: right; }
  .hud b { color: #ffffff; font-weight: 500; }
  .grain { position: fixed; inset: 0; z-index: 8; pointer-events: none; opacity: .05;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
</style>
</head>
<body>
  <canvas id="cv"></canvas>
  <div class="title"><h1>${title.toUpperCase()}</h1><p>TODO · SUBTITLE</p></div>
  <p class="hud tl">SPECIMEN · <b>TODO</b></p>
  <p class="hud br">param <b>—</b> · param <b>—</b></p>
  <div class="grain"></div>
<script>
(function () {
  'use strict';
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cv = document.getElementById('cv'), cx = cv.getContext('2d');
  var W, H, DPR;
  function resize() {
    DPR = Math.min(2, devicePixelRatio || 1);
    W = innerWidth; H = innerHeight;
    cv.width = W * DPR; cv.height = H * DPR;
    cv.style.width = W + 'px'; cv.style.height = H + 'px';
    cx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  addEventListener('resize', resize);

  // 하우스 컨벤션: 유휴 2.2s 후 커서 대역이 리사주로 자율 유영 (임베드에서도 살아있게)
  var mx = -1e9, my = -1e9, lastMove = -1e9;
  addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; lastMove = performance.now(); });
  addEventListener('touchmove', function (e) { mx = e.touches[0].clientX; my = e.touches[0].clientY; lastMove = performance.now(); }, { passive: true });

  function frame(t) {
    var idle = t - lastMove > 2200;
    var fx = idle ? W * (0.5 + 0.38 * Math.sin(t * 0.00034)) : mx;
    var fy = idle ? H * (0.5 + 0.34 * Math.cos(t * 0.00047)) : my;

    cx.fillStyle = '#0a0a0a';
    cx.fillRect(0, 0, W, H);
    // TODO — 여기서부터 기법 구현
    cx.beginPath();
    cx.arc(fx, fy, 24, 0, Math.PI * 2);
    cx.strokeStyle = 'rgba(255,255,255,.6)';
    cx.stroke();

    if (!reduced) requestAnimationFrame(frame);
  }
  if (reduced) { frame(0); document.body.style.cursor = 'auto'; } // 정적 폴백
  else requestAnimationFrame(frame);
})();
</script>
</body>
</html>
`;

mkdirSync(demoDir, { recursive: true });
writeFileSync(mdPath, md);
writeFileSync(demoPath, demo);

console.log(`표본 스캐폴드 완료: ${slug}

  src/content/specimens/${slug}.md
  public/specimens/${slug}/demo/index.html

다음 단계:
  1. 데모 구현 (npm run dev → /specimen/specimens/${slug}/demo/)
  2. 해부 노트 TODO 채우기 (frontmatter 팔레트/태그 포함)
  3. 커버 생성:
     chrome --headless --use-angle=swiftshader --screenshot=cover.png \\
       --window-size=1200,750 --virtual-time-budget=5000 <demo URL>
     cwebp -q 82 cover.png -o public/specimens/${slug}/cover.webp
  4. npm run build 통과 확인 → content: 커밋
`);
