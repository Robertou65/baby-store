import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { CategoryNav } from './components/CategoryNav';
import { Hero } from './components/Hero';
import { StageFilter } from './components/StageFilter';
import { ProductCard } from './components/ProductCard';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { Footer } from './components/Footer';
import { PRODUCTS, Product } from './data/products';
import { ShoppingBag, ArrowUpRight, RotateCcw } from 'lucide-react';
import { formatCOP } from './utils/format';

export const App: React.FC = () => {
  // Cart state persisted in localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('baby_store_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filter states
  const [selectedStage, setSelectedStage] = useState<string>('ALL');
  const [selectedBrand, setSelectedBrand] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('diapers');

  // UI state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);

  const catalogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('baby_store_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Could not save cart:', e);
    }
  }, [cartItems]);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Stage filter
      if (selectedStage !== 'ALL' && product.size !== selectedStage) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'Todas' && product.brand !== selectedBrand) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesSize = product.size.toLowerCase().includes(query);
        const matchesLine = product.line.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        return matchesName || matchesBrand || matchesSize || matchesLine || matchesDesc;
      }
      return true;
    });
  }, [selectedStage, selectedBrand, searchQuery]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const hasActiveFilters =
    selectedStage !== 'ALL' || selectedBrand !== 'Todas' || searchQuery.trim() !== '';

  const handleResetFilters = () => {
    setSelectedStage('ALL');
    setSelectedBrand('Todas');
    setSearchQuery('');
  };

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FDFBF7]">
      {/* Top Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Category Bar */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Playroom Hero */}
        <Hero onScrollToCatalog={scrollToCatalog} />

        {/* Catalog Section */}
        <div ref={catalogRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
          {/* Section Heading */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="font-['Fredoka'] text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Catálogo de Pañales
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                Selecciona la etapa de tu bebé para ver opciones y comparar precios por unidad
              </p>
            </div>
            
            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="text-xs sm:text-sm font-bold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              <span>¿No sabes qué talla elegir? Consulta la guía</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Stage & Brand Filter Ribbon */}
          <StageFilter
            selectedStage={selectedStage}
            onSelectStage={setSelectedStage}
            selectedBrand={selectedBrand}
            onSelectBrand={setSelectedBrand}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalResults={filteredProducts.length}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => {
                const inCart = cartItems.find((ci) => ci.product.id === product.id);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantityInCart={inCart ? inCart.quantity : 0}
                    onAddToCart={handleAddToCart}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                );
              })}
            </div>
          ) : (
            /* Empty Filter State */
            <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border-2 border-dashed border-slate-300 max-w-md mx-auto my-8">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl mx-auto mb-4">
                🔍
              </div>
              <h3 className="font-['Fredoka'] text-xl font-bold text-slate-800 mb-2">
                No encontramos pañales con esos filtros
              </h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Prueba seleccionando otra talla de pañal o limpiando los filtros para ver el catálogo completo.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 text-white font-['Fredoka'] font-bold text-sm hover:bg-amber-500 hover:text-amber-950 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ver todos los pañales</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Floating Bottom Cart Pill on Mobile */}
      {totalCartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-4 inset-x-4 sm:hidden z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full p-4 rounded-2xl bg-amber-500 text-amber-950 font-['Fredoka'] font-bold shadow-xl shadow-amber-500/30 flex items-center justify-between border-2 border-amber-300 active:scale-98 transition-transform"
          >
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-sans">
                {totalCartCount}
              </span>
              <span className="text-base">Ver mi pedido</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">{formatCOP(totalCartPrice)}</span>
              <ShoppingBag className="w-5 h-5 text-amber-950" />
            </div>
          </button>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        onSelectStage={(stage) => setSelectedStage(stage)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
