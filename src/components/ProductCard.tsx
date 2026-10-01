import React from 'react';
import { ShoppingBag, Check, Plus, Minus } from 'lucide-react';
import { Product } from '../data/products';
import { formatCOP, getStageColor } from '../utils/format';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity,
}) => {
  const unitPrice = Math.round(product.price / product.units);
  const stageStyle = getStageColor(product.size);

  return (
    <article className="group bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200/80 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between relative">
      {/* Top Badges */}
      <div className="flex items-center justify-between gap-2 mb-3">
        {/* Stage Badge */}
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold font-['Fredoka'] ${stageStyle.bg} ${stageStyle.text} border ${stageStyle.border}`}
        >
          {product.size} • {product.weightGuide}
        </span>

        {/* Marketing Badge */}
        {product.badge && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-amber-950 shadow-xs">
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Image Frame */}
      <div className="relative aspect-square w-full rounded-2xl bg-[#F8F5EE] overflow-hidden mb-4 p-4 flex items-center justify-center group-hover:scale-102 transition-transform">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-xs text-[11px] font-bold text-slate-700 shadow-xs">
          {product.units} unidades
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Brand Pill */}
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            {product.brand} • {product.line}
          </span>

          {/* Product Name */}
          <h3 className="font-['Fredoka'] text-lg font-bold text-slate-800 leading-snug mb-1.5 group-hover:text-amber-600 transition-colors">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4 font-normal">
            {product.description}
          </p>
        </div>

        {/* Pricing Block */}
        <div className="pt-3 border-t border-slate-100 mb-4">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Precio</span>
              <span className="font-['Fredoka'] text-2xl font-bold text-slate-900 tracking-tight">
                {formatCOP(product.price)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-medium">Costo unitario</span>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg">
                ~{formatCOP(unitPrice)} / u
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {quantityInCart === 0 ? (
          <button
            onClick={() => onAddToCart(product)}
            className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-97 text-amber-950 font-['Fredoka'] font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs shadow-amber-300/30 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-amber-950" />
            <span>Agregar al carrito</span>
          </button>
        ) : (
          <div className="flex items-center justify-between gap-2 p-1.5 rounded-2xl bg-amber-100/70 border border-amber-300">
            <button
              onClick={() => onUpdateQuantity(product.id, -1)}
              className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 flex items-center justify-center font-bold text-sm shadow-xs transition-colors"
              title="Disminuir cantidad"
            >
              <Minus className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>{quantityInCart} en carrito</span>
            </div>
            <button
              onClick={() => onUpdateQuantity(product.id, 1)}
              className="w-9 h-9 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-sm shadow-xs transition-colors"
              title="Aumentar cantidad"
            >
              <Plus className="w-4 h-4 text-amber-950" />
            </button>
          </div>
        )}
      </div>
    </article>
  );
};
