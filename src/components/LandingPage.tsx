
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';
import { Mail, Phone, MapPin, ShieldCheck, Landmark } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

interface Props {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LandingPage: React.FC<Props> = ({ language, setLanguage }) => {
  const navigate = useNavigate();
  const t = TRANSLATIONS[language] as any;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <nav className="bg-priya-dark p-4 text-white flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="text-2xl font-bold text-priya-light tracking-tighter">PRIYAADARSH</div>
        <div className="flex items-center gap-3">
          <LanguageSelector language={language} setLanguage={setLanguage} dark />
          <button onClick={() => navigate('/login')} className="bg-priya-light text-priya-dark px-4 py-1.5 rounded-lg font-bold text-xs hover:bg-white transition-all shadow-lg active:scale-95">
            {t.login}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-24 px-6 bg-gradient-to-b from-priya-dark via-priya-dark to-blue-900 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-48 h-48 bg-priya-light rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 uppercase tracking-tight">{t.welcome}</h1>
        <p className="text-lg text-priya-light max-w-2xl mx-auto font-medium leading-relaxed mb-10">{t.vision}</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate('/register')}
            className="bg-priya-light text-priya-dark px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white transition-all transform hover:scale-105 shadow-2xl active:scale-95 uppercase tracking-widest"
          >
            GET STARTED
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all active:scale-95 uppercase tracking-widest"
          >
            {t.login}
          </button>
        </div>
      </header>

      {/* Main Services Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="p-8 rounded-[2rem] border-2 border-slate-50 hover:border-priya-light bg-white hover:shadow-2xl transition-all group text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-priya-dark font-bold text-4xl group-hover:scale-110 transition-transform">🛒</div>
          <h3 className="text-xl font-bold mb-3 text-priya-dark uppercase tracking-tight">Adarsh Store</h3>
          <p className="text-sm text-gray-500 leading-relaxed">Premium mobiles, electronics, and fashion from top platforms with exclusive referral commissions.</p>
        </div>
        <div className="p-8 rounded-[2rem] border-2 border-slate-50 hover:border-priya-light bg-white hover:shadow-2xl transition-all group text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-priya-dark group-hover:scale-110 transition-transform">
            <Landmark size={40} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-priya-dark uppercase tracking-tight">Financial Hub</h3>
          <p className="text-sm text-gray-500 leading-relaxed">Earn high rewards by referring credit cards, demat accounts, and insurance to your network.</p>
        </div>
        <div className="p-8 rounded-[2rem] border-2 border-slate-50 hover:border-priya-light bg-white hover:shadow-2xl transition-all group text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-priya-dark font-bold text-4xl group-hover:scale-110 transition-transform">🐄</div>
          <h3 className="text-xl font-bold mb-3 text-priya-dark uppercase tracking-tight">Pashudhan Project</h3>
          <p className="text-sm text-gray-500 leading-relaxed">Ethical investments in dairy farming with secure monthly returns and long-term compound growth.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-priya-dark text-white pt-16 pb-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-priya-light tracking-tighter">PRIYAADARSH STORE</h2>
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/70">{t.supportHeading}</h3>
              <div className="flex items-center gap-3 text-priya-light">
                <div className="p-2 bg-white/10 rounded-lg"><Phone size={18} /></div>
                <div>
                  <p className="text-[9px] uppercase text-white/50 font-bold">{t.supportContact}</p>
                  <p className="font-bold text-sm">+91 81400 03126</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-priya-light">
                <div className="p-2 bg-white/10 rounded-lg"><Mail size={18} /></div>
                <div>
                  <p className="text-[9px] uppercase text-white/50 font-bold">Email</p>
                  <p className="font-bold text-sm truncate">support@pryaadarshstore.online</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold border-b border-white/10 pb-2 uppercase tracking-tight">{t.officeAddress}</h3>
            <div className="flex gap-4">
              <div className="p-2 bg-white/10 rounded-lg h-fit"><MapPin size={20} className="text-priya-light" /></div>
              <p className="text-white/80 leading-relaxed italic text-xs">
                Bedasma, Near Primary School,<br />
                Satlasna, Mehsana,<br />
                Gujarat - 384330
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold border-b border-white/10 pb-2 uppercase tracking-tight">{t.quickLinks}</h3>
            <ul className="space-y-3">
              <li><button className="text-white/70 hover:text-priya-light transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><span>→</span> {t.privacyPolicy}</button></li>
              <li><button className="text-white/70 hover:text-priya-light transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><span>→</span> {t.termsConditions}</button></li>
              <li><button className="text-white/70 hover:text-priya-light transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><span>→</span> {t.legalDisclaimer}</button></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-white/10 text-center text-[10px] text-white/30 uppercase font-bold tracking-[0.2em]">
          <p>© 2024 Priyaadarsh Store. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
