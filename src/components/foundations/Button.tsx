'use client'

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  as?: 'button' | 'a'
  href?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'secondary',
      size = 'md',
      loading = false,
      iconLeft,
      iconRight,
      children,
      className,
      disabled,
      as: Tag = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          styles.button,
          styles[variant],
          styles[size],
          loading && styles.loading,
          className
        )}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {iconLeft && !loading && (
          <span className={styles.iconLeft} aria-hidden="true">
            {iconLeft}
          </span>
        )}

        {children}

        {iconRight && !loading && (
          <span className={styles.iconRight} aria-hidden="true">
            {iconRight}
          </span>
        )}

        {loading && (
          <span className={styles.spinner} aria-hidden="true">
            <span className={styles.spinnerRing} />
          </span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
