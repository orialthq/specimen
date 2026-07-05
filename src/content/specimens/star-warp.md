---
title: "Star Warp — z-투영 스타필드"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/star-warp/demo"
collectedAt: 2026-06-28
curator: "iq"
category: experimental
interaction:
  - 3d-float
  - parallax-depth
  - cursor-fx
stack:
  - vanilla-js
  - canvas-2d
palette:
  - "#020210"
  - "#6E8BFF"
  - "#DDE6FF"
typography:
  display: "산세리프 초고중량 — 인디고 그라디언트 클리핑"
  body: "JetBrains Mono (HUD)"
  classification: sans-led
media:
  cover: "/specimens/star-warp/cover.webp"
snippet: "/specimens/star-warp/demo/"
featured: false
---

자체 기법 연구(etude). 3D 투영의 최소 단위인 원근 나눗셈 `sx = x/z` 하나로 만드는 스타필드 워프. 마우스가 소실점을 조향하고, 누르고 있으면 하이퍼스페이스.

## 씬 구조

단일 씬, 상태 둘 — 순항과 워프. 별 560개(모바일 320)가 정규화 공간 `[-1,1]²`에 떠 있고 z만 감소한다. 각 별은 이전 프레임 투영점과 현재 투영점을 잇는 선분으로 그려져, 속도가 곧 선 길이가 된다. 클라이맥스는 홀드 순간: 추력이 lerp로 차오르며 점이 스트릭으로, 스트릭이 터널로 변한다.

## 모션 스펙

- 투영: `sx = cx + (x/z)·F·0.5`, 초점거리 `F = min(W,H)·0.9`
- 전진: `z −= v·(0.4 + z)` — 가까울수록 빠르게, 가속 원근
- 추력: 기본 `v = 0.0042`, 홀드 시 `×10`, `lerp 0.06`으로 차오르고 빠진다 — 순간이 아니라 점화
- 조향: 소실점 `= 중심 − mouse·0.22·뷰포트`, `lerp 0.04` — 기체 관성
- 트레일: 배경 반투명 덮기, 순항 `α0.42` / 워프 `α0.22` — 워프일수록 잔상이 길어진다
- 깊이 색온도: 멀면 `#6E8BFF` 인디고, 가까우면 백색 — 선 두께도 `0.5 → 2.4px`

## 왜 작동하는가

관객을 움직이는 게 아니라 세계를 관객에게 쏟아붓는 구조라, 정지한 화면 앞에서 몸이 이동을 느낀다(벡션·vection). 방사형 스트릭은 광류(optic flow)의 가장 순수한 형태여서 뇌가 즉시 "전진"으로 해석한다. 홀드→가속의 lerp가 관성을 만들어 버튼이 아니라 스로틀처럼 느껴지고, 조향 소실점의 지연 추종이 "내가 조종하고 있다"는 소유감을 완성한다.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- 원근 나눗셈 한 줄의 가짜 3D — 라이브러리 없이 깊이를 만드는 최소 레시피
- prev→curr 선분 렌더 — 속도를 시각화하는 가장 싼 방법(모션 블러 흉내)
- 입력의 lerp 점화 — 즉발 토글보다 물리적 실재감이 크다. 스크롤 가속 등에 이식

**버릴 것**
- 광류 자극이 강해 전정 장애 사용자에게 부담 — reduced-motion에서 정적 점 필드로 강등 필수
- 텍스트 배경으로는 순항 상태만 — 워프 상태의 방사 스트릭은 시선을 전부 빨아들인다
