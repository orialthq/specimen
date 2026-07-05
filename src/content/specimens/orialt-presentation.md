---
title: "OriAlt Presentation — Deck Engine"
url: "https://github.com/orialthq/presentation"
collectedAt: 2026-07-05
curator: "iq"
category: experimental
interaction:
  - scroll-cinematic
  - page-transition
  - scroll-jacking
  - type-motion
stack:
  - react
  - custom-deck-engine
  - css-transforms
palette:
  - "#05080A"
  - "#EEF3EE"
  - "#FF5A2C"
  - "#FFB454"
  - "#2FE6CF"
typography:
  display: "Pretendard 초고중량(860) 산세리프 — 그라디언트 클리핑"
  body: "Pretendard"
  classification: type-driven
media:
  cover: "/specimens/orialt-presentation/cover.webp"
snippet: "/specimens/orialt-presentation/demo/"
featured: true
---

PPT 대체용 웹 발표 덱. 라이브러리 없이 112줄짜리 덱 엔진(React)으로 페이지 스냅, carry 배경, 리듀스드 모션 폴백까지 처리한다. 해부 대상은 **carry backdrop** — 이 덱의 시그니처 기법.

## 씬 구조

콘텐츠(pages 배열)와 룩(mood)이 완전히 분리된 구조. 씬 수는 콘텐츠가 정하고, mood는 `Backdrop`(덱 레벨 1회 마운트) + `Page`(씬 렌더러) 두 컴포넌트만 공급한다.

- 씬 유형: `cover` → `stat` → `grid` → `statement` → `cta` 의 5종 어휘
- 클라이맥스: warm→cool 색 반전 지점 (`progress 0.58`). 문제 제기(warm)에서 해법(cool)으로 넘어가는 서사 전환점이 색으로 표시된다
- 배경은 씬에 속하지 않는다 — 전체 진행도(0..1)를 받아 연속 변조되는 단일 레이어

## 모션 스펙

- 씬 전환: `cubic-bezier(0.76, 0, 0.24, 1)` · `0.8s` · `translate3d` 트랙 스냅
- 휠 잠금: `720ms` (전환 시간 0.8s보다 짧게 — 연타 리듬 허용)
- carry 배경: `hue-rotate(0deg → 128deg)` + `scale(1 → 1.18)` + `translateY(0 → -12vh)`, 씬 전환과 동일 이징
- 블러 필드: `blur(70px)` radial-gradient 4장 겹침, `saturate(150%)`
- 터치 스와이프 임계값: `45px` · 휠 델타 임계값: `10`

## 왜 작동하는가

슬라이드 덱이 지루한 이유는 페이지마다 세계가 리셋되기 때문이다. 이 덱은 배경을 씬이 아니라 **여정 전체**에 귀속시켰다 — 페이지는 끊겨도 공기(색, 빛)는 연속적으로 흐른다. 뇌는 색 온도의 점진 변화를 서사의 진행으로 읽기 때문에, "몇 장 남았나"가 아니라 "어디쯤 왔나"로 체감된다. hue-rotate 하나로 배경 이미지를 N장 만들지 않고 N개 씬의 무드를 커버하는 비용 효율도 크다.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- carry backdrop 패턴 — 진행도 기반 단일 배경 변조. Specimen 상세 페이지 스크롤에도 적용 가능
- `cubic-bezier(0.76, 0, 0.24, 1)` — 스냅 전환의 기준 이징으로 채택할 가치
- 휠 잠금(720ms) < 전환(800ms) 설정 — 잠금이 전환보다 살짝 짧아 연속 탐색이 끊기지 않는다

**버릴 것**
- 전면 스크롤 재킹 — 발표 덱에서는 정당하지만 아카이브/문서 성격 페이지에는 과하다
- `hue-rotate` 일괄 변조는 브랜드 컬러 고정이 필요한 사이트에서는 통제 불능 — 팔레트가 자유로운 프로젝트에서만
