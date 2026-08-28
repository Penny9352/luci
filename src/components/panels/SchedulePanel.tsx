import { workspace as w } from '../../content/copy'
import { IconCheck, IconClock } from '../ui/Icon'

/**
 * 定时任务面板。
 *
 * 产品那张「创建任务」截图是浅色竖版、且是空表单（0/25、0/500、三渠道
 * 全未绑定），放进这个暗色横版画布既跳色又没有说服力，所以这里按产品
 * 信息重绘任务列表。这是本站绘制的界面，不是截图，也不伪装成截图。
 */
export function SchedulePanel() {
  return (
    <div className="ws-sched" aria-hidden="true">
      <ol className="ws-sched__list">
        {w.schedule.tasks.map((t) => (
          <li className="ws-sched__row" key={t.name}>
            <span className="ws-sched__when num">
              <IconClock size={13} />
              {t.when}
            </span>
            <span className="ws-sched__body">
              <span className="ws-sched__name">{t.name}</span>
              <span className="ws-sched__desc">{t.desc}</span>
            </span>
            <span
              className={['ws-sched__state', t.running && 'is-running'].filter(Boolean).join(' ')}
            >
              {t.state}
            </span>
          </li>
        ))}
      </ol>

      <p className="ws-sched__log">
        <span className="ws-sched__log-label">
          <IconCheck size={13} />
          {w.schedule.logLabel}
        </span>
        {w.schedule.log}
      </p>
    </div>
  )
}
