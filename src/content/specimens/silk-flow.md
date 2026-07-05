---
title: "Silk Flow — 도메인 워핑 셰이더"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/silk-flow/demo"
collectedAt: 2026-07-05
curator: "jh"
category: experimental
interaction:
  - webgl-shader
  - cursor-fx
stack:
  - webgl
  - glsl
  - vanilla-js
palette:
  - "#05100D"
  - "#0E5E52"
  - "#E8C97E"
  - "#F2EFE4"
typography:
  display: "Georgia 이탤릭 세리프 — 셰이더 위 단일 워드마크"
  body: "JetBrains Mono (HUD)"
  classification: serif-led
media:
  cover: "/specimens/silk-flow/cover.webp"
snippet: "/specimens/silk-flow/demo/"
featured: false
---

자체 기법 연구(etude). three.js 없이 raw WebGL 풀스크린 쿼드 한 장으로 실크 질감을 만든다. 핵심은 도메인 워핑 — fbm의 출력을 fbm의 입력 좌표로 되먹이는 2중 왜곡.

## 씬 구조

단일 씬, 셰이더 1패스. 색은 4단 레이어로 쌓인다 — deep(바닥) → teal(몸통, `smoothstep(.12,.78,f)`) → gold(결, `q.y·f` 조건) → cream(하이라이트 30%). 비네트와 그레인까지 셰이더 안에서 처리해 DOM 오버레이는 타이틀과 HUD뿐이다.

## 모션 스펙

- 도메인 워핑: `f = fbm(p + 1.9·r)`, `r = fbm(p + 1.8·q)`, `q = fbm(p)` — 2중 되먹임
- fbm: value noise 5옥타브 · lacunarity `2.03` · gain `0.5`
- 시간: `t × 0.055` — q와 r의 시간 계수를 어긋나게(`+0.9t / −0.6t`) 해 흐름이 한 방향으로 굳지 않는다
- 마우스: 워프 좌표에 `uMouse × 0.4`, `lerp 0.04`로 스며듦 — 즉답하지 않는 관성
- 성능: DPR 캡 `1.5` · 풀스크린 삼각형 1개(쿼드 아님) · antialias off

## 왜 작동하는가

노이즈를 색으로 바로 매핑하면 구름이 되지만, 노이즈로 좌표를 두 번 접으면 직물이 된다 — 접힌 좌표계의 등고선이 실크의 결처럼 읽히기 때문. 시간 계수가 축마다 달라 패턴이 순환하지 않고 계속 새로운 형상을 만든다. 마우스 입력을 lerp 0.04로 늦추면 화면이 따라온다기보다 뒤척인다는 인상을 줘서 유체의 무게감이 생긴다.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- 도메인 워핑 2패스 구조 — 히어로 배경 셰이더의 표준 레시피
- 풀스크린 삼각형 + DPR 캡 — three.js 없이 47KB → 0KB, 셰이더 배경의 최소 비용형
- 입력 lerp 0.04 — 커서 반응은 빠를수록 좋다는 통념의 반례

**버릴 것**
- 5옥타브 fbm ×3회 호출은 픽셀당 비용이 크다 — 모바일에서는 3옥타브로 강등할 것
- 텍스트 가독 영역 뒤에는 금지 — 비네트로 눌러도 대비가 요동친다
