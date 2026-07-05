---
title: "Boids — 군집의 창발"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/boids-flock/demo"
collectedAt: 2026-06-27
curator: "jh"
category: experimental
interaction:
  - cursor-fx
  - morphing
stack:
  - vanilla-js
  - canvas-2d
palette:
  - "#02100C"
  - "#2EE6A8"
  - "#EAFFF7"
typography:
  display: "산세리프 초고중량 — 민트 그라디언트 클리핑"
  body: "JetBrains Mono (HUD)"
  classification: sans-led
media:
  cover: "/specimens/boids-flock/cover.webp"
snippet: "/specimens/boids-flock/demo/"
featured: false
---

자체 기법 연구(etude). Reynolds(1987)의 boids — 분리·정렬·응집 세 규칙만 주면 지휘자 없이 군집이 창발한다. 커서는 포식자.

## 씬 구조

단일 씬, 에이전트 130개. 구조물은 없고 규칙만 있다: ① 분리 — 24px 안 이웃을 밀어냄 ② 정렬 — 58px 안 이웃의 평균 속도로 수렴 ③ 응집 — 이웃 무게중심으로 견인. 클라이맥스는 포식자(커서) 침입 순간 — 무리가 갈라졌다가 지나가면 다시 봉합된다.

## 모션 스펙

- 지각 반경: `58px` · 분리 반경: `24px` · 규칙 가중치: coh `0.0016` / ali `0.045` / sep `0.06`
- 포식자 회피: 반경 `140px`, `(1 − d/r) × 0.9` 선형 감쇠
- 속도 클램프: 상한 `2.7px/f`, 하한 `1.1px/f` — 하한이 있어야 무리가 얼지 않는다
- 렌더: 진행 방향으로 회전한 삼각형 + 배경 `α0.16` 덮기(짧은 잔상)
- 비용: O(n²) = 16,900쌍/frame, 제곱거리 비교로 sqrt 회피

## 왜 작동하는가

각 개체는 이웃밖에 모르는데 전체는 한 생물처럼 움직인다 — 로컬 규칙에서 글로벌 질서가 나오는 창발을 눈으로 보여주는 가장 유명한 예제. 관객이 개입(커서)할 수 있어서 "영상"이 아니라 "생태"로 느껴진다. 무리가 화면 경계를 토러스로 넘어가는 것도 중요한데, 벽 반사는 무리를 부수지만 랩은 흐름을 보존한다.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- 세 규칙의 가중치 비율(응집≪정렬<분리) — 이 균형이 무너지면 뭉치거나 흩어진다
- 속도 하한 — 감쇠계 애니메이션이 정지 상태로 수렴하는 것을 막는 보편 장치
- 포식자 패턴 — 커서를 "참여자"로 만드는 가장 값싼 서사

**버릴 것**
- O(n²)는 200개체부터 부담 — 공간 그리드 없으면 늘리지 말 것
- 삼각형 회전 렌더는 save/restore 비용이 큼 — 수백 개 이상이면 사전 회전 스프라이트로
