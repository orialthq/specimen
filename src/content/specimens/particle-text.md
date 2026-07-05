---
title: "Particle Text — 입자 타이포"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/particle-text/demo"
collectedAt: 2026-06-20
curator: "iq"
category: experimental
interaction:
  - type-motion
  - cursor-fx
  - morphing
stack:
  - vanilla-js
  - canvas-2d
palette:
  - "#140208"
  - "#FF8FA3"
  - "#FFE3E9"
typography:
  display: "산세리프 초고중량 — 입자로 분해된 워드마크"
  body: "JetBrains Mono (HUD)"
  classification: type-driven
media:
  cover: "/specimens/particle-text/cover.webp"
snippet: "/specimens/particle-text/demo/"
featured: false
---

자체 기법 연구(etude). 타이포를 오프스크린에 굽고 알파 채널을 격자 샘플링해 입자들의 "홈" 좌표로 쓴다. 커서가 흩뜨리고 스프링이 재조립한다 — 글자가 모래이자 자석이 된다.

## 씬 구조

단일 씬, 입자 ~2,500개(뷰포트 비례 샘플 간격). 세 힘의 합이 전부다: ① 홈으로 당기는 스프링 ② 커서 반경의 척력 ③ 감쇠. 로드 시 입자들이 무작위 위치에서 날아와 글자로 응집하는 것이 오프닝, 클릭 폭발(거리 반비례 임펄스) 후 재조립이 클라이맥스.

## 모션 스펙

- 샘플링: 알파 > 128 셀만, 간격 `max(4, W/240)px`
- 스프링: `k 0.012` · 감쇠 `0.88` — 살짝 언더댐핑, 재조립 때 미세 오버슈트
- 커서 척력: 반경 `110px`, `(1 − d/r) × 3.2`
- 클릭 폭발: 임펄스 `min(9, 460/d)` — 전역이되 중심 근처가 강하게
- 렌더: 변위 속도 → 밝기·크기 리프트, 배경 `α0.5` 덮기(잔상 짧게)

## 왜 작동하는가

글자는 읽기의 대상이지 만지기의 대상이 아니라는 통념을 뒤집는 순간 강한 인상이 생긴다. 흩어진 입자가 다시 글자로 "돌아온다"는 것이 핵심 — 파괴가 복구를 전제하므로 사용자는 죄책감 없이 계속 부순다. 스프링의 미세 오버슈트가 조립 순간에 살아있는 탄성을 주고, 변위 중에만 밝아지는 색 덕에 흩어지는 순간이 가장 화려하다.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- 알파 샘플링 → 홈 좌표 파이프라인 — 로고·아이콘·숫자 무엇이든 입자화하는 범용 레시피
- 파괴→복구 루프 — 인터랙션에 비용이 없어 체류 시간이 길어진다
- 변위 기반 발광 — 상태 변화가 곧 하이라이트

**버릴 것**
- 히어로 타이틀에 쓰면 LCP/가독성 둘 다 손해 — 장식 워드마크 전용
- 입자 수는 샘플 간격의 제곱에 반비례 — 모바일에서 간격을 공격적으로 키울 것
