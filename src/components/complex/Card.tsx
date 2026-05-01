import { cn } from '@/lib/utils'
import styles from './Card.module.css'
import { type ReactNode, type HTMLAttributes } from 'react'

type CardVariant = 'default' | 'interactive' | 'outlined' | 'filled' | 'accented' | 'blueprint'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  children?: ReactNode
  className?: string
}

interface CardHeaderProps {
  title?: string
  subtitle?: string
  actions?: ReactNode
  children?: ReactNode
  className?: string
}

interface CardBodyProps {
  children?: ReactNode
  className?: string
}

interface CardFooterProps {
  children?: ReactNode
  className?: string
}

export function Card({ variant = 'default', children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(styles.card, styles[variant], className)}
      tabIndex={variant === 'interactive' ? 0 : undefined}
      role={variant === 'interactive' ? 'button' : undefined}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, actions, children, className }: CardHeaderProps) {
  return (
    <div className={cn(styles.header, className)}>
      {(title || subtitle) ? (
        <>
          <div>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {actions && <div className={styles.headerActions}>{actions}</div>}
        </>
      ) : children}
    </div>
  )
}

export function CardBody({ children, className }: CardBodyProps) {
  return <div className={cn(styles.body, className)}>{children}</div>
}

export function CardFooter({ children, className }: CardFooterProps) {
  return <div className={cn(styles.footer, className)}>{children}</div>
}

/* Blueprint card with measurement annotations */
export function BlueprintCard({
  title,
  children,
  annotations,
}: {
  title?: string
  children?: ReactNode
  annotations?: Array<{
    label: string
    top?: string
    left?: string
    right?: string
    bottom?: string
    horizontal?: boolean
  }>
}) {
  return (
    <div className={cn(styles.card, styles.blueprint)} style={{ position: 'relative' }}>
      {/* Horizontal rule */}
      <div
        className={styles.blueprintLine}
        style={{ top: '50%', left: 0, right: 0, height: 1 }}
      />
      {/* Vertical rule */}
      <div
        className={styles.blueprintLine}
        style={{ left: '50%', top: 0, bottom: 0, width: 1 }}
      />

      {annotations?.map((ann, i) => (
        <span
          key={i}
          className={styles.blueprintAnnotation}
          style={{
            top: ann.top,
            left: ann.left,
            right: ann.right,
            bottom: ann.bottom,
          }}
        >
          {ann.label}
        </span>
      ))}

      <div className={styles.body}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {children}
      </div>
    </div>
  )
}
