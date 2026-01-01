
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, Lock, CheckCircle, Youtube, Coins, Timer } from 'lucide-react';
import { User } from '../types';

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const YouTubeTaskPage: React.FC<Props> = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [activeTask, setActiveTask] = useState<number | null>(null);
  const [timer, setTimer] = useState(120); 
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const timerRef = useRef<any>(null);

  // Load completed tasks from localStorage to persist daily lock
  useEffect(() => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem('yt_tasks_completed_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === today) {
        setCompletedTasks(parsed.ids);
      } else {
        // Reset for new day
        setCompletedTasks([]);
        localStorage.setItem('yt_tasks_completed_data', JSON.stringify({ date: today, ids: [] }));
      }
    }
  }, []);

  const handleStartTask = (id: number) => {
    if (completedTasks.includes(id)) return;
    
    setActiveTask(id);
    setTimer(120);
    
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTaskCompletion(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleTaskCompletion = (id: number) => {
    setUser(u => u ? ({ ...u, coins: u.coins + 200 }) : u);
    
    const newCompleted = [...completedTasks, id];
    setCompletedTasks(newCompleted);
    localStorage.setItem('yt_tasks_completed_data', JSON.stringify({ 
        date: new Date().toDateString(), 
        ids: newCompleted 
    }));
    
    setActiveTask(null);
    alert(`Task Completed! 200 Coins added to your wallet.`);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const tasks = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Watch & Earn Video #${i + 1}`,
    reward: 200,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' 
  }));

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header */}
      <div className="bg-white p-4 pt-8 pb-8 border-b border-gray-100 flex items-center justify-between sticky top-0 z-[1002] shadow-sm">
        <button onClick={() => navigate(-1)} className="p-3 bg-gray-50 rounded-2xl text-gray-400 active:scale-90 transition-all">
          <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
            <div className="p-3 bg-red-50 text-red-600 rounded-2xl mb-1">
                <Youtube size={24} />
            </div>
            <h2 className="text-xs font-black text-gray-800 uppercase tracking-[0.2em] text-center">Video Tasks</h2>
        </div>
        <div className="w-12"></div>
      </div>

      <div className="p-6">
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50 mb-8 flex items-center justify-between">
            <div className="flex flex-col gap-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Daily Progress</p>
                <h3 className="text-2xl font-black text-blue-900">{completedTasks.length}/10</h3>
            </div>
            <div className="flex flex-col items-end gap-1">
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Total Earned</p>
                <h3 className="text-2xl font-black text-emerald-600">+{completedTasks.length * 200}</h3>
            </div>
        </div>

        <div className="space-y-4">
          {tasks.map(task => {
            const isCompleted = completedTasks.includes(task.id);
            const isActive = activeTask === task.id;

            return (
              <div key={task.id} className={`bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100 flex flex-col gap-5 transition-all ${isCompleted ? 'opacity-60 bg-gray-50' : ''}`}>
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isCompleted ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                           {isCompleted ? <CheckCircle size={24} /> : <Play size={24} />}
                        </div>
                        <div>
                            <h4 className="text-xs font-black text-gray-800 uppercase tracking-tight">{task.title}</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Earn {task.reward} Coins</p>
                        </div>
                    </div>
                    {isCompleted && (
                        <div className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                           <Lock size={10} /> Locked
                        </div>
                    )}
                 </div>

                 {isActive ? (
                    <div className="space-y-4 animate-fadeIn">
                       <div className="aspect-video w-full rounded-3xl bg-black overflow-hidden shadow-lg">
                          <iframe 
                            width="100%" 
                            height="100%" 
                            src={`${task.videoUrl}?autoplay=1&controls=0&disablekb=1&modestbranding=1`} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          ></iframe>
                       </div>
                       <div className="flex items-center justify-between bg-red-50 p-4 rounded-2xl border border-red-100">
                          <div className="flex items-center gap-3">
                             <Timer className="text-red-600 animate-pulse" size={20} />
                             <span className="text-lg font-black text-red-600 font-mono tracking-widest">
                                {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                             </span>
                          </div>
                          <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">Watching...</p>
                       </div>
                    </div>
                 ) : (
                    <button 
                      onClick={() => handleStartTask(task.id)}
                      disabled={isCompleted || activeTask !== null}
                      className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all ${
                        isCompleted 
                        ? 'bg-gray-100 text-gray-400' 
                        : activeTask !== null ? 'bg-gray-50 text-gray-300' : 'bg-blue-900 text-white shadow-lg active:scale-95'
                      }`}
                    >
                       {isCompleted ? <Lock size={16} /> : <Play size={16} />}
                       {isCompleted ? 'Task Locked' : 'Start Task'}
                    </button>
                 )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default YouTubeTaskPage;
