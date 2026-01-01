
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ArrowRight, BookOpen, Clock, Star } from 'lucide-react';

const BlogList: React.FC = () => {
  const navigate = useNavigate();

  const blogs = [
    { id: 'blog1', title: 'Why open an HDFC Savings Account?', tag: 'SAVINGS', readTime: '3 min read', color: 'emerald', img: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=400' },
    { id: 'blog2', title: 'Top 5 Benefits of SBI Credit Cards', tag: 'CREDIT CARD', readTime: '5 min read', color: 'blue', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400' },
    { id: 'blog3', title: 'Why you need Health Insurance today?', tag: 'INSURANCE', readTime: '4 min read', color: 'rose', img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <div className="bg-white p-4 border-b border-gray-100 flex items-center gap-4 sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-xl text-gray-400 active:scale-90 transition-transform">
           <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col">
            <h2 className="text-sm font-black text-blue-900 uppercase tracking-widest leading-none">Financial Insights</h2>
            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Expert Advisor Blog</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-[#00008B] p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-100 relative overflow-hidden">
           <div className="absolute -right-4 -top-4 opacity-10">
              <Star size={100} />
           </div>
           <h3 className="text-xl font-black uppercase tracking-tight italic">Expert Knowledge Hub</h3>
           <p className="text-xs text-blue-200 mt-2 font-medium">Read professional advice to grow your wealth and make smart financial decisions.</p>
        </div>

        <div className="space-y-4">
          {blogs.map((blog) => (
            <div 
              key={blog.id}
              onClick={() => navigate(`/dashboard/blog/${blog.id}`)}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-50 active:scale-[0.98] transition-all cursor-pointer group"
            >
              <div className="h-40 relative">
                 <img src={blog.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={blog.title} />
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[8px] font-black text-gray-800 uppercase tracking-widest shadow-sm">
                    {blog.tag}
                 </div>
              </div>
              <div className="p-6 flex items-center justify-between">
                 <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2 mb-2">
                       <Clock size={12} className="text-gray-300" />
                       <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">{blog.readTime}</span>
                    </div>
                    <h4 className="text-sm font-black text-gray-800 uppercase leading-snug tracking-tight">
                       {blog.title}
                    </h4>
                 </div>
                 <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <ArrowRight size={18} />
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
