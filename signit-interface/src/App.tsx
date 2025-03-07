import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Import dynamique des pages
const TraductionComponent = lazy(() => import('./components/Traduction/Traduction'));
const DictionaryComponent = lazy(() => import('./components/Dictionary/Dictionary'));

const App = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<TraductionComponent />} />
            <Route path="/dictionary" element={<DictionaryComponent />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
