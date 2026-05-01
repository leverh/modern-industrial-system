'use client'

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
  iconLeft?: ReactNode
  iconRight?: ReactNode
  mono?: boolean
  sizing?: 'sm' | 'md' | 'lg'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      iconLeft,
      iconRight,
      mono = false,
      sizing = 'md',
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div
        className={cn(
          styles.wrapper,
          error && styles.error,
          mono && styles.mono,
          sizing !== 'md' && styles[sizing]
        )}
      >
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}

        <div
          className={cn(
            styles.inputWrapper,
            iconLeft && styles.hasIconLeft,
            iconRight && styles.hasIconRight
          )}
        >
          {iconLeft && (
            <span className={styles.iconLeft} aria-hidden="true">
              {iconLeft}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(styles.input, className)}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            {...props}
          />

          {iconRight && (
            <span className={styles.iconRight} aria-hidden="true">
              {iconRight}
            </span>
          )}
        </div>

        {(hint || error) && (
          <span
            id={error ? `${inputId}-error` : `${inputId}-hint`}
            className={cn(styles.hint, error && styles.hintError)}
            role={error ? 'alert' : undefined}
          >
            {error || hint}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
