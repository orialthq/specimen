---
title: "Truchet — 타일 하나의 미로"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/truchet-tiles/demo"
collectedAt: 2026-06-18
curator: "iq"
category: experimental
interaction:
  - grid-play
  - hover-reveal
stack:
  - vanilla-js
  - canvas-2d
palette:
  - "#10100A"
  - "#F2EFDD"
  - "#D9A441"
typography:
  display: "산세리프 초고중량 아웃라인 — 타일 위 스텐실"
  body: "JetBrains Mono (HUD)"
  classification: sans-led
media:
  cover: "/specimens/truchet-tiles/cover.webp"
snippet: "/specimens/truchet-tiles/demo/"
featured: false
---

자체 기법 연구(etude). 쿼터-서클 두 개가 그려진 타일 하나를 0°/90° 두 방향으로만 놓아도, 곡선이 항상 이웃과 이어져 끝없는 미로가 창발한다(Truchet 1704 / Smith 변형).

## 씬 구조

단일 씬, 타일 ~460개(셀 52px). 상태는 타일당 1비트(방향)뿐인데 화면은 연속 곡선의 미로다 — 쿼터-서클의 끝점이 항상 변의 중점이라 어떤 조합이든 이어지기 때문. 7초마다 대각 웨이브가 화면을 훑으며 타일을 뒤집고, 커서가 지나는 타일은 즉석 플립. 2%의 골드 타일이 미로 속 보물처럼 박혀 있다.

## 모션 스펙

- 타일: 쿼터-서클 2개, 끝점 = 변의 중점 — 연결성의 기하학적 보증
- 플립: 목표각 `0°/90°`, `lerp 0.14` — 회전 중에도 곡선이 우아하게 어긋났다 붙는다
- 웨이브: 주기 `7s`, 대각 진행 `(x+y)` 순, 타일당 1회 플립 가드
- 호버 플립: 셀 진입 시 1회 (연타 방지 인덱스 가드)
- 골드 타일: `2%` 확률, 선폭 1.7→2.6px

## 왜 작동하는가

제약이 창발을 만든다는 것을 이보다 순수하게 보여주는 시스템이 없다 — 자유도는 비트 하나인데 출력은 무한한 경로다. 플립 애니메이션이 중요한데, 순간 전환이면 노이즈로 보이지만 회전으로 보간하면 미로가 "재배선"되는 과정이 보인다. 웨이브 스윕은 전체가 하나의 직물임을 주기적으로 상기시키는 호흡이다.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- 끝점=변 중점 제약 — 어떤 랜덤 조합도 파탄나지 않는 패턴 시스템 설계의 원형
- 1비트 상태 + 보간 렌더 — 데이터는 이산, 표현은 연속으로 분리하는 습관
- 대각 웨이브 스윕 — 격자 시스템에 주기적 서사를 넣는 최소 장치

**버릴 것**
- 매 프레임 전체 타일 재드로우는 저사양에서 부담 — 실서비스는 더티 셀만 갱신
- 타일 종류를 늘리면(대각선·십자) 미로의 격이 떨어진다 — 절제가 이 기법의 본질
