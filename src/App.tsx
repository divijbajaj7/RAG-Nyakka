/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { PRODUCTS, heroCampaignImg } from './data/products';
import { Product, ProductCategory, CartItem } from './types/product';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { RatingSummaryModal } from './components/RatingSummaryModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  // Navigation & Filter state
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all' | 'best-sellers'>('all');
  const [activeCollectionFilter, setActiveCollectionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      quantity: 1,
    },
    {
      product: PRODUCTS[4],
      quantity: 1,
      selectedShade: 'Madras Kaapi (Warm Terracotta)',
    },
  ]);
  const [wishlist, setWishlist] = useState<Product[]>([PRODUCTS[1]]);

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [ratingSummaryProduct, setRatingSummaryProduct] = useState<Product | null>(null);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'cart' | 'wishlist' | 'info', title: string, subtitle?: string) => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, type, title, subtitle }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, selectedShade?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (it) => it.product.id === product.id && it.selectedShade === selectedShade
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [...prev, { product, quantity, selectedShade }];
      }
    });

    addToast(
      'cart',
      `Added to Bag (${quantity})`,
      `${product.name}${selectedShade ? ` · ${selectedShade}` : ''}`
    );
  };

  const handleQuickAdd = (product: Product, selectedShade?: string) => {
    handleAddToCart(product, 1, selectedShade);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number, selectedShade?: string) => {
    setCartItems((prev) =>
      prev.map((it) => {
        if (it.product.id === productId && it.selectedShade === selectedShade) {
          return { ...it, quantity };
        }
        return it;
      })
    );
  };

  const handleRemoveFromCart = (productId: string, selectedShade?: string) => {
    setCartItems((prev) =>
      prev.filter((it) => !(it.product.id === productId && it.selectedShade === selectedShade))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    const exists = wishlist.some((p) => p.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      addToast('info', 'Removed from Wishlist', product.name);
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast('wishlist', 'Added to Wishlist', product.name);
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  // Filtered & Sorted products calculation
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (activeCategory === 'best-sellers') {
      result = result.filter((p) => p.collections.includes('best-sellers'));
    } else if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Sub-collection focus
    if (activeCollectionFilter !== 'all') {
      result = result.filter((p) => p.collections.includes(activeCollectionFilter));
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.keyIngredients.some((ing) => ing.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'reviews') {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [activeCategory, activeCollectionFilter, searchQuery, sortBy]);

  // Curated Best Sellers for the featured spotlight strip
  const topBestSellers = useMemo(() => {
    return PRODUCTS.filter((p) => p.collections.includes('best-sellers')).slice(0, 3);
  }, []);

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, it) => acc + it.quantity, 0);
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-[#FAF7F5] flex flex-col text-stone-900">
      {/* Header with Top Bar Contract */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setActiveCollectionFilter('all');
        }}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        {/* Campaign Hero Showcase */}
        <HeroBanner
          onExploreCollection={(cat) => {
            setActiveCategory(cat);
            const el = document.getElementById('catalog-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Best-Selling Curated Ribbon Spotlight */}
        <section className="bg-white border-b border-stone-200 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-200/80 gap-2">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FC2779] mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Nykaa Hall of Fame</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif-display text-stone-900">
                  Best-Selling Collections
                </h2>
              </div>
              <button
                onClick={() => {
                  setActiveCategory('best-sellers');
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-[#FC2779] hover:underline flex items-center gap-1 shrink-0"
              >
                <span>View all top-rated</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3-Column Best Sellers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topBestSellers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickAdd={handleQuickAdd}
                  onQuickView={setQuickViewProduct}
                  onOpenReviews={setRatingSummaryProduct}
                  isWishlisted={wishlist.some((p) => p.id === product.id)}
                  onToggleWishlist={handleToggleWishlist}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Main Catalog & Filter Section */}
        <section id="catalog-section" className="scroll-mt-16">
          <CategoryNav
            activeCategory={activeCategory}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              setActiveCollectionFilter('all');
            }}
            activeCollectionFilter={activeCollectionFilter}
            onSelectCollectionFilter={setActiveCollectionFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalCount={filteredProducts.length}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Active search filter feedback if any */}
            {searchQuery && (
              <div className="mb-6 p-3 bg-stone-100 rounded-lg flex items-center justify-between text-xs">
                <span>
                  Search results for: <strong className="text-stone-900">"{searchQuery}"</strong>
                </span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-[#FC2779] hover:underline font-semibold"
                >
                  Clear search
                </button>
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-2xl border border-stone-200 max-w-md mx-auto p-8">
                <h3 className="text-base font-bold text-stone-900">No products found</h3>
                <p className="text-xs text-stone-500 mt-1 mb-4">
                  We couldn't find any items matching your active category or search query.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setActiveCollectionFilter('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickAdd={handleQuickAdd}
                    onQuickView={setQuickViewProduct}
                    onOpenReviews={setRatingSummaryProduct}
                    isWishlisted={wishlist.some((p) => p.id === product.id)}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Editorial Story / Brand Trust Section */}
        <section className="bg-[#F4EFEB] border-t border-stone-200 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-xl border border-stone-200">
                <div className="w-10 h-10 rounded-lg bg-[#FC2779]/10 text-[#FC2779] flex items-center justify-center font-serif-display font-bold text-lg mb-4">
                  01
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">
                  Dermatologist &amp; Lab Certified
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Every active skincare serum and treatment undergoes rigorous third-party patch testing and stability validation for guaranteed efficacy.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl border border-stone-200">
                <div className="w-10 h-10 rounded-lg bg-[#FC2779]/10 text-[#FC2779] flex items-center justify-center font-serif-display font-bold text-lg mb-4">
                  02
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">
                  Universal Shades for Indian Tones
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Formulated to celebrate warm, olive, and rich undertones with high-impact micronized pigments that do not turn ashy or transfer.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl border border-stone-200">
                <div className="w-10 h-10 rounded-lg bg-[#FC2779]/10 text-[#FC2779] flex items-center justify-center font-serif-display font-bold text-lg mb-4">
                  03
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">
                  Pure Botanicals &amp; Cruelty-Free
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Our personal care and body elixirs are crafted with cold-pressed botanical oils, unrefined shea butter, and zero harsh parabens.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewProduct ? wishlist.some((p) => p.id === quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Rating Summary Modal */}
      <RatingSummaryModal
        product={ratingSummaryProduct}
        isOpen={!!ratingSummaryProduct}
        onClose={() => setRatingSummaryProduct(null)}
        onQuickAdd={handleAddToCart}
      />

      {/* Shopping Bag Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Slide-Over Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToBag={(product) => handleAddToCart(product, 1)}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
