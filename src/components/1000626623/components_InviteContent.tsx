
import React, { useState } from 'react';
import { User, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { 
  Share2, 
  Copy, 
  Users, 
  Trophy, 
  TrendingUp, 
  Coins, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  UserPlus,
  ArrowRightLeft,
  Briefcase,
  BadgeCheck,
  ShieldCheck,
  Zap,
  Info,
  Gift,
  MousePointer2,
  Wallet
} from 'lucide-react';

interface Props {
  user: User;
  language: Language;
}

const InviteContent: React.FC<Props> = ({ user, language }) => {
  const [activeTab, setActiveTab] = useState<'invite' | 'network'>('invite');
  const t = TRANSLATIONS[language] as any;
  const refLink = `https://priyaadarsh.store/#/register?ref=${user.id}`;
  
  // Mock Referral History
  const [referralHistory] = useState([
    { id: 'PRIYA992831', name: 'Rakesh Kumar', date: 'Today, 11:20 AM', reward: '+1000 Coins', status: 'Active' },
    { id: 'PRIYA445102', name: 'Sanjay Patel', date: 'Yesterday', reward: '+3000 Coins', status: 'Applied Finance' },
    { id: 'PRIYA102933', name: 'Mahesh Solanki', date: '22 Oct', reward: '+1000 Coins', status: 'Verified' }
  ]);

  const copyToClipboard = (text: string, msg: string) => {
    navigator.clipboard.writeText(text);
    alert(msg);
  };

  const shareMessage = async () => {
    // Attractive Hindi viral message with emojis
    const attractiveHindiMsg = `
*धमाकेदार कमाई का मौका!* 💸🚀

नमस्ते! 👋 क्या आप अपने मोबाइल से रोज़ाना *₹500 से ₹2000* कमाना चाहते हैं? 🤑

*Priyaadarsh Store* के साथ जुड़िये और घर बैठे पैसे कमाइए! 🏠💰

*पैसे कमाने के 3 आसान स्टेप्स:* 👇
1️⃣ मेरे लिंक से रजिस्टर करें और तुरंत *₹10 (1000 Coins)* बोनस पाएं! 🎁
2️⃣ स्टोर से पहली बार शॉपिंग करें और पाएं *₹20* एक्स्ट्रा! 🛒✨
3️⃣ बैंक अकाउंट या कार्ड अप्लाई करें और पाएं *₹20* और! 💳💰

*सिर्फ इतना ही नहीं!* आपकी टीम जब भी काम करेगी, आपको *Life-time Commission* मिलता रहेगा! 📈🤝

आज ही शुरू करें! क्लिक करें यहाँ: 👇
🔗 ${refLink}

मेरा रेफरल कोड: *${user.id}* 🔑

*जल्दी करें, यह ऑफर सीमित समय के लिए है!* 🏃‍♂️💨`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Priyaadarsh Store - Earn Money Online',
          text: attractiveHindiMsg,
        });
      } catch (err) {
        copyToClipboard(attractiveHindiMsg, "Message Copied to Clipboard!");
      }
    } else {
      copyToClipboard(attractiveHindiMsg, "Message Copied to Clipboard!");
    }
  };

  const earningSteps = [
    { 
      step: '01',
      title: 'Instant Sign-up Bonus', 
      desc: 'Share link. When friend joins using your ID, you get 1000 Coins (₹10) instantly in your wallet. 🎁', 
      icon: <UserPlus className="text-pink-600" size={24} />,
      amount: '₹10'
    },
    { 
      step: '02',
      title: 'First Order Activation', 
      desc: 'When your friend completes their first store shopping, you get 2000 Coins (₹20) bonus. 🛒', 
      icon: <Zap className="text-amber-500" size={24} />,
      amount: '₹20'
    },
    { 
      step: '03',
      title: 'Finance Product Reward', 
      desc: 'When they successfully apply for any Financial Product, you get another 2000 Coins (₹20). 💳', 
      icon: <BadgeCheck className="text-blue-600" size={24} />,
      amount: '₹20'
    }
  ];

  return (
    <div className="p-4 pt-8 space-y-8 pb-32 animate-fadeIn">
      {/* Page Header */}
      <div className="flex justify-between items-center px-2">
         <div className="flex flex-col">
            <span className="text-[10px] font-black text-pink-600 tracking-[0.2em] uppercase">{user.id}</span>
            <h1 className="text-xl font-black text-gray-800 uppercase tracking-tight leading-none mt-1">Invite & Earn</h1>
         </div>
         <div className="flex items-center gap-2">
            <div className="p-2.5 bg-pink-50 text-pink-600 rounded-2xl shadow-sm border border-pink-100">
               <Share2 size={20} />
            </div>
         </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-100 p-1.5 rounded-[1.5rem] flex gap-1">
         <button 
           onClick={() => setActiveTab('invite')}
           className={`flex-1 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'invite' ? 'bg-white text-pink-600 shadow-lg shadow-pink-100/50' : 'text-gray-400'}`}
         >
            Invite Friends
         </button>
         <button 
           onClick={() => setActiveTab('network')}
           className={`flex-1 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'network' ? 'bg-white text-pink-600 shadow-lg shadow-pink-100/50' : 'text-gray-400'}`}
         >
            My Network
         </button>
      </div>

      {activeTab === 'invite' ? (
        <div className="space-y-8">
           {/* Referral Tools Card */}
           <div className="bg-white p-8 rounded-[3.5rem] shadow-sm border border-gray-100 flex flex-col items-center gap-8 relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 text-pink-50 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                 <Gift size={200} />
              </div>
              
              <div className="text-center z-10 space-y-1">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Your Unique Link & Code</p>
                 <h2 className="text-4xl font-black text-blue-900 tracking-[0.2em]">{user.id}</h2>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full z-10">
                 <button 
                   onClick={() => copyToClipboard(user.id, "Invite Code Copied! 🔑")}
                   className="flex flex-col items-center gap-2 bg-blue-50/50 p-5 rounded-[2rem] border border-blue-100 active:scale-95 transition-all group/btn"
                 >
                    <div className="p-3 bg-white rounded-2xl text-blue-600 shadow-sm group-hover/btn:scale-110 transition-transform">
                       <Copy size={18} />
                    </div>
                    <span className="text-[9px] font-black text-blue-900 uppercase tracking-widest">Copy Code</span>
                 </button>
                 <button 
                   onClick={() => copyToClipboard(refLink, "Referral Link Copied! 🔗")}
                   className="flex flex-col items-center gap-2 bg-emerald-50/50 p-5 rounded-[2rem] border border-emerald-100 active:scale-95 transition-all group/btn"
                 >
                    <div className="p-3 bg-white rounded-2xl text-emerald-600 shadow-sm group-hover/btn:scale-110 transition-transform">
                       <MousePointer2 size={18} />
                    </div>
                    <span className="text-[9px] font-black text-emerald-900 uppercase tracking-widest">Copy Link</span>
                 </button>
              </div>

              <button 
                onClick={shareMessage}
                className="w-full bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-4 shadow-2xl shadow-pink-200 active:scale-[0.97] transition-all z-10"
              >
                 <Share2 size={24} /> Share Attractive Link
              </button>
           </div>

           {/* 1-2-3 Earning Guide */}
           <div className="space-y-6">
              <div className="flex items-center gap-3 px-2">
                 <div className="w-10 h-10 bg-pink-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-pink-100">
                    <TrendingUp size={20} />
                 </div>
                 <h3 className="text-[11px] font-black text-gray-800 uppercase tracking-widest">Step-by-Step Earnings</h3>
              </div>

              <div className="space-y-4">
                 {earningSteps.map((item, idx) => (
                   <div key={idx} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-5 relative overflow-hidden group">
                      <div className="absolute -left-2 top-0 h-full w-1.5 bg-pink-600 opacity-20"></div>
                      <div className="flex-shrink-0 w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                         {item.icon}
                      </div>
                      <div className="flex-1 space-y-1">
                         <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black text-pink-600 uppercase tracking-widest">Step {item.step}</span>
                            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">+{item.amount}</span>
                         </div>
                         <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-tight">{item.title}</h4>
                         <p className="text-[9px] font-bold text-gray-400 leading-relaxed uppercase tracking-tighter italic">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Profit Distribution Rules */}
           <div className="bg-blue-900 p-8 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute right-[-20px] top-[-20px] opacity-10 rotate-12">
                 <Briefcase size={160} />
              </div>
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                 <ShieldCheck className="text-blue-300" size={24} />
                 <h3 className="text-xs font-black uppercase tracking-[0.2em]">Profit Sharing System</h3>
              </div>
              <div className="space-y-5">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Upline Earnings</span>
                    <span className="text-lg font-black text-emerald-400">₹50.00</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">User Earnings</span>
                    <span className="text-lg font-black text-blue-300">₹250.00</span>
                 </div>
                 <div className="bg-white/5 p-5 rounded-3xl border border-white/10 mt-4">
                    <p className="text-[9px] font-bold text-blue-100 leading-relaxed italic uppercase tracking-widest text-center">
                      "When your downline sells or buys any financial product, the profit is divided fairly between you, the user, and the store."
                    </p>
                 </div>
              </div>
           </div>
        </div>
      ) : (
        <div className="space-y-6">
           {/* Network Dashboard */}
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-blue-50 p-6 rounded-[2.5rem] text-center shadow-sm">
                 <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Users size={20} />
                 </div>
                 <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Active Team</p>
                 <h4 className="text-2xl font-black text-blue-900">48</h4>
              </div>
              <div className="bg-white border border-emerald-50 p-6 rounded-[2.5rem] text-center shadow-sm">
                 <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Wallet size={20} />
                 </div>
                 <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Referral Income</p>
                 <h4 className="text-2xl font-black text-emerald-600">₹1,250</h4>
              </div>
           </div>

           {/* Team History List */}
           <div className="space-y-4">
              <div className="flex items-center gap-3 px-2">
                 <div className="w-8 h-8 bg-blue-900 text-white rounded-xl flex items-center justify-center shadow-md">
                    <Users size={16} />
                 </div>
                 <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest">Recent Joinees</h3>
              </div>

              <div className="space-y-3">
                 {referralHistory.map((ref, i) => (
                   <div key={i} className="bg-white p-5 rounded-[2.5rem] shadow-sm border border-gray-50 flex items-center justify-between group active:scale-[0.98] transition-all">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center font-black text-[10px] group-hover:bg-pink-50 group-hover:text-pink-600 transition-colors">
                            {ref.name.charAt(0)}
                         </div>
                         <div>
                            <div className="flex items-center gap-1.5">
                               <h4 className="text-[10px] font-black text-gray-800 uppercase tracking-tight">{ref.name}</h4>
                               <BadgeCheck size={12} className="text-blue-500" />
                            </div>
                            <p className="text-[8px] font-bold text-gray-300 uppercase tracking-tighter">{ref.id}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                               <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                               <p className="text-[8px] font-black text-emerald-600 uppercase tracking-tighter">{ref.status}</p>
                            </div>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-xs font-black text-pink-600">{ref.reward}</p>
                         <p className="text-[8px] font-bold text-gray-300 italic">{ref.date}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default InviteContent;
