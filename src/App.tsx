import { useState, useEffect, useMemo, useRef, useCallback, useDeferredValue, Suspense, lazy, memo } from 'react';
import { Navbar } from './components/Navbar';
import { CategoryNav } from './components/CategoryNav';
import { Hero } from './components/Hero';
import { StageFilter } from './components/StageFilter';
import { ProductCard } from './components/ProductCard';
import { Footer } from './components/Footer';
import { PRODUCTS, PRODUCT_MAP, Product } from './data/products';
import { ShoppingBag, ArrowUpRight, RotateCcw, SearchX } from 'lucide-react';
import { formatCOP } from './utils/format';
import type { CartItem } from './components/CartDrawer';

// Lazy-load off-screen and modal components to reduce initial bundle size (bundle-dynamic-imports)
const CartDrawer = lazy(() =>
  import('./components/CartDrawer').then((m) => ({ default: m.CartDrawer }))
);
const SizeGuideModal = lazy(() =>
  import('./components/SizeGuideModal').then((m) => ({ default: m.SizeGuideModal }))
);

// Versioned localStorage schema storing minimal identifiers to reduce size and prevent stale data (client-localstorage-schema)
interface StoredCartItem {
  id: string;
  quantity: number;
}

const CART_STORAGE_KEY = 'baby_store_cart:v1';
const LEGACY_CART_KEY = 'baby_store_cart';

function loadInitialCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      const parsed: StoredCartItem[] = JSON.parse(saved);
      return parsed
        .map((item) => {
          const product = PRODUCT_MAP.get(item.id);
          return product ? { product, quantity: item.quantity } : null;
        })
        .filter((item): item is CartItem => item !== null);
    }

    // Auto-migration from legacy unversioned storage key (client-localstorage-schema)
    const legacy = localStorage.getItem(LEGACY_CART_KEY);
    if (legacy) {
      const parsed = JSON.parse(legacy);
      const items: CartItem[] = parsed
        .map((item: { product?: { id: string }; id?: string; quantity?: number }) => {
          const productId = item.product?.id || item.id;
          if (!productId) return null;
          const product = PRODUCT_MAP.get(productId);
          return product ? { product, quantity: item.quantity || 1 } : null;
        })
        .filter((item: CartItem | null): item is CartItem => item !== null);

      localStorage.removeItem(LEGACY_CART_KEY);
      return items;
    }
  } catch (error) {
    console.error('Failed to load cart from storage:', error);
  }
  return [];
}

// Hoisted static empty state to avoid re-creation on every render (rendering-hoist-jsx)
const EmptyFilterState = memo(function EmptyFilterState({
  onReset,
}: {
  onReset: () => void;
}) {
  return (
    <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border-2 border-dashed border-slate-300 max-w-md mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 mx-auto mb-4">
        <SearchX className="w-8 h-8 text-amber-700" />
      </div>
      <h3 className="font-['Fredoka'] text-xl font-bold text-slate-900 mb-2">
        No encontramos pañales con esos filtros
      </h3>
      <p className="text-xs text-slate-600 mb-6 leading-relaxed">
        Prueba seleccionando otra talla de pañal o limpiando los filtros para ver el catálogo completo.
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 text-white font-['Fredoka'] font-bold text-sm hover:bg-amber-500 hover:text-amber-950 focus-visible:ring-2 focus-visible:ring-amber-400 transition-colors cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Ver todos los pañales</span>
      </button>
    </div>
  );
});

