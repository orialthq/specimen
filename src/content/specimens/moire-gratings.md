---
title: "Moiré — 간섭 격자"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/moire-gratings/demo"
collectedAt: 2026-06-19
curator: "jh"
category: experimental
interaction:
  - grid-play
  - morphing
stack:
  - vanilla-js
  - canvas-2d
palette:
  - "#0A0A0F"
  - "#FF3355"
  - "#3355FF"
typography:
  display: "세리프 이탤릭 — 간섭 무늬 위 워드마크"
  body: "JetBrains Mono (HUD)"
  classification: serif-led
media:
  cover: "/specimens/moire-gratings/cover.webp"
snippet: "/specimens/moire-gratings/demo/"
featured: false
---

자체 기법 연구(etude). 동심원 격자 두 장을 겹치면 그리지 않은 세 번째 무늬가 태어난다 — 리소그래프 2도 인쇄의 겹침 사고를 의도로 바꾼 스크린 버전.

## 씬 구조

단일 씬, 링 52개×2세트. 적색 격자는 중심 고정에 링이 바깥으로 자라고, 청색 격자는 커서가 중심을 끌고 다니며 위상은 역방향. 두 중심의 거리가 모아레 무늬의 주파수를 결정한다 — 가까우면 굵은 꽃무늬, 멀면 조밀한 쌍곡선. `screen` 합성으로 겹침부는 보라로 상승한다.

## 모션 스펙

- 격자: 피치 `13px` · 잉크비 `0.35`(선폭 4.6px) · 링 52개
- 위상: 적 `+0.012px/ms`(팽창), 청 `−0.009px/ms`(수축) — 역방향이라 맥놀이가 생긴다
- 커서 추종: `lerp 0.05` — 중심이 관성을 갖고 따라온다
- 합성: `screen` — R+B 겹침 = 마젠타/보라, 리소그래프 오버프린트의 문법
- 유휴 시 청 중심이 소폭 리사주 유영 (±13%)

## 왜 작동하는가

모아레는 화면에 존재하지 않는 패턴이다 — 두 격자의 공간 주파수 차가 눈에서 저주파로 복조되는 것. 그래서 아무리 봐도 "어디가 움직이는지" 특정할 수 없고, 그 지각적 미끄러움이 최면성을 만든다. 파라미터는 위상 속도 두 개뿐인데 결과는 끝없이 변하는 무늬 — 시스템의 단순함 대비 출력의 풍부함이 극단적인 사례.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- 두 주기 구조의 차분 = 저주파 무늬 — 패턴 애니메이션의 치트키 (줄무늬·도트에도 적용)
- 역방향 위상 — 같은 방향이면 무늬가 밋밋하게 흐른다. 긴장은 반대 운동에서
- 잉크비 개념(피치 대비 선폭) — 격자 비주얼의 농도를 잡는 단일 노브

**버릴 것**
- 광과민성 주의 대상 1순위 — reduced-motion 정지 프레임 필수, 전면 배경으로 장시간 노출 금지
- 저해상 디스플레이에서 서브픽셀 앨리어싱과 뒤섞여 지저분해진다 — DPR≥1.5 권장
