
import React, { useState, useRef } from 'react';
import { User, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { 
  Coins, 
  IndianRupee, 
  MoreVertical, 
  History, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Upload, 
  X,
  ShieldCheck,
  AlertCircle,
  Copy,
  ChevronRight,
  CheckCircle2,
  Wallet,
  KeyRound,
  Shield,
  CreditCard as CardIcon,
  Image as ImageIcon,
  FileCheck,
  PlusCircle,
  MinusCircle,
  Building2,
  BadgeCheck,
  Info,
  Clock,
  Headphones
} from 'lucide-react';

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  language: Language;
}

const WalletContent: React.FC<Props> = ({ user, setUser, language }) => {
  const [activeModal, setActiveModal] = useState<'redeem' | 'withdraw' | 'deposit' | 'history' | null>(null);
  const [pin, setPin] = useState('');
  const [amount, setAmount] = useState('');
  const [utr, setUtr] = useState('');
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [paymentStep, setPaymentStep] = useState<'amount' | 'method' | 'bank_details' | 'card_details' | 'submission' | 'success'>('amount');
  const [withdrawStep, setWithdrawStep] = useState<'details' | 'pin' | 'success'>('details');
  const [showHistoryType, setShowHistoryType] = useState<'coins' | 'balance'>('balance');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = TRANSLATIONS[language] as any;
  
  const [history] = useState<{ id: number; res: string; coins: number | string; time: string }[]>([
    { id: 1, res: 'Deposit Successful', coins: '+500', time: 'Today, 10:24 AM' },
    { id: 2, res: 'Redeem Coins', coins: '+250', time: 'Yesterday, 04:15 PM' },
    { id: 3, res: 'Withdrawal Pending', coins: '-1000', time: '24 Oct, 09:10 AM' }
  ]);

  const MY_UPI_ID = "kisansinh@naviaxis";
  const BANK_DETAILS = {
    holder: "Priyaadarsh Store Pvt Ltd",
    account: "918140003126",
    ifsc: "PYTM0123456",
    bank: "Paytm Payments Bank"
  };

  const upiApps = [
    { id: 'phonepe', name: 'PhonePe', icon: 'https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png' },
    { id: 'gpay', name: 'Google Pay', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-google-pay-2038779-1721670.png' },
    { id: 'paytm', name: 'Paytm', icon: 'https://download.logo.wine/logo/Paytm/Paytm-Logo.wine.png' },
    { id: 'any', name: 'UPI Pay', icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg' }
  ];

  const handleUpiAppRedirect = (appId: string) => {
    if (!amount || parseFloat(amount) <= 0) {
      alert(language === 'gu' ? "કૃપા કરીને રકમ દાખલ કરો." : "Please enter an amount.");
      return;
    }
    
    const upiString = `pa=${MY_UPI_ID}&pn=PAStore&am=${amount}&cu=INR`;
    let deepLink = `upi://pay?${upiString}`;

    switch(appId) {
      case 'phonepe': deepLink = `phonepe://pay?${upiString}`; break;
      case 'gpay': deepLink = `tez://upi/pay?${upiString}`; break;
      case 'paytm': deepLink = `paytmmp://pay?${upiString}`; break;
      case 'any': deepLink = `upi://pay?${upiString}`; break;
    }

    window.location.href = deepLink;
    setTimeout(() => setPaymentStep('submission'), 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setScreenshot(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(language === 'gu' ? "કોપી થઈ ગયું!" : "Copied!");
  };

  const submitDeposit = () => {
    if (utr.length < 12) {
      alert(language === 'gu' ? "કૃપા કરીને ૧૨ અંકનો સાચો ટ્રાન્ઝેક્શન આઈડી દાખલ કરો." : "Please enter a valid 12-digit Transaction ID.");
      return;
    }
    if (!screenshot) {
      alert(language === 'gu' ? "કૃપા કરીને પેમેન્ટનો સ્ક્રીનશોટ અપલોડ કરો." : "Please upload payment screenshot.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setPaymentStep('success');
      setScreenshot(null);
      setUtr('');
    }, 2000);
  };

  const handleWithdrawProcess = () => {
    const amt = parseFloat(amount);
    if (!amount || amt < 500) {
      alert(language === 'gu' ? "ઓછામાં ઓછા ₹500 ઉપાડી શકાય છે." : "Minimum withdrawal is ₹500.");
      return;
    }
    if (amt > user.balance) {
      alert(language === 'gu' ? "અપૂરતું બેલેન્સ!" : "Insufficient balance!");
      return;
    }
    setWithdrawStep('pin');
    setPin(''); 
  };

  const finalizeWithdrawal = () => {
    if (pin === '1234') {
      setIsSubmitting(true);
      setTimeout(() => {
        const amt = parseFloat(amount);
        setUser(u => u ? ({ ...u, balance: u.balance - amt }) : u);
        setWithdrawStep('success');
        setIsSubmitting(false);
        setPin(''); 
      }, 1500);
    } else {
      alert(language === 'gu' ? "ખોટો ટ્રાન્ઝેક્શન પીન!" : "Invalid PIN!");
    }
  };

  const withdrawalAmount = parseFloat(amount) || 0;
  const taxAmount = withdrawalAmount * 0.05;
  const finalAmount = withdrawalAmount - taxAmount;

  const walletRules = [
    { icon: <ShieldCheck className="text-blue-600" size={20} />, title: 'Secure Transactions', desc: 'All withdrawals and deposits are 100% encrypted and secure.' },
    { icon: <Clock className="text-orange-500" size={20} />, title: 'Processing Time', desc: 'Withdrawals are processed within 24-48 business hours to your bank.' },
    { icon: <Info className="text-emerald-500" size={20} />, title: 'Minimum Limit', desc: 'Minimum withdrawal amount is ₹500 and Minimum deposit is ₹100.' },
    { icon: <AlertCircle className="text-red-500" size={20} />, title: 'Tax Policy', desc: '5% Government TDS will be deducted on every withdrawal transaction.' },
    { icon: <KeyRound className="text-purple-600" size={20} />, title: 'Security PIN', desc: 'Never share your 4-digit transaction PIN with anyone, including staff.' },
    { icon: <Headphones className="text-blue-500" size={20} />, title: '24/7 Support', desc: 'For any issues, contact our support team immediately via Help section.' }
  ];

  return (
    <div className="p-4 pt-8 space-y-8 pb-32">
      {/* Wallet Header - Replaces global dashboard header */}
      <div className="flex justify-between items-center px-2 animate-fadeIn">
         <div className="flex flex-col">
            <span className="text-[10px] font-black text-blue-600 tracking-[0.2em] uppercase">{user.id}</span>
            <h1 className="text-xl font-black text-gray-800 uppercase tracking-tight leading-none mt-1">My Wallet</h1>
         </div>
         <div className="flex items-center gap-2">
            <div className="p-2.5 bg-white rounded-2xl shadow-sm border border-gray-100 text-blue-600">
               <BadgeCheck size={20} />
            </div>
         </div>
      </div>

      {/* Wallets - Main Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-[2.5rem] p-6 text-white shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Coins size={80} /></div>
          <button onClick={(e) => { e.stopPropagation(); setShowHistoryType('coins'); setActiveModal('history'); }} className="absolute top-3 right-3 text-white/50 hover:text-white active:scale-90 p-1"><MoreVertical size={20} /></button>
          <p className="text-[9px] font-black uppercase tracking-widest opacity-70 mb-1">{t.coinWallet}</p>
          <h3 className="text-2xl font-black">{user.coins.toLocaleString()}</h3>
          <button disabled={user.coins < 50000} onClick={() => setActiveModal('redeem')} className={`mt-4 w-full py-2.5 rounded-2xl text-[9px] font-black uppercase transition-all ${user.coins >= 50000 ? 'bg-white text-emerald-600 shadow-lg' : 'bg-white/20 text-white/40'}`}>{t.redeem.split('(')[0]}</button>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] p-6 text-white shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><IndianRupee size={80} /></div>
          <button onClick={(e) => { e.stopPropagation(); setShowHistoryType('balance'); setActiveModal('history'); }} className="absolute top-3 right-3 text-white/50 hover:text-white active:scale-90 p-1"><MoreVertical size={20} /></button>
          <p className="text-[9px] font-black uppercase tracking-widest opacity-70 mb-1">{t.balanceWallet}</p>
          <h3 className="text-2xl font-black">₹{user.balance.toLocaleString()}</h3>
          <button onClick={() => { setWithdrawStep('details'); setActiveModal('withdraw'); setAmount(''); }} className="mt-4 w-full py-2.5 rounded-2xl text-[9px] font-black uppercase bg-white text-blue-600 shadow-lg transition-all">{t.withdrawHeader}</button>
        </div>
      </div>

      {/* Action Buttons - Attractive Themed Boxes */}
      <div className="grid grid-cols-2 gap-4">
         {/* DEPOSIT - Yellow Theme */}
         <div 
           onClick={() => { setPaymentStep('amount'); setActiveModal('deposit'); setAmount(''); setScreenshot(null); }} 
           className="bg-amber-50 border-2 border-amber-100 p-8 rounded-[3rem] flex flex-col items-center gap-4 shadow-sm active:scale-95 group cursor-pointer hover:shadow-lg transition-all"
         >
            <div className="p-4 bg-amber-500 text-white rounded-[1.5rem] shadow-xl shadow-amber-200 group-hover:scale-110 transition-transform">
                <PlusCircle size={28} />
            </div>
            <div className="text-center">
                <span className="text-[11px] font-black text-amber-900 uppercase tracking-widest block">{t.deposit}</span>
                <span className="text-[8px] font-bold text-amber-600 uppercase tracking-tighter mt-0.5 block">Add Money</span>
            </div>
         </div>

         {/* WITHDRAW - Blue Theme */}
         <div 
           onClick={() => { setWithdrawStep('details'); setActiveModal('withdraw'); setAmount(''); }} 
           className="bg-blue-50 border-2 border-blue-100 p-8 rounded-[3rem] flex flex-col items-center gap-4 shadow-sm active:scale-95 group cursor-pointer hover:shadow-lg transition-all"
         >
            <div className="p-4 bg-blue-600 text-white rounded-[1.5rem] shadow-xl shadow-blue-200 group-hover:scale-110 transition-transform">
                <MinusCircle size={28} />
            </div>
            <div className="text-center">
                <span className="text-[11px] font-black text-blue-900 uppercase tracking-widest block">{t.withdrawHeader}</span>
                <span className="text-[8px] font-bold text-blue-600 uppercase tracking-tighter mt-0.5 block">Cash Out</span>
            </div>
         </div>
      </div>

      {/* WALLET GUIDELINES SECTION - Attractive English Rules */}
      <div className="space-y-4 animate-fadeIn">
         <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 bg-blue-900 text-white rounded-xl flex items-center justify-center shadow-md">
               <Shield size={16} />
            </div>
            <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest">Security & Guidelines</h3>
         </div>

         <div className="bg-white rounded-[3rem] p-6 shadow-sm border border-gray-100 divide-y divide-gray-50">
            {walletRules.map((rule, index) => (
              <div key={index} className="py-4 flex items-start gap-4 group">
                 <div className="p-2.5 bg-gray-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {rule.icon}
                 </div>
                 <div className="flex-1">
                    <h4 className="text-[10px] font-black text-gray-800 uppercase tracking-tight">{rule.title}</h4>
                    <p className="text-[9px] font-bold text-gray-400 mt-0.5 leading-relaxed">{rule.desc}</p>
                 </div>
              </div>
            ))}
         </div>

         <div className="bg-blue-900/5 p-6 rounded-[2.5rem] border border-blue-100 text-center">
            <p className="text-[9px] font-black text-blue-900 uppercase tracking-widest italic opacity-60">
               "Empowering your financial journey with trust and speed."
            </p>
         </div>
      </div>

      {/* DEPOSIT MODAL */}
      {activeModal === 'deposit' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[2000] flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 space-y-6 animate-slideUp overflow-y-auto max-h-[95vh] relative shadow-2xl">
             <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 text-gray-300 hover:text-gray-500 transition-colors bg-gray-50 p-2 rounded-full"><X size={20} /></button>
             
             {paymentStep === 'amount' ? (
                <div className="space-y-6 animate-fadeIn">
                   <div className="text-center">
                      <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg"><ArrowDownLeft size={32} /></div>
                      <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">Deposit Funds</h3>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Add money to your wallet</p>
                   </div>
                   <div className="space-y-4">
                      <div className="relative">
                        <input type="number" className="w-full bg-gray-50 p-6 rounded-[2rem] text-3xl font-black text-center outline-none border-2 border-transparent focus:border-amber-500 transition-all text-amber-900" placeholder="0.00" autoFocus value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <span className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-300 font-black text-xl">₹</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {['100', '500', '1000'].map(val => (
                           <button key={val} onClick={() => setAmount(val)} className="py-3 bg-amber-50 rounded-xl text-[10px] font-black text-amber-600 border border-amber-100 uppercase hover:bg-amber-600 hover:text-white transition-all">+{val}</button>
                        ))}
                      </div>
                   </div>
                   <button onClick={() => setPaymentStep('method')} disabled={!amount || parseFloat(amount) <= 0} className="w-full py-5 bg-amber-600 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest shadow-xl shadow-amber-100 transition-all disabled:opacity-50">Choose Method</button>
                </div>
             ) : paymentStep === 'method' ? (
                <div className="space-y-6 animate-fadeIn">
                   <div className="text-center space-y-1">
                      <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Payment Method</h3>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Select your preferred way to pay</p>
                   </div>

                   <div className="space-y-3">
                      <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest ml-1">UPI Options</p>
                      <div className="grid grid-cols-4 gap-2">
                        {upiApps.map(app => (
                           <button key={app.id} onClick={() => handleUpiAppRedirect(app.id)} className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-500 transition-all active:scale-95">
                              <img src={app.icon} className="h-7 w-auto object-contain" alt={app.name} />
                              <span className="text-[7px] font-black text-gray-700 uppercase leading-none">{app.name}</span>
                           </button>
                        ))}
                      </div>
                   </div>

                   <div className="space-y-3">
                      <p className="text-[9px] font-black text-orange-600 uppercase tracking-widest ml-1">Other Methods</p>
                      <div className="space-y-2">
                         <button onClick={() => setPaymentStep('card_details')} className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-orange-500 transition-all active:scale-[0.98] group">
                            <div className="flex items-center gap-3">
                               <div className="p-2 bg-white rounded-xl text-orange-600 shadow-sm"><CardIcon size={20} /></div>
                               <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Credit / Debit Card</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-300 group-hover:text-orange-500" />
                         </button>
                         <button onClick={() => setPaymentStep('bank_details')} className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-emerald-500 transition-all active:scale-[0.98] group">
                            <div className="flex items-center gap-3">
                               <div className="p-2 bg-white rounded-xl text-emerald-600 shadow-sm"><Building2 size={20} /></div>
                               <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Direct Bank Deposit</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-300 group-hover:text-emerald-500" />
                         </button>
                      </div>
                   </div>

                   <button onClick={() => setPaymentStep('amount')} className="w-full text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-amber-600 transition-colors pt-2">Back to Amount</button>
                </div>
             ) : paymentStep === 'bank_details' ? (
                <div className="space-y-6 animate-fadeIn">
                   <div className="text-center space-y-1">
                      <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Bank Details</h3>
                   </div>
                   <div className="bg-gray-50 rounded-[2rem] p-6 space-y-4 border border-gray-100 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-5"><Building2 size={80} /></div>
                      <div className="space-y-1">
                         <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Account Holder</p>
                         <p className="text-xs font-black text-blue-900 uppercase">{BANK_DETAILS.holder}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-1">
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Account No.</p>
                            <div className="flex items-center gap-2">
                               <p className="text-xs font-black text-blue-900">{BANK_DETAILS.account}</p>
                               <button onClick={() => copyToClipboard(BANK_DETAILS.account)} className="p-1.5 bg-white rounded-lg shadow-sm text-blue-600"><Copy size={12} /></button>
                            </div>
                         </div>
                         <div className="space-y-1">
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">IFSC Code</p>
                            <div className="flex items-center gap-2">
                               <p className="text-xs font-black text-blue-900">{BANK_DETAILS.ifsc}</p>
                               <button onClick={() => copyToClipboard(BANK_DETAILS.ifsc)} className="p-1.5 bg-white rounded-lg shadow-sm text-blue-600"><Copy size={12} /></button>
                            </div>
                         </div>
                      </div>
                   </div>
                   <button onClick={() => setPaymentStep('submission')} className="w-full py-5 bg-blue-900 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest shadow-xl">I've Transferred, Continue</button>
                </div>
             ) : paymentStep === 'submission' ? (
                <div className="space-y-6 animate-fadeIn">
                   <div className="text-center">
                      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg"><Upload size={28} /></div>
                      <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Confirm Payment</h3>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Submit Proof & UTR Number</p>
                   </div>

                   <div className="space-y-5">
                      <div className="space-y-2">
                         <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Step 1: Upload Payment Receipt</p>
                         <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                         <div 
                           onClick={() => fileInputRef.current?.click()}
                           className={`w-full py-12 rounded-[2.5rem] border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${screenshot ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200 hover:border-blue-500'}`}
                         >
                            {screenshot ? (
                               <div className="flex flex-col items-center gap-3">
                                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-xl rotate-1">
                                     <img src={screenshot} className="w-full h-full object-cover" alt="Receipt Preview" />
                                  </div>
                                  <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm">
                                     <FileCheck size={14} /> ScreenShot Uploaded
                                  </span>
                                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">(Tap to Replace)</span>
                               </div>
                            ) : (
                               <>
                                  <div className="p-4 bg-white rounded-[1.5rem] shadow-sm text-blue-600 group-hover:scale-110 transition-transform">
                                     <ImageIcon size={32} />
                                  </div>
                                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Select Screenshot</span>
                                  <p className="text-[8px] font-bold text-gray-300 uppercase tracking-widest leading-none">JPEG, PNG Max 2MB</p>
                               </>
                            )}
                         </div>
                      </div>

                      <div className="space-y-2">
                         <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Step 2: Enter 12-Digit Transaction ID</p>
                         <input type="text" maxLength={12} className="w-full bg-gray-50 p-5 rounded-2xl text-center text-xl font-black text-blue-900 tracking-widest outline-none border-2 border-transparent focus:border-blue-500" placeholder="123456789012" value={utr} onChange={(e) => setUtr(e.target.value.replace(/\D/g, ''))} />
                      </div>
                   </div>

                   <div className="pt-2">
                      <button 
                        onClick={submitDeposit} 
                        disabled={isSubmitting || utr.length < 12 || !screenshot} 
                        className={`w-full py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest shadow-xl transition-all ${
                           isSubmitting || utr.length < 12 || !screenshot 
                           ? 'bg-gray-200 text-gray-400' 
                           : 'bg-blue-900 text-white shadow-blue-100'
                        }`}
                      >
                         {isSubmitting ? 'Verifying...' : 'Submit Deposit Request'}
                      </button>
                      <p className="text-center text-[8px] font-bold text-gray-300 mt-4 uppercase tracking-[0.2em] italic">Verification usually takes 30-60 mins</p>
                   </div>
                </div>
             ) : (
                <div className="text-center space-y-8 animate-fadeIn py-6">
                   <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner border-4 border-white relative"><CheckCircle2 size={56} /></div>
                   <div className="space-y-3 px-4">
                      <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Deposit Pending</h3>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest italic leading-relaxed">
                        {language === 'gu' ? 'તમારું ટ્રાન્ઝેક્શન વેરિફિકેશન માટે મોકલવામાં આવ્યું છે. ૨૪ કલાકમાં બેલેન્સ અપડેટ થશે.' : 'Transaction sent for verification. Balance will be updated within 24 hours.'}
                      </p>
                   </div>
                   <button onClick={() => setActiveModal(null)} className="w-full py-5 bg-blue-900 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest shadow-xl">Back to Wallet</button>
                </div>
             )}
          </div>
        </div>
      )}

      {/* WITHDRAWAL MODAL */}
      {activeModal === 'withdraw' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[2000] flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-sm rounded-[3rem] p-8 space-y-6 animate-slideUp overflow-y-auto max-h-[95vh] relative shadow-2xl">
             <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 text-gray-300 hover:text-gray-500 transition-colors bg-gray-50 p-2 rounded-full"><X size={20} /></button>
             
             {withdrawStep === 'details' ? (
                <div className="space-y-6 animate-fadeIn">
                   <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] p-6 text-white shadow-xl relative overflow-hidden">
                      <div className="absolute right-[-10px] top-[-10px] opacity-10 rotate-12"><Wallet size={100} /></div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Available Balance</p>
                      <h4 className="text-3xl font-black">₹{user.balance.toLocaleString()}</h4>
                   </div>
                   <div className="text-center"><h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">{t.withdrawHeader}</h3></div>
                   <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">{t.withdrawAmount}</label>
                        <div className="relative">
                          <input type="number" className="w-full bg-gray-50 p-5 rounded-3xl text-3xl font-black text-center outline-none border-2 border-transparent focus:border-blue-500 transition-all text-blue-900" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
                          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 font-black text-xl">₹</span>
                        </div>
                      </div>
                      {withdrawalAmount >= 500 && (
                        <div className="bg-blue-50/50 p-5 rounded-[2rem] border border-blue-100 space-y-3 animate-fadeIn">
                           <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase"><span>{t.withdrawAmount}</span><span className="font-black">₹{withdrawalAmount.toLocaleString()}</span></div>
                           <div className="flex justify-between items-center text-[10px] font-bold text-red-400 uppercase"><span>{t.taxLabel}</span><span className="font-black">- ₹{taxAmount.toLocaleString()}</span></div>
                           <div className="pt-2 border-t border-blue-100 flex justify-between items-center"><span className="text-[10px] font-black text-blue-900 uppercase">{t.finalReceive}</span><span className="text-2xl font-black text-blue-600">₹{finalAmount.toLocaleString()}</span></div>
                        </div>
                      )}
                   </div>
                   <button onClick={handleWithdrawProcess} className="w-full py-5 bg-blue-900 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest shadow-xl">Proceed to Withdraw</button>
                </div>
             ) : withdrawStep === 'pin' ? (
                <div className="space-y-8 animate-fadeIn py-4">
                   <div className="text-center">
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg"><KeyRound size={32} /></div>
                      <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Enter PIN</h3>
                   </div>
                   <div className="space-y-4 px-4">
                      <input type="password" maxLength={4} className="w-full bg-gray-50 p-6 rounded-3xl text-4xl font-black text-center outline-none border-2 border-transparent focus:border-emerald-500 tracking-[0.5em] shadow-inner" placeholder="****" autoFocus value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))} />
                   </div>
                   <button onClick={finalizeWithdrawal} disabled={isSubmitting || pin.length < 4} className={`w-full py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest shadow-xl transition-all ${isSubmitting || pin.length < 4 ? 'bg-gray-200 text-gray-400' : 'bg-emerald-600 text-white shadow-emerald-50'}`}>{isSubmitting ? 'Verifying...' : 'Confirm & Withdraw'}</button>
                </div>
             ) : (
                <div className="text-center space-y-8 animate-fadeIn py-6">
                   <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner border-4 border-white relative"><CheckCircle2 size={56} /></div>
                   <div className="space-y-3 px-4">
                      <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tight">{t.withdrawSuccess}</h3>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest italic leading-relaxed">Amount: ₹{finalAmount.toLocaleString()} will be credited to your bank within 24-48 hours.</p>
                   </div>
                   <button onClick={() => { setActiveModal(null); setWithdrawStep('details'); setAmount(''); }} className="w-full py-5 bg-blue-900 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest shadow-xl">Close Dashboard</button>
                </div>
             )}
          </div>
        </div>
      )}

      {/* History Modal */}
      {activeModal === 'history' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[2000] flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 space-y-6 animate-slideUp overflow-hidden flex flex-col h-[70vh]">
             <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
                   <History size={18} className="text-blue-600" /> 
                   {showHistoryType === 'coins' ? t.coinWallet : t.balanceWallet} History
                </h3>
                <button onClick={() => setActiveModal(null)} className="p-2"><X size={24} className="text-gray-300" /></button>
             </div>
             <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {history.map(h => (
                    <div key={h.id} className="bg-gray-50 p-5 rounded-2xl flex justify-between items-center border border-gray-100 animate-fadeIn">
                        <div>
                           <p className="text-[10px] font-black text-gray-800 uppercase leading-tight">{h.res}</p>
                           <p className="text-[8px] font-bold text-gray-400 mt-1 italic">{h.time}</p>
                        </div>
                        <div className={`text-sm font-black ${String(h.coins).includes('+') ? 'text-emerald-500' : 'text-red-500'}`}>{h.coins}</div>
                    </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* REDEEM MODAL */}
      {activeModal === 'redeem' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[2000] flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 space-y-6 animate-slideUp shadow-2xl">
             <div className="text-center">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg"><ShieldCheck size={32} /></div>
                <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">Redeem Coins</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Convert coins to cash</p>
             </div>
             <div className="bg-gray-50 p-6 rounded-3xl text-center space-y-2 border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">You will receive</p>
                <h4 className="text-3xl font-black text-emerald-600">₹{(user.coins / 100).toLocaleString()}</h4>
             </div>
             <input type="password" maxLength={4} className="w-full bg-gray-50 p-5 rounded-2xl text-center text-2xl font-black tracking-[1em] outline-none border-2 border-transparent focus:border-emerald-500" placeholder="****" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))} />
             <div className="flex gap-3">
                <button onClick={() => setActiveModal(null)} className="flex-1 py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest">Cancel</button>
                <button onClick={() => {
                  if (pin === '1234') {
                    const convertedINR = user.coins / 100;
                    setUser(u => u ? ({ ...u, coins: 0, balance: u.balance + convertedINR }) : u);
                    alert(language === 'gu' ? `સફળતાપૂર્વક ₹${convertedINR} બેલેન્સમાં ઉમેરવામાં આવ્યા છે.` : `₹${convertedINR} added to balance.`);
                    setActiveModal(null);
                    setPin('');
                  } else { alert("Invalid PIN!"); }
                }} className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-100">Confirm</button>
             </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slideUp { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default WalletContent;
