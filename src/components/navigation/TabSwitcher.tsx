'use client'

import { useState, useRef, useLayoutEffect, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from './TabSwitcher.module.css'

interface Tab {
  id: string
  label: string
  count?: number
  content?: ReactNode
}

interface TabSwitcherProps {
  tabs: Tab[]
  defaultTab?: string
  variant?: 'line' | 'pill'
  onChange?: (id: string) => void
}

export function TabSwitcher({
  tabs,
  defaultTab,
  variant = 'line',
  onChange,
}: TabSwitcherProps) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const listRef = useRef<HTMLDivElement>(null)

  const updateIndicator = (index: number) => {
    const list = listRef.current
    if (!list) return
    const tab = list.children[index] as HTMLElement
    if (!tab) return
    const listRect = list.getBoundingClientRect()
    const tabRect = tab.getBoundingClientRect()
    setIndicatorStyle({
      left: tabRect.left - listRect.left,
      width: tabRect.width,
    })
  }

  useLayoutEffect(() => {
    const idx = tabs.findIndex((t) => t.id === active)
    // Small delay to allow DOM paint
    requestAnimationFrame(() => updateIndicator(idx))
  }, [active, tabs])

  const select = (id: string) => {
    setActive(id)
    onChange?.(id)
  }

  const activeTab = tabs.find((t) => t.id === active)

  return (
    <div className={cn(styles.root, variant === 'pill' && styles.pill)}>
      <div ref={listRef} className={styles.list} role="tablist">
        <span
          className={styles.indicator}
          style={indicatorStyle}
          aria-hidden="true"
        />
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            className={styles.tab}
            onClick={() => select(tab.id)}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={styles.tabCount}>{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {activeTab?.content && (
        <div
          id={`panel-${activeTab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab.id}`}
          className={styles.panel}
          key={activeTab.id}
        >
          {activeTab.content}
        </div>
      )}
    </div>
  )
}
