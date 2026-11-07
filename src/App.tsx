/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FallingFlowersCanvas } from './components/FallingFlowersCanvas';
import { Music, VolumeX, Copy, Check, Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [recipient, setRecipient] = useState<string>('Thầy Cô kính yêu');
  const [sender, setSender] = useState<string>('Học trò của Thầy Cô');
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const AUDIO_SRC = '/assets/aistudio/Em_l__c__gi_o_v_ng_cao_-_S_n_Ho_ng_M__Lam__T_nh_ca_T_y_B_c_hay_nh_t_-_S_n_Ho_ng_M__Lam_d3118528.mp3';
  const START_TIME = 70; // 1:10 = 70 seconds

  // 1 lời chúc đơn giản, sâu sắc và ý nghĩa
  const wishMessage = `Nhân ngày Nhà giáo Việt Nam 20/11, em xin gửi lời tri ân chân thành và sâu sắc nhất tới Thầy Cô.\n\nKính chúc Thầy Cô luôn dồi dào sức khỏe, bình an và hạnh phúc để tiếp tục chèo lái những chuyến đò tri thức sang sông. Cảm ơn Thầy Cô đã luôn bao dung, tận tụy soi sáng con đường tương lai của chúng em!`;

  // Autoplay music on initial mount (song: "Em Là Cô Giáo Vùng Cao" starting from 1:10)
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.preload = 'auto';
    audio.currentTime = START_TIME;
    audioRef.current = audio;

    const startPlayback = () => {
      if (audio.currentTime < START_TIME) {
        audio.currentTime = START_TIME;
      }
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Browser requires user interaction
      });
    };

    // Attempt instant autoplay
    startPlayback();

    // Loop back to 1:10 when finished
    audio.addEventListener('ended', () => {
      audio.currentTime = START_TIME;
      audio.play().catch(() => {});
    });

    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);

    // Ensure audio starts on first click anywhere if initial autoplay was blocked
    const handleFirstGesture = () => {
      if (audio.paused) {
        startPlayback();
      }
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });

    return () => {
      audio.pause();
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
  }, []);

  const handleToggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      if (audio.currentTime < START_TIME || audio.ended) {
        audio.currentTime = START_TIME;
      }
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleCopyWish = () => {
    const fullText = `Kính gửi ${recipient},\n\n${wishMessage}\n\nKính chúc Thầy Cô ngày 20/11 thật nhiều niềm vui!\n— ${sender}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2C241E] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative selection:bg-[#E8C5A5]">
      {/* Hiệu ứng 1 loại cánh hoa rơi nhẹ nhàng */}
      <FallingFlowersCanvas />

      {/* Thanh điều khiển nhạc tối giản ở góc trên */}
      <header className="fixed top-4 right-4 z-30">
        <button
          onClick={handleToggleMusic}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-[#8B5A2B]/20 text-[#8B2500] shadow-md text-xs font-semibold transition hover:scale-105 active:scale-95"
          title={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc: Em Là Cô Giáo Vùng Cao (1:10)'}
        >
          {isPlaying ? (
            <>
              <div className="flex items-end gap-0.5 h-3.5 w-3.5">
                <span className="w-0.5 bg-[#8B2500] h-3.5 animate-pulse rounded-full" />
                <span className="w-0.5 bg-[#B8860B] h-2 animate-bounce rounded-full" />
                <span className="w-0.5 bg-[#8B2500] h-3 animate-pulse rounded-full" />
              </div>
              <span className="truncate max-w-[180px]">Nhạc: Em Là Cô Giáo Vùng Cao</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-stone-500" />
              <span className="text-stone-600">Bật nhạc nền</span>
            </>
          )}
        </button>
      </header>

      {/* Thông báo chạm nghe nhạc nếu trình duyệt chặn autoplay */}
      {!isPlaying && (
        <div
          onClick={handleToggleMusic}
          className="fixed top-16 z-30 cursor-pointer animate-bounce"
        >
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B2500] text-white text-xs font-medium shadow-lg hover:bg-[#A32E00] transition">
            <Music className="w-3.5 h-3.5" />
            <span>Chạm để nghe nhạc &quot;Em Là Cô Giáo Vùng Cao&quot; (1:10)</span>
          </div>
        </div>
      )}

      {/* KHỐI 1 TẤM THIỆP DUY NHẤT Ở TRUNG TÂM */}
      <div className="relative z-20 w-full max-w-4xl my-auto">
        <div className="bg-[#FFFDF9] rounded-3xl shadow-2xl card-shadow-luxury border border-[#B8860B]/30 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* CỘT TRÁI: BỨC BÌA TRANH 20/11 ẤM ÁP */}
          <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[340px] lg:min-h-full overflow-hidden bg-[#241710]">
            <img
              src="/src/assets/images/card_cover_teachers_day_1794045030288.jpg"
              alt="Thiệp chúc mừng ngày Nhà giáo Việt Nam 20-11"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Dòng chữ trang trí trên ảnh */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] uppercase tracking-widest text-amber-200 font-semibold">
                KỶ NIỆM 20/11
              </span>
              <p className="font-serif italic text-xs text-stone-200 mt-1">
                &ldquo;Gánh cái chữ băng rừng lội suối, giữa non xanh mây vờn đỉnh đèo cao...&rdquo;
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

              {/* Lời gửi đến thầy cô */}
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
              <p className="text-xs sm:text-sm text-stone-800 font-prose-reading leading-relaxed md:leading-loose whitespace-pre-line py-3">
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
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B2500] to-[#B8860B] hover:opacity-95 text-white text-xs font-semibold shadow transition active:scale-95 whitespace-nowrap"
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
      </div>

      {/* Dòng chữ cảm ơn nhỏ ở đáy trang */}
      <footer className="relative z-20 mt-6 text-center text-[11px] text-stone-400 font-serif flex items-center justify-center gap-1">
        <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
        <span>Kính chúc quý Thầy Cô một ngày 20/11 dạt dào niềm vui và bình an</span>
      </footer>
    </main>
  );
}
