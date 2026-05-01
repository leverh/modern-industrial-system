import { cn } from '@/lib/utils'
import styles from './ProgressBar.module.css'

type ProgressVariant = 'default' | 'success' | 'warning' | 'error' | 'neutral'
type ProgressSize = 'sm' | 'md' | 'lg'

interface ProgressBarProps {
  value?: number // 0-100
  label?: string
  showValue?: boolean
  variant?: ProgressVariant
  size?: ProgressSize
  striped?: boolean
  indeterminate?: boolean
  className?: string
}

export function ProgressBar({
  value = 0,
  label,
  showValue = true,
  variant = 'default',
  size = 'md',
  striped = false,
  indeterminate = false,
  className,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div className={cn(styles.wrapper, styles[size], className)}>
      {(label || showValue) && (
        <div className={styles.header}>
          {label && <span className={styles.label}>{label}</span>}
          {showValue && !indeterminate && (
            <span className={styles.value}>{clampedValue}%</span>
          )}
        </div>
      )}
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        aria-busy={indeterminate}
      >
        <div
          className={cn(
            styles.fill,
            styles[variant],
            striped && styles.striped,
            indeterminate && styles.indeterminate
          )}
          style={
            !indeterminate
              ? ({ width: `${clampedValue}%`, '--progress-value': `${clampedValue}%` } as React.CSSProperties)
              : undefined
          }
        />
      </div>
    </div>
  )
}
