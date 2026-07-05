---
title: "ASCII Field — 글리프 밀도 렌더링"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/ascii-field/demo"
collectedAt: 2026-07-01
curator: "jh"
category: experimental
interaction:
  - type-motion
  - grid-play
  - cursor-fx
stack:
  - vanilla-js
  - canvas-2d
palette:
  - "#030A05"
  - "#33FF66"
  - "#EAFFF0"
typography:
  display: "모노스페이스 볼드 — phosphor 그라디언트 클리핑"
  body: "JetBrains Mono (HUD)"
  classification: type-driven
media:
  cover: "/specimens/ascii-field/cover.webp"
snippet: "/specimens/ascii-field/demo/"
featured: false
---

자체 기법 연구(etude). 노이즈 스칼라장을 픽셀이 아니라 문자로 렌더링한다. 밝기 램프 `' .·:;+=xX#@'`의 11단계가 곧 팔레트 — 터미널 포스포 그린의 ASCII 아트를 실시간 필드로.

## 씬 구조

단일 씬, 문자 격자(셀 16–18px, 뷰포트당 3천여 글리프). 구조는 렌더 파이프라인 그 자체다: ① 2옥타브 노이즈가 셀마다 스칼라 값을 만들고 ② 값이 램프 인덱스(어떤 문자)와 색(얼마나 백열로 리프트)을 동시에 결정한다 ③ 커서는 가우시안 렌즈로 국소 게인을 올려 지나가는 자리마다 `@`가 피어난다.

## 모션 스펙

- 스칼라장: `vnoise(x·0.09 + 2t, y·0.11 − t)·0.72 + vnoise(x·0.23 − t, y·0.27 + 1.4t)·0.28`
- 램프: 11단계, `index = ⌊v · len⌋` — 공백(0단계)은 드로우 스킵으로 성능 절약
- 커서 렌즈: 가우시안 `σ = 130px`, 게인 `+0.55`
- 색: G 채널 고정 255, R/B만 `v`로 리프트 — `#33FF66 → 백열` 전이
- 유휴 2.2s 초과 시 렌즈가 리사주 궤도로 자율 유영

## 왜 작동하는가

같은 노이즈라도 픽셀 그라디언트로 그리면 연기가 되고, 문자로 양자화하면 기계가 된다 — 이산 램프의 계단이 데이터라는 인상을 만들기 때문. 문자는 픽셀보다 정보 밀도가 낮아서 오히려 필드의 큰 구조가 잘 읽히고, 관객은 무의식적으로 글자를 읽으려다 패턴을 읽게 된다. 커서 렌즈가 해상도를 국소적으로 올려주는 구조라, 인터랙션이 "장식 추가"가 아니라 "관측 행위"처럼 느껴진다.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- 스칼라장 → 문자 램프 양자화 — 어떤 데이터든 ASCII 비주얼로 바꾸는 범용 레시피
- 공백 단계 드로우 스킵 — fillText 수를 30%+ 절약하는 공짜 최적화
- 값 하나로 문자·색 두 채널 동시 구동 — 채널 간 정합이 저절로 맞는다

**버릴 것**
- fillText 3천 회/frame은 캔버스 텍스트 렌더링의 한계선 — 셀을 더 줄이려면 글리프 아틀라스(drawImage)로
- 본문 콘텐츠 위 오버레이 금지 — 문자 노이즈가 실제 텍스트의 가독성을 죽인다
