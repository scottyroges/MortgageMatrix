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
      </div>
    </div>
  )
}
