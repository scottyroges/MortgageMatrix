import { useState } from 'react';

import { Button } from '../../components/Button';
import { calculateAffordableHousePrices } from '../../utils/mortgageCalculations';
import { Footer } from '../../components/Footer';
import { InfoSection } from '../../components/InfoSection';
import { InputField } from '../../components/InputField';
import { MinMaxSlider } from '../../components/MinMaxSlider';
import { AffordabilityEstimatorResults } from '../../components/AffordabilityEstimatorResults';
import type { RangeValues } from '../../components/MinMaxSlider';
import type { AffordabilityByDownPayment } from '../../utils/mortgageCalculations';

import styles from './AffordabilityEstimator.module.css';

export const AffordabilityEstimator = () => {
  // Form state
  const [monthlyPayment, setMonthlyPayment] = useState('2000');
  const [downPayment, setDownPayment] = useState('80000');
  const [interestRateRange, setInterestRateRange] = useState<RangeValues>({
    min: 4,
    max: 6,
  });
  const [propertyTaxRange, setPropertyTaxRange] = useState<RangeValues>({
    min: 5000,
    max: 9000,
  });
  const [insurance, setInsurance] = useState('1000');
  const [hoa, setHoa] = useState('0');

  // Form validation and results visibility
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [calculationResults, setCalculationResults] = useState<AffordabilityByDownPayment | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!monthlyPayment) {
      newErrors.monthlyPayment = 'Monthly payment is required';
    }

    if (!downPayment) {
      newErrors.downPayment = 'Down payment is required';
    }

    if (!insurance) {
      newErrors.insurance = 'Insurance amount is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (validateForm()) {
      // Parse input values
      const monthlyPaymentValue = parseFloat(monthlyPayment);
      const downPaymentValue = parseFloat(downPayment);
      const insuranceValue = parseFloat(insurance);
      const hoaValue = parseFloat(hoa || '0');
    
      
      // Calculate affordable house prices
      const results = calculateAffordableHousePrices(
        monthlyPaymentValue,
        downPaymentValue,
        interestRateRange.min,
        interestRateRange.max,
        propertyTaxRange.min,
        propertyTaxRange.max,
        insuranceValue,
        hoaValue
      );
      
      console.log('Calculation results:', results);
      
      // Store results and show results section
      setCalculationResults(results);
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setMonthlyPayment('2000');
    setDownPayment('80000');
    setInterestRateRange({ min: 4, max: 6 });
    setPropertyTaxRange({ min: 5000, max: 9000 });
    setInsurance('1000');
    setHoa('0');
    setErrors({});
    
    // Hide results when reset is clicked
    setShowResults(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h2 className={styles.title}>Home Affordability Estimator</h2>

        <InputField
          label="Desired monthly payment"
          value={monthlyPayment}
          onChange={setMonthlyPayment}
          error={errors.monthlyPayment}
        />

        <InputField
          label="Down payment"
          value={downPayment}
          onChange={setDownPayment}
          error={errors.downPayment}
        />

        <MinMaxSlider
          rangeMin={1}
          rangeMax={15}
          step={0.5}
          defaultMinValue={2.5}
          defaultMaxValue={7}
          onChange={setInterestRateRange}
          inputLabel="Interest Rate Range"
          minMaxLabelType="percentage"
        />

        <MinMaxSlider
          rangeMin={1000}
          rangeMax={50000}
          step={1000}
          defaultMinValue={5000}
          defaultMaxValue={15000}
          onChange={setPropertyTaxRange}
          inputLabel="Property Taxes Annually"
          minMaxLabelType="money"
        />

        <div className={styles.rowInputs}>
          <div className={styles.inputHalf}>
            <InputField
              label="Insurance Annually"
              value={insurance}
              onChange={setInsurance}
              error={errors.insurance}
            />
          </div>
          <div className={styles.inputHalf}>
            <InputField label="HOA Monthly" value={hoa} onChange={setHoa} />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Button fullWidth onClick={handleCalculate}>
            Calculate
          </Button>
        </div>
      </div>

      {showResults && calculationResults && (
        <AffordabilityEstimatorResults 
          results={calculationResults} 
          onReset={handleReset} 
        />
      )}

      <InfoSection
        title="How It Works"
        content="Using industry standard amortization formulas and your desired monthly payment, we calculate the home prices in your range."
        linkText="Learn more about our methodology"
        linkUrl="#"
      />

      <Footer />
    </div>
  );
};
