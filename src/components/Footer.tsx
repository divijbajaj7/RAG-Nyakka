import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-20">
      {/* Trust & Assurance Bar */}
      <div className="border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="p-2.5 rounded-lg bg-stone-800 text-[#FC2779]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">100% Authentic</h4>
                <p className="text-xs text-stone-400 mt-0.5">Sourced directly from verified brands</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="p-2.5 rounded-lg bg-stone-800 text-[#FC2779]">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Free Express Shipping</h4>
                <p className="text-xs text-stone-400 mt-0.5">On all orders above ₹499</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="p-2.5 rounded-lg bg-stone-800 text-[#FC2779]">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Easy 15-Day Returns</h4>
                <p className="text-xs text-stone-400 mt-0.5">Hassle-free doorstep pickup</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="p-2.5 rounded-lg bg-stone-800 text-[#FC2779]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Verified Reviews</h4>
                <p className="text-xs text-stone-400 mt-0.5">Over 10M+ authentic customer ratings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 space-y-3">
            <div className="text-2xl font-bold font-serif-display text-white tracking-tight flex items-center gap-1.5">
              <span>NYKAA</span>
              <span className="w-2 h-2 rounded-full bg-[#FC2779] inline-block mb-1"></span>
            </div>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              India’s premier online beauty, skincare, and personal care destination. Bringing the world’s most celebrated formulations to your doorstep with guaranteed authenticity.
            </p>
            <div className="pt-2 text-xs text-stone-400">
              <span className="font-semibold text-white">Customer Support:</span> support@nykaa.com · 1800-267-4444
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Categories
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#skincare" className="hover:text-white transition-colors">Skincare Serums</a></li>
              <li><a href="#beauty" className="hover:text-white transition-colors">Lipstick &amp; Makeup</a></li>
              <li><a href="#personal_care" className="hover:text-white transition-colors">Botanical Body Oils</a></li>
              <li><a href="#sunscreens" className="hover:text-white transition-colors">Sunscreen &amp; Defense</a></li>
              <li><a href="#hair" className="hover:text-white transition-colors">Hair &amp; Scalp Care</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Collections
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><span className="hover:text-white transition-colors cursor-pointer">Best Sellers</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">New In Beauty</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Editor's Choice</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Clean &amp; Conscious</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Luxury Minis</span></li>
            </ul>
          </div>

          {/* Trust & Policies */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Help &amp; Trust
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><span className="hover:text-white transition-colors cursor-pointer">Authenticity Guarantee</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Shipping &amp; Delivery</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Returns Policy</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Privacy &amp; Terms</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Track Order</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} FSN E-Commerce Ventures Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Net Banking</span>
            <span>·</span>
            <span>UPI &amp; GPay</span>
            <span>·</span>
            <span>Cash on Delivery</span>
            <span>·</span>
            <span>Visa &amp; Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
