import type { ChangeEvent } from 'react'
import { useRef, useEffect } from 'react'

import styles from './MinMaxSlider.module.css'
import { RangeValues } from '../../types/rangeValues'

interface MinMaxSliderProps {
  rangeMin?: number
  rangeMax?: number
  step?: number
  rangeValues?: RangeValues
  onChange?: (range: RangeValues) => void
  inputLabel?: string
  minMaxLabelType: 'percentage' | 'money'
}

export const MinMaxSlider = ({
  rangeMin = 0,
  rangeMax = 100,
  step = 1,
  rangeValues: initialRangeValues = { min: 0, max: 100 },
  onChange,
  inputLabel = '',
  minMaxLabelType = 'money',
}: MinMaxSliderProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null)

  // Calculate the percentage position for styling
  const getPercent = (value: number): number => {
    return Math.round(((value - rangeMin) / (rangeMax - rangeMin)) * 100)
  }

  const formatValue = (value: number, type: 'percentage' | 'money'): string => {
    if (type === 'percentage') {
      return `${value}%`
    }
    return `$${value.toLocaleString()}`
  }

  // Update the range highlight style
  useEffect(() => {
    if (trackRef.current) {
      const minPercent = getPercent(initialRangeValues.min)
      const maxPercent = getPercent(initialRangeValues.max)

      trackRef.current.style.background = `linear-gradient(
        to right,
        #e5e7eb ${minPercent}%,
        #059669 ${minPercent}%,
        #059669 ${maxPercent}%,
        #e5e7eb ${maxPercent}%
      )`
    }
  }, [initialRangeValues.min, initialRangeValues.max, rangeMin, rangeMax])

  // Handlers for min thumb
  const handleMinChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (onChange) {
      const newMinValue = Math.min(
        +e.target.value,
        initialRangeValues.max - step,
      )
      onChange({ min: newMinValue, max: initialRangeValues.max })
    }
  }

  // Handlers for max thumb
  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (onChange) {
      const newMaxValue = Math.max(
        +e.target.value,
        initialRangeValues.min + step,
      )
      onChange({ min: initialRangeValues.min, max: newMaxValue })
    }
  }

  return (
    <div className={styles.container}>
      <label className={styles.inputLabel}>{inputLabel}</label>
      <div className={styles.rangeLabelsContainer}>
        <div className={styles.rangeLabel}>
          {formatValue(initialRangeValues.min, minMaxLabelType)}
        </div>
        <div className={styles.rangeLabel}>
          {formatValue(initialRangeValues.max, minMaxLabelType)}
        </div>
      </div>

      <div className={styles.sliderContainer}>
        {/* Track */}
        <div ref={trackRef} className={styles.track} />

        {/* Min thumb */}
        <input
          type='range'
          min={rangeMin}
          max={rangeMax}
          step={step}
          value={initialRangeValues.min}
          onChange={handleMinChange}
          className={styles.thumb}
        />

        {/* Max thumb */}
        <input
          type='range'
          min={rangeMin}
          max={rangeMax}
          step={step}
          value={initialRangeValues.max}
          onChange={handleMaxChange}
          className={styles.thumbMax}
        />
      </div>
    </div>
  )
}
