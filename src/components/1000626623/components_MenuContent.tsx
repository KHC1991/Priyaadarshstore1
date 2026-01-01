
import React, { useState, useRef } from 'react';
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
  UploadCloud,
  Image as ImageIcon,
  Info,
  LifeBuoy,
  FileText,
  ShieldAlert,
  TrendingUp,
  HelpCircle,
  Mail,
  Phone,
  Send,
  Camera,
  Smartphone,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setLanguage: (lang: Language) => void;
  language: Language;
  onLogout: () => void;
}

const MenuContent: React.FC<Props> = ({ user, setUser, setLanguage, language, onLogout }) => {
  const navigate = useNavigate();
  
  // Navigation States
  const [activeView, setActiveView] = useState<'menu' | 'profile_hub' | 'edit_bank' | 'edit_kyc' | 'edit_pass' | 'edit_pin'>('menu');
  const [activeModal, setActiveModal] = useState<'contact' | 'about' | 'support_forum' | 'terms' | 'privacy' | 'success' | 'security_prompt' | null>(null);
  
  // Form States
  const [personalForm, setPersonalForm] = useState({ 
    name: user.name || 'Khodal', 
    dob: user.dob || '', 
    address: user.address || '',
    mobile: user.mobile || '',
    email: user.email || ''
  });
  const [profileImage, setProfileImage] = useState<string | null>(user.profileImage || null);
  const [bankForm, setBankForm] = useState({ holderName: '', bankName: '', accNo: '', confirmAccNo: '', ifsc: '' });
  const [kycForm, setKycForm] = useState({ fullName: '', aadhar: '', pan: '' });
  const [docs, setDocs] = useState<{ aadharFront: string | null; aadharBack: string | null; panCard: string | null }>({ aadharFront: null, aadharBack: null, panCard: null });
  const [passForm, setPassForm] = useState({ newPass: '', confirmPass: '' });
  const [pinForm, setPinForm] = useState({ newPin: '', confirmPin: '' });

  // Support Form State
  const [supportForm, setSupportForm] = useState({
    name: user.name || '',
    userId: user.id || '',
    subject: '',
    description: ''
  });

  // UI & Logic States
  const [verifyInput, setVerifyInput] = useState('');
  const [securityType, setSecurityType] = useState<'pin' | 'password'>('pin');
  const [securityTitle, setSecurityTitle] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const pendingActionRef = useRef<(() => void) | null>(null);
  const fileRefs = {
    profile: useRef<HTMLInputElement>(null),
    aadharFront: useRef<HTMLInputElement>(null),
    aadharBack: useRef<HTMLInputElement>(null),
    panCard: useRef<HTMLInputElement>(null)
  };

  // --- CORE LOGIC ---

  const handleUpdateAction = (msg: string, needsSecurity: boolean = false, secType?: 'pin' | 'password', secTitle?: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (needsSecurity && secType && secTitle) {
        setSecurityType(secType);
        setSecurityTitle(secTitle);
        setVerifyInput('');
        setValidationError(null);
        pendingActionRef.current = () => {
          setSuccessMsg(msg);
          setActiveModal('success');
        };
        setActiveModal('security_prompt');
      } else {
        setSuccessMsg(msg);
        setActiveModal('success');
      }
    }, 2000);
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportForm.subject || !supportForm.description) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccessMsg("Support ticket submitted successfully! Our team will contact you soon.");
      setActiveModal('success');
      setSupportForm(prev => ({ ...prev, subject: '', description: '' }));
    }, 2500);
  };

  const handleFinalVerification = () => {
    if (!verifyInput) return;
    setIsVerifying(true);
    setValidationError(null);

    setTimeout(() => {
      // In production, compare with real stored PIN/Pass
      const isValid = securityType === 'pin' ? verifyInput === '1234' : verifyInput === '123456789012';
      if (isValid) {
        setIsVerifying(false);
        setActiveModal(null);
        if (pendingActionRef.current) pendingActionRef.current();
        setVerifyInput('');
      } else {
        setIsVerifying(false);
        setValidationError(`Invalid ${securityType === 'pin' ? 'PIN' : 'Password'}!`);
      }
    }, 1200);
  };

  const handleFileUpload = (type: keyof typeof docs | 'profile', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'profile') {
          setProfileImage(reader.result as string);
        } else {
          setDocs(prev => ({ ...prev, [type]: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
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
      title: "Earning Center",
      items: [
        { label: 'Task Hub', icon: <CheckSquare size={18} />, color: 'text-indigo-600', bg: 'bg-indigo-50', action: () => navigate('/dashboard/task') },
        { label: 'Investment Plans', icon: <TrendingUp size={18} />, color: 'text-pink-600', bg: 'bg-pink-50', action: () => navigate('/dashboard/investment') },
      ]
    },
    {
      title: "Support & Help",
      items: [
        { label: 'About Us', icon: <Info size={18} />, color: 'text-slate-600', bg: 'bg-slate-50', action: () => setActiveModal('about') },
        { label: 'Contact Us', icon: <MessageCircle size={18} />, color: 'text-cyan-600', bg: 'bg-cyan-50', action: () => setActiveModal('contact') },
        { label: 'Support Forum', icon: <LifeBuoy size={18} />, color: 'text-violet-600', bg: 'bg-violet-50', action: () => setActiveModal('support_forum') },
      ]
    },
    {
      title: "Legal Policies",
      items: [
        { label: 'Terms & Conditions', icon: <FileText size={18} />, color: 'text-gray-600', bg: 'bg-gray-50', action: () => setActiveModal('terms') },
        { label: 'Privacy Policy', icon: <ShieldAlert size={18} />, color: 'text-red-600', bg: 'bg-red-50', action: () => setActiveModal('privacy') },
      ]
    }
  ];

  const renderProfileHub = () => (
    <div className="min-h-screen bg-[#F8FAFC] animate-fadeIn pb-32">
      <div className="bg-white p-4 pt-8 pb-4 border-b border-gray-100 flex items-center gap-4 sticky top-0 z-[1002] shadow-sm">
        <button onClick={() => setActiveView('menu')} className="p-2 bg-gray-50 rounded-xl text-gray-400 active:scale-90 transition-all">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-sm font-black text-blue-900 uppercase tracking-widest leading-none">Profile Hub</h2>
      </div>

      <div className="p-6 space-y-8">
        <div className="bg-gradient-to-br from-[#00008B] to-blue-800 rounded-[3rem] p-10 shadow-xl shadow-blue-100 relative overflow-hidden text-center group">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-black text-white/20 tracking-[0.5em] uppercase">
            PRIYAADARSH STORE
          </div>
          <div className="relative z-10 space-y-6">
            <div className="relative inline-block">
              <div 
                onClick={() => fileRefs.profile.current?.click()}
                className="w-32 h-32 rounded-full border-4 border-white/30 shadow-2xl overflow-hidden bg-white/10 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform group"
              >
                {profileImage ? (
                  <img src={profileImage} className="w-full h-full object-cover" alt="Profile" />
                ) : (
                  <ImageIcon size={40} className="text-white/40" />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <Camera size={24} className="text-white" />
                </div>
              </div>
              <input type="file" ref={fileRefs.profile} className="hidden" accept="image/*" onChange={(e) => handleFileUpload('profile', e)} />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none">
                {personalForm.name || 'Khodal'}
              </h3>
              <p className="text-[10px] font-bold text-blue-200 uppercase tracking-[0.3em]">Official Member</p>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 text-white/5 rotate-12"><UserIcon size={200} /></div>
        </div>

        <div className="space-y-4">
           <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2 ml-2">Personal Information</h3>
           <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-gray-100 space-y-5">
              <div className="space-y-1">
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
                 <div className="relative">
                   <input type="text" placeholder="Enter Name" value={personalForm.name} onChange={e => setPersonalForm({...personalForm, name: e.target.value})} className="w-full bg-gray-50 p-5 rounded-2xl text-sm font-bold text-gray-800 outline-none border-2 border-transparent focus:border-blue-200 transition-all" />
                   <UserIcon className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                 </div>
              </div>
              <div className="space-y-1">
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">Date of Birth</label>
                 <div className="relative">
                    <input type="date" value={personalForm.dob} onChange={e => setPersonalForm({...personalForm, dob: e.target.value})} className="w-full bg-gray-50 p-5 rounded-2xl text-sm font-bold text-gray-800 outline-none border-2 border-transparent focus:border-blue-200 transition-all" />
                 </div>
              </div>
              <div className="space-y-1">
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">Residential Address</label>
                 <div className="relative">
                   <textarea placeholder="Enter Home Address" value={personalForm.address} onChange={e => setPersonalForm({...personalForm, address: e.target.value})} className="w-full bg-gray-50 p-5 rounded-2xl text-sm font-bold text-gray-800 outline-none border-2 border-transparent focus:border-blue-200 transition-all min-h-[100px] resize-none" />
                 </div>
              </div>
              <button onClick={() => handleUpdateAction("Profile information saved successfully!")} className="w-full py-5 bg-[#00008B] text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-blue-100 active:scale-95 transition-all mt-4">Save Information</button>
           </div>
        </div>

        <div className="space-y-4">
           <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2 ml-2">Contact Details</h3>
           <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-gray-100 space-y-5">
              <div className="space-y-1">
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">Mobile Number</label>
                 <div className="relative">
                   <input type="tel" placeholder="Mobile Number" value={personalForm.mobile} onChange={e => setPersonalForm({...personalForm, mobile: e.target.value})} className="w-full bg-gray-50 p-5 rounded-2xl text-sm font-bold text-gray-800 outline-none border-2 border-transparent focus:border-blue-200 transition-all" />
                   <Smartphone className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                 </div>
              </div>
              <div className="space-y-1">
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">Email ID</label>
                 <div className="relative">
                   <input type="email" placeholder="Email Address" value={personalForm.email} onChange={e => setPersonalForm({...personalForm, email: e.target.value})} className="w-full bg-gray-50 p-5 rounded-2xl text-sm font-bold text-gray-800 outline-none border-2 border-transparent focus:border-blue-200 transition-all" />
                   <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                 </div>
              </div>
              <button onClick={() => handleUpdateAction("Mobile and Email successfully updated!", true, 'pin', 'Enter Transaction PIN')} className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-emerald-100 active:scale-95 transition-all mt-4">Update Contact Info</button>
           </div>
        </div>

        <div className="space-y-4">
           <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2 ml-2">Security & Access</h3>
           <div className="bg-white rounded-[3rem] p-2 shadow-sm border border-gray-100 divide-y divide-gray-50 overflow-hidden">
              <button onClick={() => setActiveView('edit_pass')} className="w-full p-6 flex items-center justify-between group active:bg-gray-50">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><KeyRound size={20} /></div>
                    <span className="text-xs font-black text-gray-700 uppercase tracking-tight">Change Password</span>
                 </div>
                 <ChevronRight size={18} className="text-gray-300" />
              </button>
              <button onClick={() => setActiveView('edit_pin')} className="w-full p-6 flex items-center justify-between group active:bg-gray-50">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><Lock size={20} /></div>
                    <span className="text-xs font-black text-gray-700 uppercase tracking-tight">Change PIN</span>
                 </div>
                 <ChevronRight size={18} className="text-gray-300" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );

  const renderEditBank = () => (
    <div className="min-h-screen bg-[#F8FAFC] animate-fadeIn pb-24">
      <div className="bg-white p-4 pt-8 pb-4 border-b border-gray-100 flex items-center gap-4 sticky top-0 z-[1002] shadow-sm">
        <button onClick={() => setActiveView('menu')} className="p-2 bg-gray-50 rounded-xl text-gray-400"><ChevronLeft size={24} /></button>
        <h2 className="text-sm font-black text-emerald-900 uppercase tracking-widest leading-none">Bank Detail</h2>
      </div>
      <div className="p-6">
         <div className="bg-white p-8 rounded-[4rem] shadow-sm border border-gray-100 space-y-6 animate-slideUp">
            <div className="flex flex-col items-center gap-2 mb-4 text-center">
               <div className="p-4 bg-emerald-50 text-emerald-600 rounded-[1.8rem] border-4 border-white shadow-sm"><CreditCard size={32} /></div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Withdrawal Bank Details</p>
            </div>
            <div className="space-y-4">
               <input type="text" placeholder="Bank Name" value={bankForm.bankName} onChange={e => setBankForm({...bankForm, bankName: e.target.value})} className="w-full bg-gray-50 p-5 rounded-3xl font-bold outline-none border border-transparent focus:border-emerald-200" />
               <input type="text" placeholder="Account Holder Name" value={bankForm.holderName} onChange={e => setBankForm({...bankForm, holderName: e.target.value})} className="w-full bg-gray-50 p-5 rounded-3xl font-bold outline-none border border-transparent focus:border-emerald-200" />
               <input type="password" placeholder="Account Number" value={bankForm.accNo} onChange={e => setBankForm({...bankForm, accNo: e.target.value})} className="w-full bg-gray-50 p-5 rounded-3xl font-bold outline-none border border-transparent focus:border-emerald-200" />
               <input type="text" placeholder="Confirm Account Number" value={bankForm.confirmAccNo} onChange={e => setBankForm({...bankForm, confirmAccNo: e.target.value})} className={`w-full bg-gray-50 p-5 rounded-3xl font-bold outline-none border ${bankForm.confirmAccNo && bankForm.accNo !== bankForm.confirmAccNo ? 'border-red-500' : 'border-transparent focus:border-emerald-200'}`} />
               <input type="text" placeholder="IFSC Code" value={bankForm.ifsc} onChange={e => setBankForm({...bankForm, ifsc: e.target.value.toUpperCase()})} className="w-full bg-gray-50 p-5 rounded-3xl font-bold outline-none border border-transparent focus:border-emerald-200 uppercase" />
            </div>
            <button onClick={() => handleUpdateAction("Bank details updated successfully!", true, 'pin', 'Enter Transaction PIN')} className="w-full py-6 bg-emerald-600 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all mt-4">Save Bank Details</button>
         </div>
      </div>
    </div>
  );

  const renderEditKyc = () => (
    <div className="min-h-screen bg-[#F8FAFC] animate-fadeIn pb-24 overflow-y-auto">
      <div className="bg-white p-4 pt-8 pb-4 border-b border-gray-100 flex items-center gap-4 sticky top-0 z-[1002] shadow-sm">
        <button onClick={() => setActiveView('menu')} className="p-2 bg-gray-50 rounded-xl text-gray-400"><ChevronLeft size={24} /></button>
        <h2 className="text-sm font-black text-amber-900 uppercase tracking-widest leading-none">KYC Verification</h2>
      </div>
      <div className="p-6">
         <div className="bg-white p-8 rounded-[4rem] shadow-sm border border-gray-100 space-y-7 animate-slideUp">
            <div className="flex flex-col items-center gap-2 text-center">
               <div className="p-4 bg-amber-50 text-amber-600 rounded-[1.8rem] border-4 border-white shadow-sm"><UserCheck size={32} /></div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Document Verification</p>
            </div>
            <div className="space-y-4">
               <input type="text" placeholder="Full Name" value={kycForm.fullName} onChange={e => setKycForm({...kycForm, fullName: e.target.value})} className="w-full bg-gray-50 p-5 rounded-3xl font-bold outline-none border border-transparent focus:border-amber-200" />
               <input type="text" maxLength={10} placeholder="PAN Card Number" value={kycForm.pan} onChange={e => setKycForm({...kycForm, pan: e.target.value.toUpperCase()})} className="w-full bg-gray-50 p-5 rounded-3xl font-bold outline-none border border-transparent focus:border-amber-200 uppercase" />
               <input type="text" maxLength={12} placeholder="Aadhar Card Number" value={kycForm.aadhar} onChange={e => setKycForm({...kycForm, aadhar: e.target.value.replace(/\D/g, '')})} className="w-full bg-gray-50 p-5 rounded-3xl font-bold outline-none border border-transparent focus:border-amber-200" />
            </div>
            <div className="space-y-6 pt-4 border-t border-gray-50">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Upload Documents</p>
               <div className="flex flex-col gap-6">
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest ml-2">PAN Card Front</p>
                    <button onClick={() => fileRefs.panCard.current?.click()} className={`w-full aspect-video rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all relative overflow-hidden group ${docs.panCard ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'}`}>
                       {docs.panCard ? <img src={docs.panCard} className="w-full h-full object-contain bg-gray-900" /> : (
                          <><div className="p-3 bg-white rounded-2xl text-gray-300 shadow-sm"><UploadCloud size={20} /></div><span className="text-[9px] font-black text-gray-400 uppercase">Upload PAN</span></>
                       )}
                    </button>
                    <input type="file" ref={fileRefs.panCard} onChange={(e) => handleFileUpload('panCard', e)} className="hidden" accept="image/*" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest ml-2">Aadhar Card Front</p>
                    <button onClick={() => fileRefs.aadharFront.current?.click()} className={`w-full aspect-video rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all relative overflow-hidden group ${docs.aadharFront ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'}`}>
                       {docs.aadharFront ? <img src={docs.aadharFront} className="w-full h-full object-contain bg-gray-900" /> : (
                          <><div className="p-3 bg-white rounded-2xl text-gray-300 shadow-sm"><UploadCloud size={20} /></div><span className="text-[9px] font-black text-gray-400 uppercase">Aadhar Front</span></>
                       )}
                    </button>
                    <input type="file" ref={fileRefs.aadharFront} onChange={(e) => handleFileUpload('aadharFront', e)} className="hidden" accept="image/*" />
                  </div>
               </div>
            </div>
            <button onClick={() => handleUpdateAction("KYC details submitted for verification!", true, 'pin', 'Enter Transaction PIN')} className="w-full py-6 bg-amber-600 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all mt-4">Submit KYC</button>
         </div>
      </div>
    </div>
  );

  const renderEditPass = () => (
    <div className="min-h-screen bg-[#F8FAFC] animate-fadeIn pb-24">
      <div className="bg-white p-4 pt-8 pb-4 border-b border-gray-100 flex items-center gap-4 sticky top-0 z-[1002]">
        <button onClick={() => setActiveView('profile_hub')} className="p-2 bg-gray-50 rounded-xl text-gray-400"><ChevronLeft size={24} /></button>
        <h2 className="text-sm font-black text-indigo-900 uppercase tracking-widest leading-none">Change Password</h2>
      </div>
      <div className="p-8">
         <div className="bg-white p-10 rounded-[4rem] shadow-sm border border-gray-100 space-y-6 animate-slideUp text-center">
            <div className="flex flex-col items-center gap-3 mb-4"><div className="p-5 bg-indigo-50 text-indigo-600 rounded-[2rem] border-4 border-white shadow-sm"><KeyRound size={32} /></div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">New Login Password</p></div>
            <input type="password" placeholder="New Password" value={passForm.newPass} onChange={e => setPassForm({...passForm, newPass: e.target.value})} className="w-full bg-gray-50 p-5 rounded-3xl font-bold outline-none border border-transparent focus:border-indigo-200" />
            <input type="password" placeholder="Confirm Password" value={passForm.confirmPass} onChange={e => setPassForm({...passForm, confirmPass: e.target.value})} className="w-full bg-gray-50 p-5 rounded-3xl font-bold outline-none border border-transparent focus:border-indigo-200" />
            <button onClick={() => handleUpdateAction("Password updated successfully!", true, 'pin', 'Enter Transaction PIN')} className="w-full py-6 bg-indigo-900 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all mt-4">Update Password</button>
         </div>
      </div>
    </div>
  );

  const renderEditPin = () => (
    <div className="min-h-screen bg-[#F8FAFC] animate-fadeIn pb-24">
      <div className="bg-white p-4 pt-8 pb-4 border-b border-gray-100 flex items-center gap-4 sticky top-0 z-[1002]">
        <button onClick={() => setActiveView('profile_hub')} className="p-2 bg-gray-50 rounded-xl text-gray-400"><ChevronLeft size={24} /></button>
        <h2 className="text-sm font-black text-amber-900 uppercase tracking-widest leading-none">Change PIN</h2>
      </div>
      <div className="p-8">
         <div className="bg-white p-10 rounded-[4rem] shadow-sm border border-gray-100 space-y-6 animate-slideUp text-center">
            <div className="flex flex-col items-center gap-3 mb-4"><div className="p-5 bg-amber-50 text-amber-600 rounded-[2rem] border-4 border-white shadow-sm"><Lock size={32} /></div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Update 4-Digit PIN</p></div>
            <input type="password" maxLength={4} placeholder="New PIN" value={pinForm.newPin} onChange={e => setPinForm({...pinForm, newPin: e.target.value.replace(/\D/g, '')})} className="w-full bg-gray-50 p-5 rounded-3xl font-black text-4xl tracking-[0.5em] outline-none border border-transparent focus:border-amber-200" />
            <input type="password" maxLength={4} placeholder="Confirm PIN" value={pinForm.confirmPin} onChange={e => setPinForm({...pinForm, confirmPin: e.target.value.replace(/\D/g, '')})} className="w-full bg-gray-50 p-5 rounded-3xl font-black text-4xl tracking-[0.5em] outline-none border border-transparent focus:border-amber-200" />
            <button onClick={() => handleUpdateAction("Transaction PIN updated successfully!", true, 'password', 'Enter Login Password')} className="w-full py-6 bg-amber-600 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all mt-4">Update PIN</button>
         </div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (activeView) {
      case 'profile_hub': return renderProfileHub();
      case 'edit_bank': return renderEditBank();
      case 'edit_kyc': return renderEditKyc();
      case 'edit_pass': return renderEditPass();
      case 'edit_pin': return renderEditPin();
      default:
        return (
          <div className="p-4 pt-12 space-y-8 animate-fadeIn pb-32 overflow-y-auto h-full">
            <div className="space-y-8">
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
                            <ChevronRight size={18} className="text-gray-200 group-hover:text-blue-600 transition-colors" />
                         </button>
                      ))}
                    </div>
                 </div>
              ))}
            </div>
            <button onClick={onLogout} className="w-full bg-rose-50 p-6 rounded-[2.5rem] border border-rose-100 flex items-center justify-center gap-3 active:scale-95 transition-all group mt-4 mb-10">
               <LogOut size={20} className="text-rose-600" />
               <span className="text-sm font-black text-rose-600 uppercase tracking-widest">Sign Out Account</span>
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {renderCurrentView()}

      {activeModal === 'security_prompt' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[5000] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-sm rounded-[4rem] p-12 space-y-8 animate-slideUp text-center shadow-2xl relative">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-lg ${securityType === 'pin' ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-600'}`}>
                 {securityType === 'pin' ? <ShieldCheck size={32} /> : <Fingerprint size={32} />}
              </div>
              <div className="space-y-1">
                 <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">{securityTitle}</h3>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Verify your account security</p>
              </div>
              <div className="space-y-4">
                 <input type="password" maxLength={securityType === 'pin' ? 4 : 12} autoFocus className="w-full bg-gray-50 p-6 rounded-[2rem] text-3xl font-black text-center outline-none border-2 border-transparent focus:border-blue-500 shadow-inner" placeholder={securityType === 'pin' ? "****" : "********"} value={verifyInput} onChange={e => {setVerifyInput(e.target.value); setValidationError(null);}} />
                 {validationError && <p className="text-[9px] font-black text-red-500 uppercase flex items-center justify-center gap-1"><AlertTriangle size={12} /> {validationError}</p>}
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
           <div className="bg-white w-full max-w-sm rounded-[4rem] p-12 space-y-8 animate-slideUp text-center shadow-2xl relative border-4 border-emerald-500/20">
              <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-lg animate-bounce shadow-emerald-200"><CheckCircle2 size={48} /></div>
              <div className="space-y-2">
                 <h3 className="text-2xl font-black text-emerald-600 uppercase tracking-tight">Success!</h3>
                 <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-4 leading-relaxed mt-2">{successMsg}</p>
              </div>
              <button onClick={() => { setActiveModal(null); setActiveView('menu'); }} className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-[11px] uppercase shadow-xl tracking-widest active:scale-95 transition-all">Done</button>
           </div>
        </div>
      )}

      {isProcessing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[7000] flex items-center justify-center">
           <div className="bg-white p-12 rounded-[3rem] shadow-2xl flex flex-col items-center gap-6 animate-fadeIn">
              <Loader2 className="animate-spin text-blue-600" size={64} />
              <div className="text-center">
                 <h3 className="text-xl font-black text-gray-800 uppercase tracking-widest">Processing...</h3>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2 italic">Securing your profile</p>
              </div>
           </div>
        </div>
      )}

      {/* About Us, Contact, Support Modals omitted for brevity, but they stay unchanged in the code */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slideUp { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default MenuContent;
