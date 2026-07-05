---
title: "Contour — 등고선 지형도"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/contour-lines/demo"
collectedAt: 2026-06-21
curator: "jh"
category: experimental
interaction:
  - grid-play
  - morphing
  - cursor-fx
stack:
  - vanilla-js
  - canvas-2d
palette:
  - "#131308"
  - "#C9CFA0"
  - "#D9A441"
typography:
  display: "모노스페이스 볼드 — 측량 도면 표기"
  body: "JetBrains Mono (HUD)"
  classification: type-driven
media:
  cover: "/specimens/contour-lines/cover.webp"
snippet: "/specimens/contour-lines/demo/"
featured: false
---

자체 기법 연구(etude). marching squares 없이 소수부 트릭 한 줄로 등고선을 긋는다 — `frac(h·N)`이 0.5 근처면 선이다. 커서는 지형을 밀어 올리는 융기 돔.

## 씬 구조

단일 씬, 220×137 하이트맵. 측량 도면의 문법을 그대로 옮겼다: 가는 보조곡선(×14)과 굵은 골드 주곡선(×3.5)의 2단 위계, 높이에 비례한 지반 음영. 노이즈가 시간축으로 표류해 지형 자체가 느리게 이동하고, 커서 돔이 닿는 곳은 등고선이 동심원으로 조밀해진다 — 산이 솟는 모습을 실시간으로 본다.

## 모션 스펙

- 하이트맵: 2옥타브 `vnoise`, 시간 표류 `0.000055/ms`
- 등고선: `|frac(h·N) − 0.5| < ε` — minor `N14/ε0.055`, major `N3.5/ε0.03`
- 커서 융기: 가우시안 돔 `σ24px(격자)`, 높이 `+0.38`
- 색 위계: 보조곡선 `#C9CFA0`, 주곡선 `#D9A441`(골드) — 사이트 토큰과 공명
- 유휴 시 융기점 리사주 자율 유영

## 왜 작동하는가

등고선은 3D 정보를 2D 선으로 압축하는 인류의 오래된 발명이라, 뇌가 조밀함=가파름을 학습으로 안다. 그래서 선 간격의 변화만으로 지형이 입체로 읽힌다. 커서 돔의 재미는 인과의 즉물성 — 손을 대면 땅이 솟고, 등고선이 물결처럼 밀려난다. 소수부 트릭의 우아함은 등고선을 "그리는" 게 아니라 높이장이 이미 품고 있는 선을 "드러내는" 것이라는 점.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- `frac()` 등고선 — 셰이더 한 줄로 이식되는 마법. 데이터 비주얼 어디든
- 주/보조 곡선 2단 위계 — 필드 비주얼에 지도의 격조를 입히는 값싼 방법
- 사이트 액센트 컬러(골드)를 데모에 공명시키기 — 아카이브와 표본의 시각적 연결

**버릴 것**
- 소수부 트릭은 기울기가 0에 가까운 평지에서 선이 뭉개진다 — 정밀 등고선은 marching squares로
- 등고선 밀도(N)를 올리면 저해상 격자에서 모아레 — 격자 해상도와 짝으로 튜닝
