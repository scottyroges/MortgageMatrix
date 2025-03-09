# Active Context: Mortgage Matrix

## Current Focus

The current focus is on implementing the core calculator screens of the Mortgage
Matrix application. We have completed the Home Affordability Estimator and the
Monthly Payment Calculator, and are now enhancing them with additional functionality. This includes:

1. Creating reusable UI components for the mortgage calculators
2. Implementing the form interfaces for user inputs
3. Styling the components to match the designs
4. Adding basic form validation
5. Setting up the results sections with actual calculation data
6. Refactoring components for better organization and reusability
7. Adding URL parameter sharing for calculator results

## Recent Changes

- Created a Contact Us page with email contact information (info@mortgagematrix.me)
- Updated the Footer component to link to the new Contact Us page
- Implemented the first two screens of the Mortgage Matrix app (Home
  Affordability Estimator and Monthly Payment Calculator)
- Added URL parameter sharing functionality to both calculator screens
- Created parameter hashing utilities for compact URL sharing
- Added a detailed section to the "How It Works" page explaining the Monthly
  Payment Calculator functionality
- Created several reusable components:
  - InputField: For monetary inputs with dollar sign prefix and formatting
  - MinMaxSlider: For selecting ranges like interest rates and property taxes
    with dual thumbs
  - Button: For Calculate and Reset buttons with primary/secondary variants
  - ExpandableItem: For the affordable house prices section with two-line layout
    for taxes
  - InfoSection: For the "How It Works" section
  - Footer: For the page footer with social media icons
  - AffordabilityEstimatorResults: For displaying dynamic calculation results
    with detailed interest rate breakdowns
  - MonthlyPaymentResults: For displaying monthly payment calculation results
    with a payment breakdown
  - PaymentCircle: For visualizing payment breakdown as a segmented ring chart
    with color-coded segments
  - TermSelector: For selecting loan term options (30, 20, 15, 10 years) with
    button group
- Implemented mortgage calculation utilities:
  - mortgageCalculations.ts: For affordability calculations
  - calculateMonthlyPayment.ts: For monthly payment calculations
  - affordabilityParamHashing.ts: For URL parameter hashing in Affordability Estimator
  - monthlyPaymentParamHashing.ts: For URL parameter hashing in Monthly Payment Calculator
- Connected the UI with the calculation logic to display actual affordable house
  prices and monthly payments
- Updated the Header component with calculator icon and hamburger menu
- Implemented form validation for required fields
- Added styling to match the design with specified colors (#059669 for green and
  #111827 for dark blue)
- Fixed UI issue: Changed the app background from dark grey to white by updating
  the root styles in App.css and index.css
- Added IBM Plex Mono as the primary font for the application
- Made the header sticky so it remains at the top when scrolling
- Reduced spacing between the header and page title for better visual flow
- Updated input field styling:
  - Changed background color to #F9FAFB
  - Set border color to #E5E7EB
  - Set text color to #1F2937
  - Applied IBM Plex Mono font to input text and prefix
- Improved mobile experience by removing padding around the app in mobile view
- Updated Footer component with social media icons (Facebook, Twitter,
  Instagram)
- Changed InfoSection background color to match the design (#f3f4f6)
- Set up comprehensive ESLint configuration:
  - Added rules for TypeScript best practices
  - Added rules for React component patterns
  - Added accessibility (a11y) rules
  - Configured import sorting and organization
  - Set up naming conventions (PascalCase for components, camelCase for
    variables)
- Configured Prettier for consistent code formatting:
  - Single quotes for strings
  - 100 character line length
  - 2 space indentation
  - Trailing commas in objects and arrays
- Added npm scripts for linting and formatting:
  - `npm run lint`: Check code quality
  - `npm run lint:fix`: Automatically fix linting issues
  - `npm run format`: Format code with Prettier

## Active Decisions

- Using a component-based architecture with clear separation of concerns
- Each component has its own directory with component file, styles, and index
- CSS Modules for component-specific styling
- Form state management using React's useState hook
- Mobile-first responsive design approach
- Client-side validation for form inputs
- URL parameter sharing for calculator results with compact hashing for shorter URLs
- Share button in results sections for copying URLs to clipboard

## Next Steps

1. Add more sophisticated validation for form inputs
2. Create additional screens for other mortgage calculator features
3. Implement state management for sharing data between components
4. Add routing for multiple pages/features
5. Enhance accessibility features
6. Add more detailed payment breakdowns and visualizations
7. Add more visualization components for mortgage data (amortization charts,
   etc.)
8. Add social sharing capabilities for calculator results
9. Enhance the Contact Us page with a contact form

## Current Challenges

- Ensuring proper TypeScript type safety throughout the application
- Implementing accurate mortgage calculations
- Creating an intuitive and responsive user interface
- Balancing simplicity and functionality in the UI design
