import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Intro from './components/Intro';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Rating from './Rating'; // અહીં આપણે રેટિંગ સિસ્ટમ ઉમેરી
import { User, Language } from './types';

const AppContent = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [introFade, setIntroFade] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Intro animation duration
    const timer = setTimeout(() => {
      setIntroFade(true);
      setTimeout(() => {
        setShowIntro(false);
        
        // Logical Redirect after intro
        const params = new URLSearchParams(location.search);
        const ref = params.get('ref');
        
        if (ref) {
          navigate('/register' + location.search);
        } else if (location.pathname === '/') {
          navigate('/');
        }
      }, 800); 
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showIntro && (
        <div className={`transition-opacity duration-700 ${introFade ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <Intro />
        </div>
      )}
      
      <div className={showIntro ? 'hidden' : 'block'}>
        <Routes>
          <Route path="/" element={
            <>
              <LandingPage language={language} setLanguage={setLanguage} />
              {/* લેન્ડિંગ પેજની નીચે રેટિંગ બતાવશે */}
              <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
                <Rating />
              </div>
            </>
          } />
          <Route path="/login" element={<Auth mode="login" language={language} setLanguage={setLanguage} onAuth={setUser} />} />
          <Route path="/register" element={<Auth mode="register" language={language} setLanguage={setLanguage} onAuth={setUser} />} />
          <Route path="/dashboard/*" element={user ? <Dashboard user={user} setUser={setUser} language={language} setLanguage={setLanguage} /> : <Auth mode="login" language={language} setLanguage={setLanguage} onAuth={setUser} />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => (
  <HashRouter>
    <AppContent />
  </HashRouter>
);

export default App;
