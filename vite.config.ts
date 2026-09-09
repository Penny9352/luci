import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * 六个入口：`/` 中文、`/en/` 英文、`/contact.html` 联系我们，
 * `/redesign-preview/hero-v2.html` 首屏改版预览（浅色），
 * `/redesign-preview/hero-v2-dark.html` 同一版的深色实拍背景对比稿，
 * `/redesign-preview/hero-v3.html` 按参考样式图重新搭的星球/弧形模型展示版。
 *
 * 前两个不做客户端路由 —— 语言在页面加载时由 URL 定死（见 src/content/copy.ts），
 * 两页共用同一套组件与同一份 JS/CSS chunk，只有 <head> 与词典不同。
 * 这样搜索引擎能分别收录，英文页也能单独分享。
 *
 * 后四个都是独立的静态页（不接入 App.tsx / 组件体系）：contact.html 是
 * 页脚「联系我们」链过去的落地页，只有 LOGO + 一段简介 + 联系方式；
 * 三个 redesign-preview 页是为了能在 GitHub Pages 上留一个可分享的链接。
 * 都跟正式首页互不影响：正式首页仍然是 index.html/en/index.html 构建产物，
 * 这些静态页只是多几条并存的路径，不会覆盖、也不会被正式首页的改动带着走。
 */
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  /**
   * 默认根路径部署，行为不变。只有 `vite build --mode gh-pages`（GitHub
   * Pages 的 CI 构建用）才切到子路径 /luci/，见 src/lib/asset.ts。
   * 用 mode 而不是 process.env，避免为了读环境变量去装 @types/node。
   */
  base: mode === 'gh-pages' ? '/luci/' : '/',
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      /* 相对 root 解析，避免为了拼绝对路径去装 @types/node */
      input: {
        main: 'index.html',
        en: 'en/index.html',
        contact: 'contact.html',
        heroV2Preview: 'redesign-preview/hero-v2.html',
        heroV2Dark: 'redesign-preview/hero-v2-dark.html',
        heroV3: 'redesign-preview/hero-v3.html',
      },
    },
  },
}))
