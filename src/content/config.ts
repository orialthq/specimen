import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// SPEC.md §4 데이터 모델과 1:1 — 스키마 변경 시 SPEC.md도 같이 갱신할 것

export const CATEGORIES = [
  'landing',
  'portfolio',
  'product',
  'editorial',
  'campaign',
  'experimental',
] as const;

// 인터랙션 태그 사전 (SPEC.md §4 시작값, 필요 시 추가)
export const INTERACTIONS = [
  'scroll-cinematic',
  'parallax-depth',
  '3d-float',
  'morphing',
  'cursor-fx',
  'hover-reveal',
  'type-motion',
  'page-transition',
  'scroll-jacking',
  'webgl-shader',
  'video-hero',
  'grid-play',
] as const;

export const TYPE_CLASSIFICATIONS = ['serif-led', 'sans-led', 'mixed', 'type-driven'] as const;

const hexColor = z
  .string()
  .regex(/^#[0-9A-Fa-f]{6}$/, 'palette는 #RRGGBB 형식의 hex여야 한다');

const specimens = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/specimens' }),
  schema: z.object({
    title: z.string().min(1),
    url: z.string().url(),
    collectedAt: z.date(), // 채집일
    curator: z.enum(['iq', 'jh']),
    category: z.enum(CATEGORIES),
    interaction: z.array(z.enum(INTERACTIONS)).min(1), // 복수 선택
    stack: z.array(z.string()).min(1), // 추정 포함
    palette: z.array(hexColor).min(1), // 추출 hex, 지배색 순
    typography: z.object({
      display: z.string(),
      body: z.string(),
      classification: z.enum(TYPE_CLASSIFICATIONS),
    }),
    media: z.object({
      cover: z.string(), // /specimens/{slug}/cover.webp
      capture: z.string().optional(), // /specimens/{slug}/capture.mp4
    }),
    snippet: z.string().optional(), // 재현 데모 경로
    featured: z.boolean().default(false),
  }),
});

export const collections = { specimens };
