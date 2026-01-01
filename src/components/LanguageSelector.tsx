
import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { Language } from '../types';

interface Props {
  language: Language;
  setLanguage: (lang: Language) => void;
  dark?: boolean;
}

const LanguageSelector: React.FC<Props> = ({ language, setLanguage, dark = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages: { id: Language; label: string }[] = [
    { id: 'en', label: 'English' },
    { id: 'hi', label: 'Hindi' },
    { id: 'gu', label: 'Gujarati' }
  ];

  return (
    <div className="relative z-[100]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-xs font-bold ${
          dark 
            ? 'bg-blue-900/40 border-white/10 text-white hover:bg-blue-800' 
            : 'bg-white border-gray-100 text-gray-700 shadow-sm hover:shadow-md'
        }`}
      >
        <Globe size={14} className={dark ? 'text-priya-light' : 'text-blue-600'} />
        {languages.find(l => l.id === language)?.label}
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-50 rounded-xl shadow-xl overflow-hidden animate-fadeIn ring-1 ring-black/5">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => {
                setLanguage(lang.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-xs font-bold transition-colors ${
                language === lang.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
