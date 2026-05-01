'use client'

import { useState, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from './Tooltip.module.css'

interface TooltipProps {
  content: ReactNode
  children: ReactNode
  placement?: 'top' | 'bottom'
  delay?: number
}

export function Tooltip({
  content,
  children,
  placement = 'top',
  delay = 400,
}: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(null)

  const show = () => {
    timer.current = setTimeout(() => setVisible(true), delay)
  }

  const hide = () => {
    if (timer.current) clearTimeout(timer.current)
    setVisible(false)
  }

  return (
    <span
      className={styles.wrapper}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span className={styles.trigger}>{children}</span>
      {visible && (
        <span
          role="tooltip"
          className={cn(styles.content, styles[placement])}
        >
          {content}
        </span>
      )}
    </span>
  )
}
