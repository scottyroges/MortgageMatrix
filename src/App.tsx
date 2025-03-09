import { MainLayout } from './layouts/MainLayout';
import { AffordabilityEstimator } from './pages/AffordabilityEstimator';
import './App.css';

const App = () => {
  return (
    <MainLayout>
      <AffordabilityEstimator />
    </MainLayout>
  );
};

export default App;
