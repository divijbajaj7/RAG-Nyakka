import React, { useState } from 'react';
import { ShoppingBag, Search, Heart, X } from 'lucide-react';
import { ProductCategory } from '../types/product';

interface HeaderProps {
  activeCategory: ProductCategory | 'all' | 'best-sellers';
  onSelectCategory: (cat: ProductCategory | 'all' | 'best-sellers') => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  onSearchChange,
}) => {
  const [showPromo, setShowPromo] = useState(true);
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      {/* Slim dismissible promo banner (≤ 40px) */}
      {showPromo && (
        <div className="bg-[#1C1917] text-[#FAF7F5] px-4 py-2 text-xs flex items-center justify-between">
          <div className="mx-auto flex items-center gap-3 font-normal tracking-wide text-stone-200">
            <span>Special Offer: Complimentary Luxury Mini on orders above ₹999</span>
            <span aria-hidden="true" className="text-stone-500">·</span>
            <span className="hidden sm:inline">Use code <strong className="text-white font-medium">NYKAAFIRST</strong> for 15% off</span>
            <span aria-hidden="true" className="hidden sm:inline text-stone-500">·</span>
            <span className="hidden md:inline">100% Authentic Brands</span>
          </div>
          <button
            onClick={() => setShowPromo(false)}
            aria-label="Dismiss banner"
            className="text-stone-400 hover:text-white p-0.5 ml-2 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-5 Nav Links) — Zone 3 (1 Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark (Single text element wordmark in display face) */}
          <button
            onClick={() => onSelectCategory('all')}
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 font-serif-display whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            <span>NYKAA</span>
            <span className="w-2 h-2 rounded-full bg-[#FC2779] inline-block mb-1"></span>
          </button>

          {/* Zone 2: 4-5 concise single-line text links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
            <button
              onClick={() => onSelectCategory('all')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeCategory === 'all'
                  ? 'text-[#FC2779] border-b-2 border-[#FC2779] font-semibold'
                  : ''
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => onSelectCategory('skincare')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeCategory === 'skincare'
                  ? 'text-[#FC2779] border-b-2 border-[#FC2779] font-semibold'
                  : ''
              }`}
            >
              Skincare
            </button>
            <button
              onClick={() => onSelectCategory('beauty')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeCategory === 'beauty'
                  ? 'text-[#FC2779] border-b-2 border-[#FC2779] font-semibold'
                  : ''
              }`}
            >
              Beauty &amp; Makeup
            </button>
            <button
              onClick={() => onSelectCategory('personal_care')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeCategory === 'personal_care'
                  ? 'text-[#FC2779] border-b-2 border-[#FC2779] font-semibold'
                  : ''
              }`}
            >
              Personal Care
            </button>
            <button
              onClick={() => onSelectCategory('best-sellers')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeCategory === 'best-sellers'
                  ? 'text-[#FC2779] border-b-2 border-[#FC2779] font-semibold'
                  : ''
              }`}
            >
              Best Sellers
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action (Bag drawer trigger) with secondary utilities */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick search input or toggle */}
            <div className="relative flex items-center">
              {showSearchInput ? (
                <div className="flex items-center bg-white rounded-lg border border-stone-300 px-2.5 py-1.5 shadow-xs w-48 sm:w-64">
                  <Search className="w-4 h-4 text-stone-400 shrink-0 mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search beauty, serum, shade..."
                    className="w-full text-xs text-stone-900 bg-transparent focus:outline-hidden"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setShowSearchInput(false);
                      onSearchChange('');
                    }}
                    className="text-stone-400 hover:text-stone-600 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 rounded-lg transition-colors"
                  aria-label="Open search"
                  title="Search products"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist toggle */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 rounded-lg transition-colors"
              aria-label="View Wishlist"
              title="Saved items"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-stone-900 text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Zone 3 Primary Button: Bag with Tabular count */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#FC2779] rounded-lg hover:bg-[#e01968] active:scale-[0.98] transition-all shadow-xs whitespace-nowrap shrink-0"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Bag</span>
              <span className="font-mono tabular-nums bg-white/20 px-1.5 py-0.5 rounded-sm text-[11px] font-bold">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
