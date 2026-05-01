import { cn } from '@/lib/utils'
import styles from './Skeleton.module.css'

interface SkeletonProps {
  variant?: 'text' | 'heading' | 'button' | 'block' | 'avatar'
  width?: string | number
  height?: string | number
  circle?: boolean
  className?: string
  style?: React.CSSProperties
}

export function Skeleton({
  variant = 'block',
  width,
  height,
  circle = false,
  className,
  style,
}: SkeletonProps) {
  return (
    <span
      className={cn(
        styles.skeleton,
        styles[variant],
        circle && styles.circle,
        className
      )}
      style={{
        width: width ?? (variant === 'text' ? '100%' : undefined),
        height: height,
        ...style,
      }}
      aria-hidden="true"
      role="presentation"
    />
  )
}

/* Composed presets */
export function SkeletonCard() {
  return (
    <div className={styles.card} aria-hidden="true" role="presentation">
      <div className={styles.row}>
        <Skeleton variant="avatar" width={32} height={32} circle />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="75%" />
      <Skeleton variant="button" width={100} />
    </div>
  )
}

export function SkeletonTable({ rows = 4 }: { rows?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }} aria-hidden="true" role="presentation">
      <div style={{ display: 'flex', gap: 16, padding: '12px 16px', borderBottom: '1px solid var(--color-border)' }}>
        {[30, 20, 25, 25].map((w, i) => (
          <Skeleton key={i} variant="text" width={`${w}%`} height={10} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, ri) => (
        <div key={ri} style={{ display: 'flex', gap: 16, padding: '12px 16px', borderBottom: '1px solid var(--color-border-subtle)' }}>
          {[35, 18, 22, 25].map((w, i) => (
            <Skeleton key={i} variant="text" width={`${w}%`} height={10} style={{ animationDelay: `${(ri * 4 + i) * 50}ms` }} />
          ))}
        </div>
      ))}
    </div>
  )
}
