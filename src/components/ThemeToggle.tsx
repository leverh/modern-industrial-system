'use client'

import { useState, useEffect } from 'react'
import styles from './ThemeToggle.module.css'

interface ThemeToggleProps {
  onToggle?: (isPunk: boolean) => void
}

export function ThemeToggle({ onToggle }: ThemeToggleProps) {
  const [isPunk, setIsPunk] = useState(false)

  const toggle = () => {
    const next = !isPunk
    setIsPunk(next)
    document.documentElement.setAttribute('data-theme', next ? 'punk' : '')
    onToggle?.(next)
  }

  useEffect(() => {
    return () => document.documentElement.removeAttribute('data-theme')
  }, [])

  return (
    <div className={styles.wrapper} title="Easter egg: Active System Blueprint">
      <span className={styles.label}>
        {isPunk ? 'PUNK (FIEBER)' : 'INDUSTRIAL'}
      </span>

      <button
        className={`${styles.track} ${isPunk ? styles.punk : ''}`}
        onClick={toggle}
        role="switch"
        aria-checked={isPunk}
        aria-label="Toggle system blueprint theme"
      >
        <span className={styles.thumb} />
      </button>

      <span className={styles.hint}>Active System Blueprint</span>
    </div>
  )
}