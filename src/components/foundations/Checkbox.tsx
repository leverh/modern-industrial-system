'use client'

import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import styles from './Checkbox.module.css'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  hint?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, hint, className, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={styles.wrapper}>
        <label className={styles.root} htmlFor={checkboxId}>
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className={cn(styles.control, className)}
            {...props}
          />
          {label && <span className={styles.label}>{label}</span>}
        </label>
        {hint && <span className={styles.hint}>{hint}</span>}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
