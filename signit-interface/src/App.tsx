import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Loader from './components/Loader';


// Import dynamique des pages
const TraductionComponent = lazy(() => import('./components/Traduction/TraductionUI'));
const LearningComponent = lazy(() => import('./components/Learn/LearningUI'));

const App = () => {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<TraductionComponent />} />
          <Route path="/learn" element={<LearningComponent />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
