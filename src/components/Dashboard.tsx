
import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { User, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import HomeContent from './HomeContent';
import TaskContent from './TaskContent';
import WalletContent from './WalletContent';
import MenuContent from './MenuContent';
import InviteContent from './InviteContent';
import CategoryView from './CategoryView';
import BlogView from './BlogView';
import BlogList from './BlogList';
import LuckySpinPage from './LuckySpinPage';
import YouTubeTaskPage from './YouTubeTaskPage';
import InvestmentPage from './InvestmentPage';
import { Home, Users, Wallet as WalletIcon, CheckSquare, TrendingUp, Menu } from 'lucide-react';

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Dashboard: React.FC<Props> = ({ user, setUser, language, setLanguage }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/dashboard' || path === '/dashboard/') return 'home';
    if (path.includes('/task')) return 'task';
    if (path.includes('/invite')) return 'invite';
    if (path.includes('/wallet')) return 'wallet';
    if (path.includes('/menu')) return 'menu';
    return 'home';
  };

  const activeTab = getActiveTab();

  const handleNav = (id: string) => {
    navigate(`/dashboard/${id === 'home' ? '' : id}`);
  };

  const navItems = [
    { id: 'home', label: 'HOME', icon: <Home size={22} />, color: 'bg-blue-600', lightColor: 'bg-blue-50', textColor: 'text-blue-600' },
    { id: 'task', label: 'TASK', icon: <CheckSquare size={22} />, color: 'bg-amber-500', lightColor: 'bg-amber-50', textColor: 'text-amber-600' },
    { id: 'invite', label: 'INVITE', icon: <Users size={28} />, color: 'bg-pink-600', lightColor: 'bg-pink-50', textColor: 'text-pink-600', special: true },
    { id: 'wallet', label: 'WALLET', icon: <WalletIcon size={22} />, color: 'bg-emerald-500', lightColor: 'bg-emerald-50', textColor: 'text-emerald-600' },
    { id: 'menu', label: 'MENU', icon: <Menu size={22} />, color: 'bg-purple-600', lightColor: 'bg-purple-50', textColor: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col pb-28">
      <main className="flex-1">
        <Routes>
          <Route index element={<HomeContent user={user} language={language} setLanguage={setLanguage} />} />
          <Route path="task" element={<TaskContent user={user} language={language} />} />
          <Route path="lucky-spin" element={<LuckySpinPage user={user} setUser={setUser} />} />
          <Route path="youtube-tasks" element={<YouTubeTaskPage user={user} setUser={setUser} />} />
          <Route path="wallet" element={<WalletContent user={user} setUser={setUser} language={language} />} />
          <Route path="invite" element={<InviteContent user={user} language={language} />} />
          <Route path="investment" element={<InvestmentPage user={user} setUser={setUser} language={language} />} />
          {/* Fix: Passed missing setUser prop to MenuContent */}
          <Route path="menu" element={<MenuContent user={user} setUser={setUser} language={language} setLanguage={setLanguage} onLogout={() => setUser(null)} />} />
          <Route path="category/:type/:catId" element={<CategoryView />} />
          <Route path="blog/:blogId" element={<BlogView />} />
          <Route path="blogs" element={<BlogList />} />
        </Routes>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center p-3 px-2 shadow-[0_-15px_40px_rgba(0,0,0,0.08)] z-[1000] rounded-t-[2.5rem]">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => handleNav(item.id)}
            className="flex flex-col items-center group relative"
          >
            <div className={`
              ${item.special ? 'w-16 h-16 -mt-10 mb-1' : 'w-12 h-12 mb-1'} 
              rounded-full flex items-center justify-center transition-all duration-300 transform group-active:scale-90
              ${activeTab === item.id 
                ? `${item.color} text-white shadow-lg ${item.special ? 'shadow-pink-200' : 'shadow-blue-100'}` 
                : `${item.lightColor} ${item.textColor} border border-white`
              }
            `}>
              {item.icon}
            </div>
            <span className={`text-[8px] font-black tracking-widest uppercase transition-colors ${activeTab === item.id ? item.textColor : 'text-gray-400'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Dashboard;
