import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types/product';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToBag: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onMoveToBag,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF7F5]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#FC2779] fill-[#FC2779]" />
            <h2 className="text-base font-bold text-stone-900">
              Wishlist ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200/50 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {wishlist.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Heart className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="text-base font-semibold text-stone-900">Your wishlist is empty</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Save your favorite lip velvets, radiance serums, and botanical oils to shop anytime.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-5 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors"
              >
                Browse Curations
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200 items-center justify-between"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg border border-stone-200 bg-white"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                      {item.brand}
                    </span>
                    <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">
                      {item.name}
                    </h4>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xs font-bold text-stone-900 font-mono tabular-nums">
                        ₹{item.price.toLocaleString()}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-[10px] text-stone-400 line-through font-mono tabular-nums">
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0 items-end">
                    <button
                      onClick={() => {
                        onMoveToBag(item);
                        onRemoveFromWishlist(item.id);
                      }}
                      className="px-3 py-1.5 bg-[#FC2779] text-white text-[11px] font-semibold rounded-md hover:bg-[#e01968] flex items-center gap-1 shadow-2xs"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(item.id)}
                      className="text-stone-400 hover:text-stone-700 text-[11px] p-1 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
