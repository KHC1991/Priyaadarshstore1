
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ArrowRight, 
  Star, 
  ShoppingCart, 
  ShieldCheck, 
  BadgeInfo, 
  Share2, 
  BadgePercent, 
  Building2, 
  CreditCard, 
  Landmark, 
  Wallet,
  Smartphone,
  Monitor,
  ShoppingBag,
  Footprints,
  Sparkles,
  HeartPulse,
  Home,
  Package,
  HandCoins,
  LineChart
} from 'lucide-react';

const CategoryView: React.FC = () => {
  const { type, catId } = useParams();
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState('All');

  // Map category IDs to icons for the centered header
  const getCategoryIcon = (id: string) => {
    switch(id) {
      case 'mobiles': return <Smartphone size={24} />;
      case 'electronics': return <Monitor size={24} />;
      case 'clothes': return <ShoppingBag size={24} />;
      case 'footwear': return <Footprints size={24} />;
      case 'beauty': return <Sparkles size={24} />;
      case 'health': return <HeartPulse size={24} />;
      case 'home-decor': return <Home size={24} />;
      case 'grocery': return <Package size={24} />;
      case 'savings': return <Building2 size={24} />;
      case 'credit-card': return <CreditCard size={24} />;
      case 'loan': return <HandCoins size={24} />;
      case 'demat': return <LineChart size={24} />;
      case 'insurance': return <ShieldCheck size={24} />;
      default: return <BadgeInfo size={24} />;
    }
  };

  // Specific Data for Finance
  const financeData: Record<string, any[]> = {
    'savings': [
      { id: 'f1', name: 'AU Zero Balance Account', brand: 'AU Bank', reward: 'Earn ₹350', rating: 4.9, img: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=400', desc: 'Zero maintenance fee. High interest rate.' },
      { id: 'f2', name: 'Kotak 811 Savings', brand: 'Kotak Bank', reward: 'Earn ₹250', rating: 4.7, img: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400', desc: 'Instant account opening with Video KYC.' },
      { id: 'f3', name: 'HDFC Digi Account', brand: 'HDFC Bank', reward: 'Earn ₹300', rating: 4.8, img: 'https://images.unsplash.com/photo-1541354453488-828e127d451b?w=400', desc: 'Premium banking with lifestyle benefits.' }
    ],
    'credit-card': [
      { id: 'c1', name: 'SBI SimplyClick', brand: 'SBI Card', reward: 'Earn ₹500', rating: 4.8, img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400', desc: 'Best for online shopping rewards.' },
      { id: 'c2', name: 'IDFC First Millennia', brand: 'IDFC Bank', reward: 'Earn ₹400', rating: 4.6, img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400', desc: 'Lifetime free credit card.' },
    ],
    'insurance': [
      { id: 'i1', name: 'Health Insurance', brand: 'HDFC Ergo', reward: 'Earn 10% Comm.', rating: 4.9, img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400', desc: 'Cashless treatment in 10,000+ hospitals.' },
    ]
  };

  const storeBrands: Record<string, string[]> = {
    'mobiles': ['All', 'Apple', 'Samsung', 'Vivo', 'Oppo', 'Realme'],
    'electronics': ['All', 'Sony', 'Dell', 'LG', 'JBL'],
  };

  const currentBrands = storeBrands[catId || ''] || ['All'];
  const isFinance = type === 'finance';
  const products = isFinance ? (financeData[catId || ''] || []) : [
    { id: 1, name: 'Premium Smartphone X', brand: 'Samsung', price: '₹14,999', rating: 4.5, img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400' },
    { id: 2, name: 'Latest Flagship Phone', brand: 'Apple', price: '₹79,999', rating: 4.9, img: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba3f21?w=400' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Centered Clean Header - Fully Replaces Dashboard Header */}
      <div className="bg-white p-4 pt-8 pb-8 border-b border-gray-100 flex items-center justify-between sticky top-0 z-[1002] shadow-sm">
        <button 
          onClick={() => navigate(-1)} 
          className="p-3 bg-gray-50 rounded-2xl text-gray-400 active:scale-90 transition-all hover:bg-blue-50 hover:text-blue-600"
        >
           <ChevronLeft size={24} />
        </button>
        
        <div className="flex flex-col items-center gap-1">
            <div className={`p-3 rounded-2xl mb-1 ${isFinance ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                {getCategoryIcon(catId || '')}
            </div>
            <h2 className="text-xs font-black text-gray-800 uppercase tracking-[0.2em] text-center">
              {catId?.replace('-', ' ')}
            </h2>
        </div>

        {/* Empty spacer for centering balance */}
        <div className="w-12"></div>
      </div>

      {!isFinance && currentBrands.length > 1 && (
        <div className="flex gap-3 overflow-x-auto p-4 no-scrollbar bg-white shadow-sm mb-4">
            {currentBrands.map(brand => (
            <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                selectedBrand === brand 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                    : 'bg-gray-50 text-gray-400 border border-gray-100'
                }`}
            >
                {brand}
            </button>
            ))}
        </div>
      )}

      {/* Product List Below centered header */}
      <div className="p-4 space-y-4">
        {products.length > 0 ? products.map(p => (
          <div key={p.id} className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100 flex flex-col gap-4 animate-fadeIn">
             <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-50 rounded-3xl overflow-hidden flex-shrink-0 border border-gray-50">
                    <img src={p.img} className="w-full h-full object-cover" alt={p.name} />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                    <div className="flex justify-between items-start">
                        <p className={`text-[8px] font-black uppercase tracking-widest mb-1 ${isFinance ? 'text-emerald-600' : 'text-blue-500'}`}>{p.brand}</p>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-50 px-2 rounded-full">
                            <Star size={10} fill="currentColor" /> {p.rating}
                        </div>
                    </div>
                    <h3 className="text-xs font-black text-gray-800 uppercase leading-tight">{p.name}</h3>
                    {isFinance && <p className="text-[10px] text-gray-400 mt-2 font-medium leading-tight line-clamp-2">{p.desc}</p>}
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                    <p className="text-sm font-black text-gray-900">{isFinance ? p.reward : p.price}</p>
                    </div>
                </div>
             </div>
             
             <div className="flex gap-3 pt-2">
                <button className="flex-1 bg-gray-50 text-gray-400 py-3.5 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">
                    <Share2 size={16} /> Share
                </button>
                <button className={`flex-[2] py-3.5 rounded-2xl text-white flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all ${isFinance ? 'bg-emerald-600 shadow-emerald-50' : 'bg-orange-500 shadow-orange-50'}`}>
                    {isFinance ? <Landmark size={16} /> : <ShoppingCart size={16} />} 
                    {isFinance ? 'Apply Now' : 'Buy Now'}
                </button>
             </div>
          </div>
        )) : (
          <div className="py-20 text-center opacity-30">
            <BadgePercent size={48} className="mx-auto mb-2 text-gray-400" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">More Products Coming Soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryView;
