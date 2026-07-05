---
title: "Wire Terrain — 와이어프레임 지형"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/wire-terrain/demo"
collectedAt: 2026-07-02
curator: "iq"
category: experimental
interaction:
  - 3d-float
  - parallax-depth
  - scroll-cinematic
stack:
  - vanilla-js
  - canvas-2d
palette:
  - "#07040E"
  - "#B06BFF"
  - "#E6D2FF"
typography:
  display: "산세리프 초고중량 — violet 그라디언트 클리핑"
  body: "JetBrains Mono (HUD)"
  classification: sans-led
media:
  cover: "/specimens/wire-terrain/cover.webp"
snippet: "/specimens/wire-terrain/demo/"
featured: false
---

자체 기법 연구(etude). 3D 엔진 없이 캔버스 2D + 가짜 원근만으로 스크롤하는 등고 능선을 만든다. 노이즈 하이트맵을 행마다 투영해 앞으로 흘려보내는 구조.

## 씬 구조

단일 씬, 30×46 메시. 카메라는 고정, 지형이 z+ 방향으로 전진한다(끝없는 능선). 뒤(먼)에서 앞(가까이)으로 그려 겹침 순서를 맞추고, 앞줄 몇 개만 발광시켜 심도의 클라이맥스를 만든다. 능선(가로줄)이 주 구조, 컬럼(세로줄)은 3칸마다 얇게 깔아 메시 느낌만 보강.

## 모션 스펙

- 하이트맵: `valueNoise(x·0.18, z·0.18)·0.7 + valueNoise(x·0.42, z·0.42)·0.3` — 2옥타브
- 가짜 원근: 행 `r∈[0,1]`, `persp = 0.30 + r²·1.4` (앞일수록 넓게), `baseY = horizon + r^1.35·0.62H`
- 높이 투영: `sy = baseY − h·(60 + r·150)` — 앞줄일수록 기복 과장
- 전진: `scroll = t·0.0009`, z 좌표에 `scroll·10` 가산
- 카메라 틸트: 커서 x를 `lerp 0.05`로 추종, 앞줄일수록 수평 이동 크게(패럴랙스)
- 능선 스타일: 알파 `0.10 → 0.72`, 두께 `0.6 → 2.1` — 원근 페이드를 라인 웨이트로

## 왜 작동하는가

진짜 3D 없이 입체가 되는 이유는 두 가지 원근 단서를 라인에 실었기 때문이다 — 앞줄일수록 (1) 넓고 기복이 크고 (2) 밝고 두껍다. 뇌는 이 그라디언트를 깊이로 즉시 해석한다. 지형이 관객을 향해 전진하는 무한 스크롤은 목적지 없는 이동감을 주고, 커서 틸트의 시차가 "카메라 뒤에 공간이 있다"는 확신을 더한다. 와이어프레임만 남겨 형상보다 구조를 보게 한 것도 레트로-테크 무드를 만든다.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- 라인 웨이트/알파로 원근 페이크 — 3D 라이브러리 없이 depth cue를 만드는 최소 레시피
- z 스크롤 오프셋으로 무한 지형 — 히어로 배경의 "계속 움직이는데 도착하지 않는" 감각
- 뒤→앞 드로우 순서 — 2D 캔버스에서 겹침(occlusion) 흉내

**버릴 것**
- 진짜 깊이 정렬/은면 제거는 없다 — 능선이 교차하는 급경사에서 뒤 라인이 비친다. 완만한 지형에서만 안전
- 세로 컬럼까지 다 그리면 라인 수가 폭증 — 3칸 간격이 한계. 밀도 올리려면 WebGL로 이주
