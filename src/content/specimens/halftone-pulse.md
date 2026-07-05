---
title: "Halftone Pulse — 도트 매트릭스 파동"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/halftone-pulse/demo"
collectedAt: 2026-07-03
curator: "jh"
category: experimental
interaction:
  - grid-play
  - cursor-fx
  - morphing
stack:
  - vanilla-js
  - canvas-2d
palette:
  - "#0C0A06"
  - "#FF7A1A"
  - "#FFF2DF"
typography:
  display: "Georgia 이탤릭 세리프 — 도트 위 워드마크"
  body: "JetBrains Mono (HUD)"
  classification: serif-led
media:
  cover: "/specimens/halftone-pulse/cover.webp"
snippet: "/specimens/halftone-pulse/demo/"
featured: false
---

자체 기법 연구(etude). 인쇄 하프톤의 인터랙티브 버전. 격자 셀의 값(2축 사인 파동 + 커서 벌지 + 클릭 리플)을 도트 반지름과 밝기로 매핑한다.

## 씬 구조

단일 씬, 균일 격자(gap 18–30px, 뷰포트 비례). 도트 크기가 값을 표현하는 유일한 채널 — 큰 도트가 곧 신호다. 세 소스가 한 값으로 합쳐진다: ① 상시 흐르는 2축 사인 파동(바탕) ② 커서 근접 가우시안 벌지(초점) ③ 클릭 리플(이벤트). 클라이맥스는 리플 파면이 격자를 가로지르는 순간.

## 모션 스펙

- 바탕 파동: `sin(x·0.018 + 1.3t) · cos(y·0.02 − t)` → `[0,1]` 정규화
- 커서 벌지: 가우시안 `exp(−d²/2σ²)`, `σ = 150px`
- 클릭 리플: 파면 반지름 `age · 520px/s`, 두께 `σ = 26px`, 수명 `2.6s` 선형 감쇠
- 도트 반지름: `0.6 + v · (gap · 0.52)` — 셀 간격을 넘지 않게 클램프
- 밝기: 알파 `0.16 → 0.96`, G/B 채널만 `v`로 리프트해 `#FF7A1A → 백열` 전이

## 왜 작동하는가

정보를 위치가 아니라 크기로 인코딩하면 눈이 저해상도 이미지를 복원하듯 전체 형상을 재구성한다 — 그래서 도트 하나하나가 아니라 "밝은 덩어리"가 먼저 보인다. 유한 속도 리플이 핵심: 무한 속도(전체 동시 반응)는 조명 스위치처럼 밋밋하지만, 파면이 시간차로 도착하면 물질이 출렁이는 인상을 준다. 세리프 이탤릭 워드마크를 얹어 디지털 격자에 인쇄물의 격조를 섞었다.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- 유한 속도 파면(리플) — 클릭 피드백을 물성으로 바꾸는 값싼 트릭. 버튼/토글에도 이식 가능
- 다중 소스를 단일 스칼라로 합성 후 한 채널(크기)로 출력 — 하프톤 데이터 비주얼의 기본형
- 세리프+격자 대비 — 브랜드 톤에 따라 서체만 바꿔 재사용

**버릴 것**
- 셀마다 `Math.sqrt`/`exp` 호출은 격자가 커지면 급증 — 큰 화면은 리플 거리 제곱 비교로 최적화
- 도트 밀도 과하면 무아레가 생긴다 — gap을 폰트/이미지 해상도와 정합시킬 것
