import { memo } from 'react';
import { ShoppingBag, Check, Plus, Minus } from 'lucide-react';
import { Product } from '../data/products';
import { formatCOP, getStageColor } from '../utils/format';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
}

// Memoized to prevent re-rendering when other items in catalog or cart are mutated (rerender-memo)
export const ProductCard = memo<ProductCardProps>(function ProductCard({
  product,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity,
}) {
  const unitPrice = Math.round(product.price / product.units);
  const stageStyle = getStageColor(product.size);

  return (
    <article
      className="group bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200/80 shadow-2xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between relative"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 450px' }}
    >
      {/* Top Badges */}
      <div className="flex items-center justify-between gap-2 mb-3">
        {/* Stage Badge */}
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold font-['Fredoka'] ${stageStyle.bg} ${stageStyle.text} border ${stageStyle.border}`}
        >
          {product.size} • {product.weightGuide}
        </span>

        {/* Marketing Badge */}
        {product.badge ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-amber-950 shadow-2xs">
            {product.badge}
          </span>
        ) : null}
      </div>

      {/* Product Image Frame */}
      <div className="relative aspect-square w-full rounded-2xl bg-[#F8F5EE] overflow-hidden mb-4 p-4 flex items-center justify-center group-hover:scale-102 transition-transform">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-xl bg-white/95 backdrop-blur-xs text-xs font-bold text-slate-800 shadow-2xs">
          <span className="tabular-nums">{product.units}</span> unidades
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Product Name leads the section with no preceding eyebrow */}
          <h3 className="font-['Fredoka'] text-lg font-bold text-slate-900 leading-snug mb-1 group-hover:text-amber-600 transition-colors">
            {product.name}
          </h3>

          {/* Brand & Line metadata */}
          <p className="text-xs font-semibold text-slate-600 mb-2">
            {product.brand} · <span className="text-slate-500 font-normal">{product.line}</span>
          </p>

          {/* Short description */}
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4 font-normal">
            {product.description}
          </p>
        </div>

        {/* Pricing Block */}
        <div className="pt-3 border-t border-slate-100 mb-4">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-500 block font-medium">Precio</span>
              <span className="font-['Fredoka'] text-2xl font-bold text-slate-900 tracking-tight tabular-nums">
                {formatCOP(product.price)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 block font-medium">Costo unitario</span>
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg tabular-nums">
                ~{formatCOP(unitPrice)} / u
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {quantityInCart === 0 ? (
          <button
            onClick={() => onAddToCart(product)}
            className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-97 text-amber-950 font-['Fredoka'] font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-2xs shadow-amber-300/30 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 transition-all cursor-pointer"
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <ShoppingBag className="w-4 h-4 text-amber-950" />
            <span>Agregar al carrito</span>
          </button>
        ) : (
          <div className="flex items-center justify-between gap-2 p-1.5 rounded-2xl bg-amber-100/70 border border-amber-300">
            <button
              onClick={() => onUpdateQuantity(product.id, -1)}
              className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 flex items-center justify-center font-bold text-sm shadow-2xs transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500"
              title="Disminuir cantidad"
              aria-label={`Disminuir cantidad de ${product.name}`}
            >
              <Minus className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                <strong className="tabular-nums">{quantityInCart}</strong> en carrito
              </span>
            </div>
            <button
              onClick={() => onUpdateQuantity(product.id, 1)}
              className="w-9 h-9 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-sm shadow-2xs transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500"
              title="Aumentar cantidad"
              aria-label={`Aumentar cantidad de ${product.name}`}
            >
              <Plus className="w-4 h-4 text-amber-950" />
            </button>
          </div>
        )}
      </div>
    </article>
  );
});
