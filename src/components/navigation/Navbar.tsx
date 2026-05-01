'use client'

import { useState, useEffect, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from './Navbar.module.css'

interface NavItem {
  label: string
  href: string
  active?: boolean
}

interface NavbarProps {
  brand?: string
  items?: NavItem[]
  actions?: ReactNode
  version?: string
}

export function Navbar({
  brand = 'SYSTEM',
  items = [],
  actions,
  version,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={cn(styles.navbar, scrolled && styles.scrolled)} role="navigation" aria-label="Main">
      <a href="/" className={styles.logo}>
        <span className={styles.logoMark} aria-hidden="true">
          {brand[0]}
        </span>
        {brand}
      </a>

      {version && <span className={styles.version}>{version}</span>}

      <div className={styles.links} role="list">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            role="listitem"
            className={cn(styles.link, item.active && styles.active)}
            aria-current={item.active ? 'page' : undefined}
          >
            {item.label}
          </a>
        ))}
      </div>

      {actions && <div className={styles.actions}>{actions}</div>}
    </nav>
  )
}
