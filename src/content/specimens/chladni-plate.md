---
title: "Chladni — 소리의 모래 무늬"
url: "https://github.com/orialthq/specimen/tree/main/public/specimens/chladni-plate/demo"
collectedAt: 2026-06-17
curator: "jh"
category: experimental
interaction:
  - morphing
  - cursor-fx
stack:
  - vanilla-js
  - canvas-2d
palette:
  - "#050505"
  - "#EAD9B0"
  - "#F2E8D5"
typography:
  display: "세리프 이탤릭 — 모래 위 워드마크"
  body: "JetBrains Mono (HUD)"
  classification: serif-led
media:
  cover: "/specimens/chladni-plate/cover.webp"
snippet: "/specimens/chladni-plate/demo/"
featured: false
---

자체 기법 연구(etude). 클라드니 판 — 진동판 위 모래는 진폭이 0인 마디선으로 모인다. 입자 2,600개를 `|V|`의 경사 하강으로 굴리면 바이올린 장인의 그 무늬가 화면에서 자란다.

## 씬 구조

단일 씬, 정상파 모드의 순환. `V = sin(aπx)sin(bπy) + sin(bπx)sin(aπy)`의 (a,b) 모드 6종이 5초마다 크로스페이드로 전환된다 — 모래가 이전 무늬에서 다음 무늬로 이주하는 과정 자체가 애니메이션이다. 클릭은 즉시 다음 모드. 로드 시 220회 워밍업으로 이미 정착된 무늬에서 시작한다.

## 모션 스펙

- 필드: `V(a,b)` + 해석적 기울기 — 수치 미분 없이 정확한 ∇V
- 이주: `x −= V·∇V·0.0016` (|V|² 하강) + 지터 `±0.0035` — 지터가 진동판의 떨림 역할
- 모드: `(1,2)(2,3)(1,3)(3,4)(2,5)(3,5)`, 크로스페이드 `lerp 0.02`
- 렌더: 마디 근접도 `1−|V|·1.6` → 알파 — 정착한 모래일수록 밝다
- 잔상: 배경 `α0.28` 덮기 — 이주 경로가 흐릿하게 남는다

## 왜 작동하는가

무늬를 그리는 주체가 없다 — 모래알 각각은 "덜 흔들리는 곳"을 찾아 구를 뿐인데, 그 합이 대칭 무늬가 된다. 모드 전환이 백미: 무늬 A가 흩어져 무늬 B로 재결정되는 과정은 눈송이가 다시 조립되는 것 같은 마술적 인상을 준다. 지터가 없으면 입자가 국소 최소에 갇혀 무늬가 거칠어진다 — 노이즈가 품질을 만드는 역설.

## 훔쳐올 것 / 버릴 것

**훔쳐올 것**
- 경사 하강 입자 = 필드의 가시화 — 어떤 스칼라장이든 "모래"로 렌더링하는 범용 기법
- 크로스페이드 모프 — 상태 전환을 입자의 이주로 보여주는 서사
- 지터의 어닐링 효과 — 확률적 노이즈로 국소 최소 탈출

**버릴 것**
- 해석적 기울기가 가능한 필드에서만 이 성능이 나온다 — 임의 필드는 수치 미분 비용 4배
- 진짜 클라드니는 판 경계 조건이 복잡하다 — 이건 단순화 모델임을 노트에 명시할 것
