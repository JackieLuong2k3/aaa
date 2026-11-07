/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { FallingFlowersCanvas } from './components/FallingFlowersCanvas';
import { Music, VolumeX, Copy, Check, Heart, Sparkles, Mail, BookOpen, RotateCcw } from 'lucide-react';
import cardCoverImg from './assets/images/card_cover_teachers_day_1794045030288.jpg';

export default function App() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [recipient, setRecipient] = useState<string>('Thầy Cô kính yêu');
  const [sender, setSender] = useState<string>('Học trò của Thầy Cô');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const AUDIO_SRC = '/assets/aistudio/Em_l__c__gi_o_v_ng_cao_-_S_n_Ho_ng_M__Lam__T_nh_ca_T_y_B_c_hay_nh_t_-_S_n_Ho_ng_M__Lam_d3118528.mp3';
  const START_TIME = 70; // 1:10 = 70 seconds

  // 1 lời chúc đơn giản, sâu sắc và ý nghĩa
  const wishMessage = `Nhân ngày Nhà giáo Việt Nam 20/11, em xin gửi lời tri ân chân thành và sâu sắc nhất tới Thầy Cô.\n\nKính chúc Thầy Cô luôn dồi dào sức khỏe, bình an và hạnh phúc để tiếp tục chèo lái những chuyến đò tri thức sang sông. Cảm ơn Thầy Cô đã luôn bao dung, tận tụy soi sáng con đường tương lai của chúng em!`;

  // Pre-load audio so it starts instantaneously when opening letter
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.preload = 'auto';
    audioRef.current = audio;

    const enforceSeek = () => {
      try {
        if (audio.currentTime < START_TIME - 1) {
          audio.currentTime = START_TIME;
        }
      } catch {
        // Ready state not ready yet
      }
    };

    audio.addEventListener('loadedmetadata', enforceSeek);
    audio.addEventListener('canplay', enforceSeek);

    audio.addEventListener('playing', () => {
      setIsPlaying(true);
      if (audio.currentTime < START_TIME - 1) {
        audio.currentTime = START_TIME;
      }
    });

    audio.addEventListener('ended', () => {
      audio.currentTime = START_TIME;
      audio.play().catch(() => {});
    });

    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', enforceSeek);
      audio.removeEventListener('canplay', enforceSeek);
    };
  }, []);

  // 100% Guaranteed Audio Unlock: Triggered directly by the user clicking "Mở lá thư"
  const handleOpenLetter = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.readyState >= 1) {
        audio.currentTime = START_TIME;
      }
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            if (audio.currentTime < START_TIME - 1) {
              audio.currentTime = START_TIME;
            }
          })
          .catch(() => {
            // Safe fallback
          });
      }
    }
    setIsOpened(true);
  };

  const handleToggleMusic = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      if (audio.currentTime < START_TIME - 1 || audio.ended) {
        audio.currentTime = START_TIME;
      }
      audio.play().then(() => {
        setIsPlaying(true);
        if (audio.currentTime < START_TIME - 1) {
          audio.currentTime = START_TIME;
        }
      }).catch(() => {});
    }
  };

  const handleCopyWish = () => {
    const fullText = `Kính gửi ${recipient},\n\n${wishMessage}\n\nKính chúc Thầy Cô ngày 20/11 thật nhiều niềm vui!\n— ${sender}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2C241E] flex flex-col items-center justify-center p-3 sm:p-5 md:p-8 relative selection:bg-[#E8C5A5]">
      {/* Hiệu ứng 1 loại cánh hoa rơi nhẹ nhàng */}
      <FallingFlowersCanvas />

      {/* ================= PAGE 1: PHONG BÌ / LÁ THƯ CHƯA MỞ ================= */}
      {!isOpened ? (
        <div className="relative z-20 w-full max-w-xl my-auto flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">
          
          {/* Header thiệp bên ngoài */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FAF0E4] border border-[#B8860B]/30 text-[#8B2500] text-xs font-semibold mb-6 shadow-sm">
            <Heart className="w-3.5 h-3.5 fill-[#8B2500]" />
            <span>Kính Dâng Ngày Nhà Giáo Việt Nam 20·11</span>
          </div>

          {/* Bức phong bì trang trọng */}
          <div
            onClick={handleOpenLetter}
            className="group relative w-full rounded-3xl bg-gradient-to-br from-[#F5EADB] via-[#EBDEC9] to-[#DECBB5] p-6 sm:p-8 md:p-10 border border-[#B8860B]/40 shadow-2xl card-shadow-luxury cursor-pointer transform transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-12px_rgba(90,45,15,0.3)] flex flex-col justify-between overflow-hidden"
          >
            {/* Đường viền họa tiết phong bì cổ điển */}
            <div className="absolute inset-0 pointer-events-none opacity-25">
              <svg className="w-full h-full" viewBox="0 0 500 320" preserveAspectRatio="none">
                <line x1="0" y1="0" x2="250" y2="160" stroke="#8B5A2B" strokeWidth="1.5" />
                <line x1="500" y1="0" x2="250" y2="160" stroke="#8B5A2B" strokeWidth="1.5" />
                <line x1="0" y1="320" x2="250" y2="160" stroke="#8B5A2B" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="500" y1="320" x2="250" y2="160" stroke="#8B5A2B" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>
            </div>

            {/* Tem thư kỷ niệm 20/11 & Lời đề tặng */}
            <div className="flex items-start justify-between relative z-10 text-left">
              <div className="space-y-1">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-stone-500 font-semibold">
                  THƯ TRI ÂN ĐẶC BIỆT
                </span>
                <p className="font-serif italic text-stone-800 text-sm sm:text-base">
                  Dành gửi: <span className="font-bold text-[#8B2500]">Thầy Cô kính yêu</span>
                </p>
                <p className="text-[11px] text-stone-600 font-serif">
                  Tấm lòng từ: <span className="font-medium text-stone-700">Học trò của Thầy Cô</span>
                </p>
              </div>

              {/* Con tem cổ điển */}
              <div className="border-2 border-dashed border-[#B8860B] bg-[#FFFDF9] p-2 rounded shadow-sm text-center transform rotate-2">
                <p className="text-[8px] uppercase tracking-wider font-bold text-[#8B2500]">VIỆT NAM</p>
                <p className="text-base sm:text-lg font-serif-title font-bold text-[#8B2500] leading-none my-0.5">20·11</p>
                <p className="text-[7px] tracking-wider text-stone-500 uppercase">TRI ÂN</p>
              </div>
            </div>

            {/* Dấu niêm phong sáp đỏ ở trung tâm phong bì */}
            <div className="relative z-10 flex flex-col items-center justify-center my-6 sm:my-8">
              <div className="relative transform group-hover:scale-110 transition-transform duration-300">
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#A82A08] via-[#8B2500] to-[#691800] flex items-center justify-center shadow-xl border-2 border-amber-300/70">
                  <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border border-amber-200/50 flex flex-col items-center justify-center text-amber-100">
                    <Sparkles className="w-5 h-5 text-amber-200 animate-pulse mb-0.5" />
                    <span className="text-[10px] font-serif font-bold tracking-widest uppercase">TRI ÂN</span>
                  </div>
                </div>

                {/* Dải ruy băng lụa */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1 -z-10">
                  <div className="w-2.5 h-6 bg-[#691800] -rotate-12 rounded-b" />
                  <div className="w-2.5 h-6 bg-[#691800] rotate-12 rounded-b" />
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif-title font-bold text-[#3D2517] mt-4 group-hover:text-[#8B2500] transition-colors">
                Thư Tri Ân Thầy Cô
              </h2>
              <p className="font-serif italic text-stone-600 text-xs sm:text-sm mt-1">
                &ldquo;Một chữ cũng là thầy, nửa chữ cũng là thầy&rdquo;
              </p>
            </div>

            {/* NÚT CHÍNH: BẤM ĐỂ MỞ LÁ THƯ VÀ TỰ ĐỘNG PHÁT NHẠC */}
            <div className="relative z-10 pt-2 flex items-center justify-center">
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#8B2500] via-[#A83200] to-[#B8860B] text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Mở thư</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ================= PAGE 2: NỘI DUNG TẤM THIỆP & NHẠC ĐANG CHẠY ================= */
        <div className="relative z-20 w-full max-w-5xl my-auto py-2 sm:py-4 animate-in fade-in zoom-in-95 duration-500">
          
          {/* Thanh điều khiển nhạc & Nút gấp thư lại */}
          <header className="fixed top-3 right-3 sm:top-4 sm:right-4 z-30 flex items-center gap-2">
            <button
              onClick={() => setIsOpened(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-[#8B5A2B]/20 text-stone-700 shadow-md text-xs font-medium transition hover:scale-105 active:scale-95 cursor-pointer"
              title="Đóng lá thư lại"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Gấp thư</span>
            </button>

            <button
              onClick={handleToggleMusic}
              className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-[#8B5A2B]/20 text-[#8B2500] shadow-md text-xs font-semibold transition hover:scale-105 active:scale-95 cursor-pointer"
              title={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc: Em Là Cô Giáo Vùng Cao (1:10)'}
            >
              {isPlaying ? (
                <>
                  <div className="flex items-end gap-0.5 h-3.5 w-3.5">
                    <span className="w-0.5 bg-[#8B2500] h-3.5 animate-pulse rounded-full" />
                    <span className="w-0.5 bg-[#B8860B] h-2 animate-bounce rounded-full" />
                    <span className="w-0.5 bg-[#8B2500] h-3 animate-pulse rounded-full" />
                  </div>
                  <span className="truncate max-w-[140px] sm:max-w-[200px]">Nhạc: Em Là Cô Giáo Vùng Cao</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-stone-500" />
                  <span className="text-stone-600">Bật nhạc nền</span>
                </>
              )}
            </button>
          </header>

          {/* KHỐI TẤM THIỆP 20/11 ĐÃ MỞ TRANG TRỌNG */}
          <div className="bg-[#FFFDF9] rounded-3xl shadow-2xl card-shadow-luxury border border-[#B8860B]/30 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* CỘT TRÁI: BỨC TRANH NGHỆ THUẬT VỪA VẶN TỶ LỆ 4:3 */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#26170E] via-[#1D110A] to-[#140A05] p-4 sm:p-5 lg:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#8B5A2B]/20">
              {/* Header nhỏ */}
              <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-widest text-amber-200/90 font-semibold">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  TRI ÂN THẦY CÔ 20/11
                </span>
                <span className="text-[10px] text-amber-300/60 font-serif italic">
                  Nét chữ nhân văn
                </span>
              </div>

              {/* Khung tranh 4:3 trọn vẹn toàn bộ chi tiết */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-amber-400/25 group my-auto bg-black/40">
                <img
                  src={cardCoverImg}
                  alt="Thiệp chúc mừng ngày Nhà giáo Việt Nam 20-11"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/images/card_cover_teachers_day_1794045030288.jpg';
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-3 right-3 text-white text-left">
                  <span className="text-[9px] uppercase tracking-widest text-amber-200 font-semibold">
                    MỪNG NGÀY NHÀ GIÁO
                  </span>
                  <p className="font-serif italic text-[11px] text-stone-200 line-clamp-1">
                    Tri ân những người gieo mầm tri thức
                  </p>
                </div>
              </div>

              {/* Dòng ca từ ý nghĩa từ bài hát */}
              <div className="mt-3 pt-3 border-t border-amber-300/15 text-stone-300">
                <p className="font-serif italic text-xs leading-relaxed text-amber-100/90 text-left">
                  &ldquo;Gánh cái chữ băng rừng lội suối, giữa non xanh mây vờn đỉnh đèo cao... Trang giáo án còn gì đẹp hơn thế, dẫu đá cheo leo ươm những mầm xanh.&rdquo;
                </p>
                <p className="text-[10px] text-amber-300/70 font-sans mt-1 text-left">
                  Bài hát: Em Là Cô Giáo Vùng Cao (Sơn Hoàng & Mỷ Lam)
                </p>
              </div>
            </div>

            {/* CỘT PHẢI: LỜI CHÚC Ý NGHĨA TRANG TRỌNG */}
            <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 parchment-pattern flex flex-col justify-between relative">
              {/* Hoa văn góc viền vàng cổ điển */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#B8860B]/40 pointer-events-none" />
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#B8860B]/40 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#B8860B]/40 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#B8860B]/40 pointer-events-none" />

              <div>
                {/* Tiêu đề thiệp */}
                <div className="text-center pb-4 border-b border-[#B8860B]/20">
                  <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#8B5A2B] font-semibold">
                    <Sparkles className="w-3 h-3 text-[#B8860B]" />
                    <span>NGÀY NHÀ GIÁO VIỆT NAM</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#8B2500] mt-1">
                    Tri Ân Thầy Cô
                  </h1>
                  <p className="text-[11px] font-serif italic text-stone-500 mt-0.5">
                    Ngày 20 tháng 11
                  </p>
                </div>

                {/* Lời gửi đến thầy cô (có thể chỉnh sửa trực tiếp) */}
                <div className="pt-4 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-base sm:text-lg text-[#3B2212]">
                      Kính gửi:
                    </span>
                    <input
                      type="text"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="font-serif font-bold text-base sm:text-lg text-[#8B2500] bg-transparent border-b border-dashed border-[#8B5A2B]/40 focus:border-[#8B2500] focus:outline-none px-1 py-0.5 w-auto flex-1"
                      title="Bấm để sửa tên Thầy Cô nếu muốn"
                    />
                  </div>
                </div>

                {/* Nội dung lời chúc duy nhất */}
                <p className="text-xs sm:text-sm text-stone-800 font-prose-reading leading-relaxed md:leading-loose whitespace-pre-line py-3 text-left">
                  {wishMessage}
                </p>

                {/* Trích dẫn câu thơ ngắn */}
                <div className="my-3 p-3 rounded-xl bg-[#FAF3E6] border border-[#B8860B]/25 text-center">
                  <p className="font-serif italic text-xs text-[#6B4423]">
                    &ldquo;Muốn sang thì bắc cầu Kiều<br />
                    Muốn con hay chữ thì yêu lấy thầy.&rdquo;
                  </p>
                </div>
              </div>

              {/* Chân thiệp: Người gửi & Nút sao chép lời chúc */}
              <div className="pt-4 mt-2 border-t border-[#B8860B]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs text-stone-600 w-full sm:w-auto">
                  <span className="font-serif italic">Kính gửi từ:</span>
                  <input
                    type="text"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    className="font-script-calligraphy text-xl font-bold text-[#8B2500] bg-transparent border-b border-dashed border-[#8B5A2B]/40 focus:border-[#8B2500] focus:outline-none px-1"
                    title="Bấm để sửa tên người gửi nếu muốn"
                  />
                </div>

                <button
                  onClick={handleCopyWish}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B2500] to-[#B8860B] hover:opacity-95 text-white text-xs font-semibold shadow transition active:scale-95 whitespace-nowrap cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Đã sao chép!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép lời chúc</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

          {/* Dòng chữ cảm ơn nhỏ ở đáy trang */}
          <footer className="mt-6 text-center text-[11px] text-stone-400 font-serif flex items-center justify-center gap-1">
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
            <span>Kính chúc quý Thầy Cô một ngày 20/11 dạt dào niềm vui và bình an</span>
          </footer>
        </div>
      )}
    </main>
  );
}
