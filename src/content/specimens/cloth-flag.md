---
title: "Cloth — Verlet 천 시뮬레이션"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/cloth-flag/demo"
collectedAt: 2026-06-16
curator: "iq"
category: experimental
interaction:
  - morphing
  - cursor-fx
stack:
  - vanilla-js
  - canvas-2d
palette:
  - "#0E0205"
  - "#E63946"
  - "#FFE9EC"
typography:
  display: "산세리프 초고중량 — 스칼렛 그라디언트 클리핑"
  body: "JetBrains Mono (HUD)"
  classification: sans-led
media:
  cover: "/specimens/cloth-flag/cover.webp"
snippet: "/specimens/cloth-flag/demo/"
featured: false
---

자체 기법 연구(etude). Verlet 적분 + 거리 제약만으로 천이 된다. 위치 두 개(현재/이전)의 차가 속도를 암시하므로 적분기도 힘 저장도 필요 없다 — Hitman(2001)이 유행시킨 게임 물리의 고전.

## 씬 구조

단일 씬, 30×19 격자 깃발. 왼쪽 열이 깃대에 고정되고 나머지는 바람에 맡겨진다. 바람은 저주파 거스트(사인 2겹) + 셀별 노이즈 잔파. 렌더는 메시 라인뿐인데, 늘어난 세그먼트일수록 밝게 — 장력이 곧 조명이다. 포인터로 아무 점이나 집어 끌 수 있고(그랩 커서), 놓으면 출렁이며 복귀한다.

## 모션 스펙

- 적분: `x += (x − ox)·0.985 + force` — Verlet, 감쇠 0.985
- 제약: 구조 스프링(가로+세로)만, `3 iter/frame` — 대각 없이도 깃발은 성립
- 바람: 거스트 `0.9 + 0.8sin(0.0006t) + 0.5sin(0.0017t)` × 셀 노이즈
- 장력 렌더: `stretch = d/rest − 0.9` → 색·알파 리프트
- 드래그: 최근접 정점(90px 내)을 커서에 핀 — 잡는 느낌의 전부
- 로드 워밍업 140프레임 — 바람 먹은 상태로 시작

## 왜 작동하는가

Verlet의 미덕은 안정성이다 — 속도를 명시적으로 저장하지 않아 에너지가 폭발하지 않고, 제약 반복이 곧 강성이라 뻣뻣함을 반복 횟수 하나로 조절한다. 장력→밝기 매핑이 시각의 핵심: 조명 계산 없이도 천의 주름과 팽팽함이 읽힌다. 직접 집어 당길 수 있다는 것이 이 데모의 존재 이유 — 물성은 만져봐야 믿어진다.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- Verlet + 제약 반복 — 로프·커튼·머리카락까지 가는 소프트바디의 최소 골격
- 장력 = 조명 — 물리량을 셰이딩으로 재활용하는 습관
- 최근접 정점 그랩 — 소프트바디 인터랙션의 표준 문법

**버릴 것**
- 대각 제약이 없어 전단(찌그러짐)에 약하다 — 정면 깃발은 괜찮지만 옷감은 대각 필수
- 제약 반복은 순차 의존이라 워커 병렬화가 안 된다 — 대형 메시는 GPU 솔버로
