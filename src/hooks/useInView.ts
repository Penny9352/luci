import { useEffect, useRef, useState } from 'react'

/**
 * 元素是否在视口内。
 *
 * once 为 true（默认）时触发一次就断开观察，适合「演一遍就完事」的东西；
 * once 为 false 时持续跟随，滚出去会复位 —— 循环动效需要这个，
 * 否则动画在屏幕外照样一圈圈空转。
 */
export function useInView<T extends HTMLElement>(
  rootMargin = '-15% 0px -15% 0px',
  once = true
) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting && once) io.disconnect()
      },
      { rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin, once])

  return { ref, inView }
}
