---
title: "Gooey Cursor — 메타볼 커서 트레일"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/gooey-cursor/demo"
collectedAt: 2026-07-05
curator: "iq"
category: experimental
interaction:
  - cursor-fx
  - morphing
stack:
  - vanilla-js
  - canvas-2d
  - css-filter
palette:
  - "#170208"
  - "#FF3D6E"
  - "#FFD3E0"
typography:
  display: "산세리프 초고중량 — mix-blend-mode: difference"
  body: "JetBrains Mono (HUD)"
  classification: sans-led
media:
  cover: "/specimens/gooey-cursor/cover.webp"
snippet: "/specimens/gooey-cursor/demo/"
featured: false
---

자체 기법 연구(etude). SVG goo 필터의 캔버스 버전 — 블롭을 블러로 뭉갠 뒤 대비로 다시 이진화하면 원들이 만나는 지점에서 표면장력처럼 붙는다.

## 씬 구조

단일 씬, 3레이어 합성. ① 캔버스(블롭 렌더) ② `blur(22px) contrast(26)` CSS 필터 — 메타볼 임계값 처리 ③ `mix-blend-mode: difference` 타이틀 — 블롭이 지나가면 글자가 반전된다. 커서 체인(14마디) + 자율 궤도 블롭 3개 + 클릭 버스트(8발)가 한 캔버스에서 섞인다.

## 모션 스펙

- 스프링 체인: 머리 `lerp 0.30`, 꼬리로 갈수록 `0.30 → 0.22` 감쇠 — 채찍 같은 지연
- 임계값 트릭: `filter: blur(22px) contrast(26)` — 불투명 배경 위에서만 깨끗하게 잘린다
- 반지름: `52px × (1 − i/17)` + `sin(t·0.004)` 펄스 8%
- 클릭 버스트: 8방향 · 초속 `4.5–8` · 감쇠 `×0.94/frame` · 수명 `~55frame`
- 유휴 2s 초과 시 리사주 궤도(`sin 0.00047 / 0.00071`)로 자율 유영

## 왜 작동하는가

커서 트레일이 잔상(모션 블러)이 아니라 점성 유체로 읽힌다 — 블롭이 붙고 떨어질 때의 목 넘김(neck) 형상이 물리적 실재감을 만든다. difference 블렌드 덕에 블롭은 배경 장식이 아니라 텍스트와 충돌하는 오브젝트가 된다. 커서를 숨기고(`cursor: none`) 블롭 머리가 커서를 대체하므로 시선이 포인터가 아닌 유체에 간다.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- blur+contrast 임계값 트릭 — SVG 필터보다 싸고 캔버스와 궁합이 좋다
- 스프링 계수를 마디 순번에 따라 감쇠 — 균일 lerp보다 유기적인 꼬리
- 유휴 시 리사주 자율 유영 — 임베드/썸네일에서도 죽지 않는 데모

**버릴 것**
- `cursor: none`은 실서비스 전역 적용 금지 — 인터랙티브 요소 위에서는 복원 필수
- contrast(26) 같은 극단값은 색 공간을 찌그러뜨린다 — 단색 계열 팔레트에서만 안전
