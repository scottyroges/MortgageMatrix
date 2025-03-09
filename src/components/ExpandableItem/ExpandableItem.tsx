import { useState } from 'react';

import styles from './ExpandableItem.module.css';

interface ExpandableItemProps {
  label: string;
  labelValue?: string;
  value: string;
  children?: React.ReactNode;
}

export const ExpandableItem = ({ label, labelValue, value, children }: ExpandableItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={toggleExpand}>
        <div className={styles.labelContainer}>
          <span className={styles.label}>{label}</span>
          {labelValue && <span className={styles.labelValue}>{labelValue}</span>}
        </div>
        <div className={styles.valueContainer}>
          <span className={styles.value}>{value}</span>
          <svg
            className={`${styles.chevron} ${isExpanded ? styles.expanded : ''}`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 8L10 12L14 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {isExpanded && children && <div className={styles.content}>{children}</div>}
    </div>
  );
};
