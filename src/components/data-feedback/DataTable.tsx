'use client'

import { useState, useMemo, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from './DataTable.module.css'

export interface Column<T> {
  key: keyof T | string
  header: string
  sortable?: boolean
  mono?: boolean
  pinned?: boolean
  render?: (value: unknown, row: T) => ReactNode
  width?: string
}

interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[]
  data: T[]
  rowKey?: keyof T
  emptyMessage?: string
  showFooter?: boolean
}

type SortDir = 'asc' | 'desc' | null

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  emptyMessage = 'NO DATA',
  showFooter = true,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc'))
      if (sortDir === 'desc') setSortKey(null)
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return data
    return [...data].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (av == null) return 1
      if (bv == null) return -1
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true })
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [data, sortKey, sortDir])

  return (
    <div>
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={cn(
                    styles.th,
                    col.sortable && styles.sortable,
                    sortKey === col.key && styles.sorted,
                    sortDir === 'desc' && sortKey === col.key && styles.sortDesc,
                    col.pinned && styles.pinned
                  )}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={col.sortable ? () => handleSort(String(col.key)) : undefined}
                  aria-sort={
                    sortKey === col.key
                      ? sortDir === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : col.sortable
                      ? 'none'
                      : undefined
                  }
                >
                  <span className={styles.thInner}>
                    {col.header}
                    {col.sortable && (
                      <svg
                        className={styles.sortIcon}
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M6 2L9 6H3L6 2Z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className={styles.empty}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sorted.map((row, ri) => (
                <tr
                  key={rowKey ? String(row[rowKey as string]) : ri}
                  className={styles.tr}
                >
                  {columns.map((col) => {
                    const val = row[col.key as string]
                    return (
                      <td
                        key={String(col.key)}
                        className={cn(styles.td, col.mono && styles.mono, col.pinned && styles.pinned)}
                      >
                        {col.render ? col.render(val, row) : String(val ?? '')}
                      </td>
                    )
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showFooter && (
        <div className={styles.footer}>
          <span className={styles.footerMeta}>
            {sorted.length} row{sorted.length !== 1 ? 's' : ''}
          </span>
          {sortKey && sortDir && (
            <span className={styles.footerMeta}>
              sorted by {sortKey} ({sortDir})
            </span>
          )}
        </div>
      )}
    </div>
  )
}
