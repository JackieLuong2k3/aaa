import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music } from 'lucide-react';
import { audioEngine, TRACK_LIST } from '../utils/audioEngine';

interface Props {
  onUserInteracted?: () => void;
}

export const MusicPlayerWidget: React.FC<Props> = ({ onUserInteracted }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState(audioEngine.getCurrentTrack());
  const [volume, setVolume] = useState<number>(audioEngine.getVolume());
  const [isMuted, setIsMuted] = useState<boolean>(audioEngine.getIsMuted());
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [needsGesturePrompt, setNeedsGesturePrompt] = useState<boolean>(true);

  useEffect(() => {
    // Attempt instant autoplay on mount
    audioEngine.play(0);

    const unsubscribe = audioEngine.subscribe(() => {
      setIsPlaying(audioEngine.getIsPlaying());
      setCurrentTrack(audioEngine.getCurrentTrack());
      setVolume(audioEngine.getVolume());
      setIsMuted(audioEngine.getIsMuted());
      if (audioEngine.getIsPlaying()) {
        setNeedsGesturePrompt(false);
      }
    });

    // Check after brief delay if browser allowed unmuted autoplay
    const checkTimer = window.setTimeout(() => {
      if (audioEngine.getIsPlaying()) {
        setNeedsGesturePrompt(false);
      }
    }, 600);

    return () => {
      unsubscribe();
      window.clearTimeout(checkTimer);
    };
  }, []);

  const handleTogglePlay = () => {
    if (onUserInteracted) onUserInteracted();
    setNeedsGesturePrompt(false);
    audioEngine.togglePlay();
  };

  const handleNextTrack = () => {
    if (onUserInteracted) onUserInteracted();
    setNeedsGesturePrompt(false);
    audioEngine.nextTrack();
  };

  const handlePrevTrack = () => {
    if (onUserInteracted) onUserInteracted();
    setNeedsGesturePrompt(false);
    audioEngine.prevTrack();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioEngine.setVolume(val);
  };

  const handleToggleMute = () => {
    audioEngine.toggleMute();
  };

  const handleDirectPlay = (index: number) => {
    if (onUserInteracted) onUserInteracted();
    setNeedsGesturePrompt(false);
    audioEngine.play(index);
  };

  return (
    <>
      {/* Gentle Floating Autoplay Prompt Banner (disappears once music plays or dismissed) */}
      {needsGesturePrompt && !isPlaying && (
        <div
          onClick={handleTogglePlay}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 cursor-pointer transition-all animate-bounce"
        >
          <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8B2500] to-[#B8860B] text-white shadow-2xl border border-amber-300/40 backdrop-blur-sm text-sm font-medium hover:scale-105 active:scale-95">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-100"></span>
            </span>
            <span>🎵 Bấm để lắng nghe giai điệu &quot;Bụi Phấn&quot; tri ân Thầy Cô</span>
            <Play className="w-4 h-4 fill-white text-white ml-1" />
          </div>
        </div>
      )}

      {/* Floating Bottom Right Music Pill Controller */}
      <div className="fixed bottom-5 right-5 z-40">
        <div className="relative">
          {isExpanded && (
            <div className="mb-3 p-4 bg-white/95 backdrop-blur-md border border-[#8B5A2B]/20 rounded-2xl shadow-2xl w-80 text-stone-800 space-y-3 transition-all animate-in fade-in slide-in-from-bottom-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full bg-[#8B2500] text-amber-100 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }}>
                    <Music className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900 leading-tight">Giai Điệu Tri Ân 20/11</h4>
                    <p className="text-[11px] text-stone-500 font-serif italic">Tiếng dương cầm & hộp nhạc hoài niệm</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-stone-400 hover:text-stone-600 text-xs px-2 py-1 rounded"
                >
                  Đóng
                </button>
              </div>

              {/* Track Playlist */}
              <div className="space-y-1">
                {TRACK_LIST.map((t, idx) => {
                  const isCurrent = currentTrack.id === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleDirectPlay(idx)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition flex items-center justify-between ${
                        isCurrent
                          ? 'bg-[#B8860B]/15 text-[#8B2500] font-semibold border border-[#B8860B]/30'
                          : 'text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-mono text-[10px] text-stone-400">0{idx + 1}</span>
                        <span className="truncate">{t.title}</span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-serif italic truncate max-w-[90px]">{t.artist}</span>
                    </button>
                  );
                })}
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleToggleMute}
                  className="text-stone-600 hover:text-stone-900 p-1 rounded transition"
                  title={isMuted ? 'Bật âm lượng' : 'Tắt tiếng'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-stone-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#8B5A2B]" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1.5 bg-stone-200 accent-[#8B5A2B] rounded-lg cursor-pointer"
                />
                <span className="text-[10px] font-mono text-stone-500 w-8 text-right">
                  {Math.round((isMuted ? 0 : volume) * 100)}%
                </span>
              </div>
            </div>
          )}

          {/* Floating Pill Button */}
          <div className="flex items-center gap-1.5 p-1.5 pl-3 pr-2 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-[#8B5A2B]/30 text-[#2E1D11] shadow-xl transition hover:shadow-2xl">
            {/* Equalizer animation */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2.5 text-left py-1 pr-2 cursor-pointer group"
              title="Mở danh sách bài hát"
            >
              <div className="flex items-end gap-0.5 h-4 w-4">
                <span className={`w-1 bg-[#8B2500] rounded-full transition-all duration-300 ${isPlaying ? 'h-4 animate-pulse' : 'h-1.5'}`} />
                <span className={`w-1 bg-[#B8860B] rounded-full transition-all duration-300 ${isPlaying ? 'h-2.5 animate-bounce' : 'h-1'}`} />
                <span className={`w-1 bg-[#8B2500] rounded-full transition-all duration-300 ${isPlaying ? 'h-3.5 animate-pulse' : 'h-2'}`} />
              </div>
              <div className="max-w-[120px] md:max-w-[150px] truncate">
                <p className="text-xs font-semibold leading-tight text-stone-900 truncate">
                  {currentTrack.title}
                </p>
                <p className="text-[10px] text-stone-500 truncate font-serif italic">
                  {isPlaying ? 'Đang phát...' : 'Tạm dừng'}
                </p>
              </div>
            </button>

            {/* Controls */}
            <div className="flex items-center gap-1 border-l border-stone-200 pl-1.5">
              <button
                onClick={handlePrevTrack}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-700 transition"
                title="Bài trước"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleTogglePlay}
                className="p-2 rounded-full bg-gradient-to-r from-[#8B2500] to-[#B8860B] text-white hover:opacity-90 shadow-md transition transform active:scale-90"
                title={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc'}
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 fill-white" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                )}
              </button>

              <button
                onClick={handleNextTrack}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-700 transition"
                title="Bài tiếp theo"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
