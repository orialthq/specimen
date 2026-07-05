// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages 프로젝트 사이트 배포 — base path 필수
// https://orialthq.github.io/specimen (추후 specimen.orialt.dev CNAME 시 base 제거)
export default defineConfig({
  site: 'https://orialthq.github.io',
  base: '/specimen',
  vite: {
    plugins: [tailwindcss()],
  },
});
