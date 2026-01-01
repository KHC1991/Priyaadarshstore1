
import React, { useState, useRef, useEffect } from 'react';
import { User, Language } from '../types';
import { 
  User as UserIcon, 
  LogOut, 
  ChevronRight, 
  Building2, 
  X,
  MessageCircle,
  ChevronLeft,
  CheckCircle2,
  CheckSquare,
  ClipboardCheck,
  KeyRound,
  ShieldCheck,
  Loader2,
  AlertTriangle,
  Lock,
  Fingerprint,
  CreditCard,
  UserCheck,
  Smartphone,
  Mail,
  Camera
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setLanguage: (lang: Language) => void;
  language: Language;
  onLogout: () => void;
}

const MenuContent: React.FC<Props> = ({ user, setUser, language, onLogout }) => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'menu' | 'profile_hub' | 'edit_bank' | 'edit_kyc' | 'edit_pass' | 'edit_pin'>('menu');
  const [activeModal, setActiveModal] = useState<'success' | 'security_prompt' | null>(null);
  
  // Local Form States
  const [personalForm, setPersonalForm] = useState({ 
    name: user.name || '', 
    dob: user.dob || '', 
    mobile: user.mobile || '',
    email: user.email || ''
  });
  const [passForm, setPassForm] = useState({ newPass: '', confirmPass: '' });
  const [pinForm, setPinForm] = useState({ newPin: '', confirmPin: '' });

  // Reset form when user object changes (important for sync)
  useEffect(() => {
    setPersonalForm({
      name: user.name || '',
      dob: user.dob || '',
      mobile: user.mobile || '',
      email: user.email || ''
    });
  }, [user]);

  const [verifyInput, setVerifyInput] = useState('');
  const [securityType, setSecurityType] = useState<'pin' | 'password'>('pin');
  const [securityTitle, setSecurityTitle] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const pendingActionRef = useRef<(() => void) | null>(null);

  const handleUpdateAction = (msg: string, secType: 'pin' | 'password', secTitle: string, updateFunc: () => void) => {
    setSecurityType(secType);
    setSecurityTitle(secTitle);
    setVerifyInput('');
    setValidationError(null);
    pendingActionRef.current = () => {
      updateFunc();
      setSuccessMsg(msg);
      setActiveModal('success');
    };
    setActiveModal('security_prompt');
  };

  const handleFinalVerification = () => {
    if (!verifyInput) return;
    setIsVerifying(true);
    setValidationError(null);

    // Dynamic verification using CURRENT user state
    setTimeout(() => {
      const storedPin = user.transactionPin || '1234';
      const storedPass = user.loginPassword || '1234';
      
      const isValid = securityType === 'pin' ? verifyInput === storedPin : verifyInput === storedPass;
      
      if (isValid) {
        setIsVerifying(false);
        setActiveModal(null);
        if (pendingActionRef.current) pendingActionRef.current();
        setVerifyInput('');
      } else {
        setIsVerifying(false);
        setValidationError(`Invalid ${securityType === 'pin' ? 'PIN' : 'Password'}!`);
      }
    }, 1000);
  };

  const saveProfile = () => {
    setUser(u => u ? ({...u, name: personalForm.name, email: personalForm.email, mobile: personalForm.mobile, dob: personalForm.dob}) : u);
  };

  const menuSections = [
    {
      title: "Account Services",
      items: [
        { label: 'Profile Setting', icon: <UserIcon size={18} />, color: 'text-blue-600', bg: 'bg-blue-50', action: () => setActiveView('profile_hub') },
        { label: 'KYC Verification', icon: <ClipboardCheck size={18} />, color: 'text-amber-600', bg: 'bg-amber-50', action: () => setActiveView('edit_kyc') },
        { label: 'Bank Detail', icon: <Building2 size={18} />, color: 'text-emerald-600', bg: 'bg-emerald-50', action: () => setActiveView('edit_bank') },
      ]
    },
    {
      title: "Security & Privacy",
      items: [
        { label: 'Change Password', icon: <KeyRound size={18} />, color: 'text-indigo-600', bg: 'bg-indigo-50', action: () => setActiveView('edit_pass') },
        { label: 'Change Transaction PIN', icon: <Lock size={18} />, color: 'text-rose-600', bg: 'bg-rose-50', action: () => setActiveView('edit_pin') },
      ]
    }
  ];

  if (activeView === 'profile_hub') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] animate-fadeIn pb-32">
        <div className="bg-white p-4 pt-8 pb-4 border-b border-gray-100 flex items-center gap-4 sticky top-0 z-[1002] shadow-sm">
          <button onClick={() => setActiveView('menu')} className="p-2 bg-gray-50 rounded-xl text-gray-400"><ChevronLeft size={24} /></button>
          <h2 className="text-sm font-black text-blue-900 uppercase tracking-widest leading-none">Profile Hub</h2>
        </div>
        <div className="p-6 space-y-6">
           <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-gray-100 space-y-5">
              <div className="relative">
                <input type="text" placeholder="Full Name" value={personalForm.name} onChange={e => setPersonalForm({...personalForm, name: e.target.value})} className="w-full bg-gray-50 p-5 rounded-2xl text-sm font-bold outline-none border-2 border-transparent focus:border-blue-200" />
                <UserIcon className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              </div>
              <div className="relative">
                <input type="email" placeholder="Email Address" value={personalForm.email} onChange={e => setPersonalForm({...personalForm, email: e.target.value})} className="w-full bg-gray-50 p-5 rounded-2xl text-sm font-bold outline-none border-2 border-transparent focus:border-blue-200" />
                <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              </div>
              <div className="relative">
                <input type="tel" placeholder="Mobile Number" value={personalForm.mobile} onChange={e => setPersonalForm({...personalForm, mobile: e.target.value})} className="w-full bg-gray-50 p-5 rounded-2xl text-sm font-bold outline-none border-2 border-transparent focus:border-blue-200" />
                <Smartphone className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              </div>
              <button onClick={() => handleUpdateAction("Profile info saved successfully!", 'pin', 'Verify Transaction PIN', saveProfile)} className="w-full py-5 bg-blue-900 text-white rounded-[2rem] font-black text-[11px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">Update Profile</button>
           </div>
        </div>
      </div>
    );
  }

  if (activeView === 'edit_pass') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] animate-fadeIn pb-24">
        <div className="bg-white p-4 pt-8 pb-4 border-b flex items-center gap-4 sticky top-0 z-[1002] shadow-sm">
          <button onClick={() => setActiveView('menu')} className="p-2 bg-gray-50 rounded-xl"><ChevronLeft size={24} /></button>
          <h2 className="text-sm font-black uppercase">Change Password</h2>
        </div>
        <div className="p-8 space-y-6">
           <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 space-y-5">
             <input type="password" placeholder="Enter New Password" value={passForm.newPass} onChange={e => setPassForm({...passForm, newPass: e.target.value})} className="w-full bg-gray-50 p-5 rounded-2xl font-bold border-2 border-transparent focus:border-indigo-200" />
             <input type="password" placeholder="Confirm New Password" value={passForm.confirmPass} onChange={e => setPassForm({...passForm, confirmPass: e.target.value})} className="w-full bg-gray-50 p-5 rounded-2xl font-bold border-2 border-transparent focus:border-indigo-200" />
             <button onClick={() => {
                if(passForm.newPass !== passForm.confirmPass) return alert("Passwords do not match!");
                handleUpdateAction("Password updated successfully!", 'pin', 'Verify PIN to Change Pass', () => setUser(u => u ? ({...u, loginPassword: passForm.newPass}) : u))
             }} className="w-full py-6 bg-indigo-900 text-white rounded-[2rem] font-black uppercase shadow-xl active:scale-95">Update Password</button>
           </div>
        </div>
      </div>
    );
  }

  if (activeView === 'edit_pin') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] animate-fadeIn pb-24">
        <div className="bg-white p-4 pt-8 pb-4 border-b flex items-center gap-4 sticky top-0 z-[1002] shadow-sm">
          <button onClick={() => setActiveView('menu')} className="p-2 bg-gray-50 rounded-xl"><ChevronLeft size={24} /></button>
          <h2 className="text-sm font-black uppercase">Change Transaction PIN</h2>
        </div>
        <div className="p-8 space-y-6 text-center">
           <div className="bg-white p-10 rounded-[4rem] shadow-sm border border-gray-100 space-y-6">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Set New 4-Digit PIN</p>
             <input type="password" maxLength={4} placeholder="PIN" value={pinForm.newPin} onChange={e => setPinForm({...pinForm, newPin: e.target.value.replace(/\D/g, '')})} className="w-full bg-gray-50 p-5 rounded-3xl font-black text-4xl text-center outline-none border-2 border-transparent focus:border-amber-200" />
             <input type="password" maxLength={4} placeholder="Confirm" value={pinForm.confirmPin} onChange={e => setPinForm({...pinForm, confirmPin: e.target.value.replace(/\D/g, '')})} className="w-full bg-gray-50 p-5 rounded-3xl font-black text-4xl text-center outline-none border-2 border-transparent focus:border-amber-200" />
             <button onClick={() => {
                if(pinForm.newPin !== pinForm.confirmPin) return alert("PINs do not match!");
                handleUpdateAction("Transaction PIN updated!", 'password', 'Verify Password to Change PIN', () => setUser(u => u ? ({...u, transactionPin: pinForm.newPin}) : u))
             }} className="w-full py-6 bg-rose-600 text-white rounded-[2.5rem] font-black uppercase shadow-xl active:scale-95">Set New PIN</button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32">
      <div className="p-4 pt-12 space-y-8">
        {menuSections.map((sec, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">{sec.title}</h3>
            <div className="bg-white rounded-[2.5rem] p-2 shadow-sm border border-gray-50 divide-y divide-gray-50">
              {sec.items.map((item, i) => (
                <button key={i} onClick={item.action} className="w-full p-5 flex items-center justify-between group active:bg-gray-50 transition-all rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 ${item.bg} ${item.color} rounded-xl group-hover:scale-110 transition-transform`}>{item.icon}</div>
                    <span className="text-xs font-black text-gray-700 uppercase tracking-tight">{item.label}</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-200" />
                </button>
              ))}
            </div>
          </div>
        ))}
        <button onClick={onLogout} className="w-full bg-rose-50 p-6 rounded-[2.5rem] border border-rose-100 flex items-center justify-center gap-3 active:scale-95 transition-all group mt-4 mb-10">
          <LogOut size={20} className="text-rose-600" />
          <span className="text-sm font-black text-rose-600 uppercase tracking-widest">Sign Out Account</span>
        </button>
      </div>

      {activeModal === 'security_prompt' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[5000] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-sm rounded-[4rem] p-12 space-y-8 text-center shadow-2xl relative animate-fadeIn">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-lg">
                <ShieldCheck size={32} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-gray-800 uppercase">{securityTitle}</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Required for security confirmation</p>
              </div>
              <div className="space-y-4">
                <input 
                  type="password" 
                  maxLength={securityType === 'pin' ? 4 : 20} 
                  autoFocus 
                  className="w-full bg-gray-50 p-6 rounded-[2rem] text-3xl font-black text-center outline-none border-2 border-transparent focus:border-blue-500 shadow-inner" 
                  placeholder={securityType === 'pin' ? "****" : "********"} 
                  value={verifyInput} 
                  onChange={e => {setVerifyInput(e.target.value); setValidationError(null);}} 
                />
                {validationError && <p className="text-[10px] font-black text-red-500 uppercase flex items-center justify-center gap-1 animate-shake"><AlertTriangle size={12}/> {validationError}</p>}
              </div>
              <div className="flex gap-4">
                 <button onClick={() => setActiveModal(null)} className="flex-1 py-4 bg-gray-100 text-gray-400 rounded-2xl font-black text-[10px] uppercase">Cancel</button>
                 <button onClick={handleFinalVerification} disabled={isVerifying || !verifyInput} className="flex-1 py-4 bg-blue-900 text-white rounded-2xl font-black text-[10px] uppercase shadow-xl flex items-center justify-center gap-2">
                    {isVerifying ? <Loader2 className="animate-spin" size={16} /> : 'Verify Now'}
                 </button>
              </div>
           </div>
        </div>
      )}

      {activeModal === 'success' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[6000] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-sm rounded-[4rem] p-12 space-y-8 text-center shadow-2xl border-4 border-emerald-500/20 animate-fadeIn">
              <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-lg animate-bounce">
                <CheckCircle2 size={48} />
              </div>
              <div className="space-y-2">
                 <h3 className="text-2xl font-black text-emerald-600 uppercase">Success!</h3>
                 <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">{successMsg}</p>
              </div>
              <button onClick={() => { setActiveModal(null); setActiveView('menu'); }} className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-[11px] uppercase shadow-xl tracking-widest active:scale-95 transition-all">Close</button>
           </div>
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>
    </div>
  );
};

export default MenuContent;

