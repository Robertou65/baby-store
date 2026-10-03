import { memo } from 'react';
import { Truck, ShieldCheck, HeartHandshake, ArrowDown, PackageCheck } from 'lucide-react';

interface HeroProps {
  onScrollToCatalog: () => void;
}

export const Hero = memo<HeroProps>(function Hero({ onScrollToCatalog }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14">
      {/* Decorative Playroom floating blocks background */}
      <div className="absolute top-4 left-6 w-16 h-16 rounded-3xl bg-amber-200/40 rotate-12 pointer-events-none -z-10" />
      <div className="absolute bottom-6 right-8 w-24 h-24 rounded-full bg-sky-200/40 pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 w-12 h-12 rounded-2xl bg-rose-200/30 -rotate-6 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-50 via-white to-sky-50 rounded-3xl p-6 sm:p-10 border-2 border-amber-200/80 shadow-2xs relative">
          <div className="max-w-3xl">
            <h1 className="font-['Fredoka'] text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]">
              Pañales originales para cuidar la piel y el sueño de tu bebé
            </h1>
            
            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl font-normal">
              Encuentra las marcas líderes en Colombia (<strong className="text-slate-900 font-semibold">Winny</strong>, <strong className="text-slate-900 font-semibold">Pequeñín</strong> y <strong className="text-slate-900 font-semibold">Babysec</strong>) en todas las tallas desde recién nacido hasta etapa 5. Pide fácilmente por WhatsApp con entrega directa a tu puerta.
            </p>

            {/* Quick CTAs */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onScrollToCatalog}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-['Fredoka'] font-bold text-base sm:text-lg shadow-sm shadow-amber-300/40 active:scale-98 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 transition-all cursor-pointer"
              >
                <span>Explorar Catálogo de Pañales</span>
                <ArrowDown className="w-5 h-5 text-amber-950" />
              </button>

              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/90 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 shadow-2xs">
                <PackageCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Precios claros con costo por unidad</span>
              </div>
            </div>

            {/* Trust Badges Row */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 text-amber-800" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Envíos Rápidos</h3>
                  <p className="text-xs text-slate-600">Despacho seguro para tu comodidad</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-sky-800" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">100% Originales</h3>
                  <p className="text-xs text-slate-600">Empaques sellados de fábrica</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5 text-emerald-800" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Atención Personalizada</h3>
                  <p className="text-xs text-slate-600">Te asesoramos con la talla por WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
