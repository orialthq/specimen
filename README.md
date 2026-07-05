# Specimen

> Web design references, dissected.

웹 디자인 레퍼런스를 표본처럼 채집하고 해부하는 아카이브.
스크린샷과 링크에서 멈추지 않고, 각 표본에 **해부 노트** — 씬 구조, 이징/타이밍 스펙, 컬러 시스템, 재현 스니펫 — 를 붙인다.

**Live**: https://orialthq.github.io/specimen

## 표본의 구조

| 층 | 내용 |
|:---|:-----|
| 채집 | 라이브 링크 · 커버 · 영상 캡처 |
| 라벨 | 분류 · 인터랙션 태그 · 추출 팔레트 · 타이포 · 스택 |
| 해부 노트 | 씬 구조 · 모션 스펙(이징/duration) · 작동 원리 · 재현 스니펫 |

## Stack

Astro 5 · TypeScript · Tailwind CSS 4 · Content Collections · GitHub Pages

## Development

```bash
npm install
npm run dev      # localhost:4321
npm run new      # 새 표본 스캐폴딩
npm run build
```

표본 추가: `src/content/specimens/{slug}.md` — 스키마는 `src/content/config.ts`, 작성 규칙은 `SPEC.md` 참조.

## Docs

- [SPEC.md](SPEC.md) — 기획서 (데이터 모델, 페이지, 로드맵)
- [CLAUDE.md](CLAUDE.md) — Claude Code 작업 컨텍스트

---

An [OriAlt](https://github.com/orialthq) project. From a duck's golden egg to a swan. 🦆🥚🦢
