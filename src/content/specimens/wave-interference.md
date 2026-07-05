---
title: "Wave Interference — 파동 중첩"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/wave-interference/demo"
collectedAt: 2026-06-24
curator: "iq"
category: experimental
interaction:
  - morphing
  - cursor-fx
stack:
  - vanilla-js
  - canvas-2d
palette:
  - "#010314"
  - "#2B6BFF"
  - "#DFF3FF"
typography:
  display: "산세리프 초고중량 — 울트라마린 그라디언트 클리핑"
  body: "JetBrains Mono (HUD)"
  classification: sans-led
media:
  cover: "/specimens/wave-interference/cover.webp"
snippet: "/specimens/wave-interference/demo/"
featured: false
---

자체 기법 연구(etude). 파원 여러 개의 사인파를 픽셀마다 그냥 더한다 — 중첩 원리 하나로 물결·간섭무늬·맥놀이가 전부 공짜로 나온다.

## 씬 구조

단일 씬, 200×125 필드. 파원 3개(고정 2 + 커서 1)가 기본, 클릭마다 수명 3초짜리 임시 파원이 최대 4개까지 추가된다. 보강간섭 지점은 백열로 리프트되어 물의 커스틱처럼 읽힌다. 임시 파원의 진폭이 수명에 따라 감쇠하며 무늬가 서서히 원래 간섭계로 복귀하는 것이 서사.

## 모션 스펙

- 파동: `Σ sin(d·k − ωt)` · `k 0.32` · `ω 3.1rad/s` · 파원 수로 정규화
- 클릭 파원: 수명 `3s`, 진폭 선형 감쇠
- 색: `n²` 램프(딥→울트라마린) + `n>0.78` 백열 리프트 — 보강 마루만 빛난다
- 고정 파원도 미세 유영(`±8px`) — 무늬가 절대 정지하지 않는다
- 비용: 25,000셀 × 파원 수 sqrt/frame

## 왜 작동하는가

물리에서 가장 아름다운 공짜 점심 — 규칙은 "더하기"뿐인데 결과는 쌍곡선 간섭무늬다. 사람은 물결 간섭을 물가에서 평생 봐왔기 때문에 이 패턴을 즉시 "물"로 읽는다. 커서가 파원이라 움직임의 결과가 파문으로 뒤따라오는 것, 클릭한 자리에서 실제 파면이 퍼지는 것 — 인과가 눈에 보이는 인터랙션이라 만지는 맛이 있다.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- n² + 임계 리프트 램프 — 필드 비주얼에서 "마루만 빛나게"의 표준 레시피
- 수명 있는 이벤트 파원 — 클릭 피드백을 시스템 상태로 흡수하는 패턴
- 파원 수 정규화 — 파원이 늘어도 노출이 안 터진다

**버릴 것**
- 픽셀×파원 곱은 파원 6개부터 급증 — 파원 상한을 두거나 거리 컷오프
- k(파수)를 키우면 저해상 격자에서 앨리어싱 — 격자 해상도와 함께 튜닝할 것
