---
title: "Raymarch — 폴리곤 없는 3D"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/sdf-raymarch/demo"
collectedAt: 2026-06-13
curator: "jh"
category: experimental
interaction:
  - webgl-shader
  - 3d-float
  - cursor-fx
stack:
  - webgl
  - glsl
  - vanilla-js
palette:
  - "#030308"
  - "#FF7AD9"
  - "#7AB8FF"
typography:
  display: "산세리프 초고중량 — 핑크→블루 그라디언트 클리핑"
  body: "JetBrains Mono (HUD)"
  classification: sans-led
media:
  cover: "/specimens/sdf-raymarch/cover.webp"
snippet: "/specimens/sdf-raymarch/demo/"
featured: false
---

자체 기법 연구(etude). 부호 거리 함수(SDF) 레이마칭 — 메시도 버텍스도 없이 수식 하나가 곧 형상이다. 구 + 3축 사인 변위의 살아있는 블롭, 프레넬 림 라이트, 폴리곤 0개.

## 씬 구조

단일 씬, 씬 그래프가 함수 하나다: `map(p) = |p| − 1 + 0.2·sin(3.2pₓ+t)·sin(3.6p_y+t)·sin(3.1p_z+t)`. 카메라가 자동 공전하고 드래그가 궤도를 넘겨받는다. 레이가 빗나가도 최소 접근 거리로 외곽 글로우를 만들어, 블롭이 진공이 아니라 빛나는 안개 속에 떠 있다.

## 모션 스펙

- 마칭: `64 step` · 전진 `t += d·0.9` (변위 SDF의 비정확성 보정) · 히트 `d < 0.002`
- 노멀: 중심차분 `ε 0.0015` — 6회 map 호출
- 조명: 프레넬 `pow(1−n·v, 2.4)` × 듀오톤 림(노멀 y로 핑크↔블루) + 키/필 2등
- 글로우: 마칭 중 `min(d)` 추적 → `exp(−d·7)` — 미스 픽셀의 공짜 후광
- 성능: DPR 캡 `1.25` — 레이마칭은 픽셀당 수백 회 함수 평가

## 왜 작동하는가

변위가 수식이라 형상이 매 프레임 "다시 계산되는" 것이 이 기법의 존재론 — 메시 모프와 달리 토폴로지 제약이 없어 표면이 정말 액체처럼 산다. 프레넬 림은 스튜디오 사진의 백라이트 문법이라 저비용으로 고급스러움을 만들고, 노멀 y 듀오톤이 위/아래 광원 서사를 공짜로 준다. 미스 글로우가 중요한 디테일: 실루엣 경계의 계단을 안개가 삼킨다.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- min(d) 글로우 트릭 — 안티앨리어싱과 분위기를 동시에 해결하는 레이마칭 관용구
- 프레넬 듀오톤 림 — 브랜드 컬러 2개를 제품 비주얼에 입히는 우아한 방법
- 변위 SDF + 전진 계수 0.9 — 비정확 SDF를 안전하게 마칭하는 실무 보정

**버릴 것**
- 픽셀당 64스텝×map은 모바일 GPU에 무겁다 — DPR 캡은 타협이 아니라 필수
- 헤드리스/구형 기기에서 WebGL 부재 대비 CSS 폴백 필수 — 실측: --disable-gpu 환경에서 컨텍스트 자체가 null
