import { describe, it, expect } from 'vitest'
import {
  generateShortUrlHashForMonthlyPaymentCalculator,
  parseShortUrlHashForMonthlyPaymentCalculator,
} from '../../utils/monthlyPaymentParamHashing'
import type { MonthlyPaymentFormValues } from '../../types/monthlyPaymentFormValues'

describe('Monthly Payment Parameter Hashing Utilities', () => {
  const mockFormValues: MonthlyPaymentFormValues = {
    homePrice: '300000',
    downPayment: '75000',
    loanTerm: 30,
    interestRate: '7',
    annualTaxes: '9000',
    annualInsurance: '1000',
    monthlyHOA: '0',
  }

  describe('encodeFormValues and decodeFormValues', () => {
    it('should encode and decode form values correctly', () => {
      // Encode the form values
      const hash =
        generateShortUrlHashForMonthlyPaymentCalculator(mockFormValues)

      // Verify hash is a non-empty string
      expect(hash).toBeTruthy()
      expect(typeof hash).toBe('string')

      // Decode the hash back to form values
      const decodedValues = parseShortUrlHashForMonthlyPaymentCalculator(hash)

      // Verify decoded values match original values
      expect(decodedValues.homePrice).toBe(mockFormValues.homePrice)
      expect(decodedValues.downPayment).toBe(mockFormValues.downPayment)
      expect(decodedValues.loanTerm).toBe(mockFormValues.loanTerm)
      expect(decodedValues.interestRate).toBe(mockFormValues.interestRate)
      expect(decodedValues.annualTaxes).toBe(mockFormValues.annualTaxes)
      expect(decodedValues.annualInsurance).toBe(mockFormValues.annualInsurance)
      expect(decodedValues.monthlyHOA).toBe(mockFormValues.monthlyHOA)
    })

    it('should handle edge cases in form values', () => {
      const edgeCaseValues: MonthlyPaymentFormValues = {
        homePrice: '1000000', // High home price
        downPayment: '500000', // High down payment
        loanTerm: 10, // Shortest loan term
        interestRate: '15', // High interest rate
        annualTaxes: '50000', // High property tax
        annualInsurance: '10000', // High insurance
        monthlyHOA: '1000', // High HOA
      }

      // Encode and decode
      const hash =
        generateShortUrlHashForMonthlyPaymentCalculator(edgeCaseValues)
      const decodedValues = parseShortUrlHashForMonthlyPaymentCalculator(hash)

      // Verify decoded values match original values
      expect(decodedValues.homePrice).toBe(edgeCaseValues.homePrice)
      expect(decodedValues.downPayment).toBe(edgeCaseValues.downPayment)
      expect(decodedValues.loanTerm).toBe(edgeCaseValues.loanTerm)
      expect(decodedValues.interestRate).toBe(edgeCaseValues.interestRate)
      expect(decodedValues.annualTaxes).toBe(edgeCaseValues.annualTaxes)
      expect(decodedValues.annualInsurance).toBe(edgeCaseValues.annualInsurance)
      expect(decodedValues.monthlyHOA).toBe(edgeCaseValues.monthlyHOA)
    })
  })

  describe('generateShortUrlHash', () => {
    it('should generate a hash string from form values', () => {
      const hash =
        generateShortUrlHashForMonthlyPaymentCalculator(mockFormValues)

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
      const hash =
        generateShortUrlHashForMonthlyPaymentCalculator(mockFormValues)

      // Parse the hash
      const parsedValues = parseShortUrlHashForMonthlyPaymentCalculator(hash)

      // Verify parsed values match original values
      expect(parsedValues.homePrice).toBe(mockFormValues.homePrice)
      expect(parsedValues.downPayment).toBe(mockFormValues.downPayment)
      expect(parsedValues.loanTerm).toBe(mockFormValues.loanTerm)
      expect(parsedValues.interestRate).toBe(mockFormValues.interestRate)
      expect(parsedValues.annualTaxes).toBe(mockFormValues.annualTaxes)
      expect(parsedValues.annualInsurance).toBe(mockFormValues.annualInsurance)
      expect(parsedValues.monthlyHOA).toBe(mockFormValues.monthlyHOA)
    })

    it('should throw an error for invalid hash strings', () => {
      expect(() =>
        parseShortUrlHashForMonthlyPaymentCalculator('invalid-hash'),
      ).toThrow()
    })
  })
})
