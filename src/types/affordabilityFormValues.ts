import type { RangeValues } from '../types/rangeValues'

/**
 * Form values interface for the Affordability Estimator
 */
export interface AffordabilityFormValues {
  monthlyPayment: string
  downPayment: string
  interestRateRange: RangeValues
  propertyTaxRange: RangeValues
  insurance: string
  hoa: string
}
