
import React, { useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  ShieldCheck, 
  CreditCard, 
  LayoutDashboard, 
  LogOut, 
  Search, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  TrendingUp, 
  IndianRupee, 
  Smartphone,
  ChevronRight,
  Menu,
  X,
  Clock,
  ExternalLink
} from 'lucide-react';

// Mock Data for Admin (Replace with Firebase Fetch)
const MOCK_USERS = [
  { id: 'PRIYA123456', name: 'Darshan Verma', balance: 50000, mobile: '8140003126', kyc: 'Approved' },
  { id: 'PRIYA998877', name: 'Rajesh Kumar', balance: 12000, mobile: '9988776655', kyc: 'Pending' },
  { id: 'PRIYA445566', name: 'Anita Shah', balance: 4500, mobile: '7766554433', kyc: 'Processing' },
];

const MOCK_KYC = [
  { id: 'K01', userId: 'PRIYA998877', name: 'Rajesh Kumar', type: 'Aadhaar', date: '02 Nov, 2024', status: 'Pending' },
  { id: 'K02', userId: 'PRIYA445566', name: 'Anita Shah', type: 'PAN Card', date: '01 Nov, 2024', status: 'Pending' },
];

const MOCK_WITHDRAWALS = [
  { id: 'W01', userId: 'PRIYA123456', name: 'Darshan Verma', amount: 2500, date: '03 Nov, 2024', status: 'Pending' },
  { id: 'W02', userId: 'PRIYA998877', name: 'Rajesh Kumar', amount: 500, date: '02 Nov, 2024', status: 'Pending' },
];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex font-inter">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#00008B] text-white transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8">
           <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-black uppercase tracking-tighter">Admin Panel</h2>
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden"><X /></button>
           </div>
           
           <nav className="space-y-2">
              <Link to="/admin/dashboard" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/10 transition-all font-bold text-sm">
                 <LayoutDashboard size={20} /> Overview
              </Link>
              <Link to="/admin/dashboard/users" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/10 transition-all font-bold text-sm">
                 <Users size={20} /> User Manager
              </Link>
              <Link to="/admin/dashboard/kyc" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/10 transition-all font-bold text-sm">
                 <ShieldCheck size={20} /> KYC Approvals
              </Link>
              <Link to="/admin/dashboard/withdrawals" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/10 transition-all font-bold text-sm">
                 <CreditCard size={20} /> Withdrawal Requests
              </Link>
           </nav>

           <div className="absolute bottom-8 left-8 right-8">
              <button onClick={() => navigate('/')} className="w-full flex items-center justify-center gap-3 p-4 bg-rose-600 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg active:scale-95 transition-all">
                 <LogOut size={16} /> Logout
              </button>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 min-h-screen pb-20">
        <header className="bg-white p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 z-40">
           <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 bg-gray-50 rounded-xl"><Menu /></button>
           <h1 className="text-lg font-black text-gray-800 uppercase tracking-tight">System Overview</h1>
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-black">AV</div>
           </div>
        </header>

        <div className="p-8">
           <Routes>
              <Route index element={<Overview />} />
              <Route path="users" element={<UserManager />} />
              <Route path="kyc" element={<KYCManager />} />
              <Route path="withdrawals" element={<WithdrawalManager />} />
           </Routes>
        </div>
      </main>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const Overview = () => (
  <div className="space-y-10 animate-fadeIn">
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', val: '1,452', icon: <Users />, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Pending KYC', val: '24', icon: <ShieldCheck />, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Payments Due', val: '₹14,200', icon: <IndianRupee />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Growth', val: '+12%', icon: <TrendingUp />, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6">
             <div className={`p-4 ${stat.bg} ${stat.color} rounded-2xl`}>{stat.icon}</div>
             <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-2xl font-black text-gray-800">{stat.val}</h3>
             </div>
          </div>
        ))}
     </div>

     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
           <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-6">Recent Activities</h3>
           <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600"><Smartphone size={18} /></div>
                      <div>
                         <p className="text-[11px] font-black text-gray-800 uppercase">User Registered</p>
                         <p className="text-[9px] font-bold text-gray-400">PRIYA10293 joined the store</p>
                      </div>
                   </div>
                   <span className="text-[8px] font-bold text-gray-300">2m ago</span>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-[#00008B] p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
           <div className="absolute right-0 top-0 opacity-10 rotate-12"><TrendingUp size={200} /></div>
           <h3 className="text-xl font-black uppercase tracking-tight mb-4">Financial Status</h3>
           <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-end">
                 <div>
                    <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-1">Total Payouts Done</p>
                    <h4 className="text-4xl font-black tracking-tighter">₹4,52,000</h4>
                 </div>
                 <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                    <TrendingUp />
                 </div>
              </div>
              <button className="w-full bg-white text-[#00008B] py-4 rounded-2xl font-black uppercase tracking-widest text-[10px]">View Full Report</button>
           </div>
        </div>
     </div>
  </div>
);

