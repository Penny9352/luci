import { useEffect, useRef, useState } from 'react'

/**
 * 元素进入视口后置为 true 并保持。用于日志轨的阶段状态翻转。
 * rootMargin 让翻转发生在元素抵达视口中上部时，而不是刚露头就翻。
 */
export function useInView<T extends HTMLElement>(rootMargin = '-35% 0px -45% 0px') {
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
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  return { ref, inView }
}
