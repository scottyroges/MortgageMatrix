import { useState } from 'react'
import styles from './TermSelector.module.css'

interface TermSelectorProps {
  options: number[]
  defaultValue?: number
  onChange: (value: number) => void
  label: string
}

export const TermSelector = ({
  options,
  defaultValue,
  onChange,
  label,
}: TermSelectorProps) => {
  const [selectedValue, setSelectedValue] = useState<number>(
    defaultValue || options[0],
  )

  const handleSelect = (value: number) => {
    setSelectedValue(value)
    onChange(value)
  }

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={styles.buttonGroup}>
        {options.map(option => (
          <button
            key={option}
            type='button'
            className={`${styles.button} ${
              selectedValue === option ? styles.selected : ''
            }`}
            onClick={() => handleSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
