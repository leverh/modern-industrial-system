'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/utils'
import styles from './Toast.module.css'

type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info'

interface ToastItem {
  id: string
  title: string
  description?: string
  type: ToastType
  duration?: number
  exiting?: boolean
}

interface ToastContextValue {
  toast: (opts: Omit<ToastItem, 'id'>) => void
}

const ToastContext = createContext<ToastContextValue>({
  toast: () => {},
})

export function useToast() {
  return useContext(ToastContext)
}

const ICONS: Record<ToastType, string> = {
  default: '○',
  success: '✓',
  error: '✕',
  warning: '△',
  info: 'ℹ',
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const remove = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    )
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 300)
  }, [])

  const toast = useCallback(
    (opts: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).slice(2)
      setToasts((prev) => [...prev, { ...opts, id }])
      setTimeout(() => remove(id), opts.duration ?? 4000)
    },
    [remove]
  )

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className={styles.container} aria-live="polite" aria-label="Notifications">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(styles.toast, styles[t.type], t.exiting && styles.exiting)}
            role="alert"
            aria-atomic="true"
          >
            <span className={styles.icon} aria-hidden="true">
              {ICONS[t.type]}
            </span>
            <div className={styles.body}>
              <span className={styles.title}>{t.title}</span>
              {t.description && (
                <span className={styles.description}>{t.description}</span>
              )}
            </div>
            <button
              className={styles.close}
              onClick={() => remove(t.id)}
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
