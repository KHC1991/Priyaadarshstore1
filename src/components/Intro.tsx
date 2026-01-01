
import React from 'react';

const Intro: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#00008B] flex flex-col items-center justify-center z-[10000] overflow-hidden">
      {/* Animated Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#ADD8E6] opacity-10 blur-[150px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#ADD8E6] opacity-10 blur-[150px] rounded-full animate-pulse delay-700"></div>
      
      <div className="relative flex flex-col items-center z-10">
        {/* Main Brand Text with Split Animation */}
        <div className="flex flex-col items-center overflow-hidden">
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white animate-intro-text drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                PRIYAADARSH
            </h1>
            <h2 className="text-3xl md:text-5xl font-black tracking-[0.5em] text-[#ADD8E6] mt-2 animate-slide-up opacity-0">
                STORE
            </h2>
        </div>
        
        {/* Tagline */}
        <p className="text-white/40 text-[10px] md:text-xs font-bold tracking-[0.8em] uppercase mt-10 animate-fade-in opacity-0">
            Premium Financial Services
        </p>

        {/* Dynamic Progress Bar */}
        <div className="mt-16 w-64 md:w-80 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5 relative">
          <div className="absolute top-0 left-0 h-full bg-[#ADD8E6] w-full animate-loading-bar origin-left shadow-[0_0_15px_#ADD8E6]"></div>
        </div>
        
        <div className="mt-6 flex items-center gap-2 text-white/20 text-[8px] font-black uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-[#ADD8E6] rounded-full animate-ping"></span>
            Encrypted Connection Established
        </div>
      </div>

      <style>{`
        @keyframes intro-text {
          0% { transform: scale(0.8) translateY(40px); opacity: 0; filter: blur(20px); }
          100% { transform: scale(1); translateY(0); opacity: 1; filter: blur(0px); }
        }
        @keyframes slide-up {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes loading-bar {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .animate-intro-text {
          animation: intro-text 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-up {
          animation: slide-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
        }
        .animate-fade-in {
          animation: fade-in 1s ease 1.2s forwards;
        }
        .animate-loading-bar {
          animation: loading-bar 3.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Intro;
