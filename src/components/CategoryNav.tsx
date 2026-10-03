import { memo, type ReactNode } from 'react';
import { Sparkles, Shirt, Heart, Gift } from 'lucide-react';
import { CATEGORIES } from '../data/products';

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

const ICONS: Record<string, ReactNode> = {
  Sparkles: <Sparkles className="w-4 h-4" />,
  Shirt: <Shirt className="w-4 h-4" />,
  Heart: <Heart className="w-4 h-4" />,
  Gift: <Gift className="w-4 h-4" />,
};

export const CategoryNav = memo<CategoryNavProps>(function CategoryNav({
  activeCategory,
  onSelectCategory,
}) {
  return (
    <nav className="py-4 border-b border-slate-200/80 overflow-x-auto no-scrollbar" aria-label="Categorías de la tienda">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 min-w-max">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider pr-1">
            Secciones:
          </span>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => cat.active && onSelectCategory(cat.id)}
                disabled={!cat.active}
                title={cat.active ? `Ver sección ${cat.name}` : `${cat.name} estará disponible próximamente`}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-xs shadow-sky-200 font-bold focus-visible:ring-2 focus-visible:ring-sky-400'
                    : cat.active
                    ? 'bg-white text-slate-700 border border-slate-200 hover:border-sky-300 hover:bg-slate-50 hover:text-sky-800 cursor-pointer focus-visible:ring-2 focus-visible:ring-sky-400'
                    : 'bg-slate-100 text-slate-500 border border-slate-200/60 cursor-not-allowed opacity-85'
                }`}
              >
                <span className={isActive ? 'text-white' : cat.active ? 'text-sky-600' : 'text-slate-500'}>
                  {ICONS[cat.icon]}
                </span>
                <span>{cat.name}</span>
                {cat.count > 0 ? (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full tabular-nums ${
                      isActive ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {cat.count}
                  </span>
                ) : null}
                {cat.tag ? (
                  <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                    {cat.tag}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
});
