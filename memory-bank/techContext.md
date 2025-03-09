# Technical Context: Mortgage Matrix

## Technology Stack
- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite 6
- **Styling**: CSS Modules
- **Typography**: IBM Plex Mono (primary font)
- **Testing**: Vitest, React Testing Library
- **Package Manager**: npm

## Development Environment
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js environment
- npm for package management
- VS Code (recommended editor)

## Key Dependencies
- **React**: Core UI library
- **React DOM**: React renderer for the web
- **TypeScript**: Static type checking
- **Vite**: Build tool and development server
- **Vitest**: Testing framework
- **React Testing Library**: Component testing utilities
- **ESLint**: Code linting with comprehensive configuration
- **Prettier**: Code formatting with consistent style rules

## Utility Functions
- **Currency Formatting**: Using Intl.NumberFormat for consistent currency display
- **Form Validation**: Client-side validation for required fields and numeric inputs
- **SVG Icons**: Inline SVG icons for UI elements
- **Mortgage Calculations**:
  - Affordability calculations based on monthly payment, interest rates, and property taxes
  - Monthly payment calculations based on home price, down payment, interest rate, and loan term

## Development Commands
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run test`: Run tests
- `npm run test:coverage`: Run tests with coverage report
- `npm run lint`: Run linter to check code quality
- `npm run lint:fix`: Run linter and automatically fix issues
- `npm run format`: Format code using Prettier
- `npm run preview`: Preview production build

## Browser Compatibility
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Performance Considerations
- Component memoization for expensive renders
- Lazy loading for code splitting
- Optimized asset loading
- Responsive design for all device sizes

## Accessibility Standards
- WCAG 2.1 AA compliance target
- Semantic HTML
- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility

## Deployment Strategy
- Static site hosting (e.g., Netlify, Vercel)
- CI/CD pipeline for automated testing and deployment
- Environment-specific configuration
