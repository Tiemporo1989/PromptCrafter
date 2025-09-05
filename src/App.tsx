import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import MainApp from './components/MainApp';

function App() {
  const [showApp, setShowApp] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900">
      {showApp ? (
        <MainApp onBack={() => setShowApp(false)} />
      ) : (
        <LandingPage onGetStarted={() => setShowApp(true)} />
      )}
    </div>
  );
}

export default App;