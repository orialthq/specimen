# SPEC.md — Specimen 기획서

## 1. 문제 정의

웹 디자인 레퍼런스 갤러리(awwwards, godly, httpster, siteinspire)는 전부 **스크린샷 + 링크**에서 멈춘다. 개발자/디자이너가 실제로 필요한 건 "이게 왜 좋아 보이는가"의 실행 디테일 — 이징 값, 전환 타이밍, 컬러 시스템, 씬 구조 — 인데, 그건 매번 각자 devtools 열어서 뜯어야 한다.

Specimen은 그 해부 작업을 대신 해서 아카이빙한다. **모으는 서비스가 아니라 해부하는 서비스다.**

## 2. 타겟 사용자

1차: 시네마틱/에디토리얼 웹을 만들려는 프론트엔드 개발자 (우리 자신이 0번 사용자)
2차: 인터랙션 디테일까지 스펙으로 커뮤니케이션하고 싶은 웹 디자이너

## 3. 핵심 개념 — 표본(Specimen)

레퍼런스 1건 = 표본 1건. 표본은 세 층으로 구성된다.

| 층 | 내용 | 경쟁 서비스 대비 |
|:---|:-----|:----------------|
| 채집 | 라이브 링크, 커버 이미지, 영상 캡처 | 여기까지가 기존 갤러리 |
| 라벨 | 분류 태그, 추출 팔레트, 타이포 식별, 스택 추정 | 일부만 제공 |
| **해부 노트** | 씬 구조 분해, 이징/타이밍 측정값, 작동 원리 분석, 재현 스니펫 | **Specimen만 제공** |

## 4. 데이터 모델

`src/content/specimens/{slug}.md` — frontmatter + 본문(해부 노트).

```yaml
title: "Shopify Renaissance Edition"
url: "https://..."
collectedAt: 2026-07-05          # 채집일
curator: "iq"                     # iq | jh
category: campaign                # landing | portfolio | product | editorial | campaign | experimental
interaction:                      # 복수 선택
  - scroll-cinematic
  - parallax-depth
  - 3d-float
stack:                            # 추정 포함, 확인된 것은 그대로
  - threejs
  - gsap-scrolltrigger
  - lenis
palette:                          # 추출 hex, 지배색 순
  - "#292919"
  - "#F7F7EE"
typography:
  display: "Didot 계열 고대비 세리프"
  body: "산세리프"
  classification: serif-led       # serif-led | sans-led | mixed | type-driven
media:
  cover: "/specimens/shopify-renaissance/cover.webp"
  capture: "/specimens/shopify-renaissance/capture.mp4"   # 선택
snippet: "/specimens/shopify-renaissance/demo"            # 선택, 재현 데모 경로
featured: false
```

본문(해부 노트) 필수 섹션:

1. **씬 구조** — 페이지가 몇 개의 씬으로 나뉘고 클라이맥스가 어디인지
2. **모션 스펙** — 측정/추정한 이징 곡선과 duration (예: `expo.inOut`, 1.2s). 모노스페이스 표기
3. **왜 작동하는가** — 3~5문장. 기법이 아니라 효과의 원리
4. **훔쳐올 것 / 버릴 것** — 우리 프로젝트에 가져갈 요소와 과한 요소 구분

인터랙션 태그 사전 (시작값, 필요 시 추가):
`scroll-cinematic` `parallax-depth` `3d-float` `morphing` `cursor-fx` `hover-reveal` `type-motion` `page-transition` `scroll-jacking` `webgl-shader` `video-hero` `grid-play`

## 5. 페이지 구성 (MVP)

### `/` — 표본 서랍 (그리드)
- 카드 그리드. 카드 = 커버 + 박물관 라벨 스타일 메타(표본 번호, 제목, 분류, 채집일, 팔레트 스트립)
- 상단 필터 바: category / interaction / stack — 클라이언트 사이드, URL 쿼리 동기화
- hover 시 capture 영상 재생 (있는 경우)
- 정렬: 채집일 역순, featured 상단 고정

### `/s/{slug}` — 해부 페이지
- 히어로: 커버 or 캡처 영상 + 라벨 블록(전체 메타데이터)
- 팔레트 스트립: hex 클릭 시 복사
- 해부 노트 본문 렌더링
- 스니펫 있으면 임베드(iframe) + 코드 보기
- 원본 방문 링크 (명확하게 — 우리는 아카이브지 원본 대체물이 아님)
- 하단: 같은 태그의 다른 표본 3건

### 그 외
- `/about` — 서비스 정의 한 페이지. OriAlt 링크
- 404 — "이 표본은 채집되지 않았습니다" 정도의 위트

## 6. MVP 범위

**포함**
- 표본 30건 초기 큐레이션 (런칭 기준선. 채집 파이프라인은 아래 7)
- 그리드 + 필터 + 해부 페이지 + about
- 표본 스캐폴딩 스크립트 (`npm run new`)
- GitHub Actions 배포

**제외 (v2 이후)**
- 사용자 제출 폼, 계정, 좋아요/북마크
- 전문 검색 (텍스트 검색)
- RSS / 뉴스레터
- 스니펫 라이브 에디터
- i18n (초기 언어는 한국어 해부 노트 + 영문 메타. 글로벌 전환 시점에 판단)

## 7. 콘텐츠 파이프라인 (운영)

1. 채집: X/godly/awwwards 등에서 후보 발견 → 링크만 이슈로 등록 (`collect` 라벨)
2. 해부: 주 2~3건 목표. devtools + 스크롤 녹화로 모션 스펙 측정
3. 등록: `npm run new {slug}` → frontmatter 채우고 해부 노트 작성 → `content:` 커밋
4. 품질 기준: 해부 노트 없는 표본은 등록하지 않는다. 양보다 해부의 깊이가 서비스의 존재 이유

## 8. Specimen ↔ OriAlt 플라이휠

Specimen에 쌓이는 모션 스펙·씬 구조·재현 스니펫은 그대로 시네마틱 웹 프레젠테이션 제품(가칭 Mise)의 템플릿 라이브러리 원료가 된다. 표본의 해부 노트 포맷(씬 구조/모션 스펙)은 Mise의 설계도(노드 그래프) 어휘와 호환되게 유지한다 — 특히 씬, 전환, 이징 용어.

## 9. 성공 지표 (초기 3개월)

- 표본 50건 도달 (해부 노트 품질 기준 충족)
- 우리 스스로 Mise 템플릿 제작 시 Specimen을 1차 레퍼런스로 실제 사용하는가 (dogfooding)
- 외부: X(@orialthq)에 표본 1건 = 포스트 1건 배포, 반응으로 수요 검증

## 10. 마일스톤

| 단계 | 내용 | 완료 기준 |
|:-----|:-----|:---------|
| M1 | 스캐폴드: Astro + 토큰 + 스키마 + 배포 파이프라인 | 빈 그리드가 Pages에 배포됨 |
| M2 | 코어 UI: 카드, 필터, 해부 페이지 | 더미 표본 3건으로 전체 플로우 동작 |
| M3 | 콘텐츠: 표본 10건 해부 + 스캐폴딩 스크립트 | 실데이터로 필터/상세 검증 |
| M4 | 폴리시: 모바일, Lighthouse 90+, OG 이미지, about | 런칭 가능 상태 |
| M5 | 런칭: 표본 30건 + X 배포 시작 | 공개 |
