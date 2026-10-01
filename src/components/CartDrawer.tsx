import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, Truck } from 'lucide-react';
import { Product } from '../data/products';
import { formatCOP, getStageColor } from '../utils/format';

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

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSendWhatsAppOrder = () => {
    let message = `🧸 *PEDIDO - BABY STORE* 🧸\n`;
    message += `-----------------------------\n`;
    if (customerName.trim()) message += `👤 *Cliente:* ${customerName.trim()}\n`;
    if (customerPhone.trim()) message += `📱 *Teléfono:* ${customerPhone.trim()}\n`;
    if (customerAddress.trim()) message += `📍 *Dirección:* ${customerAddress.trim()}\n`;
    if (customerNotes.trim()) message += `📝 *Notas:* ${customerNotes.trim()}\n`;
    message += `-----------------------------\n`;
    message += `📦 *PRODUCTOS SOLICITADOS:*\n`;

    items.forEach((item) => {
      const itemSubtotal = item.product.price * item.quantity;
      message += `• ${item.quantity}x ${item.product.name} (${item.product.size} - ${item.product.units}u) - ${formatCOP(itemSubtotal)}\n`;
    });

    message += `-----------------------------\n`;
    message += `💰 *TOTAL PEDIDO:* ${formatCOP(totalAmount)}\n`;
    message += `🛵 *Entrega:* A domicilio en Colombia\n`;
    message += `¡Quedo atento a la confirmación de disponibilidad y envío! Gracias 😊`;

    const encodedText = encodeURIComponent(message);
    // WhatsApp store phone number (Colombian phone format)
    const storePhone = '573001234567';
    window.open(`https://wa.me/${storePhone}?text=${encodedText}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
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
                <h2 className="font-['Fredoka'] text-xl font-bold text-slate-900">
                  Tu Carrito de Pañales
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {totalUnits} {totalUnits === 1 ? 'producto' : 'productos'} seleccionado{totalUnits === 1 ? '' : 's'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 flex items-center justify-center text-3xl mb-4">
                  🧸
                </div>
                <h3 className="font-['Fredoka'] text-xl font-bold text-slate-800 mb-1">
                  Tu carrito está vacío
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mb-6">
                  Agrega los pañales que tu bebé necesita para armar tu pedido fácilmente.
                </p>
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-['Fredoka'] font-bold text-sm shadow-xs transition-colors"
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
                              className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${stage.bg} ${stage.text}`}
                            >
                              {item.product.size}
                            </span>
                            <span className="text-[10px] text-slate-400 font-semibold uppercase">
                              {item.product.brand}
                            </span>
                          </div>
                          <h4 className="font-['Fredoka'] text-sm font-bold text-slate-800 truncate">
                            {item.product.name}
                          </h4>
                          <span className="text-xs font-bold text-slate-900 block">
                            {formatCOP(subtotal)}
                          </span>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="w-6 h-6 rounded-lg bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 flex items-center justify-center font-bold text-xs shadow-2xs"
                            title="Disminuir"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="w-6 h-6 rounded-lg bg-amber-500 hover:bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-xs shadow-2xs"
                            title="Aumentar"
                          >
                            <Plus className="w-3 h-3 text-amber-950" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery Information Section */}
                <div className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-2xs space-y-3 mt-6">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                    <Truck className="w-4 h-4 text-amber-600" />
                    <span>Datos de entrega para WhatsApp (Opcional):</span>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Tu nombre completo"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-amber-400 outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Celular / WhatsApp"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-amber-400 outline-hidden"
                    />
                    <input
                      type="text"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="Dirección y barrio"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-amber-400 outline-hidden"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      placeholder="Instrucciones adicionales (ej. Torre 2, apto 401)"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-amber-400 outline-hidden"
                    />
                  </div>
                </div>

                <div className="text-right">
                  <button
                    onClick={onClearCart}
                    className="text-[11px] font-bold text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    Vaciar todo el carrito
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout Trigger */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Total a pagar:</span>
                  <span className="font-['Fredoka'] text-2xl font-bold text-slate-900">
                    {formatCOP(totalAmount)}
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  Entrega local disponible
                </span>
              </div>

              <button
                onClick={handleSendWhatsAppOrder}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-['Fredoka'] font-bold text-base flex items-center justify-center gap-2.5 shadow-md shadow-emerald-200 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>Pedir por WhatsApp Ahora</span>
              </button>

              <p className="text-[11px] text-center text-slate-400">
                Al presionar, se abrirá WhatsApp con el resumen de tu pedido listo para enviar.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
