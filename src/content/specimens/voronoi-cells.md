---
title: "Voronoi — 세포 분할"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/voronoi-cells/demo"
collectedAt: 2026-06-22
curator: "iq"
category: experimental
interaction:
  - grid-play
  - morphing
  - cursor-fx
stack:
  - vanilla-js
  - canvas-2d
palette:
  - "#140A06"
  - "#FFB08A"
  - "#FFF4EC"
typography:
  display: "산세리프 초고중량 — 피치 그라디언트 클리핑"
  body: "JetBrains Mono (HUD)"
  classification: sans-led
media:
  cover: "/specimens/voronoi-cells/cover.webp"
snippet: "/specimens/voronoi-cells/demo/"
featured: false
---

자체 기법 연구(etude). 픽셀마다 최근접(d₁)과 차근접(d₂) 시드 거리를 재서 `d₂−d₁`이 작으면 경계다 — 알고리즘 기하 없이 브루트포스만으로 보로노이 벽을 긋는다.

## 씬 구조

단일 씬, 시드 16개 + 커서(17번째 시드). 시드가 표류하면 세포벽이 실시간으로 재협상된다 — 잠자리 날개, 기린 무늬, 마른 진흙이 전부 이 구조다. 클릭은 근처 시드를 밀어내는 킥으로, 그 지점의 세포가 커지는 것이 보인다. 시드 코어는 발광점으로 표시.

## 모션 스펙

- 경계: `d₂ − d₁ < 2.4px` → 선형 알파 — 등거리선의 두께가 곧 벽 두께
- 시드 표류: `±0.17px/f`, 감쇠 `×0.996`, 속도 하한 랜덤 킥 — 벽이 계속 흐른다
- 클릭 킥: 반경 46px(격자) 임펄스 `2.2`
- 코어 발광: `1 − d₁/34` — 세포의 "핵"
- 격자: 200×125, 픽셀당 17회 제곱거리 — sqrt는 경계 후보에서만

## 왜 작동하는가

보로노이는 자연이 공간을 나누는 기본 문법이라(성장 경쟁의 결과가 늘 이 꼴) 인간의 눈이 즉시 유기체로 읽는다. 핵심은 경계의 정의가 소유권 다툼(두 시드의 등거리)이라는 점 — 시드가 움직이면 벽 전체가 유연하게 따라 움직이므로, 폴리곤을 애니메이트하는 것보다 훨씬 자연스러운 형태 전이가 공짜로 나온다.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- `d₂−d₁` 경계 정의 — 셰이더로 그대로 이식 가능한 한 줄짜리 보로노이
- 커서를 N+1번째 시드로 — 포인터가 시스템의 1급 시민이 되는 설계
- 저해상 필드 + 업스케일 — 픽셀 브루트포스를 실용화하는 유일한 방법

**버릴 것**
- 시드 30개 이상은 픽셀×시드 곱이 폭발 — 그 규모는 존스-플로이드(JFA)나 셰이더로
- 경계 두께가 균일해 원근감이 없다 — 심도가 필요하면 d₁로 두께 변조
