import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * 两个真实入口：`/` 中文，`/en/` 英文。
 *
 * 不做客户端路由 —— 语言在页面加载时由 URL 定死（见 src/content/copy.ts），
 * 两页共用同一套组件与同一份 JS/CSS chunk，只有 <head> 与词典不同。
 * 这样搜索引擎能分别收录，英文页也能单独分享。
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
      },
    },
  },
}))
