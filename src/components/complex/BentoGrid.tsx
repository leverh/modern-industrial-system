import { cn } from '@/lib/utils'
import styles from './BentoGrid.module.css'
import { type ReactNode } from 'react'

interface BentoCellProps {
  tag?: string
  title?: string
  children?: ReactNode
  spanCols?: 1 | 2 | 3
  spanRows?: 1 | 2
  variant?: 'default' | 'accent' | 'dark'
  className?: string
}

interface BentoGridProps {
  cols?: 2 | 3 | 4
  children: ReactNode
  className?: string
}

export function BentoGrid({ cols = 3, children, className }: BentoGridProps) {
  return (
    <div className={cn(styles.grid, styles[`cols${cols}`], className)}>
      {children}
    </div>
  )
}

export function BentoCell({
  tag,
  title,
  children,
  spanCols,
  spanRows,
  variant = 'default',
  className,
}: BentoCellProps) {
  return (
    <div
      className={cn(
        styles.cell,
        variant !== 'default' && styles[variant],
        spanCols && spanCols > 1 && styles[`spanCol${spanCols}`],
        spanRows && spanRows > 1 && styles[`spanRow${spanRows}`],
        className
      )}
    >
      {tag && <span className={styles.cellTag}>{tag}</span>}
      {title && <span className={styles.cellTitle}>{title}</span>}
      {children}
    </div>
  )
}
