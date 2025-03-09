import type { ChangeEvent } from 'react';
import { useState } from 'react';

import styles from './InputField.module.css';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  placeholder?: string;
  error?: string;
}

export const InputField = ({
  label,
  value,
  onChange,
  prefix = '$',
  placeholder = '',
  error,
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and decimal point
    const newValue = e.target.value.replace(/[^0-9.]/g, '');
    onChange(newValue);
  };

  // Format the displayed value with commas
  const formatValue = (val: string) => {
    // Remove any non-numeric characters
    const numericValue = val.replace(/[^0-9.]/g, '');

    // Format with commas
    if (numericValue) {
      return new Intl.NumberFormat('en-US').format(Number(numericValue));
    }

    return val;
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div
        className={`${styles.inputContainer} ${isFocused ? styles.focused : ''} ${error ? styles.error : ''}`}
      >
        <span className={styles.prefix}>{prefix}</span>
        <input
          type="text"
          value={formatValue(value)}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={styles.input}
          placeholder={placeholder}
        />
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};
