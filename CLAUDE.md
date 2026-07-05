# CLAUDE.md — Specimen

이 문서는 Claude Code가 이 레포에서 작업할 때 항상 참조하는 컨텍스트다.

## 프로젝트 한 줄 정의

**Specimen** — 웹 디자인 레퍼런스를 "표본"으로 수집하고 해부하는 아카이브.
스크린샷+링크만 주는 갤러리(godly, awwwards)와 달리, 각 표본에 **해부 노트**(이징 값, 컬러 hex, 전환 타이밍, 씬 구조, 재현 스니펫)가 붙는 것이 핵심 차별점이다.

- 조직: OriAlt (`orialthq`) · 2인 팀 (IQ, 배준학)
- 레포: `orialthq/specimen`
- 배포: GitHub Pages → `orialthq.github.io/specimen` (추후 `specimen.orialt.dev` CNAME)
- 상세 기획은 `SPEC.md` 참조. 이 문서와 SPEC.md가 충돌하면 SPEC.md가 우선.

## 기술 스택 (확정)

| 영역 | 선택 | 이유 |
|:-----|:-----|:-----|
| 프레임워크 | Astro 5 + TypeScript | 콘텐츠 중심 정적 사이트. Content Collections로 표본 데이터 타입 세이프 관리 |
| 스타일 | Tailwind CSS 4 | 유틸리티 + 디자인 토큰을 CSS variables로 이중 정의 |
| 콘텐츠 | Content Collections (MD + frontmatter) | 표본 1건 = `src/content/specimens/{slug}.md` |
| 인터랙션 | 순수 CSS/JS 우선, 필요 시 GSAP | 아카이브 사이트 자체는 가볍게. 무거운 3D 금지 |
| 배포 | GitHub Actions → GitHub Pages | relai와 동일 파이프라인 |
| 검색/필터 | 클라이언트 사이드 (빌드 타임 JSON) | MVP에서 서버 없음 |

## 명령어

```bash
npm run dev        # 로컬 개발 서버
npm run build      # 프로덕션 빌드 (타입 체크 포함)
npm run preview    # 빌드 결과 로컬 확인
npm run new        # (구현 대상) 표본 스캐폴딩 스크립트: slug 받아 템플릿 MD 생성
```

## 디렉토리 구조

```
src/
├── content/
│   ├── config.ts              # 표본 스키마 (zod) — SPEC.md의 데이터 모델과 1:1
│   └── specimens/             # 표본 MD 파일들
│       └── {slug}.md
├── components/
│   ├── SpecimenCard.astro     # 그리드 카드
│   ├── FilterBar.astro        # 태그/스택/인터랙션 필터
│   ├── PaletteStrip.astro     # 추출 컬러 hex 스트립
│   └── DissectionNote.astro   # 해부 노트 렌더링
├── layouts/
├── pages/
│   ├── index.astro            # 표본 그리드 + 필터
│   └── s/[slug].astro         # 표본 상세 (해부 페이지)
└── styles/
    └── tokens.css             # 디자인 토큰 (아래 참조)
public/
└── specimens/{slug}/          # cover.webp, capture.mp4 등 미디어
```

## 디자인 토큰 (확정 — 임의 변경 금지)

박물관 아카이브 / 에디토리얼 무드. OriAlt 시네마틱 톤 계승.

| 토큰 | 값 | 용도 |
|:-----|:---|:-----|
| `--bg-base` | `#292919` | 다크 올리브 배경 |
| `--text-primary` | `#F7F7EE` | 크림 텍스트 |
| `--text-muted` | `#A8A89A` | 메타 정보 |
| `--line` | `#3D3D2E` | 보더, 해부도 라인 |
| `--accent` | `#D9A441` | 골드 — 태그, 하이라이트 (절제해서 사용) |

- 디스플레이 서체: **Bodoni Moda** (Google Fonts) — 대형 세리프 헤드라인
- 본문: **Pretendard** (한글) / system sans (영문 본문)
- 데이터·스펙 표기: **JetBrains Mono** — hex 값, 이징 값, 타이밍은 반드시 모노스페이스
- UI 메타포: 표본 서랍, 박물관 라벨, 해부도 라인 드로잉. 카드에 표본 라벨(번호, 채집일, 분류) 형식 사용

## 코드 컨벤션

- TypeScript strict. `any` 금지
- 컴포넌트는 Astro 컴포넌트 우선. 클라이언트 JS는 필터링 등 꼭 필요한 곳에만 (`<script>` 바닐라 or 최소한의 island)
- 표본 데이터는 스키마(`content/config.ts`)가 단일 진실 소스. 스키마 변경 시 SPEC.md도 같이 갱신
- 커밋: conventional commits (`feat:`, `fix:`, `content:` — 표본 추가는 `content:` 사용)
- 이미지: webp, 커버는 1200px 폭 고정. 영상 캡처는 mp4 (h264, 무음, 10초 내외 루프)

## 하지 말 것

- 표본 상세 페이지에서 원본 사이트의 코드/에셋을 그대로 복제하지 않는다. 스니펫은 항상 **기법을 추출한 자체 재현물**이어야 한다
- MVP 범위 밖 기능(계정, 제출 폼, 서버, DB, 좋아요) 구현하지 않는다 — SPEC.md의 v2 섹션으로만 기록
- 디자인 토큰 외 색상 임의 추가 금지
- 라이브러리 추가는 근거를 커밋 메시지에 남길 것. 기본은 제로 디펜던시 지향

## 작업 완료 기준 (Definition of Done)

1. `npm run build` 통과 (타입 에러 0)
2. 표본 스키마 위반 없음
3. 모바일(380px)에서 그리드/상세 페이지 깨지지 않음
4. Lighthouse Performance 90+ 유지 (정적 아카이브가 무거우면 존재 이유가 없다)
