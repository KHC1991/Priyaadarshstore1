
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Coins, Trophy, History, Lock, IndianRupee, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { User } from '../types';

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const LuckySpinPage: React.FC<Props> = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [spinsLeft, setSpinsLeft] = useState(10);
  const [history, setHistory] = useState<{ id: number, res: string, coins: number, time: string }[]>([]);
  const [showResult, setShowResult] = useState<{ win: boolean, amount: number } | null>(null);

  const segments = [
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
    { label: '40', value: 40 },
    { label: '0', value: 0 }, 
    { label: '2', value: 2 },
    { label: '5', value: 5 },
    { label: '3', value: 3 },
    { label: '9', value: 9 },
    { label: '6', value: 6 },
  ];

  // Calculate session stats (Spent vs Won)
  const stats = useMemo(() => {
    const spent = history.length * 10;
    const won = history.reduce((acc, curr) => acc + curr.coins, 0);
    const net = won - spent;
    return { spent, won, net };
  }, [history]);

  // Persistent State: Load spins left from localStorage
  useEffect(() => {
    const today = new Date().toDateString();
    const savedData = localStorage.getItem('daily_spin_data');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed.date === today) {
        setSpinsLeft(parsed.count);
      } else {
        setSpinsLeft(10);
        localStorage.setItem('daily_spin_data', JSON.stringify({ date: today, count: 10 }));
      }
    }
  }, []);

  const spinWheel = () => {
    if (spinsLeft <= 0 || spinning) return;
    
    if (user.coins < 10) {
      alert("તમારી પાસે પૂરતા કોઈન નથી! એક સ્પિન માટે 10 કોઈન જરૂરી છે.");
      return;
    }

    setSpinning(true);
    setShowResult(null);
    
    // Deduct 10 coins immediately
    setUser(u => u ? ({ ...u, coins: u.coins - 10 }) : u);

    const segmentAngle = 360 / segments.length; // 36 degrees
    const randomSegmentIndex = Math.floor(Math.random() * segments.length);
    
    // Calculate new rotation to land exactly in the MIDDLE of the segment
    const extraRounds = 12 + Math.floor(Math.random() * 5); 
    const targetAngle = (randomSegmentIndex * segmentAngle) + (segmentAngle / 2);
    const finalRotation = wheelRotation + (360 * extraRounds) + (360 - (wheelRotation % 360)) + targetAngle;
    
    setWheelRotation(finalRotation);

    const newCount = spinsLeft - 1;
    setSpinsLeft(newCount);
    localStorage.setItem('daily_spin_data', JSON.stringify({ date: new Date().toDateString(), count: newCount }));

    setTimeout(() => {
      setSpinning(false);
      const wonAmount = segments[randomSegmentIndex].value;
      
      if (wonAmount > 0) {
        setUser(u => u ? ({ ...u, coins: u.coins + wonAmount }) : u);
        setShowResult({ win: true, amount: wonAmount });
      } else {
        setShowResult({ win: false, amount: 0 });
      }

      const now = new Date();
      const timeStr = now.toLocaleTimeString();
      setHistory(prev => [{
        id: Date.now(),
        res: wonAmount > 0 ? 'WINNER' : 'ZERO',
        coins: wonAmount,
        time: timeStr
      }, ...prev].slice(0, 10));

    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 relative overflow-x-hidden">
      {/* Header with Wallets */}
      <div className="p-4 pt-8 sticky top-0 z-[100] bg-[#F8FAFC]/90 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between mb-4 px-2">
            <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-2xl shadow-sm text-gray-400 active:scale-90 transition-all border border-gray-50">
            <ChevronLeft size={24} />
            </button>
            <h2 className="text-sm font-black text-blue-900 uppercase tracking-[0.2em]">Lucky Spin</h2>
            <div className="w-12"></div>
        </div>
        
        <div className="flex gap-2">
            <div className="flex-1 bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                    <IndianRupee size={14} />
                </div>
                <div className="text-right">
                    <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest">Balance</p>
                    <p className="text-xs font-black text-gray-800">₹{user.balance}</p>
                </div>
            </div>
            <div className="flex-1 bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div className="p-1.5 bg-amber-50 text-amber-500 rounded-lg">
                    <Coins size={14} />
                </div>
                <div className="text-right">
                    <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest">Coins</p>
                    <p className="text-xs font-black text-amber-600">{user.coins}</p>
                </div>
            </div>
        </div>
      </div>

      <div className="p-6 flex flex-col items-center">
        
        {/* Daily Stats Summary */}
        <div className="w-full bg-white rounded-[2rem] p-4 shadow-sm border border-gray-50 flex items-center justify-around mb-8">
            <div className="text-center">
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Spent</p>
                <p className="text-sm font-black text-gray-800">{stats.spent}</p>
            </div>
            <div className="h-8 w-[1px] bg-gray-100"></div>
            <div className="text-center">
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Won</p>
                <p className="text-sm font-black text-emerald-600">{stats.won}</p>
            </div>
            <div className="h-8 w-[1px] bg-gray-100"></div>
            <div className="text-center">
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Profit/Loss</p>
                <div className={`flex items-center gap-1 font-black text-sm ${stats.net >= 0 ? 'text-blue-600' : 'text-red-500'}`}>
                    {stats.net >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {stats.net > 0 ? `+${stats.net}` : stats.net}
                </div>
            </div>
        </div>

        {/* Spin Wheel Container */}
        <div className="relative mt-8 mb-20 w-80 h-80 flex items-center justify-center">
          
          {/* IMPROVED POINTER: Long, thin, and pointing to segment center */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-[50] flex flex-col items-center">
            {/* The Pointer Base (Black Dot at the back top) */}
            <div className="w-8 h-8 bg-gray-900 rounded-full border-4 border-white shadow-md relative z-10"></div>
            {/* The Long Thin Needle */}
            <div className="w-1.5 h-20 bg-gradient-to-b from-yellow-400 to-orange-600 rounded-full shadow-lg -mt-3 relative">
                {/* Sharp Tip */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[12px] border-t-orange-600"></div>
            </div>
          </div>

          {/* Outer Ring */}
          <div className="absolute inset-[-15px] border-[12px] border-gray-800 rounded-full shadow-2xl z-[5]"></div>

          {/* Spinning Wheel */}
          <div 
            className="w-full h-full rounded-full border-8 border-gray-800 shadow-[0_0_60px_rgba(0,0,0,0.15)] relative overflow-hidden transition-transform duration-[3s] cubic-bezier(0.1, 0, 0, 1) z-10"
            style={{ 
                transform: `rotate(${-wheelRotation}deg)`,
                background: 'conic-gradient(#4CAF50 0deg 36deg, #FF9800 36deg 72deg, #9C27B0 72deg 108deg, #FFEB3B 108deg 144deg, #F44336 144deg 180deg, #FFC107 180deg 216deg, #2196F3 216deg 252deg, #E91E63 252deg 288deg, #00BCD4 288deg 324deg, #673AB7 324deg 360deg)'
            }}
          >
            {segments.map((seg, i) => (
              <div 
                key={i} 
                className="absolute top-0 left-1/2 -translate-x-1/2 h-1/2 flex flex-col items-center pt-8 origin-bottom"
                style={{ transform: `rotate(${i * 36 + 18}deg)` }}
              >
                <span className={`text-white font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-tighter uppercase text-[24px]`}>
                   {seg.label}
                </span>
              </div>
            ))}
            
            {/* Center Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-600 rounded-full border-4 border-white shadow-xl z-[20]">
                <div className="absolute inset-1 rounded-full border-2 border-white/20 animate-ping"></div>
            </div>
          </div>
        </div>

        {/* Result & Spin Button Card */}
        <div className="bg-white w-full rounded-[3rem] p-8 shadow-xl shadow-blue-100/50 border border-white flex flex-col items-center gap-6 relative">
          
          {showResult ? (
            <div className="animate-bounce flex flex-col items-center text-center">
               <div className="p-4 bg-amber-50 text-amber-500 rounded-full mb-3">
                  <Trophy size={48} />
               </div>
               <h3 className={`text-3xl font-black uppercase tracking-tight ${showResult.win ? 'text-blue-900' : 'text-red-500'}`}>
                  {showResult.win ? `WIN +${showResult.amount}` : 'ZERO WON'}
               </h3>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
                 {showResult.win ? 'Coins added to wallet' : 'Better luck next time'}
               </p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Available Spins Today</p>
               <h3 className="text-4xl font-black text-blue-900">{spinsLeft}</h3>
               <div className="mt-4 flex items-center gap-2 bg-blue-50 px-4 py-1.5 rounded-full">
                  <Coins size={14} className="text-blue-600" />
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">10 Coins / Spin</span>
               </div>
            </div>
          )}

          {spinsLeft > 0 ? (
            <button 
                onClick={spinWheel}
                disabled={spinning}
                className={`w-full py-5 rounded-[2rem] font-black uppercase tracking-[0.3em] text-white shadow-xl transition-all active:scale-95 ${
                spinning 
                ? 'bg-gray-300 shadow-none' 
                : 'bg-gradient-to-r from-blue-700 to-blue-500 shadow-blue-200'
                }`}
            >
                {spinning ? 'Spinning...' : 'Spin Now'}
            </button>
          ) : (
            <div className="w-full bg-gray-50 border-2 border-dashed border-gray-200 py-6 rounded-[2rem] flex flex-col items-center gap-2">
                <div className="p-3 bg-white rounded-full text-gray-300 shadow-sm">
                   <Lock size={24} />
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Daily Limit Reached</p>
                <p className="text-[8px] font-bold text-gray-300 uppercase tracking-[0.2em]">Try again tomorrow</p>
            </div>
          )}
        </div>

        {/* History */}
        <div className="w-full mt-10 space-y-6">
           <div className="flex items-center gap-3 px-4">
              <History size={18} className="text-gray-400" />
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Spin History</h3>
           </div>

           <div className="space-y-3">
             {history.length > 0 ? history.map(h => (
               <div key={h.id} className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between animate-fadeIn">
                  <div className="flex items-center gap-4">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[8px] font-black ${h.coins > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                        {h.coins > 0 ? 'WIN' : 'ZERO'}
                     </div>
                     <div>
                        <h4 className="text-[10px] font-black text-gray-800 uppercase tracking-tight">{h.res}</h4>
                        <p className="text-[8px] font-bold text-gray-300 italic">{h.time}</p>
                     </div>
                  </div>
                  <div className={`text-lg font-black ${h.coins > 0 ? 'text-emerald-500' : 'text-gray-400'}`}>
                    {h.coins > 0 ? `+${h.coins}` : '0'}
                  </div>
               </div>
             )) : (
                <div className="py-10 text-center opacity-20 italic text-xs uppercase tracking-widest font-black">
                   No spins recorded
                </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default LuckySpinPage;
