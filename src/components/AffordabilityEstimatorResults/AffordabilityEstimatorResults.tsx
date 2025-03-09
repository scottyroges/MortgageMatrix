import { useState } from 'react'
import { ExpandableItem } from '../ExpandableItem'
import { Button } from '../Button'
import {
  formatCurrency,
  formatPriceRange,
} from '../../utils/calculateAffordabilityByDownpayment'
import { generateShortUrlHashForAffordabilityEstimator } from '../../utils/affordabilityParamHashing'
import type { AffordabilityFormValues } from '../../types/affordabilityFormValues'

import styles from './AffordabilityEstimatorResults.module.css'
import { AffordabilityByDownPayment } from '../../types/affordabilityByDownPayment'

interface AffordabilityEstimatorResultsProps {
  results: AffordabilityByDownPayment
  onReset: () => void
  formValues?: AffordabilityFormValues
}

export const AffordabilityEstimatorResults = ({
  results,
  onReset,
  formValues,
}: AffordabilityEstimatorResultsProps) => {
  const [shareButtonText, setShareButtonText] = useState('Share Results')
  const [shareButtonDisabled, setShareButtonDisabled] = useState(false)

  const handleShare = () => {
    if (!formValues) return

    try {
      // Generate a short hash from the form values
      const hash = generateShortUrlHashForAffordabilityEstimator(formValues)

      // Create the shareable URL with the hash parameter
      const url = new URL(window.location.href)
      url.search = `?p=${hash}`

      // Copy the URL to clipboard
      navigator.clipboard
        .writeText(url.toString())
        .then(() => {
          // Update button text to provide feedback
          setShareButtonText('Copied!')
          setShareButtonDisabled(true)

          // Reset button text after 2 seconds
          setTimeout(() => {
            setShareButtonText('Share Results')
            setShareButtonDisabled(false)
          }, 2000)
        })
        .catch(err => {
          console.error('Failed to copy URL: ', err)
          setShareButtonText('Failed to copy')

          // Reset button text after 2 seconds
          setTimeout(() => {
            setShareButtonText('Share Results')
          }, 2000)
        })
    } catch (error) {
      console.error('Error generating shareable URL:', error)
    }
  }
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
          <Button
            variant='secondary'
            fullWidth
            onClick={handleShare}
            disabled={shareButtonDisabled || !formValues}
          >
            {shareButtonText}
          </Button>
        </div>
        <div className={styles.buttonContainer}>
          <Button variant='secondary' fullWidth onClick={onReset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
