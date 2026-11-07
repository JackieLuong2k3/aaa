import React, { useState } from 'react';
import { CardCustomization, CardThemeId } from '../types/card';
import { CARD_THEMES, SAMPLE_WISHES } from '../data/wishes';
import { audioEngine } from '../utils/audioEngine';
import { X, Check, Sparkles, BookOpen, User, Send, Palette } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  customization: CardCustomization;
  onSave: (updated: CardCustomization) => void;
}

export const CardCustomizerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  customization,
  onSave
}) => {
  const [recipientTitle, setRecipientTitle] = useState(customization.recipientTitle);
  const [recipientName, setRecipientName] = useState(customization.recipientName);
  const [senderName, setSenderName] = useState(customization.senderName);
  const [message, setMessage] = useState(customization.message);
  const [poemExcerpt, setPoemExcerpt] = useState(customization.poemExcerpt || '');
  const [themeId, setThemeId] = useState<CardThemeId>(customization.themeId);
  const [date, setDate] = useState(customization.date);

  if (!isOpen) return null;

  const handleApplySampleWish = (wishContent: string, author?: string) => {
    setMessage(wishContent);
    if (author) {
      setPoemExcerpt(`Tác giả: ${author}`);
    }
    audioEngine.playChime();
  };

  const handleSave = () => {
    onSave({
      recipientTitle,
      recipientName,
      senderName,
      message,
      poemExcerpt,
      themeId,
      date
    });
    audioEngine.playChime();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#8B2500]" />
            <div>
              <h3 className="text-base font-serif font-bold text-stone-900">
                Tùy Biến Tấm Thiệp 20/11
              </h3>
              <p className="text-xs text-stone-500">
                Cá nhân hóa tên thầy cô, người gửi và lời chúc ý nghĩa
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-sm text-stone-800">
          {/* Section 1: Recipient & Sender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#8B5A2B]" />
                Cách xưng hô:
              </label>
              <select
                value={recipientTitle}
                onChange={e => setRecipientTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#8B2500]/30"
              >
                <option value="Kính gửi Thầy">Kính gửi Thầy</option>
                <option value="Kính gửi Cô">Kính gửi Cô</option>
                <option value="Kính gửi Thầy Cô kính yêu">Kính gửi Thầy Cô kính yêu</option>
                <option value="Kính tặng Thầy Cô chủ nhiệm">Kính tặng Thầy Cô chủ nhiệm</option>
                <option value="Thân gửi Người Mẹ hiền thứ hai">Thân gửi Người Mẹ hiền thứ hai</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Tên Thầy / Cô:
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={e => setRecipientName(e.target.value)}
                placeholder="VD: Nguyễn Văn Tuấn / Trần Thị Mai"
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#8B2500]/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-[#8B5A2B]" />
                Tên người gửi / Lớp:
              </label>
              <input
                type="text"
                value={senderName}
                onChange={e => setSenderName(e.target.value)}
                placeholder="VD: Em Hoàng Long / Tập thể lớp 12A3"
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#8B2500]/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Ngày gửi:
              </label>
              <input
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)}
                placeholder="Ngày 20 tháng 11 năm 2026"
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#8B2500]/30"
              />
            </div>
          </div>

          {/* Section 2: Card Color Theme */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[#8B5A2B]" />
              Phong cách mỹ thuật thiệp:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CARD_THEMES.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => setThemeId(theme.id)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    themeId === theme.id
                      ? 'border-[#8B2500] ring-2 ring-[#8B2500]/20 bg-[#FAF4EA]'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div
                    className="w-full h-8 rounded-lg mb-2 shadow-inner"
                    style={{ backgroundColor: theme.sealColor }}
                  />
                  <p className="text-xs font-semibold text-stone-900 truncate">{theme.name}</p>
                  <p className="text-[10px] text-stone-500 line-clamp-1">{theme.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Message Content */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#8B5A2B]" />
                Nội dung lời chúc trong thiệp:
              </label>
              <span className="text-[11px] text-stone-400 font-mono">
                {message.length} ký tự
              </span>
            </div>
            <textarea
              rows={5}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Nhập lời chúc chân thành của bạn gửi đến Thầy Cô..."
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#8B2500]/30 font-serif leading-relaxed"
            />
          </div>

          {/* Section 4: Quick Select from Samples */}
          <div>
            <p className="text-xs font-semibold text-stone-600 mb-2">
              Hoặc chọn nhanh lời chúc mẫu ý nghĩa:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {SAMPLE_WISHES.slice(0, 6).map(w => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => handleApplySampleWish(w.content, w.author)}
                  className="p-2.5 text-left rounded-lg border border-stone-200 hover:border-[#8B2500]/40 hover:bg-[#FAF6EE] transition text-xs space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-800 group-hover:text-[#8B2500]">
                      {w.title}
                    </span>
                    <span className="text-[10px] text-stone-400 italic">Chọn</span>
                  </div>
                  <p className="text-[11px] text-stone-600 line-clamp-2">
                    {w.content}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-stone-200 bg-[#FAF7F2]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-200 transition"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#8B2500] to-[#B8860B] rounded-lg shadow hover:opacity-95 transition"
          >
            <Check className="w-4 h-4" />
            <span>Cập nhật thiệp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
