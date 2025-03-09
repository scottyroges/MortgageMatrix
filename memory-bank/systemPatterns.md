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
│   └── MinMaxSlider/
├── layouts/        # Layout components for page structure
│   └── MainLayout/
├── pages/          # Page components for different routes
│   └── AffordabilityEstimator/
├── types/          # TypeScript type definitions
├── test/           # Test setup and utilities
└── utils/          # Utility functions and helpers (including mortgage calculations)
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

### RangeSlider
A slider component for range inputs with customizable min/max values and labels.
```tsx
<RangeSlider
  label="Interest Rate Range"
  min={3}
  max={7}
  value={interestRate}
  onChange={setInterestRate}
  step={0.1}
  minLabel="3%"
  maxLabel="7%"
/>
```

### Button
A button component with primary and secondary variants.
```tsx
<Button variant="primary" fullWidth onClick={handleCalculate}>
  Calculate
</Button>
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
/>
```

The component renders expandable items for each property tax amount, showing the affordable house price range. When expanded, it displays a detailed breakdown of house prices for each interest rate.

## State Management
- Local component state using React's useState hook for component-specific state
- Form state management for user inputs
- Validation state for form errors
- UI state for expandable items and other interactive elements
- Context API for shared state when needed (future implementation)

## Testing Strategy
- Unit tests for individual components and utilities
- Integration tests for component interactions
- Vitest as the test runner
- React Testing Library for component testing

## Styling Approach
- CSS Modules for component-specific styles
- Global styles for application-wide theming
- Responsive design using CSS media queries
- CSS variables for consistent theming
- Mobile-first approach to ensure responsiveness
- Color scheme using #059669 for green accents and #111827 for dark sections

## Type Safety
- TypeScript interfaces for component props
- Type definitions for form state
- Record types for error handling
- Strict type checking enabled
