
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Bookmark, Clock, ArrowRight } from 'lucide-react';

const BlogView: React.FC = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  // Mock content for demonstration
  const blogData: Record<string, any> = {
    'blog1': {
      title: 'Why open an HDFC Savings Account?',
      category: 'SAVINGS',
      author: 'Financial Advisor',
      date: 'Oct 24, 2024',
      img: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=800',
      content: [
        'HDFC Bank offers one of the most reliable savings account experiences in India with a massive network of ATMs and branches.',
        'Benefits include instant digital account opening, high interest rates on balances, and exclusive lifestyle offers.',
        'By opening through Priyaadarsh Store, you not only get a world-class banking experience but also earn immediate referral coins in your wallet.'
      ]
    },
    'blog2': {
      title: 'Top 5 Benefits of SBI Credit Cards',
      category: 'CREDIT CARD',
      author: 'Credit Expert',
      date: 'Oct 22, 2024',
      img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      content: [
        'SBI SimplyClick is designed for the modern online shopper, offering 10X reward points on partner brands.',
        'Contactless technology ensures safe transactions at millions of merchants worldwide.',
        'Apply now to get a joining bonus of 500 Reward Points and special access to Priyaadarsh rewards.'
      ]
    }
  };

  const blog = blogData[blogId || ''] || blogData['blog1'];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Article Header */}
      <div className="p-4 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-50">
        <button onClick={() => navigate(-1)} className="p-2.5 bg-gray-50 rounded-2xl text-gray-400 active:scale-90 transition-transform">
           <ChevronLeft size={24} />
        </button>
        <div className="flex gap-2">
           <button className="p-2.5 bg-gray-50 rounded-2xl text-gray-400"><Bookmark size={20} /></button>
           <button className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl"><Share2 size={20} /></button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="px-4 mt-4">
        <div className="h-64 w-full rounded-[2.5rem] overflow-hidden shadow-lg">
           <img src={blog.img} className="w-full h-full object-cover" alt={blog.title} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
             <span className="text-[10px] font-black text-purple-600 bg-purple-50 px-3 py-1 rounded-full uppercase tracking-widest">{blog.category}</span>
             <div className="flex items-center gap-1.5 text-gray-300 text-[10px] font-bold">
                <Clock size={12} /> 4 MIN READ
             </div>
          </div>
          <h1 className="text-2xl font-black text-gray-900 uppercase leading-tight tracking-tight">
             {blog.title}
          </h1>
          <div className="flex items-center gap-2 pt-2">
             <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black text-[10px]">PA</div>
             <div className="text-[10px] font-bold">
                <p className="text-gray-800">{blog.author}</p>
                <p className="text-gray-400">{blog.date}</p>
             </div>
          </div>
        </div>

        <div className="space-y-4 text-gray-600 leading-relaxed text-sm font-medium">
          {blog.content.map((para: string, i: number) => (
             <p key={i}>{para}</p>
          ))}
        </div>

        <div className="pt-8">
           <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 space-y-4">
              <h3 className="text-sm font-black text-emerald-900 uppercase tracking-tight">Ready to take action?</h3>
              <p className="text-xs text-emerald-700 font-medium">Open your account now through our link and earn instant rewards in your coin wallet.</p>
              <button className="w-full bg-emerald-600 text-white p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-emerald-100">
                 Apply Now & Earn <ArrowRight size={16} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BlogView;
