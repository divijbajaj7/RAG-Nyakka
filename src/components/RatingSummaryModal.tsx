import React, { useEffect } from 'react';
import { X, Star, ThumbsUp, ShieldCheck, Sparkles } from 'lucide-react';
import { Product } from '../types/product';

interface RatingSummaryModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onQuickAdd: (product: Product) => void;
}

export const RatingSummaryModal: React.FC<RatingSummaryModalProps> = ({
  product,
  isOpen,
  onClose,
  onQuickAdd,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const recommendRate = Math.round(
    ((product.ratingBreakdown[5] + product.ratingBreakdown[4]) / 100) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-stone-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-14 h-14 object-cover rounded-lg border border-stone-200"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              {product.brand}
            </div>
            <h3 className="text-sm font-bold text-stone-900 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-stone-500 font-mono tabular-nums">
              ₹{product.price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Rating Overview */}
        <div className="bg-[#FAF7F5] rounded-xl p-4 border border-stone-200/90 mb-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-stone-500">out of 5.0</span>
              </div>
              <div className="flex items-center text-amber-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-semibold text-stone-800 font-mono tabular-nums">
                {product.reviewCount.toLocaleString()}
              </span>
              <p className="text-[11px] text-stone-500">Total verified reviews</p>
              <div className="mt-1 flex items-center justify-end gap-1 text-[11px] font-semibold text-emerald-700">
                <ThumbsUp className="w-3 h-3" />
                <span>{recommendRate}% Recommend</span>
              </div>
            </div>
          </div>

          {/* Breakdown bars */}
          <div className="space-y-1.5 pt-2 border-t border-stone-200/70 text-xs">
            {[5, 4, 3, 2, 1].map((star) => {
              const pct = product.ratingBreakdown[star as keyof typeof product.ratingBreakdown] || 0;
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="w-6 font-mono text-[11px] text-stone-600">{star} ★</span>
                  <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-mono text-[11px] text-stone-500 tabular-nums">
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Customer Highlights / Key Feedback */}
        <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-1">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-900 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#FC2779]" />
            <span>Top Verified Customer Feedback</span>
          </div>

          {product.reviews.map((rev) => (
            <div key={rev.id} className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-stone-900">{rev.author}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span className="text-[10px] text-stone-400 font-mono">{rev.date}</span>
              </div>
              <p className="font-medium text-stone-800 text-[11px] mb-0.5">"{rev.title}"</p>
              <p className="text-stone-600 leading-relaxed text-[11px]">{rev.comment}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3 pt-3 border-t border-stone-200">
          <button
            onClick={() => {
              onQuickAdd(product);
              onClose();
            }}
            className="flex-1 py-3 px-4 bg-[#FC2779] text-white text-xs font-semibold rounded-lg hover:bg-[#e01968] active:scale-[0.98] transition-all"
          >
            Add to Bag · ₹{product.price.toLocaleString()}
          </button>
          <button
            onClick={onClose}
            className="py-3 px-4 border border-stone-300 text-stone-700 text-xs font-semibold rounded-lg hover:bg-stone-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
