---
title: "Flow Field — 노이즈 벡터장 파티클"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/flow-field/demo"
collectedAt: 2026-07-04
curator: "iq"
category: experimental
interaction:
  - cursor-fx
  - parallax-depth
stack:
  - vanilla-js
  - canvas-2d
palette:
  - "#04070C"
  - "#4DD0FF"
  - "#EAFCFF"
typography:
  display: "산세리프 초고중량 — cyan 그라디언트 클리핑"
  body: "JetBrains Mono (HUD)"
  classification: sans-led
media:
  cover: "/specimens/flow-field/cover.webp"
snippet: "/specimens/flow-field/demo/"
featured: false
---

자체 기법 연구(etude). 노이즈 벡터장(flow field)을 따라 1,100개 입자가 스트림을 그린다. 각 입자는 자기 위치의 노이즈 각도를 속도로 삼고, 커서는 국소 소용돌이가 된다.

## 씬 구조

단일 씬, 연속 적분 필드. 배경은 지우지 않고 매 프레임 `rgba(bg,0.058)`로 얇게 덮어 트레일이 결로 남는다. 클라이맥스는 없다 — 상태가 계속 흐르는 정상류(steady flow) 그 자체가 대상. 커서 반경(170px) 안에서만 접선 성분이 더해져 소용돌이가 생긴다.

## 모션 스펙

- 벡터장: `angle = valueNoise(x·0.0016 + t, y·0.0016 − t) · 4π` — 시간축으로 서서히 회전
- 입자: 각도를 속도로 적분, `speed 1.5px/frame`, 수명 `40–160frame` 후 재파종
- 소용돌이: 커서 반경 내 `perp(d) · (1 − d²/r²)` 접선 가속 — 중심에서 멀수록 약하게
- 색: 프레임 이동거리로 속도 추정 → 느리면 `#4DD0FF`, 빠르면 백색, `globalCompositeOperation: lighter` 가산 합성
- 트레일 감쇠: 배경 오버레이 알파 `0.058` — 잔상 길이 결정
- 유휴 2.2s 초과 시 소용돌이 중심이 리사주 궤도로 자율 유영

## 왜 작동하는가

파티클을 개별로 애니메이트하면 폭죽이지만, 공통의 벡터장에 종속시키면 강물이 된다 — 개체는 무작위인데 전체는 질서 있게 흐르는 창발이 시선을 잡는다. 가산 합성이라 스트림이 겹치는 밀집부가 저절로 밝아져 명암 구조가 데이터에서 나온다. 트레일을 완전히 지우지 않는 얇은 감쇠가 "지금 흐름"과 "방금 지나간 결"을 동시에 보여줘 필드의 형상이 읽힌다.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- flow field 적분 패턴 — 히어로/앰비언트 배경 파티클의 표준 골격
- 배경 얇은 감쇠(clear 대신 반투명 덮기) — 트레일 길이를 알파 하나로 튜닝
- 속도→색 매핑 — 데이터 기반 명암, 조명 계산 없이 입체감

**버릴 것**
- `Math.sin` 해시 노이즈는 저렴하지만 축 정렬 아티팩트가 있다 — 프로덕션은 simplex로 교체
- 1,100입자 상시 rAF + 가산 합성은 배터리를 먹는다 — 뷰포트 밖/비가시 탭에서 정지 필요
