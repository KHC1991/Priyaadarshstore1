
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight,
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Coins, 
  Calendar, 
  Landmark, 
  Zap, 
  X,
  KeyRound,
  Calculator,
  Sparkles,
  Lock
} from 'lucide-react';
import { User, Language, ActiveInvestment } from '../types';

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  language: Language;
}

const InvestmentPage: React.FC<Props> = ({ user, setUser, language }) => {
  const navigate = useNavigate();
  const [view, setView] = useState<'plans' | 'portfolio'>('plans');
  const [selectedPlanIdx, setSelectedPlanIdx] = useState<number>(0);
  const [activeType, setActiveType] = useState<'monthly' | 'wealth'>('monthly');
  const [confirmStep, setConfirmStep] = useState<'details' | 'pin' | 'success' | null>(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState<ActiveInvestment | null>(null);
  const [pin, setPin] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const plans = [
    { amount: 10000, name: 'Basic Project', id: 'kd1' },
    { amount: 20000, name: 'Standard Project', id: 'kd2' },
    { amount: 30000, name: 'Premium Project', id: 'kd3' },
    { amount: 40000, name: 'Elite Project', id: 'kd4' },
    { amount: 50000, name: 'Royal Project', id: 'kd5' },
  ];

  const selectedPlan = plans[selectedPlanIdx];

  // Compounding calculation: FV = P * (1 + r)^n
  const calculateCompoundReturn = (p: number, months: number = 60, rate: number = 0.015) => {
    return p * Math.pow((1 + rate), months);
  };

  const handleStartActivation = () => {
    if (user.balance < selectedPlan.amount) {
      alert("Insufficient Balance!");
      return;
    }
    setConfirmStep('details');
  };

  const finalizeActivation = () => {
    if (pin === '1234') {
      setIsSubmitting(true);
      setTimeout(() => {
        const newInv: ActiveInvestment = {
          id: `inv-${Date.now()}`,
          planId: selectedPlan.id,
          planName: selectedPlan.name,
          amount: selectedPlan.amount,
          startDate: new Date().toISOString().split('T')[0],
          type: activeType,
          totalEarned: 0,
          monthsCompleted: 0
        };
        setUser(u => u ? ({ 
          ...u, 
          balance: u.balance - selectedPlan.amount,
          activeInvestments: [...(u.activeInvestments || []), newInv]
        }) : u);
        setIsSubmitting(false);
        setConfirmStep('success');
      }, 1500);
    } else {
      alert("Incorrect PIN!");
      setPin('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32 animate-fadeIn relative">
      {/* Header */}
      <div className="bg-white p-4 pt-8 border-b border-gray-100 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-3 bg-gray-50 rounded-2xl text-gray-400 active:scale-90 transition-all">
          <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
            <h2 className="text-[10px] font-black text-gray-800 uppercase tracking-[0.2em] text-center">Pashudhan Project</h2>
            <div className="flex items-center gap-1 mt-0.5">
               <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
               <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Active Hub</span>
            </div>
        </div>
        <div className="w-12"></div>
      </div>

      <div className="p-6">
        <div className="bg-gray-100 p-1.5 rounded-[1.8rem] flex gap-1 mb-8">
            <button onClick={() => setView('plans')} className={`flex-1 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${view === 'plans' ? 'bg-white text-indigo-900 shadow-md' : 'text-gray-400'}`}>Explore Plans</button>
            <button onClick={() => setView('portfolio')} className={`flex-1 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${view === 'portfolio' ? 'bg-white text-indigo-900 shadow-md' : 'text-gray-400'}`}>My Portfolio</button>
        </div>

        {view === 'plans' ? (
          <div className="space-y-8 animate-fadeIn">
            {/* Plan Type Selector */}
            <div className="grid grid-cols-2 gap-4">
               <button 
                 onClick={() => setActiveType('monthly')}
                 className={`p-6 rounded-[2.5rem] border-2 flex flex-col items-center gap-3 transition-all ${activeType === 'monthly' ? 'bg-indigo-50 border-indigo-600' : 'bg-white border-gray-100'}`}
               >
                  <Calendar size={28} className={activeType === 'monthly' ? 'text-indigo-600' : 'text-gray-300'} />
                  <div className="text-center">
                     <span className="text-[10px] font-black text-gray-800 uppercase tracking-tight block">Monthly Payout</span>
                     <span className="text-[7px] font-bold text-gray-400 uppercase tracking-widest mt-1 block">Returns Every Month</span>
                  </div>
               </button>
               <button 
                 onClick={() => setActiveType('wealth')}
                 className={`p-6 rounded-[2.5rem] border-2 flex flex-col items-center gap-3 transition-all ${activeType === 'wealth' ? 'bg-amber-50 border-amber-600 shadow-lg shadow-amber-100' : 'bg-white border-gray-100'}`}
               >
                  <Sparkles size={28} className={activeType === 'wealth' ? 'text-amber-600' : 'text-gray-300'} />
                  <div className="text-center">
                     <span className="text-[10px] font-black text-gray-800 uppercase tracking-tight block">Wealth Plan</span>
                     <span className="text-[7px] font-black text-amber-600 uppercase tracking-widest mt-1 block italic">Profit on Profit</span>
                  </div>
               </button>
            </div>

            {/* Warning for Wealth Plan */}
            {activeType === 'wealth' && (
               <div className="bg-amber-600/10 p-5 rounded-[2rem] border border-amber-600/20 flex gap-4 items-center animate-fadeIn">
                  <div className="p-3 bg-amber-600 text-white rounded-2xl shadow-lg"><Lock size={20} /></div>
                  <div className="flex-1">
                     <p className="text-[10px] font-black text-amber-900 uppercase tracking-tight leading-none">5-Year Lock-in / 5 साल का लॉक-इन</p>
                     <p className="text-[8px] font-bold text-amber-700 uppercase tracking-tighter mt-1 leading-relaxed">Funds are locked for 60 months. No withdrawal until maturity. / फंड 60 महीनों के लिए लॉक हैं। मैच्योरिटी तक कोई निकासी नहीं।</p>
                  </div>
               </div>
            )}

            {/* Plans Grid */}
            <div className="space-y-4">
               <div className="grid grid-cols-1 gap-4">
                  {plans.map((plan, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setSelectedPlanIdx(idx)}
                      className={`p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer relative overflow-hidden group ${selectedPlanIdx === idx ? 'bg-indigo-900 border-indigo-900 shadow-2xl text-white scale-[1.02]' : 'bg-white border-gray-100 text-gray-800'}`}
                    >
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-5">
                             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner ${selectedPlanIdx === idx ? 'bg-white/10 text-white' : 'bg-gray-100 text-indigo-900'}`}>₹</div>
                             <div>
                                <h4 className="text-2xl font-black">₹{plan.amount.toLocaleString()}</h4>
                                <p className={`text-[8px] font-black uppercase tracking-widest mt-1 ${selectedPlanIdx === idx ? 'text-indigo-200' : 'text-gray-400'}`}>{plan.name}</p>
                             </div>
                          </div>
                          {selectedPlanIdx === idx && <CheckCircle2 size={24} className="text-emerald-400" />}
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Calculator Preview */}
            <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
               <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest text-center border-b border-gray-50 pb-4">Estimated Returns / अनुमानित रिटर्न</h4>
               <div className="flex justify-between items-end">
                  <div className="space-y-1">
                     <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Investment</p>
                     <p className="text-xl font-black text-gray-800">₹{selectedPlan.amount.toLocaleString()}</p>
                  </div>
                  <div className="text-right space-y-1">
                     <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">Net Maturity (5 Yrs)</p>
                     <p className="text-2xl font-black text-emerald-600">₹{activeType === 'wealth' ? calculateCompoundReturn(selectedPlan.amount).toLocaleString(undefined, {maximumFractionDigits: 0}) : (selectedPlan.amount * 1.9).toLocaleString()}</p>
                  </div>
               </div>
               <div className="pt-2">
                  <button onClick={handleStartActivation} className="w-full bg-indigo-900 text-white py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.25em] shadow-2xl active:scale-95 transition-all">Activate Project</button>
               </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fadeIn">
             {!selectedPortfolio ? (
                <div className="space-y-4">
                   {user.activeInvestments && user.activeInvestments.length > 0 ? (
                      user.activeInvestments.map((inv) => (
                        <div key={inv.id} onClick={() => setSelectedPortfolio(inv)} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer">
                           <div className="flex items-center gap-5">
                              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-[1.5rem] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                 {inv.type === 'wealth' ? <Sparkles size={24} /> : <Landmark size={24} />}
                              </div>
                              <div>
                                 <h4 className="text-sm font-black text-gray-800 uppercase tracking-tight">{inv.planName}</h4>
                                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">₹{inv.amount.toLocaleString()} - {inv.type === 'wealth' ? 'Wealth Plan' : 'Monthly Plan'}</p>
                              </div>
                           </div>
                           <ChevronRight className="text-gray-200" size={18} />
                        </div>
                      ))
                   ) : (
                      <div className="py-20 text-center opacity-30 italic font-black text-[10px] uppercase tracking-widest">No Projects Found</div>
                   )}
                </div>
             ) : (
                <div className="space-y-8 animate-fadeIn">
                   <button onClick={() => setSelectedPortfolio(null)} className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest"><ChevronLeft size={16} /> Portfolio List</button>
                   <div className="bg-white p-10 rounded-[4rem] shadow-sm border border-gray-100 space-y-8 relative overflow-hidden text-center">
                      <div className="absolute top-0 right-0 p-10 opacity-5"><TrendingUp size={140} /></div>
                      <div>
                         <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2">{selectedPortfolio.planName}</p>
                         <h3 className="text-4xl font-black text-gray-900">₹{selectedPortfolio.amount.toLocaleString()}</h3>
                         <div className={`mt-4 mx-auto w-max px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${selectedPortfolio.type === 'wealth' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-indigo-50 text-indigo-600 border-indigo-200'}`}>
                            {selectedPortfolio.type === 'wealth' ? 'Wealth Mode (Locked / लॉक है)' : 'Monthly Payout Mode'}
                         </div>
                      </div>

                      <div className="bg-indigo-900 rounded-[3rem] p-8 text-white text-left space-y-6">
                         <h4 className="text-[11px] font-black uppercase tracking-widest border-b border-white/10 pb-4">Project Summary / परियोजना सारांश</h4>
                         {selectedPortfolio.type === 'monthly' ? (
                            <div className="space-y-4">
                               <div className="flex justify-between items-center"><span className="text-[10px] font-bold opacity-60 uppercase">Monthly Payout</span><span className="text-lg font-black">+ ₹{(selectedPortfolio.amount * 0.015 + selectedPortfolio.amount / 60).toFixed(0)}</span></div>
                               <div className="flex justify-between items-center"><span className="text-[10px] font-bold opacity-60 uppercase">Project Duration</span><span className="text-sm font-black">60 Months</span></div>
                            </div>
                         ) : (
                            <div className="space-y-4">
                               <div className="flex justify-between items-center"><span className="text-[10px] font-bold opacity-60 uppercase">Compounding Rate</span><span className="text-sm font-black">1.5% Per Month</span></div>
                               <div className="flex justify-between items-center"><span className="text-[10px] font-bold opacity-60 uppercase">Withdrawal / निकासी</span><span className="text-sm font-black text-amber-400 flex items-center gap-2"><Lock size={14} /> 5 Yrs Locked / 5 साल लॉक</span></div>
                               <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                                  <span className="text-[10px] font-black uppercase">Final Maturity / कुल मैच्योरिटी</span>
                                  <span className="text-2xl font-black text-amber-400">₹{calculateCompoundReturn(selectedPortfolio.amount).toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                               </div>
                            </div>
                         )}
                      </div>
                   </div>
                </div>
             )}
          </div>
        )}
      </div>

      {/* CONFIRMATION MODAL */}
      {confirmStep && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[2000] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-sm rounded-[3rem] p-10 space-y-8 animate-slideUp text-center relative overflow-hidden">
              {confirmStep === 'details' ? (
                <div className="space-y-8 animate-fadeIn">
                   <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4"><Zap size={32} /></div>
                   <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Confirm Project</h3>
                   <div className="space-y-3 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase"><span>Plan</span><span className="text-indigo-900">{selectedPlan.name}</span></div>
                      <div className="flex justify-between items-center text-[10px] font-black uppercase"><span>Amount</span><span className="text-indigo-900">₹{selectedPlan.amount.toLocaleString()}</span></div>
                      <div className="flex justify-between items-center text-[10px] font-black uppercase"><span>Type</span><span className="text-amber-600">{activeType === 'wealth' ? 'Wealth (Profit on Profit)' : 'Monthly'}</span></div>
                   </div>
                   {activeType === 'wealth' && (
                      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-2">
                         <Lock size={14} className="text-amber-600" />
                         <p className="text-[9px] font-black text-amber-700 uppercase leading-none">Locked for 5 years</p>
                      </div>
                   )}
                   <div className="flex gap-4">
                      <button onClick={() => setConfirmStep(null)} className="flex-1 py-4 bg-gray-100 text-gray-400 rounded-2xl font-black text-[10px] uppercase">Cancel</button>
                      <button onClick={() => setConfirmStep('pin')} className="flex-1 py-4 bg-indigo-900 text-white rounded-2xl font-black text-[10px] uppercase shadow-xl">Confirm Details</button>
                   </div>
                </div>
              ) : confirmStep === 'pin' ? (
                <div className="space-y-8 animate-fadeIn">
                   <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4"><KeyRound size={32} /></div>
                   <h3 className="text-2xl font-black text-gray-800 uppercase">Enter PIN</h3>
                   <input type="password" maxLength={4} autoFocus className="w-full bg-gray-50 p-6 rounded-3xl text-4xl font-black text-center outline-none border-2 border-transparent focus:border-amber-500 tracking-[0.5em]" placeholder="****" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))} />
                   <button onClick={finalizeActivation} disabled={isSubmitting || pin.length < 4} className="w-full py-5 bg-amber-600 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest shadow-xl">{isSubmitting ? 'Processing...' : 'Activate Project Now'}</button>
                </div>
              ) : (
                <div className="text-center space-y-8 animate-fadeIn py-6">
                   <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner border-4 border-white"><CheckCircle2 size={48} /></div>
                   <h3 className="text-2xl font-black text-gray-800 uppercase">Activated!</h3>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Pashudhan Project Activation Successful.</p>
                   <button onClick={() => { setConfirmStep(null); setView('portfolio'); }} className="w-full py-5 bg-blue-900 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest">View Portfolio</button>
                </div>
              )}
           </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slideUp { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default InvestmentPage;
