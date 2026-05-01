'use client'

import { useState, useRef, useCallback, type ChangeEvent } from 'react'
import { cn } from '@/lib/utils'
import styles from './RangeSlider.module.css'

interface RangeSliderProps {
  min?: number
  max?: number
  step?: number
  defaultValue?: number
  value?: number
  onChange?: (value: number) => void
  label?: string
  unit?: string
  showTicks?: boolean
  tickCount?: number
  className?: string
}

export function RangeSlider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue,
  value: controlledValue,
  onChange,
  label,
  unit = '',
  showTicks = false,
  tickCount = 5,
  className,
}: RangeSliderProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? min)
  const value = controlledValue ?? internalValue

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.target.value)
      setInternalValue(v)
      onChange?.(v)
    },
    [onChange]
  )

  const pct = ((value - min) / (max - min)) * 100

  const ticks = showTicks
    ? Array.from({ length: tickCount }, (_, i) => {
        const tickVal = min + (i / (tickCount - 1)) * (max - min)
        return { val: Math.round(tickVal * 100) / 100, pct: (i / (tickCount - 1)) * 100 }
      })
    : []

  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.header}>
        {label && <span className={styles.label}>{label}</span>}
        <span className={styles.valueDisplay}>
          {value}{unit}
        </span>
      </div>

      <div className={styles.sliderWrapper} style={{ marginBottom: showTicks ? 24 : 0 }}>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${pct}%` }} />
        </div>

        {/* Custom visual thumb */}
        <div
          className={styles.thumb}
          style={{ left: `${pct}%` }}
          aria-hidden="true"
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className={styles.input}
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={`${value}${unit}`}
        />

        {ticks.map((tick) => (
          <span key={tick.pct} style={{ left: `${tick.pct}%` }}>
            <span className={styles.tick} style={{ left: `${tick.pct}%` }} />
            <span className={styles.tickLabel} style={{ left: `${tick.pct}%` }}>
              {tick.val}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
