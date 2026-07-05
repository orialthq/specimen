import type { CollectionEntry } from 'astro:content';

export type Specimen = CollectionEntry<'specimens'>;

/** base('/specimen') 하위 정적 경로 결합 — BASE_URL 트레일링 슬래시 유무 흡수 */
export const withBase = (path: string): string =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;

/** 그리드/번호 공용 정렬: featured 상단 고정 → 채집일 역순 → slug (SPEC §5) */
export const orderSpecimens = (list: Specimen[]): Specimen[] =>
  [...list].sort(
    (a, b) =>
      Number(b.data.featured) - Number(a.data.featured) ||
      b.data.collectedAt.getTime() - a.data.collectedAt.getTime() ||
      a.id.localeCompare(b.id)
  );

/** 박물관 라벨 표본 번호 — 정렬 인덱스 기반 */
export const specimenNo = (idx: number): string => `No.${String(idx + 1).padStart(3, '0')}`;

export const formatDate = (d: Date): string => d.toISOString().slice(0, 10);

/** 같은 인터랙션 태그를 공유하는 다른 표본 — 겹치는 태그 수 순, 부족하면 최신으로 채움 */
export const relatedSpecimens = (all: Specimen[], current: Specimen, n = 3): Specimen[] => {
  const others = orderSpecimens(all).filter((s) => s.id !== current.id);
  const scored = others
    .map((s) => ({
      s,
      score: s.data.interaction.filter((t) => current.data.interaction.includes(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.s);
  const rest = others.filter((s) => !scored.includes(s));
  return [...scored, ...rest].slice(0, n);
};