export const App = () => {
  // Cart state persisted with lazy initialization (rerender-lazy-state-init)
  const [cartItems, setCartItems] = useState<CartItem[]>(loadInitialCart);

  // Filter states
  const [selectedStage, setSelectedStage] = useState<string>('ALL');
  const [selectedBrand, setSelectedBrand] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('diapers');

  // Defer search value to prevent filtering from blocking typing (rerender-use-deferred-value)
  const deferredSearchQuery = useDeferredValue(searchQuery);

  // UI state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);

  const catalogRef = useRef<HTMLDivElement>(null);

  // Versioned and minimized localStorage sync (client-localstorage-schema)
  useEffect(() => {
    try {
      const minimalData: StoredCartItem[] = cartItems.map((item) => ({
        id: item.product.id,
        quantity: item.quantity,
      }));
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(minimalData));
    } catch (e) {
      console.error('Could not save cart:', e);
    }
  }, [cartItems]);

  // Stable callbacks using functional setState (rerender-functional-setstate)
  const handleAddToCart = useCallback((product: Product) => {
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
  }, []);

  // Single-pass quantity update combining filter and map (js-combine-iterations)
  const handleUpdateQuantity = useCallback((productId: string, delta: number) => {
    setCartItems((prev) => {
      const result: CartItem[] = [];
      for (const item of prev) {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          if (newQty > 0) {
            result.push({ ...item, quantity: newQty });
          }
        } else {
          result.push(item);
        }
      }
      return result;
    });
  }, []);

  const handleRemoveItem = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const handleClearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const handleResetFilters = useCallback(() => {
    setSelectedStage('ALL');
    setSelectedBrand('Todas');
    setSearchQuery('');
  }, []);

  const scrollToCatalog = useCallback(() => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Fast O(1) quantity lookup map (js-index-maps, js-set-map-lookups)
  const cartQuantityMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of cartItems) {
      map.set(item.product.id, item.quantity);
    }
    return map;
  }, [cartItems]);

  // Filtered products list with loop-hoisted values (js-early-exit, js-cache-property-access)
  const filteredProducts = useMemo(() => {
    const query = deferredSearchQuery.trim().toLowerCase();
    const hasQuery = query.length > 0;
    const filterStage = selectedStage !== 'ALL';
    const filterBrand = selectedBrand !== 'Todas';

    return PRODUCTS.filter((product) => {
      if (filterStage && product.size !== selectedStage) {
        return false;
      }
      if (filterBrand && product.brand !== selectedBrand) {
        return false;
      }
      if (hasQuery) {
        return (
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.size.toLowerCase().includes(query) ||
          product.line.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [selectedStage, selectedBrand, deferredSearchQuery]);

  // Combined single iteration for cart totals (js-combine-iterations)
  const { totalCartCount, totalCartPrice } = useMemo(() => {
    let count = 0;
    let price = 0;
    for (const item of cartItems) {
      count += item.quantity;
      price += item.product.price * item.quantity;
    }
    return { totalCartCount: count, totalCartPrice: price };
  }, [cartItems]);

  const hasActiveFilters =
    selectedStage !== 'ALL' || selectedBrand !== 'Todas' || searchQuery.trim() !== '';

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
              <p className="text-sm text-slate-600 font-medium">
                Selecciona la etapa de tu bebé para ver opciones y comparar precios por unidad
              </p>
            </div>

            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="text-xs sm:text-sm font-bold text-sky-700 hover:text-sky-800 inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg p-1"
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
                const quantityInCart = cartQuantityMap.get(product.id) ?? 0;
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantityInCart={quantityInCart}
                    onAddToCart={handleAddToCart}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                );
              })}
            </div>
          ) : (
            <EmptyFilterState onReset={handleResetFilters} />
          )}
        </div>
      </main>

      {/* Floating Bottom Cart Pill on Mobile - Explicit conditional rendering (rendering-conditional-render) */}
      {totalCartCount > 0 && !isCartOpen ? (
        <div className="fixed bottom-4 inset-x-4 sm:hidden z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full p-4 rounded-2xl bg-amber-500 text-amber-950 font-['Fredoka'] font-bold shadow-xl shadow-amber-500/30 flex items-center justify-between border-2 border-amber-300 active:scale-98 transition-transform cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-sans tabular-nums font-bold">
                {totalCartCount}
              </span>
              <span className="text-base">Ver mi pedido</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg tabular-nums">{formatCOP(totalCartPrice)}</span>
              <ShoppingBag className="w-5 h-5 text-amber-950" />
            </div>
          </button>
        </div>
      ) : null}

      {/* Cart Drawer - Lazy-loaded with Suspense (bundle-dynamic-imports) */}
      {isCartOpen ? (
        <Suspense fallback={null}>
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />
        </Suspense>
      ) : null}

      {/* Size Guide Modal - Lazy-loaded with Suspense (bundle-dynamic-imports) */}
      {isSizeGuideOpen ? (
        <Suspense fallback={null}>
          <SizeGuideModal
            isOpen={isSizeGuideOpen}
            onClose={() => setIsSizeGuideOpen(false)}
            onSelectStage={setSelectedStage}
            onScrollToCatalog={scrollToCatalog}
          />
        </Suspense>
      ) : null}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
