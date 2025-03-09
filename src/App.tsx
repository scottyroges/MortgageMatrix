import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { AffordabilityEstimator } from './pages/AffordabilityEstimator'
import { HowItWorks } from './pages/HowItWorks'
import { MonthlyPaymentCalculator } from './pages/MonthlyPaymentCalculator'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { TermsOfService } from './pages/TermsOfService'
import { ScrollToTop } from './components/ScrollToTop'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Analytics />
      <SpeedInsights />
      <MainLayout>
        <Routes>
          <Route path='/' element={<AffordabilityEstimator />} />
          <Route
            path='/affordability-estimator'
            element={<AffordabilityEstimator />}
          />
          <Route path='/how-it-works' element={<HowItWorks />} />
          <Route
            path='/monthly-payment-calculator'
            element={<MonthlyPaymentCalculator />}
          />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms-of-service' element={<TermsOfService />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
