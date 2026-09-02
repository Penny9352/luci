/**
 * public/ 目录资源的路径帮手。
 *
 * 组件里直接写死的 `/logo.svg` 之类绝对路径只在部署到域名根路径时才对；
 * 部署到子路径（如 GitHub Pages 的 /仓库名/）时必须带上 Vite 的 base 前缀，
 * 否则这些资源会 404。`import.meta.env.BASE_URL` 就是构建时的 base 配置，
 * 根路径部署时是 `/`，行为和原来完全一样。
 */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
