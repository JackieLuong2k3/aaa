import React, { useState } from 'react';
import { audioEngine } from '../utils/audioEngine';
import { Flower, Heart, Sparkles, BookOpen } from 'lucide-react';

export const TeacherTributeSection: React.FC = () => {
  const [flowerCount, setFlowerCount] = useState<number>(1024);
  const [justSent, setJustSent] = useState<boolean>(false);

  const handleSendFlower = () => {
    setFlowerCount(prev => prev + 1);
    setJustSent(true);
    audioEngine.playChime();
    setTimeout(() => setJustSent(false), 2000);
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-12">
      {/* Editorial Metaphor Split Feature */}
      <div className="rounded-3xl bg-[#FAF4EA] border border-[#B8860B]/25 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Column: Boat Metaphor Image */}
        <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[460px] overflow-hidden">
          <img
            src="/assets/images/teacher_boat_metaphor_1794045030436.jpg"
            alt="Người lái đò tri thức trên dòng sông quê hương"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-serif italic">
            &ldquo;Tháng năm dầu dãi nắng mưa, con đò tri thức Thầy đưa bao người...&rdquo;
          </div>
        </div>

        {/* Right Column: Editorial Reflection */}
        <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-[#FAF4EA] to-[#F3E8D7] text-[#2D1B10]">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#8B5A2B] font-semibold">
              HÌNH TƯỢNG BẤT HỦ
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#8B2500] mt-1.5 leading-tight">
              Người Lái Đò Thầm Lặng
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 font-prose-reading leading-relaxed mt-4">
              Nghề giáo tựa như người chèo đò qua sông vắng. Mỗi năm học trôi qua là một chuyến đò đầy ắp ước mơ cập bến tương lai. Khách sang sông dẫu có khi quên lối cũ, nhưng người lái đò vẫn sớm hôm kiên trì nơi bến vắng, đón đưa từng lớp học trò cập bến bờ tri thức.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-white/60 border border-[#8B5A2B]/20 text-xs font-serif italic text-stone-800">
              &ldquo;Có một nghề bụi phấn bám đầy tay<br />
              Người ta bảo đó là nghề trong sạch nhất<br />
              Có một nghề không trồng cây vào đất<br />
              Mà lại nở cho đời muôn vạn đóa hoa thơm...&rdquo;
            </div>
          </div>

          {/* Interactive Virtual Flower Tribute Counter */}
          <div className="pt-6 border-t border-[#B8860B]/20 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>Đóa hoa tri ân đã gửi:</span>
              </div>
              <p className="text-2xl font-serif font-bold text-[#8B2500] tabular-nums">
                {flowerCount.toLocaleString()} đóa hoa
              </p>
            </div>

            <button
              onClick={handleSendFlower}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold shadow-md transition-all active:scale-95 ${
                justSent
                  ? 'bg-emerald-700 text-white'
                  : 'bg-gradient-to-r from-[#8B2500] to-[#B8860B] text-white hover:opacity-95'
              }`}
            >
              <Flower className={`w-4 h-4 ${justSent ? 'animate-bounce' : ''}`} />
              <span>{justSent ? 'Đã gửi hoa tri ân!' : 'Dâng hoa kính Thầy Cô'}</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
