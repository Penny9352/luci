import { workspace as w } from '../../content/copy'

/**
 * 暴力模式面板：真实产品截图。
 *
 * 这一屏的说服力全在阶段二那段推理日志上 —— 它是证据，不是宣传语。
 * 所以截图按原始宽度贴住画布左上，宁可裁掉底部，也不整幅缩到读不出字。
 */
export function VerifyPanel() {
  return (
    <img
      className="ws-verify"
      src={w.verify.src}
      alt={w.verify.alt}
      width={950}
      height={700}
      loading="lazy"
      decoding="async"
    />
  )
}
