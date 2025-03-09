/**
 * Mortgage calculation utilities
 */

/**
 * Calculates the present value of an investment
 * This is equivalent to Excel's PV function
 *
 * @param rate - The interest rate per period
 * @param nper - The total number of payment periods
 * @param pmt - The payment made each period
 * @returns The present value
 */
export const calculatePV = (
  rate: number,
  nper: number,
  pmt: number,
): number => {
  // Handle edge case where rate is 0
  if (rate === 0) {
    return -pmt * nper
  }

  // PV formula: -PMT * ((1 - (1 + rate)^-nper) / rate)
  return -pmt * ((1 - Math.pow(1 + rate, -nper)) / rate)
}

/**
 * Generates an array of values between min and max with a specific step
 *
 * @param min - The minimum value
 * @param max - The maximum value
 * @param step - The step between values
 * @returns An array of values
 */
export const generateRange = (
  min: number,
  max: number,
  step: number,
): number[] => {
  const result: number[] = []
  max = Number(max.toFixed(2))
  step = Number(step.toFixed(2))
  for (
    let value = min;
    value <= max;
    value = Number((value + step).toFixed(2))
  ) {
    result.push(value) // Fix floating point precision issues
  }
  return result
}

export interface HousePricePoint {
  interestRate: number
  housePrice: number
}

export interface PriceRangeData {
  min: number
  max: number
  housePrices: HousePricePoint[]
}

export type AffordabilityByDownPayment = Record<string, PriceRangeData>

/**
 * Calculates affordable house prices based on desired payment, interest rates, and property taxes
 *
 * @param desiredPayment - The desired monthly payment
 * @param downPayment - The down payment amount
 * @param interestRateMin - The minimum interest rate (percentage)
 * @param interestRateMax - The maximum interest rate (percentage)
 * @param propertyTaxMin - The minimum annual property tax
 * @param propertyTaxMax - The maximum annual property tax
 * @param insurance - The annual insurance amount
 * @param hoa - The monthly HOA fee
 * @param loanTermYears - The loan term in years (default: 30)
 * @returns An object containing affordable house prices for different interest rates and property taxes
 */
export const calculateAffordableHousePrices = (
  desiredPayment: number,
  downPayment: number,
  interestRateMin: number,
  interestRateMax: number,
  propertyTaxMin: number,
  propertyTaxMax: number,
  insurance: number,
  hoa: number,
  loanTermYears: number = 30,
): AffordabilityByDownPayment => {
  // Generate ranges for interest rates and property taxes
  const interestRates = generateInterestRateRange(
    interestRateMin,
    interestRateMax,
  )

  const propertyTaxes = generatePropertyTaxRange(propertyTaxMin, propertyTaxMax)

  console.log(`Property Taxes: ${propertyTaxes}`)
  console.log(`Interest Rates: ${interestRates}`)

  // Calculate monthly insurance and HOA
  const monthlyInsurance = insurance / 12
  const monthlyHOA = Number(hoa)

  // Calculate affordable house prices for each property tax amount
  const results: AffordabilityByDownPayment = {}

  propertyTaxes.forEach(propertyTax => {
    // Calculate monthly property tax
    const monthlyPropertyTax = propertyTax / 12

    // Calculate payment available for principal and interest
    const paymentForPrincipalAndInterest =
      desiredPayment - monthlyPropertyTax - monthlyInsurance - monthlyHOA

    // Calculate affordable house prices for each interest rate
    const housePrices = interestRates.map(interestRate => {
      // Convert annual interest rate to monthly rate (percentage to decimal)
      const monthlyRate = interestRate / 100 / 12

      // Calculate number of payments
      const numberOfPayments = loanTermYears * 12

      // Calculate present value (loan amount)
      const loanAmount = -calculatePV(
        monthlyRate,
        numberOfPayments,
        paymentForPrincipalAndInterest,
      )

      // Add down payment to get house price
      const housePrice = loanAmount + downPayment

      return {
        interestRate,
        housePrice: Math.round(housePrice), // Round to nearest dollar
      }
    })

    // Find min and max house prices for this property tax
    const minHousePrice = Math.min(...housePrices.map(item => item.housePrice))
    const maxHousePrice = Math.max(...housePrices.map(item => item.housePrice))

    // Store results
    results[propertyTax] = {
      min: minHousePrice,
      max: maxHousePrice,
      housePrices: housePrices,
    }
  })

  return results
}

/**
 * Formats a number as currency
 *
 * @param value - The number to format
 * @returns A formatted currency string
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Formats a price range as a string
 *
 * @param min - The minimum price
 * @param max - The maximum price
 * @returns A formatted price range string
 */
export const formatPriceRange = (min: number, max: number): string => {
  return `${formatCurrency(min)} - ${formatCurrency(max)}`
}

function generatePropertyTaxRange(
  propertyTaxMin: number,
  propertyTaxMax: number,
): number[] {
  // Determine an appropriate step size based on the range
  let propertyTaxStep = 1000 // Default step
  const range = propertyTaxMax - propertyTaxMin

  if (range >= 30000) {
    propertyTaxStep = 10000
  } else if (range >= 15000) {
    propertyTaxStep = 5000
  } else if (range >= 6000) {
    propertyTaxStep = 2000
  } else {
    propertyTaxStep = 1000
  }

  // Ensure we include at least min, max, and some values in between
  let propertyTaxes = generateRange(
    propertyTaxMin,
    propertyTaxMax,
    propertyTaxStep,
  )

  // Always ensure min and max are included
  if (!propertyTaxes.includes(propertyTaxMin)) {
    propertyTaxes.unshift(propertyTaxMin)
  }
  if (!propertyTaxes.includes(propertyTaxMax)) {
    propertyTaxes.push(propertyTaxMax)
  }

  // Sort to ensure order
  propertyTaxes.sort((a, b) => a - b)

  return propertyTaxes
}

function calculateInterestRateStep(
  minRate: number,
  maxRate: number,
  targetSteps: number = 4,
): number {
  const range = maxRate - minRate

  // Ensure we have at least 2 steps (min and max)
  const steps = Math.max(2, Math.min(targetSteps, Math.floor(range / 0.5)))

  // Calculate raw step and ensure it's not smaller than 0.5
  const rawStep = range / (steps - 1)
  const step = Math.max(0.5, Math.round(rawStep * 2) / 2)

  return step
}

function generateInterestRateRange(minRate: number, maxRate: number): number[] {
  const step = calculateInterestRateStep(minRate, maxRate)

  let rates = []
  for (let rate = minRate; rate <= maxRate; rate += step) {
    rates.push(Number(rate.toFixed(3))) // Round to 3 decimal places
  }

  // Always ensure min and max are included
  if (!rates.includes(minRate)) {
    rates.unshift(minRate)
  }
  if (!rates.includes(maxRate)) {
    rates.push(maxRate)
  }

  // Sort to ensure order
  return rates.sort((a, b) => a - b)
}
