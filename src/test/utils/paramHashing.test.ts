import { describe, it, expect } from 'vitest'
import {
  generateShortUrlHashForAffordabilityEstimator,
  parseShortUrlHashForAffordabilityEstimator,
} from '../../utils/affordabilityParamHashing'
import type { AffordabilityFormValues } from '../../types/affordabilityFormValues'

describe('Parameter Hashing Utilities', () => {
  const mockFormValues: AffordabilityFormValues = {
    monthlyPayment: '2000',
    downPayment: '80000',
    interestRateRange: {
      min: 4,
      max: 6,
    },
    propertyTaxRange: {
      min: 5000,
      max: 9000,
    },
    insurance: '1000',
    hoa: '0',
  }

  describe('encodeFormValues and decodeFormValues', () => {
    it('should encode and decode form values correctly', () => {
      // Encode the form values
      const hash = generateShortUrlHashForAffordabilityEstimator(mockFormValues)

      // Verify hash is a non-empty string
      expect(hash).toBeTruthy()
      expect(typeof hash).toBe('string')

      // Decode the hash back to form values
      const decodedValues = parseShortUrlHashForAffordabilityEstimator(hash)

      // Verify decoded values match original values
      expect(decodedValues.monthlyPayment).toBe(mockFormValues.monthlyPayment)
      expect(decodedValues.downPayment).toBe(mockFormValues.downPayment)
      expect(decodedValues.interestRateRange.min).toBe(
        mockFormValues.interestRateRange.min,
      )
      expect(decodedValues.interestRateRange.max).toBe(
        mockFormValues.interestRateRange.max,
      )
      expect(decodedValues.propertyTaxRange.min).toBe(
        mockFormValues.propertyTaxRange.min,
      )
      expect(decodedValues.propertyTaxRange.max).toBe(
        mockFormValues.propertyTaxRange.max,
      )
      expect(decodedValues.insurance).toBe(mockFormValues.insurance)
      expect(decodedValues.hoa).toBe(mockFormValues.hoa)
    })

    it('should handle edge cases in form values', () => {
      const edgeCaseValues: AffordabilityFormValues = {
        monthlyPayment: '50000', // High monthly payment
        downPayment: '1000000', // High down payment
        interestRateRange: {
          min: 0.1, // Very low interest rate
          max: 15, // High interest rate
        },
        propertyTaxRange: {
          min: 100, // Very low property tax
          max: 50000, // High property tax
        },
        insurance: '50000', // High insurance
        hoa: '5000', // High HOA
      }

      // Encode and decode
      const hash = generateShortUrlHashForAffordabilityEstimator(edgeCaseValues)
      const decodedValues = parseShortUrlHashForAffordabilityEstimator(hash)

      // Verify decoded values match original values
      expect(decodedValues.monthlyPayment).toBe(edgeCaseValues.monthlyPayment)
      expect(decodedValues.downPayment).toBe(edgeCaseValues.downPayment)
      expect(decodedValues.interestRateRange.min).toBe(
        edgeCaseValues.interestRateRange.min,
      )
      expect(decodedValues.interestRateRange.max).toBe(
        edgeCaseValues.interestRateRange.max,
      )
      expect(decodedValues.propertyTaxRange.min).toBe(
        edgeCaseValues.propertyTaxRange.min,
      )
      expect(decodedValues.propertyTaxRange.max).toBe(
        edgeCaseValues.propertyTaxRange.max,
      )
      expect(decodedValues.insurance).toBe(edgeCaseValues.insurance)
      expect(decodedValues.hoa).toBe(edgeCaseValues.hoa)
    })
  })

  describe('generateShortUrlHash', () => {
    it('should generate a hash string from form values', () => {
      const hash = generateShortUrlHashForAffordabilityEstimator(mockFormValues)

      // Verify hash is a non-empty string
      expect(hash).toBeTruthy()
      expect(typeof hash).toBe('string')

      // Verify hash doesn't contain URL-unsafe characters
      expect(hash).not.toContain('+')
      expect(hash).not.toContain('/')
      expect(hash).not.toContain('=')
    })
  })

  describe('parseShortUrlHash', () => {
    it('should parse a hash string back into form values', () => {
      // Generate a hash
      const hash = generateShortUrlHashForAffordabilityEstimator(mockFormValues)

      // Parse the hash
      const parsedValues = parseShortUrlHashForAffordabilityEstimator(hash)

      // Verify parsed values match original values
      expect(parsedValues.monthlyPayment).toBe(mockFormValues.monthlyPayment)
      expect(parsedValues.downPayment).toBe(mockFormValues.downPayment)
      expect(parsedValues.interestRateRange.min).toBe(
        mockFormValues.interestRateRange.min,
      )
      expect(parsedValues.interestRateRange.max).toBe(
        mockFormValues.interestRateRange.max,
      )
      expect(parsedValues.propertyTaxRange.min).toBe(
        mockFormValues.propertyTaxRange.min,
      )
      expect(parsedValues.propertyTaxRange.max).toBe(
        mockFormValues.propertyTaxRange.max,
      )
      expect(parsedValues.insurance).toBe(mockFormValues.insurance)
      expect(parsedValues.hoa).toBe(mockFormValues.hoa)
    })

    it('should throw an error for invalid hash strings', () => {
      expect(() =>
        parseShortUrlHashForAffordabilityEstimator('invalid-hash'),
      ).toThrow()
    })
  })
})
