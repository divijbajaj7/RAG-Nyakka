import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Heart, Check } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onQuickAdd: (product: Product, selectedShade?: string) => void;
  onQuickView: (product: Product) => void;
  onOpenReviews: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickAdd,
  onQuickView,
  onOpenReviews,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedShade, setSelectedShade] = useState<string | undefined>(
    product.shades ? product.shades[0].name : undefined
  );
  const [isJustAdded, setIsJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product, selectedShade);
    setIsJustAdded(true);
    setTimeout(() => setIsJustAdded(false), 1200);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      {/* Visual Product Showcase Area */}
      <div className="relative aspect-4/3 bg-stone-100/80 overflow-hidden flex items-center justify-center">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Top Badges: Clean unboxed text metadata (Zero-pill discipline) */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {product.badge ? (
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#FC2779] bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-sm shadow-2xs">
              {product.badge}
            </span>
          ) : (
            <span />
          )}

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className="pointer-events-auto p-1.5 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 hover:text-[#FC2779] shadow-2xs transition-colors"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isWishlisted ? 'fill-[#FC2779] text-[#FC2779]' : 'text-stone-600'
              }`}
            />
          </button>
        </div>

        {/* Quick View Floating Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex justify-center">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900/90 text-white text-xs font-medium rounded-md shadow-md backdrop-blur-xs hover:bg-stone-900 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Brand & Volume Header */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-semibold uppercase tracking-wider text-stone-700">
              {product.brand}
            </span>
            <span className="text-[11px] text-stone-400">{product.sizeOrVolume}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-stone-900 line-clamp-2 leading-snug group-hover:text-[#FC2779] transition-colors">
            {product.name}
          </h3>

          {/* Customer Rating Summary (Interactive) */}
          <div className="flex items-center gap-2 mt-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenReviews(product);
              }}
              className="inline-flex items-center gap-1 text-xs text-stone-700 hover:text-stone-900 hover:underline"
              title="Click to view full customer ratings & reviews"
            >
              <div className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>
              <span className="font-bold text-stone-900 font-mono tabular-nums">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-stone-400 text-[11px]">
                ({product.reviewCount.toLocaleString()})
              </span>
            </button>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-[11px] text-emerald-700 font-medium">Verified Buyers</span>
          </div>

          {/* Shade Swatches if available */}
          {product.shades && product.shades.length > 0 && (
            <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center gap-1.5">
              <span className="text-[10px] text-stone-400 font-medium">Shades:</span>
              <div className="flex items-center gap-1 overflow-x-auto py-0.5">
                {product.shades.map((shade) => (
                  <button
                    key={shade.name}
                    type="button"
                    title={shade.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedShade(shade.name);
                    }}
                    className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                      selectedShade === shade.name
                        ? 'scale-125 border-stone-900 ring-1 ring-stone-900'
                        : 'border-white hover:scale-110'
                    }`}
                    style={{ backgroundColor: shade.colorHex }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pricing Strip & Quick-Add Button */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2 mt-auto">
          {/* Price Tags */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-stone-900 font-mono tabular-nums">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {product.discountPercent > 0 && (
              <span className="text-[11px] text-[#FC2779] font-semibold">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Quick-Add Button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 shadow-2xs active:scale-[0.97] ${
              isJustAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#FC2779] hover:bg-[#e01968] text-white'
            }`}
          >
            {isJustAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
