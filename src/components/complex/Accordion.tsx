'use client'

import { useState, useRef, useLayoutEffect, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from './Accordion.module.css'

interface AccordionItemProps {
  trigger: string
  children: ReactNode
  defaultOpen?: boolean
  index?: number
}

function AccordionItem({ trigger, children, defaultOpen = false, index }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | 'auto'>(defaultOpen ? 'auto' : 0)

  useLayoutEffect(() => {
    const el = contentRef.current
    if (!el) return
    if (open) {
      const h = el.scrollHeight
      setHeight(h)
      const timer = setTimeout(() => setHeight('auto'), 300)
      return () => clearTimeout(timer)
    } else {
      const h = el.scrollHeight
      setHeight(h)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setHeight(0))
      })
    }
  }, [open])

  const id = `accordion-${trigger.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <div className={styles.item}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        id={`${id}-trigger`}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          {index !== undefined && (
            <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
          )}
          {trigger}
        </span>
        <svg
          className={styles.chevron}
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 7h10M7 2v10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
      </button>
      <div
        id={id}
        role="region"
        aria-labelledby={`${id}-trigger`}
        className={styles.content}
        style={{ height: height === 'auto' ? 'auto' : `${height}px` }}
        ref={contentRef}
      >
        <div className={styles.contentInner}>{children}</div>
      </div>
    </div>
  )
}

interface AccordionProps {
  items: Array<{
    trigger: string
    content: ReactNode
    defaultOpen?: boolean
  }>
  showIndex?: boolean
}

export function Accordion({ items, showIndex = true }: AccordionProps) {
  return (
    <div className={styles.root}>
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          trigger={item.trigger}
          defaultOpen={item.defaultOpen}
          index={showIndex ? i : undefined}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  )
}
