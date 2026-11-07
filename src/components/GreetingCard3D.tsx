import React, { useState } from 'react';
import { CardCustomization } from '../types/card';
import { CARD_THEMES } from '../data/wishes';
import { audioEngine } from '../utils/audioEngine';
import { 
  Sparkles, 
  RotateCw, 
  Copy, 
  Check, 
  SlidersHorizontal, 
  Printer, 
  Mail, 
  Heart,
  BookOpen
} from 'lucide-react';

interface Props {
  customization: CardCustomization;
  onOpenCustomizer: () => void;
}

export const GreetingCard3D: React.FC<Props> = ({ customization, onOpenCustomizer }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const currentTheme = CARD_THEMES.find(t => t.id === customization.themeId) || CARD_THEMES[0];

  const handleOpenEnvelope = () => {
    audioEngine.playPaperRustle();
    audioEngine.playChime();
    setIsOpen(true);
  };

  const handleCloseEnvelope = () => {
    audioEngine.playPaperRustle();
    setIsOpen(false);
    setIsFlipped(false);
  };

  const handleFlipCard = () => {
    audioEngine.playPaperRustle();
    setIsFlipped(!isFlipped);
  };

  const handleCopyWish = () => {
    const textToCopy = `${customization.recipientTitle} ${customization.recipientName},\n\n${customization.message}\n\nKính chúc Thầy Cô một ngày 20/11 trọn vẹn yêu thương!\n${customization.senderName}\n${customization.date}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    audioEngine.playChime();
    setTimeout(() => setCopied(false), 2400);
  };

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Interactive Controls Bar Above Card */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-6 px-4 py-3 bg-white/75 backdrop-blur-md border border-[#8B5A2B]/15 rounded-2xl shadow-sm text-xs">
        <div className="flex items-center gap-2 text-stone-700">
          <span className="font-semibold text-[#8B2500] flex items-center gap-1.5">
            <Heart className="w-4 h-4 fill-[#8B2500] text-[#8B2500]" />
            Chế độ thiệp:
          </span>
          <span className="text-stone-500">
            {isOpen ? (isFlipped ? 'Mặt bìa sau' : 'Nội dung thư tay') : 'Phong bì niêm phong sáp đỏ'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isOpen && (
            <>
              <button
                onClick={handleFlipCard}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium transition active:scale-95"
                title="Lật mặt trước/sau"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{isFlipped ? 'Xem lời chúc' : 'Xem bìa tranh'}</span>
              </button>

              <button
                onClick={handleCopyWish}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium transition active:scale-95"
                title="Sao chép toàn bộ lời chúc"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Đã chép!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Sao chép lời chúc</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrintCard}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium transition active:scale-95"
                title="In hoặc lưu dạng PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>In / Lưu PDF</span>
              </button>
            </>
          )}

          <button
            onClick={onOpenCustomizer}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#8B2500] to-[#B8860B] text-white font-medium shadow-sm hover:opacity-95 transition active:scale-95"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Tùy biến thiệp</span>
          </button>

          {isOpen && (
            <button
              onClick={handleCloseEnvelope}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition"
              title="Đóng phong bì lại"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Gấp lại</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Card / Envelope Stage with 3D Perspective */}
      <div className="perspective-1500 w-full min-h-[580px] md:min-h-[640px] flex items-center justify-center py-4">
        {!isOpen ? (
          /* ================= ENVELOPE STATE ================= */
          <div
            onClick={handleOpenEnvelope}
            className="group relative w-full max-w-[580px] h-[380px] md:h-[420px] rounded-2xl bg-gradient-to-br from-[#EFE5D8] via-[#E4D3C0] to-[#D5BEA6] p-8 border border-[#B8860B]/40 shadow-2xl card-shadow-luxury cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(80,45,20,0.35)] flex flex-col justify-between overflow-hidden"
          >
            {/* Vintage Envelope Diagonal Flap Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <svg className="w-full h-full" viewBox="0 0 580 420" preserveAspectRatio="none">
                <line x1="0" y1="0" x2="290" y2="210" stroke="#8B5A2B" strokeWidth="1.5" />
                <line x1="580" y1="0" x2="290" y2="210" stroke="#8B5A2B" strokeWidth="1.5" />
                <line x1="0" y1="420" x2="290" y2="210" stroke="#8B5A2B" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="580" y1="420" x2="290" y2="210" stroke="#8B5A2B" strokeWidth="1.5" strokeDasharray="4 4" />
              </svg>
            </div>

            {/* Top Vintage Stamp & Postmark */}
            <div className="flex items-start justify-between relative z-10">
              <div className="text-left space-y-0.5">
                <span className="text-[11px] uppercase tracking-widest text-stone-500 font-sans">
                  THƯ TRI ÂN ĐẶC BIỆT
                </span>
                <p className="font-serif italic text-stone-700 text-sm">
                  Dành gửi: <span className="font-semibold text-[#8B2500]">{customization.recipientTitle} {customization.recipientName}</span>
                </p>
                <p className="text-[11px] text-stone-500 font-serif">
                  Người gửi: <span className="text-stone-700 font-medium">{customization.senderName}</span>
                </p>
              </div>

              {/* Commemorative 20/11 Stamp */}
              <div className="border-2 border-dashed border-[#B8860B] bg-[#FAF6F0] p-2.5 rounded shadow-sm text-center transform rotate-3">
                <p className="text-[9px] uppercase tracking-widest font-bold text-[#8B2500]">VIỆT NAM</p>
                <p className="text-lg font-serif-title font-bold text-[#8B2500] leading-none my-0.5">20·11</p>
                <p className="text-[8px] tracking-wider text-stone-500 uppercase">NGÀY NHÀ GIÁO</p>
              </div>
            </div>

            {/* Center Golden Wax Seal & Calligraphy Message */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
              {/* Wax Seal Button */}
              <div className="relative my-2 transform group-hover:scale-110 transition-transform duration-300">
                <div 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-xl border-2 border-amber-300/60 relative"
                  style={{ backgroundColor: currentTheme.sealColor }}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-amber-200/40 flex flex-col items-center justify-center text-amber-100 shadow-inner">
                    <Sparkles className="w-5 h-5 text-amber-200 mb-0.5 animate-pulse" />
                    <span className="text-[10px] md:text-xs font-serif font-bold tracking-wider uppercase">TRI ÂN</span>
                  </div>
                </div>

                {/* Silk Ribbon tails */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1 -z-10">
                  <div className="w-3 h-8 bg-gradient-to-b from-[#8B2500] to-[#5C1800] -rotate-12 rounded-b shadow-sm" />
                  <div className="w-3 h-8 bg-gradient-to-b from-[#8B2500] to-[#5C1800] rotate-12 rounded-b shadow-sm" />
                </div>
              </div>

              <h2 className="text-xl md:text-2xl font-serif-title font-bold text-[#3D2517] mt-3 group-hover:text-[#8B2500] transition-colors">
                Kính Dâng Thầy Cô
              </h2>
              <p className="font-serif italic text-stone-600 text-xs md:text-sm mt-1 max-w-sm">
                &ldquo;Một chữ cũng là thầy, nửa chữ cũng là thầy&rdquo;
              </p>
            </div>

            {/* Bottom Call to Action */}
            <div className="relative z-10 flex items-center justify-center pt-2">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#8B2500] text-white text-xs font-medium shadow-md group-hover:bg-[#A32E00] transition-all duration-300">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Chạm vào đây để mở thiệp & âm nhạc</span>
              </span>
            </div>
          </div>
        ) : (
          /* ================= OPENED GREETING CARD STATE ================= */
          <div className="relative w-full max-w-3xl transform transition-all duration-700">
            {/* Card Shell */}
            <div
              className={`w-full rounded-2xl bg-[#FFFDF9] border border-[#B8860B]/35 shadow-2xl card-shadow-luxury overflow-hidden transition-all duration-500 ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {!isFlipped ? (
                /* --- INSIDE OF THE CARD: HANDWRITTEN LETTER --- */
                <div className="relative p-6 sm:p-10 md:p-12 parchment-pattern text-[#2B1F17]">
                  {/* Ornate Gold Corner Filigree */}
                  <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-[#B8860B]/60 rounded-tl-sm pointer-events-none" />
                  <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-[#B8860B]/60 rounded-tr-sm pointer-events-none" />
                  <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-[#B8860B]/60 rounded-bl-sm pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-[#B8860B]/60 rounded-br-sm pointer-events-none" />

                  {/* Header Decoration */}
                  <div className="text-center pb-6 border-b border-[#B8860B]/25">
                    <span className="text-xs uppercase tracking-widest text-[#8B5A2B] font-semibold">
                      KỶ NIỆM NGÀY NHÀ GIÁO VIỆT NAM • 20/11
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-title font-bold text-[#8B2500] mt-1.5 tracking-tight">
                      Lời Tri Ân Kính Dâng Thầy Cô
                    </h2>
                    <p className="text-xs font-serif italic text-stone-500 mt-1">
                      {customization.date}
                    </p>
                  </div>

                  {/* Salutation */}
                  <div className="pt-6 pb-2">
                    <p className="text-lg sm:text-xl font-serif font-bold text-[#3B2212]">
                      {customization.recipientTitle} {customization.recipientName},
                    </p>
                  </div>

                  {/* Main Wish Content with Drop Cap */}
                  <div className="py-4 text-[#33251D] text-sm sm:text-base leading-relaxed md:leading-loose font-prose-reading whitespace-pre-line">
                    {customization.message}
                  </div>

                  {/* Optional Poem Excerpt if provided */}
                  {customization.poemExcerpt && (
                    <div className="my-5 p-4 rounded-xl bg-[#FAF4EA] border border-[#B8860B]/30 font-serif italic text-xs sm:text-sm text-[#5C3D24] text-center leading-relaxed">
                      &ldquo;{customization.poemExcerpt}&rdquo;
                    </div>
                  )}

                  {/* Sign-off & Calligraphy Signature */}
                  <div className="pt-6 mt-4 border-t border-[#B8860B]/20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="text-xs text-stone-500 font-serif italic">
                      <p>Ân sâu nghĩa nặng, đời đời khắc ghi</p>
                      <p className="text-[11px] text-stone-400 mt-0.5">Việt Nam • Tri Ân Sư Đồ</p>
                    </div>

                    <div className="text-right sm:pr-4">
                      <p className="text-xs text-stone-500 font-serif">Kính gửi từ:</p>
                      <p className="text-2xl sm:text-3xl font-script-calligraphy font-bold text-[#8B2500] my-1">
                        {customization.senderName}
                      </p>
                      <p className="text-[11px] text-[#B8860B] font-serif uppercase tracking-wider">
                        Trân trọng & Kính yêu
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* --- FRONT COVER OF THE CARD: ARTWORK & EMBOSSED TITLE --- */
                <div className="relative bg-[#20140D] text-stone-100 flex flex-col md:flex-row items-stretch">
                  <div className="w-full md:w-3/5 relative min-h-[360px] md:min-h-[500px]">
                    <img
                      src="/assets/images/card_cover_teachers_day_1794045030288.jpg"
                      alt="Bìa thiệp Tri Ân Thầy Cô 20/11"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
                  </div>

                  <div className="w-full md:w-2/5 p-8 flex flex-col justify-between bg-gradient-to-b from-[#2A1C14] to-[#180E09] border-t md:border-t-0 md:border-l border-[#B8860B]/30">
                    <div>
                      <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                        20 THÁNG 11
                      </span>
                      <h3 className="text-2xl md:text-3xl font-serif-title font-bold text-[#FAF6F0] mt-2 leading-tight">
                        Người Lái Đò Thầm Lặng
                      </h3>
                      <p className="text-xs text-stone-300 font-serif italic mt-3 leading-relaxed">
                        Cảm ơn Thầy Cô đã dành trọn cả thanh xuân, chở từng thế hệ học trò qua bến đò tri thức vươn tới tương lai.
                      </p>
                    </div>

                    <div className="pt-6 border-t border-stone-700/60 mt-6">
                      <p className="text-xs text-stone-400 font-serif">
                        Dành tặng: <span className="text-amber-200 font-semibold">{customization.recipientTitle} {customization.recipientName}</span>
                      </p>
                      <button
                        onClick={handleFlipCard}
                        className="mt-4 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#8B2500] to-[#B8860B] text-white text-xs font-semibold shadow hover:opacity-90 transition"
                      >
                        Mở thư bên trong
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
