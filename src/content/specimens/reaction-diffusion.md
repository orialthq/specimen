---
title: "Diffusion — Gray-Scott 반응-확산"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/reaction-diffusion/demo"
collectedAt: 2026-06-26
curator: "iq"
category: experimental
interaction:
  - morphing
  - cursor-fx
stack:
  - vanilla-js
  - canvas-2d
palette:
  - "#12000E"
  - "#FF2EC8"
  - "#FFD9F4"
typography:
  display: "세리프 이탤릭 — 무늬 위 워드마크"
  body: "JetBrains Mono (HUD)"
  classification: serif-led
media:
  cover: "/specimens/reaction-diffusion/cover.webp"
snippet: "/specimens/reaction-diffusion/demo/"
featured: false
---

자체 기법 연구(etude). 가상 화학종 A/B의 확산+반응 방정식(Gray-Scott)이 산호·지문·표범 무늬를 스스로 기른다. 튜링이 1952년에 예언한 형태발생의 시뮬레이션.

## 씬 구조

단일 씬, 176×110 시뮬 격자를 풀스크린으로 업스케일. 렌더는 상태의 그림자일 뿐, 진짜 주인공은 두 장의 Float32Array다. 커서가 B를 주입하는 시드 브러시, 클릭은 큰 시드. 로드 시 280스텝 워밍업으로 "이미 자란 정원"에서 시작한다.

## 모션 스펙

- 파라미터: `f 0.0545 · k 0.062` (산호 성장 영역) · `DA 1.0 / DB 0.5`
- 라플라시안: 인접 `0.2` ×4 + 대각 `0.05` ×4 − 중심 `1.0`
- 적분: `6 step/frame` — 성장 속도와 프레임 비용의 절충
- 렌더: `1 − clamp(A−B)`를 마젠타 램프로, 코어(>0.72)는 백열 리프트
- 유휴 시드: **2.7초에 1회만** — 연속 주입은 A를 고갈시켜 전체 무늬를 죽인다 (실측 버그였음)

## 왜 작동하는가

이 무늬는 그린 것이 아니라 자란 것이다 — 성장 규칙만 있고 결과 형상은 방정식도 모른다. 관객은 무늬가 퍼지고 갈라지고 서로를 밀어내는 과정을 실시간으로 보므로, 정적인 텍스처와 달리 "살아있다"는 인상을 받는다. f/k 두 스칼라만 바꾸면 산호→줄무늬→미토시스로 종이 바뀌는 것도 이 시스템의 마법.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- 저해상 시뮬 + 업스케일 구조 — 픽셀 시뮬레이션을 60fps로 돌리는 표준 골격
- 로드 워밍업 — 성장형 시스템은 "다 자란 상태"로 첫 화면을 열어야 한다
- 주입은 이산적으로 — 연속 주입이 계를 죽인 실측 사례. 시뮬레이션 인터랙션 설계의 교훈

**버릴 것**
- CPU 6스텝은 한계 — 고해상/고속 성장은 WebGL 핑퐁 텍스처로 이주
- f/k는 지뢰밭 — 영역 밖 값은 즉시 전멸이라 사용자 노출 파라미터로는 부적합
