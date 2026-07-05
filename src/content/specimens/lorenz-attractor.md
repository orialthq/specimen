---
title: "Lorenz — 카오스 어트랙터"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/lorenz-attractor/demo"
collectedAt: 2026-06-23
curator: "jh"
category: experimental
interaction:
  - 3d-float
  - parallax-depth
stack:
  - vanilla-js
  - canvas-2d
palette:
  - "#16030A"
  - "#FF5A4E"
  - "#FFE9EA"
typography:
  display: "세리프 이탤릭 — 궤적 위 워드마크"
  body: "JetBrains Mono (HUD)"
  classification: serif-led
media:
  cover: "/specimens/lorenz-attractor/cover.webp"
snippet: "/specimens/lorenz-attractor/demo/"
featured: false
---

자체 기법 연구(etude). 로렌츠 방정식(σ10, ρ28, β8/3)을 실시간 오일러 적분해 나비를 그린다. 결정론인데 예측 불가 — 두 날개 사이를 언제 건널지는 아무도 모른다.

## 씬 구조

단일 씬, 점 하나의 여정. 로드 시 6,500스텝을 미리 에칭해 나비 형상을 깔고, 이후 매 프레임 24스텝씩 라이브 적분이 그 위를 덧그린다. 카메라는 y축 공전(상시 저속) + 커서 조향. 느린 페이드(`α0.035`)로 리본이 겹겹이 쌓여 밀도 지도가 된다 — 자주 지나는 궤도일수록 밝다.

## 모션 스펙

- 적분: 오일러 `dt 0.005` × `24 step/frame` — RK4 없이도 시각적으로 충분
- 투영: `px = x·cosθ + y·sinθ`, `py = z` — 회전 y축 정사영, z=25가 화면 중앙
- 색: 상태공간 속도 `|dx,dy,dz|` → 크림(느림)→적색(빠름)
- 페이드: `rgba(bg, 0.035)` 덮기 + `lighter` 가산 — 잔상 수명 ≈ 수백 프레임
- 초기 에칭: `6,500 step`, `α0.05` — "이미 그려진 나비"에서 시작

## 왜 작동하는가

궤적은 절대 자신과 교차하지 않으면서 같은 영역을 무한히 맴돈다 — 질서(형상)와 무질서(경로)가 한 화면에 공존하는 것이 카오스의 초상이다. 가산 페이드 덕에 정적인 나비 위로 "지금 어디를 돌고 있는지"가 밝은 머리로 표시되어, 수학 그림이 아니라 살아있는 생물의 심전도처럼 읽힌다.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- 에칭 + 라이브 덧그림 이중 구조 — 누적형 비주얼의 "첫 화면 문제"를 푸는 법
- 상태공간 속도 → 색 매핑 — 물리량을 조명으로 쓰는 공짜 셰이딩
- 느린 가산 페이드 — 밀도 히스토그램을 시간이 그려준다

**버릴 것**
- 오일러 dt를 키우면 궤적이 발산 — 속도가 필요하면 스텝 수를 늘릴 것(dt 말고)
- 정사영은 날개 겹침에서 깊이가 사라진다 — 진짜 3D감이 필요하면 z-정렬 투시로
