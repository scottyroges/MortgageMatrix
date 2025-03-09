import type { ChangeEvent } from 'react'
import { useState, useEffect, useRef } from 'react'

import styles from './MinMaxSlider.module.css'

interface MinMaxSliderProps {
  rangeMin?: number
  rangeMax?: number
  step?: number
  defaultMinValue?: number
  defaultMaxValue?: number
  onChange?: (range: RangeValues) => void
  inputLabel?: string
  minMaxLabelType: 'percentage' | 'money'
}

export interface RangeValues {
  min: number
  max: number
}

export const MinMaxSlider = ({
  rangeMin = 0,
  rangeMax = 100,
  step = 1,
  defaultMinValue = 25,
  defaultMaxValue = 75,
  onChange,
  inputLabel = '',
  minMaxLabelType = 'money',
}: MinMaxSliderProps) => {
  const [minValue, setMinValue] = useState<number>(defaultMinValue)
  const [maxValue, setMaxValue] = useState<number>(defaultMaxValue)
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
      const minPercent = getPercent(minValue)
      const maxPercent = getPercent(maxValue)

      trackRef.current.style.background = `linear-gradient(
        to right,
        #e5e7eb ${minPercent}%,
        #059669 ${minPercent}%,
        #059669 ${maxPercent}%,
        #e5e7eb ${maxPercent}%
      )`
    }
  }, [minValue, maxValue, rangeMin, rangeMax])

  // Notify parent component when values change
  useEffect(() => {
    if (onChange) {
      onChange({ min: minValue, max: maxValue })
    }
  }, [minValue, maxValue, onChange])

  // Handlers for min thumb
  const handleMinChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newMinValue = Math.min(+e.target.value, maxValue - step)
    setMinValue(newMinValue)
  }

  // Handlers for max thumb
  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newMaxValue = Math.max(+e.target.value, minValue + step)
    setMaxValue(newMaxValue)
  }

  return (
    <div className={styles.container}>
      <label className={styles.inputLabel}>{inputLabel}</label>
      <div className={styles.rangeLabelsContainer}>
        <div className={styles.rangeLabel}>
          {formatValue(minValue, minMaxLabelType)}
        </div>
        <div className={styles.rangeLabel}>
          {formatValue(maxValue, minMaxLabelType)}
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
          value={minValue}
          onChange={handleMinChange}
          className={styles.thumb}
        />

        {/* Max thumb */}
        <input
          type='range'
          min={rangeMin}
          max={rangeMax}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          className={styles.thumbMax}
        />
      </div>
    </div>
  )
}
