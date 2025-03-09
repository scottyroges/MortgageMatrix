import { ExpandableItem } from '../ExpandableItem'
import { Button } from '../Button'
import {
  formatCurrency,
  formatPriceRange,
} from '../../utils/mortgageCalculations'
import type { AffordabilityByDownPayment } from '../../utils/mortgageCalculations'

import styles from './AffordabilityEstimatorResults.module.css'

interface AffordabilityEstimatorResultsProps {
  results: AffordabilityByDownPayment
  onReset: () => void
}

export const AffordabilityEstimatorResults = ({
  results,
  onReset,
}: AffordabilityEstimatorResultsProps) => {
  return (
    <div className={styles.resultsSection}>
      <div className={styles.resultsContainer}>
        <h3 className={styles.resultsTitle}>Affordable House Prices</h3>

        {Object.entries(results).map(([propertyTax, data]) => (
          <ExpandableItem
            key={propertyTax}
            label='Taxes'
            labelValue={formatCurrency(Number(propertyTax))}
            value={formatPriceRange(data.min, data.max)}
          >
            <div className={styles.expandedContent}>
              <div className={styles.interestRateTable}>
                {data.housePrices.map(pricePoint => {
                  const housePrice = formatCurrency(pricePoint.housePrice)
                  return (
                    <div
                      key={pricePoint.interestRate}
                      className={styles.interestRateRow}
                    >
                      <span className={styles.interestRate}>
                        Interest {pricePoint.interestRate.toFixed(1)}%
                      </span>
                      <span
                        className={`${housePrice === 'Out of Budget' ? styles.housePriceOutOfBudget : styles.housePrice}`}
                      >
                        {housePrice}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </ExpandableItem>
        ))}
      </div>

      <div className={styles.actionContainer}>
        <div className={styles.buttonContainer}>
          <Button variant='secondary' fullWidth onClick={onReset}>
            Reset
          </Button>
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.iconButton} aria-label='Email'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2.5 6.66669L9.0755 11.0504C9.63533 11.4236 10.3647 11.4236 10.9245 11.0504L17.5 6.66669M4.16667 15.8334H15.8333C16.7538 15.8334 17.5 15.0872 17.5 14.1667V5.83335C17.5 4.91288 16.7538 4.16669 15.8333 4.16669H4.16667C3.24619 4.16669 2.5 4.91288 2.5 5.83335V14.1667C2.5 15.0872 3.24619 15.8334 4.16667 15.8334Z'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          <button className={styles.iconButton} aria-label='Share'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M6.5 11.6667C7.32843 11.6667 8 10.9951 8 10.1667C8 9.33826 7.32843 8.66669 6.5 8.66669C5.67157 8.66669 5 9.33826 5 10.1667C5 10.9951 5.67157 11.6667 6.5 11.6667Z'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M13.5 7.5C14.3284 7.5 15 6.82843 15 6C15 5.17157 14.3284 4.5 13.5 4.5C12.6716 4.5 12 5.17157 12 6C12 6.82843 12.6716 7.5 13.5 7.5Z'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M13.5 15.5C14.3284 15.5 15 14.8284 15 14C15 13.1716 14.3284 12.5 13.5 12.5C12.6716 12.5 12 13.1716 12 14C12 14.8284 12.6716 15.5 13.5 15.5Z'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M8 9.33331L12 6.83331'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M8 11L12 13.5'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          <button className={styles.iconButton} aria-label='Download'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5M5.83333 8.33333L10 12.5M10 12.5L14.1667 8.33333M10 12.5V2.5'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
