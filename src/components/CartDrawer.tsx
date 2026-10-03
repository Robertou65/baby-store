import { useState, useEffect, memo } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, Truck } from 'lucide-react';
import { Product } from '../data/products';
import { formatCOP, getStageColor } from '../utils/format';
import { BrandLogo } from './BrandLogo';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer = memo<CartDrawerProps>(function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  // Lock body scroll and listen for Escape key to dismiss dialog
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Combined single iteration for total amount and units (js-combine-iterations)
  let totalAmount = 0;
  let totalUnits = 0;
  for (const item of items) {
    totalUnits += item.quantity;
    totalAmount += item.product.price * item.quantity;
  }

  const handleSendWhatsAppOrder = () => {
    let message = `*PEDIDO - BABY STORE COLOMBIA*\n`;
    message += `-----------------------------\n`;
    if (customerName.trim()) message += `*Cliente:* ${customerName.trim()}\n`;
    if (customerPhone.trim()) message += `*Teléfono:* ${customerPhone.trim()}\n`;
    if (customerAddress.trim()) message += `*Dirección:* ${customerAddress.trim()}\n`;
    if (customerNotes.trim()) message += `*Notas:* ${customerNotes.trim()}\n`;
    message += `-----------------------------\n`;
    message += `*PRODUCTOS SOLICITADOS:*\n`;

    items.forEach((item) => {
      const itemSubtotal = item.product.price * item.quantity;
      message += `• ${item.quantity}x ${item.product.name} (${item.product.size} - ${item.product.units}u) - ${formatCOP(itemSubtotal)}\n`;
    });

    message += `-----------------------------\n`;
    message += `*TOTAL PEDIDO:* ${formatCOP(totalAmount)}\n`;
    message += `*Entrega:* A domicilio en Colombia\n`;
    message += `¡Quedo atento a la confirmación de disponibilidad y envío! Muchas gracias.`;

    const encodedText = encodeURIComponent(message);
    const storePhone = '573001234567';
    window.open(`https://wa.me/${storePhone}?text=${encodedText}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl border-l-2 border-amber-200 flex flex-col">
          {/* Header */}
          <div className="p-5 sm:p-6 bg-white border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-700 flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 id="cart-drawer-title" className="font-['Fredoka'] text-xl font-bold text-slate-900">
                  Tu Carrito de Pañales
                </h2>
                <p className="text-xs text-slate-600 font-medium">
                  <span className="tabular-nums">{totalUnits}</span> {totalUnits === 1 ? 'producto' : 'productos'} seleccionado{totalUnits === 1 ? '' : 's'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-amber-400 transition-colors cursor-pointer"
              aria-label="Cerrar carrito de compras"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center">
                <BrandLogo size="lg" className="mx-auto mb-4" />
                <h3 className="font-['Fredoka'] text-xl font-bold text-slate-800 mb-1">
                  Tu carrito está vacío
                </h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto mb-6">
                  Agrega los pañales que tu bebé necesita para armar tu pedido fácilmente.
                </p>
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-['Fredoka'] font-bold text-sm shadow-2xs focus-visible:ring-2 focus-visible:ring-amber-400 transition-colors cursor-pointer"
                >
                  Explorar catálogo
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  {items.map((item) => {
                    const stage = getStageColor(item.product.size);
                    const subtotal = item.product.price * item.quantity;
                    return (
                      <div
                        key={item.product.id}
                        className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs flex items-center gap-3"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-xl bg-slate-50 p-1.5 shrink-0 flex items-center justify-center">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span
                              className={`text-xs font-bold px-2 py-0.5 rounded-full ${stage.bg} ${stage.text}`}
                            >
                              {item.product.size}
                            </span>
                            <span className="text-xs text-slate-500 font-semibold uppercase">
                              {item.product.brand}
                            </span>
                          </div>
                          <h4 className="font-['Fredoka'] text-sm font-bold text-slate-800 truncate">
                            {item.product.name}
                          </h4>
                          <span className="text-xs font-bold text-slate-900 block tabular-nums">
                            {formatCOP(subtotal)}
                          </span>
                        </div>

                        {/* Quantity Counter with comfortable touch targets */}
                        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white hover:bg-slate-200 text-slate-700 hover:text-slate-900 flex items-center justify-center font-bold text-xs shadow-2xs transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400"
                            title="Disminuir"
                            aria-label={`Disminuir cantidad de ${item.product.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-slate-800 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500 hover:bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-xs shadow-2xs transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400"
                            title="Aumentar"
                            aria-label={`Aumentar cantidad de ${item.product.name}`}
                          >
                            <Plus className="w-3.5 h-3.5 text-amber-950" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-rose-400 rounded-lg"
                          title="Eliminar producto"
                          aria-label={`Eliminar ${item.product.name} del carrito`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery Information Section */}
                <div className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-2xs space-y-3 mt-6">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                    <Truck className="w-4 h-4 text-amber-600" />
                    <span>Datos de entrega para WhatsApp (Opcional):</span>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Tu nombre completo"
                      aria-label="Nombre completo del cliente"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-500 focus:bg-white focus:border-amber-400 focus-visible:outline-hidden transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Celular / WhatsApp"
                      aria-label="Número de celular o WhatsApp"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-500 focus:bg-white focus:border-amber-400 focus-visible:outline-hidden transition-all"
                    />
                    <input
                      type="text"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="Dirección y barrio"
                      aria-label="Dirección de entrega y barrio"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-500 focus:bg-white focus:border-amber-400 focus-visible:outline-hidden transition-all"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      placeholder="Instrucciones adicionales (ej. Torre 2, apto 401)"
                      aria-label="Instrucciones adicionales de entrega"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-500 focus:bg-white focus:border-amber-400 focus-visible:outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div className="text-right">
                  <button
                    onClick={onClearCart}
                    className="text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    Vaciar todo el carrito
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout Trigger */}
          {items.length > 0 ? (
            <div className="p-5 sm:p-6 bg-white border-t border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block font-medium">Total a pagar:</span>
                  <span className="font-['Fredoka'] text-2xl font-bold text-slate-900 tabular-nums">
                    {formatCOP(totalAmount)}
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  Entrega local disponible
                </span>
              </div>

              <button
                onClick={handleSendWhatsAppOrder}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-['Fredoka'] font-bold text-base flex items-center justify-center gap-2.5 shadow-md shadow-emerald-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>Pedir por WhatsApp Ahora</span>
              </button>

              <p className="text-xs text-center text-slate-500">
                Al presionar, se abrirá WhatsApp con el resumen de tu pedido listo para enviar.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
});
