# System Patterns: Mortgage Matrix

## Architecture Overview
Mortgage Matrix follows a component-based architecture using React and TypeScript. The application is structured to promote reusability, maintainability, and scalability.

## Directory Structure
```
src/
├── assets/         # Static assets like images, icons
├── components/     # Reusable UI components
│   ├── AffordabilityEstimatorResults/
│   ├── Button/
│   ├── ExpandableItem/
│   ├── Footer/
│   ├── Header/
│   ├── InfoSection/
│   ├── InputField/
│   ├── MinMaxSlider/
│   ├── MonthlyPaymentResults/
│   ├── PaymentCircle/
│   └── TermSelector/
├── layouts/        # Layout components for page structure
│   └── MainLayout/
├── pages/          # Page components for different routes
│   ├── AffordabilityEstimator/
│   └── MonthlyPaymentCalculator/
├── types/          # TypeScript type definitions
│   ├── affordabilityFormValues.ts
│   ├── monthlyPaymentFormValues.ts
│   └── rangeValues.ts
├── test/           # Test setup and utilities
│   └── utils/      # Test files for utility functions
└── utils/          # Utility functions and helpers
    ├── affordabilityParamHashing.ts
    ├── calculateAffordabilityByDownpayment.ts
    ├── calculateMonthlyPayment.ts
    └── monthlyPaymentParamHashing.ts
```

## Component Pattern
Components follow a consistent pattern:
- Each component has its own directory
- Component files include the component itself, styles, tests, and an index file
- CSS Modules are used for component-specific styling
- Index files are used for clean exports

Example:
```tsx
// Component.tsx
import styles from './Component.module.css';

interface ComponentProps {
  // Props definition
}

export const Component = (props: ComponentProps) => {
  return (
    <div className={styles.container}>
      {/* Component content */}
    </div>
  );
};
```

## Key Components

### InputField
A reusable component for monetary inputs with dollar sign prefix and formatting.
```tsx
<InputField
  label="Desired monthly payment"
  value={monthlyPayment}
  onChange={setMonthlyPayment}
  error={errors.monthlyPayment}
/>
```

### MinMaxSlider
A slider component for range inputs with customizable min/max values and labels.
```tsx
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
```

### Button
A button component with primary and secondary variants.
```tsx
<Button variant="primary" fullWidth onClick={handleCalculate}>
  Calculate
</Button>
```

### TermSelector
A component for selecting from a group of options presented as buttons, used for loan term selection.
```tsx
<TermSelector
  label="Length of loan"
  options={[30, 20, 15, 10]}
  defaultValue={30}
  onChange={setLoanTerm}
/>
```

### ExpandableItem
A component for expandable/collapsible content sections with support for two-line layout.
```tsx
<ExpandableItem
  label="Taxes"
  labelValue="$4,000"
  value="$400K - $450K"
>
  <div className={styles.expandedContent}>
    <div className={styles.interestRateTable}>
      <div className={styles.interestRateRow}>
        <span className={styles.interestRate}>Interest 5.0%</span>
        <span className={styles.housePrice}>$450,000</span>
      </div>
      <div className={styles.interestRateRow}>
        <span className={styles.interestRate}>Interest 6.0%</span>
        <span className={styles.housePrice}>$425,000</span>
      </div>
    </div>
  </div>
</ExpandableItem>
```

### InfoSection
A component for displaying informational content with an optional link.
```tsx
<InfoSection
  title="How It Works"
  content="Content here..."
  linkText="Learn more"
  linkUrl="#"
/>
```

### AffordabilityEstimatorResults
A component for displaying the results of mortgage affordability calculations with detailed interest rate breakdowns.
```tsx
<AffordabilityEstimatorResults
  results={calculationResults}
  onReset={handleReset}
  formValues={formValues}
/>
```

The component renders expandable items for each property tax amount, showing the affordable house price range. When expanded, it displays a detailed breakdown of house prices for each interest rate. It also includes a "Share Results" button that copies a URL with the current form values to the clipboard.

### PaymentCircle
A visualization component that displays a segmented ring chart where each segment represents a payment component with a distinct color and sized proportionally to its percentage of the total.
```tsx
<PaymentCircle
  segments={paymentSegments}
  totalAmount={monthlyPayment}
  formatCurrency={formatCurrency}
/>
```

The component takes an array of payment segments, each with a name, value, percentage, and color. It renders an SVG ring chart with segments sized according to their percentage of the total, and displays the total amount in the center.

### MonthlyPaymentResults
A component for displaying the results of monthly payment calculations with a payment breakdown.
```tsx
<MonthlyPaymentResults
  monthlyPayment={monthlyPayment}
  principalAndInterest={principalAndInterest}
  propertyTax={propertyTax}
  homeInsurance={homeInsurance}
  hoaFees={hoaFees}
  onReset={handleReset}
  formValues={formValues}
/>
```

The component uses the PaymentCircle component to visualize the payment breakdown and provides a detailed list of the payment components: principal & interest, property tax, home insurance, and HOA fees. Each item in the breakdown includes a color indicator that matches its segment in the circle chart and displays both the monetary value and percentage of the total payment. It also includes a "Share Results" button that copies a URL with the current form values to the clipboard.

## State Management
- Local component state using React's useState hook for component-specific state
- Form state management for user inputs
- Validation state for form errors
- UI state for expandable items and other interactive elements
- Context API for shared state when needed (future implementation)
- URL parameter state persistence for sharing calculator results

## URL Parameter Sharing
- URL parameters for sharing calculator results with others
- Standard URL query parameters for basic sharing (e.g., `?mp=2000&dp=80000&irmin=4&irmax=6`)
- Compact hash parameter for shorter URLs (e.g., `?p=a1b2c3d4e5`)
- Automatic form population and calculation when loading with URL parameters
- Share button in results section for copying URL to clipboard
- Binary encoding and Base64 URL-safe conversion for compact parameter representation
- Dedicated parameter hashing utilities for each calculator:
  - `affordabilityParamHashing.ts` for the Affordability Estimator
  - `monthlyPaymentParamHashing.ts` for the Monthly Payment Calculator

## Testing Strategy
- Unit tests for individual components and utilities
- Integration tests for component interactions
- Vitest as the test runner
- React Testing Library for component testing
- Comprehensive test suite for URL parameter handling and parameter hashing

## Styling Approach
- CSS Modules for component-specific styles
- Global styles for application-wide theming
- Responsive design using CSS media queries
- CSS variables for consistent theming
- Mobile-first approach to ensure responsiveness
- Color scheme using #059669 for green accents and #111827 for dark sections

## Type Safety
- TypeScript interfaces for component props
- Type definitions for form state:
  - `AffordabilityFormValues` for the Affordability Estimator
  - `MonthlyPaymentFormValues` for the Monthly Payment Calculator
- Record types for error handling
- Strict type checking enabled
