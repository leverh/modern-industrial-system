import { cn } from '@/lib/utils'
import styles from './Stepper.module.css'
import { type ReactNode } from 'react'

interface StepperStep {
  title: string
  description?: string
  content?: ReactNode
}

interface StepperProps {
  steps: StepperStep[]
  currentStep: number
  orientation?: 'vertical' | 'horizontal'
}

export function Stepper({
  steps,
  currentStep,
  orientation = 'horizontal',
}: StepperProps) {
  return (
    <div
      className={cn(
        styles.root,
        orientation === 'horizontal' && styles.horizontal
      )}
      aria-label="Progress steps"
    >
      {steps.map((step, i) => {
        const state =
          i < currentStep
            ? 'completed'
            : i === currentStep
            ? 'active'
            : 'upcoming'

        return (
          <div
            key={i}
            className={cn(styles.step, styles[state])}
            aria-current={state === 'active' ? 'step' : undefined}
          >
            <div className={styles.stepHeader}>
              <div className={styles.indicator} aria-hidden="true">
                {state === 'completed' ? (
                  <svg className={styles.check} viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                  </svg>
                ) : (
                  String(i + 1).padStart(2, '0')
                )}
              </div>
              <div className={styles.stepMeta}>
                <span className={styles.stepTitle}>{step.title}</span>
                {step.description && (
                  <span className={styles.stepDescription}>{step.description}</span>
                )}
              </div>
            </div>
            {step.content && state === 'active' && (
              <div className={styles.stepContent}>{step.content}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}
