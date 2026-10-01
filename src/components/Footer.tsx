import React from 'react';
import { MessageCircle, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t-2 border-amber-200/80 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center shadow-xs">
                <span className="text-xl">🧸</span>
              </div>
              <span className="font-['Fredoka'] text-2xl font-bold text-slate-800">
                Baby<span className="text-amber-500">Store</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              Tu tienda especializada en cuidado infantil y pañales en Colombia. Seleccionamos únicamente productos originales que protegen la piel de tu bebé y la tranquilidad de tu hogar.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full w-fit">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Próximamente: Ropa de bebé, aseo y accesorios</span>
            </div>
          </div>

          {/* Quick Brands */}
          <div>
            <h4 className="font-['Fredoka'] text-base font-bold text-slate-900 mb-3">
              Marcas Destacadas
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 font-medium">
              <li className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                <span>Winny (Sensitive & Ultratrim Sec)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Pequeñín (New Baby & Extra Protección)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Babysec (Ultra Protect)</span>
              </li>
            </ul>
          </div>

          {/* WhatsApp Direct Help */}
          <div>
            <h4 className="font-['Fredoka'] text-base font-bold text-slate-900 mb-3">
              Atención al Cliente
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              ¿Dudas con la talla o necesitas un pedido urgente?
            </p>
            <a
              href="https://wa.me/573001234567?text=Hola,%20necesito%20asesoría%20con%20los%20pañales"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-['Fredoka'] font-bold text-xs shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chatear por WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Baby Store Colombia. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>para las familias colombianas</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
