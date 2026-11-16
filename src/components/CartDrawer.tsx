import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types/product';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, selectedShade?: string) => void;
  onRemoveItem: (productId: string, selectedShade?: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  // Checkout flow state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<any | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPin, setCustomerPin] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('upi');

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 499;
  const isFreeShipping = rawSubtotal >= freeShippingThreshold;
  const shippingFee = isFreeShipping || cartItems.length === 0 ? 0 : 49;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal);

  const discountAmount = Math.round(rawSubtotal * appliedDiscount);
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === 'NYKAAFIRST') {
      setAppliedDiscount(0.15);
      setCouponMessage('15% discount applied with NYKAAFIRST!');
    } else if (cleanCode === 'GLOW20') {
      setAppliedDiscount(0.2);
      setCouponMessage('20% Festive Glow discount applied!');
    } else {
      setAppliedDiscount(0);
      setCouponMessage('Invalid coupon code. Try NYKAAFIRST or GLOW20');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress || !customerPin) {
      alert('Please fill out all delivery fields');
      return;
    }

    const orderNumber = 'NYK-' + Math.floor(100000 + Math.random() * 900000);
    setOrderConfirmed({
      orderId: orderNumber,
      name: customerName,
      phone: customerPhone,
      address: `${customerAddress}, PIN: ${customerPin}`,
      total: finalTotal,
      paymentMethod: paymentMethod.toUpperCase(),
      items: [...cartItems],
    });
    onClearCart();
    setIsCheckingOut(false);
  };

  const handleCloseAndReset = () => {
    setOrderConfirmed(null);
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF7F5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#FC2779]" />
            <h2 className="text-base font-bold text-stone-900">
              Shopping Bag ({cartItems.reduce((acc, it) => acc + it.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={handleCloseAndReset}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200/50 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        {cartItems.length > 0 && !orderConfirmed && (
          <div className="px-5 py-2.5 bg-stone-100 border-b border-stone-200 text-xs">
            {isFreeShipping ? (
              <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>You’ve unlocked FREE Express Shipping!</span>
              </div>
            ) : (
              <div>
                <p className="text-stone-700">
                  Add <span className="font-bold text-[#FC2779] font-mono">₹{remainingForFreeShipping}</span> more for <strong className="text-stone-900">FREE delivery</strong>
                </p>
                <div className="w-full h-1.5 bg-stone-200 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full bg-[#FC2779] rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (rawSubtotal / freeShippingThreshold) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Case 1: Order Confirmed Screen */}
          {orderConfirmed ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 font-serif-display">
                Order Confirmed!
              </h3>
              <p className="text-xs text-stone-600 max-w-xs mx-auto">
                Thank you, <span className="font-semibold text-stone-900">{orderConfirmed.name}</span>. Your beauty package is being carefully prepared for shipment.
              </p>

              {/* Receipt Card */}
              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-left text-xs space-y-2 mt-4">
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Order ID:</span>
                  <span className="font-mono font-bold text-stone-900">
                    {orderConfirmed.orderId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Payment:</span>
                  <span className="font-semibold text-stone-900">
                    {orderConfirmed.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Delivery Address:</span>
                  <span className="font-medium text-stone-800 text-right max-w-[200px]">
                    {orderConfirmed.address}
                  </span>
                </div>
                <div className="flex justify-between border-t border-stone-200 pt-2 font-bold text-stone-900">
                  <span>Paid Total:</span>
                  <span className="font-mono tabular-nums text-sm text-[#FC2779]">
                    ₹{orderConfirmed.total.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCloseAndReset}
                className="w-full py-3 bg-[#FC2779] text-white text-xs font-semibold rounded-lg hover:bg-[#e01968] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Case 2: Checkout Form */
            <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <h3 className="font-bold text-stone-900 text-sm">Delivery &amp; Payment</h3>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-[#FC2779] hover:underline"
                >
                  Edit Bag
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Radhika Sharma"
                    className="w-full px-3 py-2 border border-stone-300 rounded-md text-xs focus:ring-1 focus:ring-[#FC2779] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3 py-2 border border-stone-300 rounded-md text-xs focus:ring-1 focus:ring-[#FC2779] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Shipping Address</label>
                  <textarea
                    required
                    rows={2}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Flat / House No, Building, Street"
                    className="w-full px-3 py-2 border border-stone-300 rounded-md text-xs focus:ring-1 focus:ring-[#FC2779] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Postal PIN Code</label>
                  <input
                    type="text"
                    required
                    value={customerPin}
                    onChange={(e) => setCustomerPin(e.target.value)}
                    placeholder="e.g. 400001"
                    className="w-full px-3 py-2 border border-stone-300 rounded-md text-xs focus:ring-1 focus:ring-[#FC2779] focus:outline-hidden"
                  />
                </div>

                {/* Payment method selector */}
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'upi', label: 'UPI / GPay' },
                      { id: 'card', label: 'Cards' },
                      { id: 'cod', label: 'Cash on Del.' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`py-2 px-2 text-center rounded-md border text-xs font-medium transition-all ${
                          paymentMethod === m.id
                            ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                            : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order quick summary */}
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between text-stone-600">
                  <span>Bag Subtotal:</span>
                  <span>₹{rawSubtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#FC2779]">
                    <span>Discount:</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Shipping:</span>
                  <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 text-xs border-t border-stone-200 pt-1">
                  <span>Payable Total:</span>
                  <span>₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#FC2779] text-white font-semibold rounded-lg hover:bg-[#e01968] active:scale-[0.98] transition-all text-xs flex items-center justify-center gap-1.5"
              >
                <span>Confirm &amp; Place Order (₹{finalTotal.toLocaleString()})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : cartItems.length === 0 ? (
            /* Case 3: Empty Bag */
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="text-base font-semibold text-stone-900">Your bag is empty</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our best-selling serums, iconic lip velvets, and luxury body care.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-5 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors"
              >
                Start Browsing
              </button>
            </div>
          ) : (
            /* Case 4: Itemized Cart */
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedShade || 'default'}`}
                  className="flex gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg border border-stone-200 bg-white"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                          {item.product.brand}
                        </span>
                        <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        {item.selectedShade && (
                          <p className="text-[10px] text-[#FC2779] font-medium truncate">
                            Shade: {item.selectedShade}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id, item.selectedShade)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-200/60">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-stone-300 rounded-md bg-white">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              Math.max(1, item.quantity - 1),
                              item.selectedShade
                            )
                          }
                          className="w-6 h-6 flex items-center justify-center text-xs text-stone-600 hover:text-stone-900"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-semibold font-mono tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedShade
                            )
                          }
                          className="w-6 h-6 flex items-center justify-center text-xs text-stone-600 hover:text-stone-900"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-xs font-bold text-stone-900 font-mono tabular-nums">
                          ₹{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Coupon Applicator */}
              <form onSubmit={handleApplyCoupon} className="pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code (NYKAAFIRST)"
                    className="flex-1 px-3 py-2 border border-stone-300 rounded-lg text-xs uppercase placeholder:normal-case focus:outline-hidden focus:ring-1 focus:ring-[#FC2779]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p
                    className={`text-[11px] mt-1.5 font-medium ${
                      appliedDiscount > 0 ? 'text-emerald-700' : 'text-stone-500'
                    }`}
                  >
                    {couponMessage}
                  </p>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Bottom Total & Checkout Action */}
        {cartItems.length > 0 && !orderConfirmed && !isCheckingOut && (
          <div className="p-5 border-t border-stone-200 bg-[#FAF7F5] space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal:</span>
                <span className="font-mono tabular-nums">₹{rawSubtotal.toLocaleString()}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-[#FC2779] font-medium">
                  <span>Discount ({appliedDiscount * 100}%):</span>
                  <span className="font-mono tabular-nums">
                    -₹{discountAmount.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Shipping:</span>
                <span className="font-mono tabular-nums">
                  {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total Amount:</span>
                <span className="font-mono tabular-nums text-base text-[#FC2779]">
                  ₹{finalTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckingOut(true)}
              className="w-full py-3.5 bg-[#FC2779] text-white text-xs font-semibold rounded-lg hover:bg-[#e01968] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe &amp; Secure Checkout · 100% Authentic Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
