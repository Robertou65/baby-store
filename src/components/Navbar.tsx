import React from 'react';
import { ShoppingBag, MessageCircle, Ruler, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSizeGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSizeGuide,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-amber-100/80 transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-md shadow-amber-200/50 transform -rotate-3 hover:rotate-0 transition-transform">
              <span className="text-2xl" role="img" aria-label="Juguete">🧸</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Fredoka'] text-2xl font-bold tracking-tight text-slate-800">
                  Baby<span className="text-amber-500">Store</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <Sparkles className="w-3 h-3 mr-1 text-emerald-600" />
                  Oficial
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Pañales & Cuidado Esencial
              </p>
            </div>
          </div>

          {/* Center Notice / Trust Signal (desktop) */}
          <div className="hidden md:flex items-center gap-2 bg-amber-50 border border-amber-200/70 px-4 py-2 rounded-full text-xs font-medium text-amber-900 shadow-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Envíos locales el mismo día en Bogota</span>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Size Guide Trigger */}
            <button
              onClick={onOpenSizeGuide}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 transition-colors shadow-xs"
              title="Ver tabla de pesos y tallas"
            >
              <Ruler className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Guía de Tallas</span>
            </button>

            {/* Direct WhatsApp Contact */}
            <a
              href="https://wa.me/573001234567?text=Hola,%20tengo%20una%20consulta%20sobre%20los%20pañales"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Asesoría WhatsApp</span>
            </a>

            {/* Shopping Cart Pill Button */}
            <button
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 text-amber-950 font-['Fredoka'] font-bold text-base shadow-md shadow-amber-300/40 hover:bg-amber-400 active:scale-95 transition-all"
              aria-label="Abrir carrito de compras"
            >
              <ShoppingBag className="w-5 h-5 text-amber-950" />
              <span className="hidden xs:inline">Carrito</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-rose-600 text-white text-xs font-bold font-sans">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
