---
title: "Physarum — 점균 수송 네트워크"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/physarum-trails/demo"
collectedAt: 2026-06-25
curator: "jh"
category: experimental
interaction:
  - morphing
  - cursor-fx
stack:
  - vanilla-js
  - canvas-2d
palette:
  - "#0F0A02"
  - "#FFB524"
  - "#FFF6E0"
typography:
  display: "산세리프 초고중량 — 앰버 그라디언트 클리핑"
  body: "JetBrains Mono (HUD)"
  classification: sans-led
media:
  cover: "/specimens/physarum-trails/cover.webp"
snippet: "/specimens/physarum-trails/demo/"
featured: false
---

자체 기법 연구(etude). 점균(Physarum polycephalum) 에이전트 3,500개 — 감지→회전→전진→분비 루프만으로 도쿄 지하철망을 재현했다는 그 알고리즘(Jones 2010)이다.

## 씬 구조

단일 씬, 두 층 — 에이전트(보이지 않음)와 트레일 맵(보이는 전부). 에이전트는 앞·좌·우 3점의 페로몬을 감지해 진한 쪽으로 틀고, 지나간 자리에 분비한다. 트레일은 확산되고 증발한다. 이 되먹임이 필라멘트→간선→네트워크로 응고되는 과정이 씬의 서사다. 커서는 유인 물질(먹이)을 상시 분비한다.

## 모션 스펙

- 감지: 거리 `9px`, 각도 `±26°` · 회전: `0.32rad` · 전진: `1.25px/step`
- 트레일: 확산(십자 3탭 근사) + 증발 `×0.94/frame`
- 렌더: 농도 → 앰버 램프, 감마 `0.6` — 가는 필라멘트를 살리는 보정
- 초기 배치: 중심 타원 링 — 방사형 성장의 연출
- 격자: 440×275 고정 해상도 → 풀스크린 업스케일

## 왜 작동하는가

개미의 페로몬과 같은 스티그머지(stigmergy) — 에이전트끼리 직접 소통하지 않고 환경(트레일)에 남긴 흔적으로 소통한다. 그래서 결과물이 곤충의 집처럼 유기적이다. 증발이 핵심 균형추: 없으면 화면이 포화되고, 세면 네트워크가 못 자란다. 증발×확산×분비 세 상수의 균형이 곧 이 생물의 "종"이다.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- 스티그머지 구조(상태를 환경에 저장) — 에이전트 수천 개를 O(n)으로 돌리는 비결
- 감마 보정 렌더 — 어두운 디테일이 주인공인 비주얼의 필수 후처리
- 먹이 분비 커서 — 시스템을 조종하지 않고 유혹하는 인터랙션

**버릴 것**
- CPU 확산 패스가 가장 비싸다 — 격자를 키우려면 WebGL로
- 파라미터 민감도가 높아 반응형 크기 변경 시 재조정 필요 — 고정 격자 유지가 정답
