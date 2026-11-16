import React from 'react';
import { CheckCircle2, Heart, ShoppingBag, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'cart' | 'wishlist' | 'info';
  title: string;
  subtitle?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 bg-stone-900 text-stone-100 rounded-xl shadow-xl border border-stone-800 transition-all duration-200 transform translate-y-0"
        >
          <div className="mt-0.5 shrink-0 text-[#FC2779]">
            {toast.type === 'cart' ? (
              <ShoppingBag className="w-5 h-5" />
            ) : toast.type === 'wishlist' ? (
              <Heart className="w-5 h-5 fill-[#FC2779]" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white">{toast.title}</p>
            {toast.subtitle && (
              <p className="text-xs text-stone-400 mt-0.5 truncate">{toast.subtitle}</p>
            )}
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-stone-400 hover:text-stone-200 shrink-0 p-1"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
