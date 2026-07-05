---
title: "Hex Pulse — 벌집 레이더"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/hex-pulse/demo"
collectedAt: 2026-06-14
curator: "iq"
category: experimental
interaction:
  - grid-play
  - cursor-fx
stack:
  - vanilla-js
  - canvas-2d
palette:
  - "#0F0D02"
  - "#FFE14D"
  - "#FFFBE0"
typography:
  display: "산세리프 초고중량 — 옐로 그라디언트 클리핑"
  body: "JetBrains Mono (HUD)"
  classification: sans-led
media:
  cover: "/specimens/hex-pulse/cover.webp"
snippet: "/specimens/hex-pulse/demo/"
featured: false
---

자체 기법 연구(etude). 육각 격자에 방사 파동을 흘리고 셀의 스케일·발광으로 파동값을 표현한다 — halftone의 도트를 아웃라인 헥스로 치환하면 인상이 인쇄물에서 계기판(레이더)으로 바뀐다.

## 씬 구조

단일 씬, 헥스 ~700셀(오프셋 행 배치). 세 파동원의 합: ① 중심에서 상시 방사되는 호흡 파동 ② 커서 근접 가우시안 ③ 클릭 에피센터의 유한속도 파면(최대 5개). 값이 낮은 셀은 아예 그리지 않아서, 파동이 지나가는 자리만 벌집이 "점등"되는 레이더 스윕의 인상이 생긴다.

## 모션 스펙

- 격자: 외접반지름 `21px`, 행 오프셋 `√3r/2` — 표준 포인티톱 육각 배치
- 호흡: `sin(d·0.016 − t·0.0024)` — 중심 발 방사, 주기 `2.6s`
- 클릭 파면: `c = 430px/s`, 두께 `σ40px`, 수명 3s
- 셀 렌더: 스케일 `0.2 + v·0.76`, 선폭 `0.8 + v·1.6`, `v<0.05` 스킵
- 색: 옐로 → 백열 리프트 (G 소폭 감소, B 상승)

## 왜 작동하는가

육각형은 원의 효율과 격자의 질서를 동시에 갖는 유일한 타일링이라, 도트 격자보다 "설계된 시스템"의 인상이 강하다 — 같은 파동이라도 도트는 인쇄, 헥스는 SF 계기판으로 읽히는 이유. 스케일과 선폭을 함께 변조하면 셀이 커지는 게 아니라 "차오르는" 것처럼 보인다. 저값 셀 스킵은 성능 최적화이자 미학 — 어둠이 있어야 점등이 산다.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- 도트→헥스 치환의 무드 전환 — 같은 데이터, 다른 세계관. 격자 모양 자체가 톤앤매너다
- 저값 셀 드로우 스킵 — 필드형 비주얼의 공짜 최적화 + 대비 강화
- 유한속도 파면 재사용 — halftone과 동일 수식, 격자만 교체

**버릴 것**
- 헥스 아웃라인은 도트보다 패스 비용이 6배 — 셀 수를 도트만큼 못 늘린다
- 파동원 3계층이 최대 — 더 겹치면 점등 패턴이 노이즈가 된다
