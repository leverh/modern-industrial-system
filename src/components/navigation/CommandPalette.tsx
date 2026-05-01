'use client'

import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from './CommandPalette.module.css'

export interface CommandItem {
  id: string
  label: string
  description?: string
  icon?: ReactNode
  kbd?: string
  group?: string
  action?: () => void
}

interface CommandPaletteProps {
  items: CommandItem[]
  open: boolean
  onClose: () => void
  onOpen?: () => void
  placeholder?: string
}

export function CommandPalette({
  items,
  open,
  onClose,
  onOpen,
  placeholder = 'Type a command or search...',
}: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [focusedIndex, setFocusedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = query
    ? items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase())
      )
    : items

  const groups = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    const g = item.group || 'Commands'
    if (!acc[g]) acc[g] = []
    acc[g].push(item)
    return acc
  }, {})

  const flatList = Object.values(groups).flat()

  useEffect(() => {
    if (open) {
      setQuery('')
      setFocusedIndex(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  // Global ⌘K / Ctrl+K — capture phase beats the browser
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        e.stopPropagation()
        if (open) {
          onClose()
        } else {
          onOpen?.()
        }
      }
    }
    window.addEventListener('keydown', handleGlobalKey, { capture: true })
    return () => window.removeEventListener('keydown', handleGlobalKey, { capture: true })
  }, [open, onClose, onOpen])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setFocusedIndex((i) => Math.min(i + 1, flatList.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setFocusedIndex((i) => Math.max(i - 1, 0))
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        flatList[focusedIndex]?.action?.()
        onClose()
      }
    },
    [open, flatList, focusedIndex, onClose]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (!open) return null

  let flatIdx = 0

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal aria-label="Command palette">
      <div
        className={styles.palette}
        onClick={(e) => e.stopPropagation()}
        role="combobox"
        aria-expanded="true"
        aria-haspopup="listbox"
      >
        <div className={styles.inputRow}>
          <span className={styles.searchIcon} aria-hidden="true">⌕</span>
          <input
            ref={inputRef}
            className={styles.input}
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setFocusedIndex(0)
            }}
            aria-autocomplete="list"
            aria-controls="cmd-listbox"
          />
          <span className={styles.kbd}>ESC</span>
        </div>

        <div className={styles.results} id="cmd-listbox" role="listbox">
          {Object.entries(groups).length === 0 ? (
            <div className={styles.empty}>No results for "{query}"</div>
          ) : (
            Object.entries(groups).map(([groupName, groupItems]) => (
              <div key={groupName} className={styles.group}>
                <div className={styles.groupLabel}>{groupName}</div>
                {groupItems.map((item) => {
                  const idx = flatIdx++
                  return (
                    <div
                      key={item.id}
                      className={cn(styles.item, idx === focusedIndex && styles.focused)}
                      role="option"
                      aria-selected={idx === focusedIndex}
                      onClick={() => { item.action?.(); onClose() }}
                      onMouseEnter={() => setFocusedIndex(idx)}
                    >
                      {item.icon && (
                        <span className={styles.itemIcon} aria-hidden="true">
                          {item.icon}
                        </span>
                      )}
                      <span>{item.label}</span>
                      {item.kbd && (
                        <span className={styles.itemKbd}>{item.kbd}</span>
                      )}
                    </div>
                  )
                })}
              </div>
            ))
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.footerHint}>
            <span className={styles.kbd}>↑↓</span> navigate
          </div>
          <div className={styles.footerHint}>
            <span className={styles.kbd}>↵</span> select
          </div>
          <div className={styles.footerHint}>
            <span className={styles.kbd}>ESC</span> close
          </div>
        </div>
      </div>
    </div>
  )
}