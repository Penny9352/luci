import { LANG, workspace as w } from '../../content/copy'
import { asset } from '../../lib/asset'
import { IconCheck, IconClock, IconPlus } from '../ui/Icon'

/**
 * 定时任务面板。
 *
 * 产品那张「创建任务」截图是浅色竖版、且是空表单（0/25、0/500、三渠道
 * 全未绑定），放进这个暗色横版画布既跳色又没有说服力，所以这里按产品
 * 信息重绘任务列表。这是本站绘制的界面，不是截图，也不伪装成截图。
 */
export function SchedulePanel() {
  if (LANG === 'zh') return <ChineseSchedulePanel />

  return <LegacySchedulePanel />
}

function LegacySchedulePanel() {
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

/** 中文站的任务中心演示：主任务卡 + 发送到微信的手机端结果。 */
function ChineseSchedulePanel() {
  const [primary, ...rest] = w.schedule.tasks
  const runningCount = w.schedule.tasks.filter((task) => task.running).length

  return (
    <div
      className="ws-sched"
      aria-hidden="true"
      style={{
        position: 'relative',
        gridTemplateRows: 'auto minmax(0, 1fr) auto',
        paddingRight: '0.9375rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          minHeight: '2rem',
        }}
      >
        <span style={{ display: 'grid', gap: '0.125rem' }}>
          <span style={{ color: 'var(--text-3)', fontSize: '0.6875rem', letterSpacing: '0.08em' }}>
            任务概览
          </span>
          <strong style={{ color: 'var(--text)', fontSize: '0.8125rem' }}>
            {w.schedule.tasks.length} 个任务 · {runningCount} 个运行中
          </strong>
        </span>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.25rem 0.5rem',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--r-xs)',
            color: 'var(--text-2)',
            fontSize: '0.6875rem',
            whiteSpace: 'nowrap',
          }}
        >
          <IconPlus size={11} />
          新建任务
        </span>
      </div>

      <ol
        className="ws-sched__list"
        style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', alignContent: 'start', gap: '0.5rem' }}
      >
        {[primary, ...rest].map((task, index) => (
          <li
            className="ws-sched__row"
            key={task.name}
            style={index === 0 ? { borderColor: 'var(--orange)', boxShadow: 'inset 2px 0 var(--orange)' } : undefined}
          >
            <span className="ws-sched__when num">
              <IconClock size={13} />
              <time>{task.when}</time>
            </span>
            <span className="ws-sched__body">
              <span className="ws-sched__name">{task.name}</span>
              <span className="ws-sched__desc">{task.desc}</span>
              {index === 0 && (
                <span style={{ color: 'var(--text-3)', fontSize: '0.625rem' }}>下次执行 · 2026/9/3 15:30</span>
              )}
            </span>
            <span
              className={['ws-sched__state', task.running && 'is-running'].filter(Boolean).join(' ')}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                {task.state}
                {index === 0 && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      width: '1.375rem',
                      height: '0.75rem',
                      padding: '0.125rem',
                      borderRadius: '999px',
                      background: 'var(--orange)',
                    }}
                  >
                    <span style={{ width: '0.5rem', height: '0.5rem', marginInlineStart: 'auto', borderRadius: '50%', background: 'var(--text)' }} />
                  </span>
                )}
              </span>
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

      <div
        style={{
          position: 'absolute',
          right: '0.5rem',
          bottom: '0.875rem',
          width: 'auto',
          height: 'min(22rem, calc(100% - 1rem))',
          aspectRatio: '9 / 19.5',
          overflow: 'hidden',
          zIndex: 2,
          border: '2px solid var(--text)',
          borderRadius: 'var(--r-lg)',
          boxShadow: 'var(--shadow-window)',
          transform: 'translateY(-0.375rem)',
        }}
      >
        {/* 手机端收到消息的真实截图——逐字复刻没有意义，直接用截图本身 */}
        <img
          src={asset('shots/schedule-wechat-message.jpg')}
          alt="微信收到 ClawBot 推送的今日市场复盘消息：A 股主要指数涨跌、成交额与涨跌家数"
          width={325}
          height={720}
          loading="lazy"
          decoding="async"
          style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>
    </div>
  )
}
