---
title: "Kinetic Type Wave — 글리프 웨이브 마퀴"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/kinetic-type-wave/demo"
collectedAt: 2026-07-05
curator: "jh"
category: experimental
interaction:
  - type-motion
  - grid-play
  - cursor-fx
stack:
  - vanilla-js
  - css-transforms
palette:
  - "#101014"
  - "#D8FF3D"
  - "#EDEDF2"
typography:
  display: "시스템 산세리프 초고중량 — 글리프 단위 transform 변형"
  body: "JetBrains Mono (HUD)"
  classification: type-driven
media:
  cover: "/specimens/kinetic-type-wave/cover.webp"
snippet: "/specimens/kinetic-type-wave/demo/"
featured: false
---

자체 기법 연구(etude). 가변 폰트 없이 글리프 단위 `translateY + scaleY`만으로 키네틱 타이포의 물성을 낸다. 커서가 웨이브의 진앙이 되는 구조.

## 씬 구조

단일 씬, 6행 레이어. 행마다 역할이 다르다 — 짝수행 채움(acid), 홀수행 아웃라인 스트로크, 중앙행 반전(배경 acid / 글자 잉크). 마퀴 방향과 속도(60–128px/s)가 행마다 어긋나며 시차가 생긴다. 클라이맥스는 커서 주변 — 가우시안 포커스가 닿는 글리프들만 증폭된다.

## 모션 스펙

- 웨이브: `sin(x·0.011 − t·0.004)` · 진폭 `0.18(호흡) → 1.05(포커스)`
- 포커스: 가우시안 `exp(−d²/2σ²)`, `σ = 190px` — 커서 중심 국소 증폭
- 글리프 변형: `translateY(±22px·amp)` + `scaleY(1 → 1.55)` · `transform-origin: 50% 100%`
- 마퀴: 콘텐츠 ×2 복제 후 `offset % half` 랩 — 심리스 무한 루프
- 유휴 2s 초과 시 진앙이 `sin(t/1700)`으로 자율 유영

## 왜 작동하는가

마퀴는 원래 배경 장식이지만, 커서에 반응하는 순간 관객이 지휘자가 된다. 포커스가 가우시안이라 증폭이 부드럽게 감쇠하고, 글리프들이 개별 물성을 가진 것처럼 보인다. 행마다 방향·속도·스타일이 어긋나 있어 전체가 하나의 직물처럼 읽히면서도 시선이 지루해지지 않는다. 폰트 로딩 없이 transform만 쓰므로 첫 프레임부터 완성 상태로 뜬다.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- 가우시안 포커스 패턴 — hover 반경을 이진(on/off)이 아니라 연속 감쇠로 처리하는 방법
- 콘텐츠 ×2 복제 + modulo 랩 마퀴 — JS 마퀴의 표준형
- 뷰포트 밖 글리프 transform 스킵 — 스타일 쓰기 수를 절반 이하로

**버릴 것**
- 6행 × 60글리프 상시 rAF는 저사양 모바일에서 부담 — 행 수를 뷰포트 높이에 비례시킬 것
- 본문 텍스트에는 절대 금지 — 디스플레이 전용 기법
