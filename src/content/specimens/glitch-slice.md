---
title: "Glitch Slice — RGB 분리 슬라이스"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/glitch-slice/demo"
collectedAt: 2026-06-29
curator: "jh"
category: experimental
interaction:
  - type-motion
  - morphing
stack:
  - vanilla-js
  - canvas-2d
palette:
  - "#0A0A0C"
  - "#FF0044"
  - "#00E5FF"
  - "#F5F5F7"
typography:
  display: "산세리프 초고중량 — 캔버스에 구운 뒤 채널 분리"
  body: "JetBrains Mono (HUD)"
  classification: type-driven
media:
  cover: "/specimens/glitch-slice/cover.webp"
snippet: "/specimens/glitch-slice/demo/"
featured: false
---

자체 기법 연구(etude). 아날로그 신호 오류의 문법 — RGB 채널 분리와 수평 슬라이스 변위 — 를 캔버스 합성으로 재현한다. 타이포를 오프스크린에 한 번 굽고, 매 프레임 세 채널로 찢어 다시 조립하는 구조.

## 씬 구조

단일 씬, 시간 구조가 핵심. 평상시(유휴)는 `±2.2px` 미세 채널 진동만 — 살아있다는 신호. 2.6초마다 420ms 버스트가 자동 발화하고, 클릭은 즉발 트리거다. 버스트 동안 화면이 18개 수평 띠로 찢어져 띠마다 다른 변위로 어긋났다가 지수적으로 복귀한다. 위에 CSS 스캔라인(3px 주기)과 비네트가 CRT 질감을 고정한다.

## 모션 스펙

- 소스: 오프스크린 1회 렌더 → `source-in`으로 R/C/W 3장 사전 틴트 — 프레임 비용은 drawImage뿐
- 합성: `globalCompositeOperation: lighter` — R+C 겹침부는 백열, 어긋난 가장자리만 채널색
- 채널 오프셋: R `−split`, C `+split·0.72` (비대칭이 더 아날로그답다), 유휴 `±2.2px` → 버스트 `±14px`
- 슬라이스: 18띠 × 변위 `±46px·k`, 시드는 90ms 버킷 — 프레임마다가 아니라 뚝뚝 끊겨야 글리치답다
- 버스트: 주기 `2600ms`, 지속 `420ms`, 강도 `k = 1 − age/420` 선형 감쇠
- 스캔라인: `repeating-linear-gradient` 1px/3px — JS 비용 0

## 왜 작동하는가

글리치는 "고장"의 기호라서 완벽하게 통제된 화면보다 신뢰를 준다 — 매체가 자기 물성을 드러내는 순간이기 때문. 핵심은 리듬이다: 상시 글리치는 소음이지만, 평온 → 발작 → 복귀의 주기는 심장박동이 된다. 변위 시드를 90ms 버킷으로 양자화한 것도 같은 이유 — 부드러운 랜덤은 젤리처럼 보이고, 계단식 랜덤이어야 신호 드롭으로 읽힌다.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- 사전 틴트 오프스크린 3장 — 채널 분리를 프레임당 drawImage 3회로 끝내는 구조
- 시드 시간 버킷(90ms) — "글리치는 이산적이어야 한다"는 원칙의 구현
- 버스트 주기 구조 — hover/클릭 피드백, 페이지 전환 순간에 이식 가능

**버릴 것**
- 상시 발화는 금물 — 접근성(전정 장애·광과민)에 적대적이다. reduced-motion에서 정적 스플릿으로 강등 필수
- 본문/UI 요소에 적용 금지 — 신뢰를 만드는 기법이 아니라 소비하는 기법이다. 히어로 한 곳에만
