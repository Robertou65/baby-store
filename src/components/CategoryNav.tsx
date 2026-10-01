import React from 'react';
import { Sparkles, Shirt, Heart, Gift } from 'lucide-react';
import { CATEGORIES } from '../data/products';

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

const ICONS: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-4 h-4" />,
  Shirt: <Shirt className="w-4 h-4" />,
  Heart: <Heart className="w-4 h-4" />,
  Gift: <Gift className="w-4 h-4" />,
};

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <nav className="py-4 border-b border-slate-200/60 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 min-w-max">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider pr-1">
            Secciones:
          </span>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => cat.active && onSelectCategory(cat.id)}
                disabled={!cat.active}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-sm shadow-sky-200 scale-102 font-bold'
                    : cat.active
                    ? 'bg-white text-slate-700 border border-slate-200 hover:border-sky-300 hover:bg-slate-100 hover:text-sky-700'
                    : 'bg-slate-100/80 text-slate-400 border border-slate-200/50 cursor-not-allowed'
                }`}
              >
                <span className={isActive ? 'text-white' : cat.active ? 'text-sky-500' : 'text-slate-400'}>
                  {ICONS[cat.icon]}
                </span>
                <span>{cat.name}</span>
                {cat.count > 0 && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {cat.count}
                  </span>
                )}
                {cat.tag && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-500">
                    {cat.tag}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
