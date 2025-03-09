import { describe, it, expect } from 'vitest'
import {
  calculatePV,
  generateRange,
  calculateAffordableHousePrices,
  formatCurrency,
  formatPriceRange,
} from '../../utils/calculateAffordabilityByDownpayment'

describe('calculatePV', () => {
  it('should calculate present value correctly for non-zero rate', () => {
    // Test case with 5% annual interest rate, 30 years, $1000 monthly payment
    const monthlyRate = 0.05 / 12
    const numberOfPayments = 30 * 12
    const monthlyPayment = 1000

    const result = calculatePV(monthlyRate, numberOfPayments, monthlyPayment)
    expect(result).toBeCloseTo(-186281.62, 2) // Expected value from Excel PV function
  })

  it('should handle zero interest rate correctly', () => {
    const result = calculatePV(0, 12, 1000)
    expect(result).toBe(-12000) // For zero rate, PV = -pmt * nper
  })
})

describe('generateRange', () => {
  it('should generate range with correct step size', () => {
    const result = generateRange(1, 5, 1)
    expect(result).toEqual([1, 2, 3, 4, 5])
  })

  it('should handle decimal steps', () => {
    const result = generateRange(1, 2, 0.5)
    expect(result).toEqual([1, 1.5, 2])
  })

  it('should handle floating point precision', () => {
    const result = generateRange(0.1, 0.3, 0.1)
    expect(result).toEqual([0.1, 0.2, 0.3])
  })
})

describe('calculateAffordableHousePrices', () => {
  it('should calculate affordable house prices correctly', () => {
    const result = calculateAffordableHousePrices(
      2000, // desired payment
      40000, // down payment
      5, // min interest rate
      5, // max interest rate
      2000, // min property tax
      2000, // max property tax
      1200, // insurance
      0, // HOA
      30, // loan term
    )

    // Check if the result has the expected structure
    expect(result).toHaveProperty('2000')
    expect(result['2000']).toHaveProperty('min')
    expect(result['2000']).toHaveProperty('max')

    // The min and max should be equal since we're using the same interest rate
    expect(result['2000'].min).toBe(result['2000'].max)
  })

  it('should handle different property tax amounts', () => {
    const result = calculateAffordableHousePrices(
      2000,
      40000,
      5,
      5,
      2000,
      3000,
      1200,
      0,
      30,
    )

    expect(result).toHaveProperty('2000')
    expect(result).toHaveProperty('3000')
    expect(result['2000'].min).toBeGreaterThan(result['3000'].min)
  })
})

describe('formatCurrency', () => {
  it('should format currency correctly', () => {
    expect(formatCurrency(1000)).toBe('$1,000')
    expect(formatCurrency(1000000)).toBe('$1,000,000')
    expect(formatCurrency(0)).toBe('$0')
    expect(formatCurrency(-1000)).toBe('Out of Budget')
  })
})

describe('formatPriceRange', () => {
  it('should format price range correctly', () => {
    expect(formatPriceRange(100000, 200000)).toBe('$100,000 - $200,000')
    expect(formatPriceRange(0, 1000)).toBe('$0 - $1,000')
    expect(formatPriceRange(1000000, 1000000)).toBe('$1,000,000 - $1,000,000')
  })
})
