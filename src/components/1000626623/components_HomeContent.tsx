
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { 
  IndianRupee, 
  Coins, 
  ChevronRight, 
  Smartphone, 
  Monitor, 
  ShoppingBag, 
  Footprints, 
  Sparkles, 
  HeartPulse, 
  LayoutGrid,
  Package,
  ShoppingCart,
  Briefcase,
  ArrowRight,
  BookOpen,
  Building2,
  CreditCard,
  HandCoins,
  LineChart,
  ShieldCheck,
  Star,
  Home,
  BadgeCheck
} from 'lucide-react';

interface Props {
  user: User;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const HomeContent: React.FC<Props> = ({ user, language, setLanguage }) => {
  const navigate = useNavigate();
  const t = TRANSLATIONS[language] as any;

  const storeCategories = [
    { id: 'mobiles', name: 'MOBILES', icon: <Smartphone size={24} />, color: 'text-blue-600', bg: 'bg-blue-100/50' },
    { id: 'electronics', name: 'ELECTRONICS', icon: <Monitor size={24} />, color: 'text-indigo-600', bg: 'bg-indigo-100/50' },
    { id: 'clothes', name: 'CLOTHES', icon: <ShoppingBag size={24} />, color: 'text-pink-600', bg: 'bg-pink-100/50' },
    { id: 'footwear', name: 'FOOTWEAR', icon: <Footprints size={24} />, color: 'text-orange-600', bg: 'bg-orange-100/50' },
    { id: 'beauty', name: 'BEAUTY', icon: <Sparkles size={24} />, color: 'text-rose-600', bg: 'bg-rose-100/50' },
    { id: 'health', name: 'HEALTH', icon: <HeartPulse size={24} />, color: 'text-red-600', bg: 'bg-red-100/50' },
    { id: 'home-decor', name: 'APPLIANCES', icon: <Home size={24} />, color: 'text-amber-600', bg: 'bg-amber-100/50' },
    { id: 'grocery', name: 'GROCERY', icon: <Package size={24} />, color: 'text-emerald-600', bg: 'bg-emerald-100/50' },
  ];

  const storeProducts = [
    { id: 'sp1', name: 'Premium Smartwatch Z', brand: 'Apple', price: '₹4,999', img: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=300', cat: 'electronics' },
    { id: 'sp2', name: 'Flagship Smartphone X', brand: 'Samsung', price: '₹14,499', img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300', cat: 'mobiles' },
  ];

  const financeCategories = [
    { id: 'savings', name: 'SAVINGS', icon: <Building2 size={24} />, color: 'text-emerald-600', bg: 'bg-emerald-100/50' },
    { id: 'credit-card', name: 'CREDIT CARD', icon: <CreditCard size={24} />, color: 'text-blue-600', bg: 'bg-blue-100/50' },
    { id: 'loan', name: 'LOANS', icon: <HandCoins size={24} />, color: 'text-purple-600', bg: 'bg-purple-100/50' },
    { id: 'demat', name: 'DEMAT', icon: <LineChart size={24} />, color: 'text-orange-600', bg: 'bg-orange-100/50' },
    { id: 'insurance', name: 'INSURANCE', icon: <ShieldCheck size={24} />, color: 'text-rose-600', bg: 'bg-rose-100/50' },
  ];

  const financeProducts = [
    { id: 'fp1', name: 'AU Zero Balance Account', brand: 'AU Bank', reward: 'Earn ₹350', img: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=300', cat: 'savings' },
    { id: 'fp2', name: 'SBI SimplyClick Card', brand: 'SBI Card', reward: 'Earn ₹500', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300', cat: 'credit-card' },
  ];

  return (
    <div className="flex flex-col pt-8 space-y-8 pb-10 animate-fadeIn">
      {/* Integrated Page Header - Clean & Modern */}
      <div className="px-6 flex justify-between items-center">
         <div className="flex flex-col">
            <span className="text-[10px] font-black text-blue-600 tracking-[0.25em] uppercase leading-none mb-1">{user.id}</span>
            <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight leading-none">Welcome, {user.name.split(' ')[0]}</h2>
         </div>
         <div className="flex items-center gap-2">
            <h1 className="text-[10px] font-black italic text-[#00008B] tracking-tight">
               PRIYAADARSH <span className="text-blue-500 not-italic">STORE</span>
            </h1>
         </div>
      </div>

      {/* Wallets - Top Status Cards */}
      <div className="px-4 grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-[2.5rem] shadow-xl shadow-blue-100 text-white relative overflow-hidden group">
           <div className="absolute -top-2 -right-2 text-white/10 group-hover:scale-110 transition-transform"><IndianRupee size={80} /></div>
           <p className="text-[8px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Balance</p>
           <h3 className="text-2xl font-black">₹{user.balance.toLocaleString()}</h3>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-[2.5rem] shadow-xl shadow-amber-100 text-white relative overflow-hidden group">
           <div className="absolute -top-2 -right-2 text-white/10 group-hover:scale-110 transition-transform"><Coins size={80} /></div>
           <p className="text-[8px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Coins</p>
           <h3 className="text-2xl font-black">{user.coins.toLocaleString()}</h3>
        </div>
      </div>

      {/* 1. ADARSH STORE SECTION */}
      <div className="px-4">
        <div className="flex items-center gap-3 mb-4 ml-4">
           <div className="p-2.5 bg-blue-100 text-blue-600 rounded-2xl shadow-sm"><ShoppingBag size={22} /></div>
           <h2 className="text-lg font-black text-blue-900 uppercase tracking-tight">Adarsh Store</h2>
        </div>
        
        <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100 space-y-10">
          <div className="grid grid-cols-4 gap-y-10 gap-x-2">
            {storeCategories.map((item) => (
              <div 
                key={item.id} 
                onClick={() => navigate(`/dashboard/category/store/${item.id}`)}
                className="flex flex-col items-center gap-3 group cursor-pointer"
              >
                <div className={`${item.bg} ${item.color} w-16 h-16 rounded-full flex items-center justify-center shadow-sm border-2 border-white group-active:scale-90 transition-all duration-300`}>
                  {item.icon}
                </div>
                <span className="text-[8px] font-black text-gray-400 text-center leading-tight uppercase tracking-[0.1em] group-hover:text-blue-900 transition-colors">{item.name}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-50">
             <div className="flex justify-between items-center px-2">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Featured Products</h3>
                <span className="text-[8px] font-bold text-blue-600 uppercase cursor-pointer" onClick={() => navigate('/dashboard/category/store/mobiles')}>View Store</span>
             </div>
             
             <div className="grid grid-cols-1 gap-4">
                {storeProducts.map((prod) => (
                  <div key={prod.id} className="bg-gray-50 p-4 rounded-3xl border border-gray-100 flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer group" onClick={() => navigate(`/dashboard/category/store/${prod.cat}`)}>
                    <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden shadow-inner flex-shrink-0">
                      <img src={prod.img} className="w-full h-full object-cover" alt={prod.name} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[8px] font-black text-blue-500 uppercase tracking-widest">{prod.brand}</p>
                      <h4 className="text-xs font-black text-gray-800 uppercase tracking-tight">{prod.name}</h4>
                      <p className="text-sm font-black text-blue-900 mt-1">{prod.price}</p>
                    </div>
                    <div className="bg-orange-500 text-white p-3 rounded-2xl shadow-lg shadow-orange-100">
                      <ShoppingCart size={18} />
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* 2. FINANCIAL PRODUCTS SECTION */}
      <div className="px-4">
        <div className="flex items-center gap-3 mb-4 ml-4">
           <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-2xl shadow-sm"><Briefcase size={22} /></div>
           <h2 className="text-lg font-black text-emerald-900 uppercase tracking-tight">Financial Products</h2>
        </div>
        
        <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-emerald-50 space-y-10">
          <div className="grid grid-cols-5 gap-2">
            {financeCategories.map((item) => (
              <div 
                key={item.id} 
                onClick={() => navigate(`/dashboard/category/finance/${item.id}`)}
                className="flex flex-col items-center gap-3 group cursor-pointer"
              >
                <div className={`${item.bg} ${item.color} w-14 h-14 rounded-full flex items-center justify-center shadow-sm border-2 border-white group-active:scale-90 transition-all duration-300`}>
                  {item.icon}
                </div>
                <span className="text-[7px] font-black text-gray-400 text-center leading-none uppercase tracking-tighter group-hover:text-emerald-600 transition-colors">{item.name}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-4 border-t border-emerald-50/50">
             <div className="flex justify-between items-center px-2">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Top Earnings for You</h3>
                <span className="text-[8px] font-bold text-emerald-600 uppercase cursor-pointer" onClick={() => navigate('/dashboard/category/finance/savings')}>View All</span>
             </div>
             
             <div className="grid grid-cols-1 gap-4">
                {financeProducts.map((prod) => (
                  <div key={prod.id} className="bg-emerald-50/30 p-4 rounded-3xl border border-emerald-50 flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer group" onClick={() => navigate(`/dashboard/category/finance/${prod.cat}`)}>
                    <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden shadow-inner flex-shrink-0 border border-emerald-50">
                      <img src={prod.img} className="w-full h-full object-cover opacity-80" alt={prod.name} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">{prod.brand}</p>
                      <h4 className="text-xs font-black text-gray-800 uppercase tracking-tight">{prod.name}</h4>
                      <p className="text-[10px] font-black text-emerald-700 mt-1">{prod.reward}</p>
                    </div>
                    <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-emerald-100">
                      Apply Now
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* 3. FINANCIAL ADVISOR BANNER */}
      <div className="px-4">
        <div 
          onClick={() => navigate('/dashboard/blogs')}
          className="bg-gradient-to-br from-[#00008B] to-blue-800 p-8 rounded-[2.5rem] shadow-xl shadow-blue-100 flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer relative overflow-hidden"
        >
          <div className="absolute -right-6 -bottom-6 text-white/5 rotate-12">
            <Briefcase size={140} />
          </div>

          <div className="z-10 flex items-center gap-6">
             <div className="p-4 bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/20">
                <Briefcase size={32} className="text-blue-100" />
             </div>
             <div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-none">Financial Advisor</h2>
                <p className="text-[10px] font-bold text-blue-200 uppercase tracking-[0.2em] mt-2">Expert Guidance & Insights</p>
             </div>
          </div>

          <div className="z-10 bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
             <ArrowRight size={24} className="text-[#00008B]" />
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

export default HomeContent;
