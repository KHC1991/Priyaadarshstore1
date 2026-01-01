
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Language } from '../types';
import { Youtube, RotateCw, ChevronRight, Trophy, PlayCircle, CheckSquare } from 'lucide-react';

interface Props {
  user: User;
  language: Language;
}

const TaskContent: React.FC<Props> = ({ user, language }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 pt-8 space-y-8 pb-32 animate-fadeIn">
      {/* Integrated Header */}
      <div className="flex justify-between items-center px-2">
         <div className="flex flex-col">
            <span className="text-[10px] font-black text-amber-600 tracking-[0.25em] uppercase leading-none mb-1">{user.id}</span>
            <h1 className="text-xl font-black text-gray-800 uppercase tracking-tight leading-none mt-1">Earning Tasks</h1>
         </div>
         <div className="flex items-center gap-2">
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-2xl shadow-sm border border-amber-100">
               <CheckSquare size={20} />
            </div>
         </div>
      </div>

      {/* Task Welcome Card */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-8 rounded-[3rem] text-white shadow-xl shadow-amber-100 relative overflow-hidden group">
        <div className="absolute -right-6 -bottom-6 opacity-20 rotate-12 group-hover:scale-110 transition-transform duration-700">
            <Trophy size={160} />
        </div>
        <div className="relative z-10">
            <h2 className="text-2xl font-black uppercase tracking-tight leading-none">Daily Rewards</h2>
            <p className="text-[10px] font-bold text-amber-100 uppercase tracking-widest mt-2">Complete simple tasks & get paid</p>
            <div className="mt-8 flex items-center gap-3 bg-white/20 w-max px-5 py-2.5 rounded-full backdrop-blur-md border border-white/30">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest">11 Tasks Live Now</span>
            </div>
        </div>
      </div>

      {/* Hub Options */}
      <div className="grid grid-cols-1 gap-4">
        {/* Lucky Spin Hub */}
        <div 
          onClick={() => navigate('/dashboard/lucky-spin')}
          className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group active:scale-95 transition-all cursor-pointer hover:shadow-lg"
        >
            <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[1.5rem] flex items-center justify-center shadow-inner group-hover:rotate-180 transition-transform duration-1000">
                    <RotateCw size={32} />
                </div>
                <div>
                    <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Lucky Spin</h3>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Test Your Luck Every Day</p>
                </div>
            </div>
            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                <ChevronRight size={20} />
            </div>
        </div>

        {/* YouTube Tasks Hub */}
        <div 
          onClick={() => navigate('/dashboard/youtube-tasks')}
          className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group active:scale-95 transition-all cursor-pointer hover:shadow-lg"
        >
            <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-[1.5rem] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    <Youtube size={32} />
                </div>
                <div>
                    <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Video Tasks</h3>
                    <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Watch & Earn 2000 Coins</p>
                </div>
            </div>
            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 group-hover:text-red-600 group-hover:bg-red-50 transition-colors">
                <ChevronRight size={20} />
            </div>
        </div>
      </div>

      {/* Rewards Info Section */}
      <div className="bg-white p-8 rounded-[3rem] border-2 border-dashed border-amber-100 relative overflow-hidden">
         <div className="absolute top-[-20px] left-[-20px] w-24 h-24 bg-amber-50 rounded-full opacity-50 blur-2xl"></div>
         <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.3em] mb-6 text-center">Reward Guidelines</h4>
         <div className="space-y-5">
            <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex flex-shrink-0 items-center justify-center text-xs font-black shadow-sm">01</div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tight leading-relaxed">Watch each video for full 120 seconds to unlock the rewards.</p>
            </div>
            <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex flex-shrink-0 items-center justify-center text-xs font-black shadow-sm">02</div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tight leading-relaxed">Daily 10 Free Spins are reset at midnight for all active members.</p>
            </div>
            <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex flex-shrink-0 items-center justify-center text-xs font-black shadow-sm">03</div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tight leading-relaxed">Reward coins are credited instantly to your Coin Wallet for redemption.</p>
            </div>
         </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default TaskContent;
