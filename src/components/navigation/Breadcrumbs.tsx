import { cn } from '@/lib/utils'
import styles from './Breadcrumbs.module.css'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  separator?: string
}

export function Breadcrumbs({ items, separator = '/' }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={styles.breadcrumbs} role="list">
        {items.map((item, i) => {
          const isCurrent = i === items.length - 1
          return (
            <li key={i} style={{ display: 'flex', alignItems: 'center' }}>
              {i > 0 && (
                <span className={styles.separator} aria-hidden="true">
                  {separator}
                </span>
              )}
              {isCurrent ? (
                <span
                  className={cn(styles.crumb, styles.current)}
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <a href={item.href || '#'} className={styles.crumb}>
                  {item.label}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
