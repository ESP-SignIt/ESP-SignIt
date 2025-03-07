import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import { ThemeProvider } from './ThemeContext';

// Import dynamique des pages
const TraductionComponent = lazy(() => import('./components/Traduction'));
const DictionaryComponent = lazy(() => import('./components/Dictionary'));

const App = () => {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
};

export default App;
