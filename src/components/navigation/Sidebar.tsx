import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from './Sidebar.module.css'

interface SidebarItem {
  label: string
  href?: string
  icon?: ReactNode
  active?: boolean
  badge?: ReactNode
  onClick?: () => void
}

interface SidebarSection {
  label?: string
  items: SidebarItem[]
}

interface SidebarProps {
  title?: string
  sections?: SidebarSection[]
  footer?: ReactNode
}

export function Sidebar({ title, sections = [], footer }: SidebarProps) {
  return (
    <aside className={styles.sidebar} role="navigation" aria-label="Sidebar">
      {title && (
        <div className={styles.sidebarHeader}>
          <span className={styles.sidebarTitle}>{title}</span>
        </div>
      )}

      {sections.map((section, si) => (
        <div key={si} className={styles.section}>
          {section.label && (
            <span className={styles.sectionLabel}>{section.label}</span>
          )}
          {section.items.map((item, ii) => (
            <a
              key={ii}
              href={item.href || '#'}
              className={cn(styles.item, item.active && styles.active)}
              aria-current={item.active ? 'page' : undefined}
              onClick={item.onClick}
            >
              {item.icon && (
                <span className={styles.itemIcon} aria-hidden="true">
                  {item.icon}
                </span>
              )}
              {item.label}
              {item.badge && (
                <span className={styles.itemBadge}>{item.badge}</span>
              )}
            </a>
          ))}
        </div>
      ))}

      {footer}
    </aside>
  )
}
