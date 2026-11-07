import React, { useState } from 'react';
import { SAMPLE_WISHES, WISH_CATEGORIES } from '../data/wishes';
import { audioEngine } from '../utils/audioEngine';
import { Copy, Check, Sparkles, Send, Quote, Heart } from 'lucide-react';

interface Props {
  onApplyWishToCard: (content: string, title?: string, author?: string) => void;
}

export const WishesGallery: React.FC<Props> = ({ onApplyWishToCard }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredWishes = activeCategory === 'all'
    ? SAMPLE_WISHES
    : SAMPLE_WISHES.filter(w => w.category === activeCategory);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    audioEngine.playChime();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleApply = (content: string, title?: string, author?: string) => {
    onApplyWishToCard(content, title, author);
    audioEngine.playChime();
    // Smooth scroll up to the card
    window.scrollTo({ top: 320, behavior: 'smooth' });
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8B5A2B] font-semibold mb-2">
          <Quote className="w-3.5 h-3.5 text-[#B8860B]" />
          <span>KHO TÀNG LỜI CHÚC & THƠ CA</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#2C1810]">
          Tuyển Tập Lời Chúc & Thơ Tri Ân Thầy Cô
        </h2>
        <p className="text-stone-600 font-serif italic text-xs sm:text-sm mt-2">
          Những dòng tâm sự chân thành, lắng đọng tình nghĩa sư đồ để bạn gửi gắm tới những người lái đò kính yêu.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-3 mb-8 scrollbar-none">
        {WISH_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition whitespace-nowrap shrink-0 ${
              activeCategory === cat.id
                ? 'bg-[#8B2500] text-white shadow-sm'
                : 'bg-white/80 text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Wish Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredWishes.map(wish => (
          <div
            key={wish.id}
            className="group relative p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#8B5A2B]/15 hover:border-[#8B2500]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-serif font-bold text-base text-[#3A2213] group-hover:text-[#8B2500] transition-colors">
                  {wish.title}
                </h3>
                <span className="p-1 rounded-full text-[#8B5A2B] bg-[#FAF5EE]">
                  <Heart className="w-3.5 h-3.5" />
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 font-prose-reading leading-relaxed whitespace-pre-line">
                {wish.content}
              </p>

              {wish.author && (
                <p className="mt-3 text-xs font-serif italic text-[#8B5A2B]">
                  — {wish.author}
                </p>
              )}

              {/* Tags */}
              {wish.tags && (
                <div className="flex flex-wrap items-center gap-2 mt-4 text-[11px] text-stone-500 font-sans">
                  {wish.tags.map((tag, idx) => (
                    <span key={idx}>
                      #{tag}
                      {idx < (wish.tags?.length || 0) - 1 && <span className="ml-2 text-stone-300">·</span>}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-100 text-xs">
              <button
                onClick={() => handleCopy(wish.id, wish.content)}
                className="flex items-center gap-1.5 text-stone-500 hover:text-stone-800 transition"
                title="Sao chép lời chúc"
              >
                {copiedId === wish.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-medium">Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Sao chép</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleApply(wish.content, wish.title, wish.author)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF5EE] hover:bg-[#8B2500] text-[#8B2500] hover:text-white font-medium transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Đưa vào thiệp</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
