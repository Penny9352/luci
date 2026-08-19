import { scheduled as s } from '../content/copy'
import { Stage } from './Stage'
import { ScreenshotFrame } from './ui/ScreenshotFrame'
import { IconClock } from './ui/Icon'

/**
 * 推送示意图。
 *
 * 目前没有真实的微信推送截图，这里画的是本站自己的示意，
 * 明确标注「示意图」，不伪装成真实的微信界面。真图到位后替换。
 */
function PushNote() {
  return (
    <figure className="push">
      <div className="push__device">
        <div className="push__screen">
          <span className="push__clock num">{s.push.time}</span>
          <div className="push__card">
            <div className="push__from">
              <img src="/logo.svg" alt="" width={13} height={20} />
              <span>{s.push.sender}</span>
              <span className="push__time num">{s.push.time}</span>
            </div>
            <p className="push__title">{s.push.title}</p>
            <p className="push__body">{s.push.body}</p>
          </div>
        </div>
      </div>
      <figcaption className="shot__caption">
        <span className="shot__tag">{s.push.label}</span>
        任务在云端执行，结果推到已绑定的 IM
      </figcaption>
    </figure>
  )
}

export function Scheduled() {
  return (
    <Stage id="scheduled" stage={s.stage} name={s.stageName}>
      <div className="stack">
        <h2>{s.title}</h2>
        <p className="lede measure">{s.lead}</p>

        <ol className="tasks">
          {s.tasks.map((t) => (
            <li key={t.when}>
              <span className="tasks__when num">
                <IconClock size={15} />
                {t.when}
              </span>
              <span className="tasks__what">{t.what}</span>
            </li>
          ))}
        </ol>

        <p className="channels">
          <span className="channels__label">{s.channels.label}</span>
          {s.channels.items.map((c) => (
            <span className="channels__item" key={c}>
              {c}
            </span>
          ))}
          <span className="channels__note">{s.channels.note}</span>
        </p>

        <div className="split split--wide">
          <ScreenshotFrame
            src="/shots/scheduled-dialog.png"
            alt={s.config.alt}
            caption={s.config.caption}
            width={810}
            height={930}
          />
          <PushNote />
        </div>
      </div>
    </Stage>
  )
}
