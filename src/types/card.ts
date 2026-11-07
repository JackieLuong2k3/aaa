export type CardThemeId = 'vintage-wood' | 'lotus-gold' | 'crimson-rose' | 'autumn-chalk';

export interface CardCustomization {
  recipientTitle: string; // e.g., "Kính gửi Thầy", "Kính gửi Cô", "Kính gửi Thầy Cô giáo"
  recipientName: string; // e.g., "Nguyễn Văn Tuấn", "Trần Thị Lan"
  senderName: string; // e.g., "Em Nguyễn Hoàng Long", "Tập thể lớp 12A3 (Niên khóa 2021-2024)"
  message: string;
  poemExcerpt?: string;
  themeId: CardThemeId;
  date: string; // e.g., "Ngày 20 tháng 11 năm 2026"
}

export type FlowerType = 'mixed' | 'rose' | 'lotus' | 'poinciana' | 'golden_sparkles';

export interface WishItem {
  id: string;
  category: 'teacher-male' | 'teacher-female' | 'alumni' | 'students' | 'poems' | 'quotes';
  title: string;
  content: string;
  author?: string;
  tags?: string[];
}

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  tempo: number;
}