const UserManager = () => (
  <div className="space-y-6 animate-fadeIn">
     <div className="flex justify-between items-center mb-4 px-2">
        <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">User Manager</h2>
        <div className="flex items-center gap-3">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
              <input type="text" placeholder="Search ID/Mobile" className="bg-white p-3 pl-10 rounded-xl text-[10px] font-bold border border-gray-100 outline-none w-64" />
           </div>
           <button className="bg-blue-600 text-white p-3 rounded-xl flex items-center gap-2 font-black uppercase text-[9px] tracking-widest"><Plus size={16} /> Add User</button>
        </div>
     </div>

     <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100">
        <table className="w-full text-left">
           <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                 {['User ID', 'Name', 'Mobile', 'Balance', 'KYC', 'Action'].map(h => (
                   <th key={h} className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">{h}</th>
                 ))}
              </tr>
           </thead>
           <tbody className="divide-y divide-gray-50">
              {MOCK_USERS.map(u => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                   <td className="p-6 text-[11px] font-black text-blue-600">{u.id}</td>
                   <td className="p-6 text-[11px] font-bold text-gray-700">{u.name}</td>
                   <td className="p-6 text-[11px] font-bold text-gray-400">{u.mobile}</td>
                   <td className="p-6 text-[11px] font-black text-gray-800">₹{u.balance}</td>
                   <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${u.kyc === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                         {u.kyc}
                      </span>
                   </td>
                   <td className="p-6">
                      <button className="p-2 bg-gray-100 rounded-lg text-gray-400 hover:text-blue-600 transition-colors"><ChevronRight size={16} /></button>
                   </td>
                </tr>
              ))}
           </tbody>
        </table>
     </div>
  </div>
);

const KYCManager = () => (
  <div className="space-y-6 animate-fadeIn">
     <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">KYC Pending Approvals</h2>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_KYC.map(k => (
          <div key={k.id} className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 space-y-6">
             <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center font-black">KYC</div>
                   <div>
                      <h4 className="text-sm font-black text-gray-800 uppercase">{k.name}</h4>
                      <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{k.userId}</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{k.type}</p>
                   <p className="text-[8px] font-bold text-gray-300 mt-1">{k.date}</p>
                </div>
             </div>
             
             <div className="w-full aspect-video bg-gray-50 rounded-[1.8rem] border-2 border-dashed border-gray-200 flex items-center justify-center group cursor-pointer hover:bg-white transition-all overflow-hidden">
                <div className="text-center">
                   <Eye size={32} className="text-gray-300 mx-auto mb-2" />
                   <p className="text-[10px] font-black text-gray-400 uppercase">View Document</p>
                </div>
             </div>

             <div className="flex gap-4 pt-2">
                <button className="flex-1 bg-emerald-500 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all"><CheckCircle2 size={16} /> Approve</button>
                <button className="flex-1 bg-rose-50 text-rose-500 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all border border-rose-100"><XCircle size={16} /> Reject</button>
             </div>
          </div>
        ))}
     </div>
  </div>
);

const WithdrawalManager = () => (
  <div className="space-y-6 animate-fadeIn">
     <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Withdrawal Requests</h2>
     <div className="space-y-4">
        {MOCK_WITHDRAWALS.map(w => (
          <div key={w.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between group">
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-[1.5rem] flex flex-col items-center justify-center">
                   <IndianRupee size={24} />
                   <span className="text-[8px] font-black uppercase tracking-widest mt-0.5">PAY</span>
                </div>
                <div>
                   <h4 className="text-sm font-black text-gray-800 uppercase tracking-tight">{w.name}</h4>
                   <div className="flex items-center gap-3 text-gray-400 mt-1">
                      <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{w.userId}</span>
                      <span className="text-[9px] font-bold uppercase tracking-widest">• {w.date}</span>
                   </div>
                </div>
             </div>

             <div className="flex items-center gap-12">
                <div className="text-right">
                   <p className="text-2xl font-black text-gray-800 tracking-tighter">₹{w.amount}</p>
                   <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest mt-1">Pending Approval</p>
                </div>
                <div className="flex gap-2">
                   <button className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all"><ExternalLink size={20} /></button>
                   <button className="bg-[#00008B] text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-blue-100 active:scale-95 transition-all">Mark Success</button>
                </div>
             </div>
          </div>
        ))}
     </div>
  </div>
);

export default AdminDashboard;
