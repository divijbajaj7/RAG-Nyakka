import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Star } from 'lucide-react';
import { heroCampaignImg } from '../data/products';
import { ProductCategory } from '../types/product';

interface HeroBannerProps {
  onExploreCollection: (category: ProductCategory | 'all' | 'best-sellers') => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreCollection }) => {
  return (
    <section className="relative overflow-hidden bg-[#F4EFEB] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Subtle editorial kicker (no pill badge) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#FC2779] mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Autumn Beauty Gala · Best-Selling Curation</span>
            </div>

            {/* Headline with balanced wrap */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 font-serif-display leading-[1.12] mb-5 [text-wrap:balance]">
              Radiant Skin, Iconic Color &amp; Daily Indulgence.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl mb-8">
              Explore India’s most coveted beauty formulas, clinical skincare actives, and botanical personal care essentials. Rated and reviewed by millions of genuine buyers.
            </p>

            {/* Direct CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={() => onExploreCollection('best-sellers')}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FC2779] text-white text-sm font-semibold rounded-lg hover:bg-[#e01968] active:scale-[0.98] transition-all shadow-sm whitespace-nowrap"
              >
                <span>Shop Best Sellers</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onExploreCollection('skincare')}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-stone-800 text-sm font-semibold rounded-lg border border-stone-300 hover:border-stone-400 hover:bg-stone-50 active:scale-[0.98] transition-all whitespace-nowrap"
              >
                <span>Explore Skincare</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const btn = document.getElementById('dify-chatbot-bubble-button');
                  if (btn) btn.click();
                }}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-rose-50 text-[#FC2779] text-sm font-semibold rounded-lg border border-rose-200 hover:bg-rose-100/70 active:scale-[0.98] transition-all whitespace-nowrap"
                title="Chat with our Nykaa RAG AI Beauty Advisor"
              >
                <Sparkles className="w-4 h-4 text-[#FC2779]" />
                <span>Ask Nykaa AI Advisor</span>
              </button>
            </div>

            {/* Claim-to-Proof Adjacency Strip (Clean unboxed metadata) */}
            <div className="pt-6 border-t border-stone-300/70 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="flex items-center gap-1.5 text-stone-900 font-bold text-base sm:text-lg font-mono tabular-nums">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                  <span>4.9 / 5.0</span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">Average customer rating</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-stone-900 font-bold text-base sm:text-lg">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Genuine</span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">Direct from authenticated labs</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-stone-900 font-bold text-base sm:text-lg font-mono tabular-nums">
                  <Truck className="w-4 h-4 text-stone-700 shrink-0" />
                  <span>24–48h Dispatch</span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">Pan-India express delivery</p>
              </div>
            </div>
          </div>

          {/* Right Image Showcase Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200 bg-stone-100 aspect-16/9 lg:aspect-4/3">
              <img
                src={heroCampaignImg}
                alt="Nykaa Luxury Beauty and Skincare Campaign Showcase"
                className="w-full h-full object-cover"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              {/* Subtle luxury scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs font-semibold tracking-wider uppercase text-white/90">
                  Featured Collection
                </p>
                <p className="text-sm font-medium text-white/95">
                  Lumière Radiance Serum &amp; Matte to Last Lip Velvets
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
