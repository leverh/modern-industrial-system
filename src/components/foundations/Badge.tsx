import { cn } from '@/lib/utils'
import styles from './Badge.module.css'

type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'outline'
type BadgeSize = 'sm' | 'md' | 'lg'

interface BadgeProps {
  variant?: BadgeVariant
  size?: BadgeSize
  solid?: boolean
  dot?: boolean
  pulseDot?: boolean
  children: React.ReactNode
  className?: string
}

export function Badge({
  variant = 'default',
  size = 'md',
  solid = false,
  dot = false,
  pulseDot = false,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        styles.badge,
        styles[variant],
        styles[size],
        solid && styles.solid,
        className
      )}
    >
      {(dot || pulseDot) && (
        <span
          className={cn(styles.dot, pulseDot && styles.pulse)}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}
