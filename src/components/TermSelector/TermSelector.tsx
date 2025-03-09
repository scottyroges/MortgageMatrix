import styles from './TermSelector.module.css'

interface TermSelectorProps {
  options: number[]
  value?: number
  onChange: (value: number) => void
  label: string
}

export const TermSelector = ({
  options,
  value = 30,
  onChange,
  label,
}: TermSelectorProps) => {
  const handleSelect = (value: number) => {
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
              value === option ? styles.selected : ''
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
