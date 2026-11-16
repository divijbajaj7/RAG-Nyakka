import React from 'react';
import { ProductCategory } from '../types/product';
import { ArrowUpDown, SlidersHorizontal, Sparkles } from 'lucide-react';

interface CategoryNavProps {
  activeCategory: ProductCategory | 'all' | 'best-sellers';
  onSelectCategory: (cat: ProductCategory | 'all' | 'best-sellers') => void;
  activeCollectionFilter: string;
  onSelectCollectionFilter: (coll: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalCount: number;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  activeCollectionFilter,
  onSelectCollectionFilter,
  sortBy,
  onSortChange,
  totalCount,
}) => {
  return (
    <div className="pt-8 pb-4 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Segmented Buttons */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              All Products
            </button>

            <button
              onClick={() => onSelectCategory('skincare')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeCategory === 'skincare'
                  ? 'bg-[#FC2779] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              Skincare
            </button>

            <button
              onClick={() => onSelectCategory('beauty')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeCategory === 'beauty'
                  ? 'bg-[#FC2779] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              Beauty &amp; Makeup
            </button>

            <button
              onClick={() => onSelectCategory('personal_care')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeCategory === 'personal_care'
                  ? 'bg-[#FC2779] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              Personal Care
            </button>

            <button
              onClick={() => onSelectCategory('best-sellers')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeCategory === 'best-sellers'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Best Sellers</span>
            </button>
          </div>

          {/* Right: Sort & Filter Controls */}
          <div className="flex items-center gap-3 justify-between md:justify-end">
            <div className="text-xs text-stone-500 font-mono tabular-nums">
              Showing <span className="font-semibold text-stone-900">{totalCount}</span> items
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="sr-only">Sort by</label>
              <div className="relative inline-flex items-center">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-500 absolute left-2.5 pointer-events-none" />
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="pl-8 pr-7 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-800 hover:border-stone-400 focus:outline-hidden focus:ring-1 focus:ring-[#FC2779]"
                >
                  <option value="featured">Featured / Curated</option>
                  <option value="rating">Customer Rating: High to Low</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-collection concern chips */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-stone-200/60 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-stone-400 font-medium whitespace-nowrap flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" /> Focus:
          </span>
          {[
            { id: 'all', label: 'All Curations' },
            { id: 'best-sellers', label: 'Top Rated Best Sellers' },
            { id: 'editor-picks', label: 'Editor’s Choice' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectCollectionFilter(item.id)}
              className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                activeCollectionFilter === item.id
                  ? 'bg-stone-200 text-stone-900 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
