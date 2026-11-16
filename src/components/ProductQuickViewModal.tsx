import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Truck, Check, Heart, Sparkles } from 'lucide-react';
import { Product } from '../types/product';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedShade?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedShade, setSelectedShade] = useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<'details' | 'ratings' | 'ingredients'>('details');
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedShade(product.shades ? product.shades[0].name : undefined);
      setActiveTab('details');
      setIsAdded(false);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedShade);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const recommendPercent = Math.round(
    ((product.ratingBreakdown[5] + product.ratingBreakdown[4]) / 100) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200 my-8 flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-stone-600 hover:text-stone-950 hover:bg-white shadow-xs transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Showcase */}
        <div className="md:w-1/2 bg-stone-100 flex flex-col justify-between relative overflow-hidden">
          <div className="aspect-square md:aspect-auto md:h-full relative overflow-hidden bg-stone-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.badge && (
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FC2779] rounded-sm shadow-2xs">
                {product.badge}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Information, Ratings, Shades & Add */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col overflow-y-auto">
          {/* Header Brand */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="font-bold uppercase tracking-widest text-stone-800">
              {product.brand}
            </span>
            <span className="font-mono">{product.sizeOrVolume}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif-display leading-tight mb-2">
            {product.name}
          </h2>

          <p className="text-xs text-stone-600 leading-relaxed mb-4">
            {product.subtitle}
          </p>

          {/* Pricing Tag */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-stone-200">
            <span className="text-2xl font-extrabold text-stone-900 font-mono tabular-nums">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-stone-400 line-through font-mono tabular-nums">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
            {product.discountPercent > 0 && (
              <span className="text-xs font-bold text-[#FC2779] bg-[#FC2779]/10 px-2 py-0.5 rounded-sm">
                Save {product.discountPercent}%
              </span>
            )}
          </div>

          {/* Modal Tab Switcher (Details / Ratings & Reviews / Ingredients) */}
          <div className="flex items-center gap-4 border-b border-stone-200 my-4 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-2 transition-colors relative ${
                activeTab === 'details'
                  ? 'text-[#FC2779] border-b-2 border-[#FC2779]'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Overview &amp; Shades
            </button>
            <button
              onClick={() => setActiveTab('ratings')}
              className={`pb-2 transition-colors relative flex items-center gap-1.5 ${
                activeTab === 'ratings'
                  ? 'text-[#FC2779] border-b-2 border-[#FC2779]'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <span>Customer Ratings</span>
              <span className="text-amber-500 font-mono">★ {product.rating}</span>
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`pb-2 transition-colors relative ${
                activeTab === 'ingredients'
                  ? 'text-[#FC2779] border-b-2 border-[#FC2779]'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Ingredients &amp; Actives
            </button>
          </div>

          {/* Tab 1: Details & Shades */}
          {activeTab === 'details' && (
            <div className="space-y-4 flex-1">
              <p className="text-xs text-stone-700 leading-relaxed">
                {product.description}
              </p>

              {/* Shade Selection */}
              {product.shades && product.shades.length > 0 && (
                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                  <div className="flex items-center justify-between text-xs font-medium text-stone-800 mb-2">
                    <span>Select Shade:</span>
                    <span className="font-semibold text-[#FC2779]">{selectedShade}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {product.shades.map((shade) => (
                      <button
                        key={shade.name}
                        onClick={() => setSelectedShade(shade.name)}
                        className={`group relative flex items-center gap-2 p-1.5 rounded-lg border text-xs transition-all ${
                          selectedShade === shade.name
                            ? 'bg-white border-stone-900 shadow-xs ring-1 ring-stone-900'
                            : 'bg-white/60 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-stone-300"
                          style={{ backgroundColor: shade.colorHex }}
                        />
                        <span className="text-[11px] font-medium text-stone-700">
                          {shade.name.split(' (')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Benefits */}
              <div>
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                  Proven Benefits
                </h4>
                <ul className="grid grid-cols-1 gap-1.5 text-xs text-stone-700">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: Customer Rating Summary */}
          {activeTab === 'ratings' && (
            <div className="space-y-5 flex-1">
              {/* Rating Summary Card */}
              <div className="bg-[#FAF7F5] p-4 rounded-xl border border-stone-200">
                <div className="flex items-center gap-5">
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
                      {product.rating.toFixed(1)}
                    </div>
                    <div className="flex items-center justify-center text-amber-500 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(product.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-[11px] text-stone-500 mt-1 font-mono">
                      {product.reviewCount.toLocaleString()} ratings
                    </div>
                  </div>

                  {/* Rating distribution bars */}
                  <div className="flex-1 space-y-1.5 text-xs">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const pct = product.ratingBreakdown[star as keyof typeof product.ratingBreakdown] || 0;
                      return (
                        <div key={star} className="flex items-center gap-2 text-[11px]">
                          <span className="w-3 font-mono text-stone-600">{star}★</span>
                          <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-400 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="w-8 text-right font-mono text-stone-500 tabular-nums">
                            {pct}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-600">
                  <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    {recommendPercent}% of buyers recommend this product
                  </span>
                  <span className="text-[11px] text-stone-400">100% Verified Purchases</span>
                </div>
              </div>

              {/* Verified Buyer Reviews list */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Verified Buyer Reviews
                </h4>
                {product.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-3 bg-white rounded-lg border border-stone-200 text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-stone-900">{rev.author}</span>
                        {rev.verifiedBuyer && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-xs font-medium">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-500 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < rev.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-stone-200'
                          }`}
                        />
                      ))}
                      <span className="font-semibold text-stone-800 ml-1 text-xs">
                        {rev.title}
                      </span>
                    </div>

                    <p className="text-stone-600 leading-relaxed">{rev.comment}</p>
                    {rev.skinType && (
                      <div className="mt-1.5 text-[10px] text-stone-400">
                        Skin Profile: {rev.skinType}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Ingredients */}
          {activeTab === 'ingredients' && (
            <div className="space-y-4 flex-1">
              <div>
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                  Key Active Ingredients
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.keyIngredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-stone-100 text-stone-800 text-xs rounded-md font-medium"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-200">
                <strong className="block text-stone-900 font-semibold mb-1">
                  Clean Formula Standards:
                </strong>
                Cruelty-free, paraben-free, dermatologist-tested. Suitable for daily application in humid and temperate climates.
              </div>
            </div>
          )}

          {/* Bottom Action Section: Quantity, Add to Bag, Wishlist */}
          <div className="mt-6 pt-4 border-t border-stone-200">
            <div className="flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 p-0.5">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-900 text-sm font-bold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-semibold text-stone-900 font-mono tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-900 text-sm font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-sm font-semibold transition-all shadow-xs active:scale-[0.98] ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#FC2779] hover:bg-[#e01968] text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag · ₹{(product.price * quantity).toLocaleString()}</span>
                  </>
                )}
              </button>

              {/* Wishlist Heart */}
              <button
                type="button"
                onClick={() => onToggleWishlist(product)}
                className="p-3 border border-stone-300 rounded-lg hover:border-stone-400 text-stone-700 hover:text-[#FC2779] transition-colors"
                aria-label="Toggle Wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? 'fill-[#FC2779] text-[#FC2779]' : 'text-stone-600'
                  }`}
                />
              </button>
            </div>

            {/* Delivery Guarantee info */}
            <div className="flex items-center justify-between text-[11px] text-stone-500 mt-3 pt-2">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-stone-400" />
                Free shipping above ₹499
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                100% Genuine Guaranteed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
