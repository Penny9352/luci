# Lucimix 官网

Lucimix C 端营销官网。Vite + React 19 + TypeScript 构建的纯静态站点，无后端、无
数据库、无需登录态——构建产物就是一份可以直接扔进任何静态托管/CDN 的 `dist/`。

## 环境要求

- Node.js `^20.19.0` 或 `>=22.12.0`（Vite 7 的硬性要求，版本不够构建会直接报错）
- npm（随 Node 自带即可，未锁定特定版本）

## 本地开发

```bash
npm install
npm run dev        # http://localhost:5173，热更新
```

## 构建部署产物

```bash
npm run build       # 等价于：npm run fonts && tsc -b && vite build
```

产物在 `dist/`，结构大致如下：

```
dist/
  index.html    # 中文版（/）
  en/
    index.html  # 英文版（/en/）—— 与中文版共用同一份 js/css
  logo.svg
  assets/       # 打包后的 js/css
  fonts/        # 子集化后的 woff2
  logos/        # 生态应用、模型、IM 渠道 logo
  shots/        # 真实产品截图
```

**中英双语是两个真实入口，不是前端切换。**`vite.config.ts` 配了两个
`rollupOptions.input`，语言由 URL 在页面加载时定死（见 `src/content/copy.ts`）。
所以 `/` 和 `/en/` 各自可被搜索引擎收录、可单独分享，两页已互挂 `hreflang`。

`npm run build` 会先跑 `scripts/subset-fonts.mjs` 重新生成字体子集（只打包页面
实际用到的字符，减小体积），再类型检查，再交给 Vite 打包。这一步失败通常是
Node 版本不对，先看上面的版本要求。

**部署方式**：`dist/` 是纯静态文件，没有服务端逻辑、没有 API、不需要任何环境
变量。用 Nginx / OSS+CDN / 任何静态托管把 `dist/` 目录整个丢上去即可，直接指
向 `dist/index.html` 作为首页。页面本身是单页面 + 锚点导航（`#workspace`
`#audience` `#case` `#models` `#ecosystem` `#start`），不是前端路由，
**不需要**配置「所有路径 fallback 到 index.html」这种 SPA 重写规则。

英文版走目录索引：访问 `/en/` 时托管方需要把 `dist/en/index.html` 作为该目录
的默认文档返回（Nginx 的 `index index.html;`、OSS/CDN 的「默认首页」设置，
通常都是默认行为）。**不要**配 SPA fallback，否则 `/en/` 会被重写回中文首页。

**⚠️ 部署路径必须是域名根路径**：`vite.config.ts` 没有设置 `base`，所以打包
产物里所有资源引用都是绝对路径（`/assets/...`、`/logos/...`、`/fonts/...`）。
如果要部署到子路径（例如 `https://公司域名/lucimix/`而不是根路径），必须先在
`vite.config.ts` 里加 `base: '/lucimix/'` 再重新 `npm run build`，否则线上资源
会 404。部署到域名根路径（`https://域名/`）则不用改任何东西。

## 上线前必须处理

- **ICP 备案号是占位符，必须替换成真实备案号再上线**。位置：
  `src/content/copy.ts` 里 `footer.icp` 字段（搜索 `京ICP备2025000000号`），
  代码里留了 `TODO: 向用户取实际备案号` 的注释。挂在真实域名上还留着占位备案
  号是合规问题，不是小事。
- `footer.links` 里「服务协议」「隐私政策」两个链接目前 `href` 都是占位的
  `#`，还没接真实页面，上线前需要补上。
- 确认 `src/content/urls.ts` 里的 `LOGIN_URL`（`https://lucimix.com/login`）
  和 `ENTERPRISE_URL`（`https://biz.lucimix.com`）就是要跳转的正式产品地址，
  不是这次开发用的占位/测试地址。中英文共用这一份，改一处两边都变。
- `src/content/copy.en.ts` 顶部的术语表尚未定稿（「暴力模式 → Cross-Check
  Mode」「光点 → Lumens」等）。**产品端若已有英文 UI，以产品为准**，官网翻译
  和产品对不上号会让用户找不到东西。
- 页脚的 ICP 备案号 `京ICP备2025000000号` 是占位，上线前必须换成真实备案号。

## 验证（可选，非部署必需）

```bash
npm run preview      # 本地起一个静态服务器预览 dist/，先自己看一眼再上线
npm run check:copy   # 对外文案红线检查（中英两页各跑一遍，会逐个点开首屏四个
                      # Tab 把面板文案都扫到）。需要本机装了 Chrome，脚本写死了
                      # macOS 路径 /Applications/Google Chrome.app/...，换机器/
                      # 系统要改 scripts/check-copy.mjs 里的 CHROME 常量
```

`check:copy` 默认打 `http://localhost:4173/`，所以要先 `npm run preview` 起着。

这两个是发布前自查用的，不是构建流程的一部分，`npm run build` 不依赖它们。
