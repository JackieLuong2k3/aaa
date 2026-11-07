import { WishItem } from '../types/card';

export const WISH_CATEGORIES = [
  { id: 'all', label: 'Tất cả lời chúc' },
  { id: 'teacher-male', label: 'Dành tặng Thầy' },
  { id: 'teacher-female', label: 'Dành tặng Cô' },
  { id: 'alumni', label: 'Cựu học sinh tri ân' },
  { id: 'students', label: 'Học sinh đang theo học' },
  { id: 'poems', label: 'Thơ 20/11 bất hủ' },
  { id: 'quotes', label: 'Danh ngôn nhà giáo' },
] as const;

export const SAMPLE_WISHES: WishItem[] = [
  {
    id: 'w-male-1',
    category: 'teacher-male',
    title: 'Người thuyền trưởng kiên định',
    content: 'Nhân ngày Nhà giáo Việt Nam 20/11, em xin kính chúc Thầy luôn dồi dào sức khỏe, tràn đầy nhiệt huyết và niềm vui trong sự nghiệp trồng người. Cảm ơn Thầy đã như người thuyền trưởng vững tay chèo, dẫn lối chúng em qua những năm tháng bỡ ngỡ bước vào đời.',
    tags: ['Tri ân', 'Kính trọng', 'Ấm áp']
  },
  {
    id: 'w-male-2',
    category: 'teacher-male',
    title: 'Phấn trắng và mái tóc bạc',
    content: 'Có những bài học không nằm trong sách vở, mà ở chính nhân cách và sự bao dung của Thầy. Bụi phấn năm nào có thể đã vương bạc mái tóc Thầy, nhưng ngọn lửa đam mê Thầy thắp lên trong tim chúng em vẫn sẽ luôn rực sáng. Kính chúc Thầy ngày 20/11 thật nhiều an vui và hạnh phúc!',
    tags: ['Xúc động', 'Bụi phấn', 'Bài học cuộc đời']
  },
  {
    id: 'w-female-1',
    category: 'teacher-female',
    title: 'Người mẹ hiền thứ hai',
    content: 'Kính gửi Cô giáo kính yêu! Trong trái tim em, Cô mãi là người mẹ hiền thứ hai luôn ân cần, dịu dàng nâng đỡ từng bước đi đầu đời. Nhân ngày 20/11, chúng em kính chúc Cô luôn tươi trẻ, bình an và mãi giữ nụ cười đôn hậu rạng rỡ trên bục giảng thân thương.',
    tags: ['Yêu thương', 'Người mẹ thứ hai', 'Dịu dàng']
  },
  {
    id: 'w-female-2',
    category: 'teacher-female',
    title: 'Ánh mắt bao dung nâng bước học trò',
    content: 'Từng lời dạy ân cần, từng ánh mắt dõi theo đầy động viên của Cô là hành trang quý giá nhất mà em mang theo trong suốt hành trình trưởng thành. Chúc Cô ngày 20/11 ngập tràn hoa tươi, lời chúc ấm áp và vạn sự như ý bên gia đình và các thế hệ học trò.',
    tags: ['Hành trang', 'Biết ơn', 'Nâng bước']
  },
  {
    id: 'w-alumni-1',
    category: 'alumni',
    title: 'Dẫu đi muôn phương, lòng vẫn hướng về bục giảng',
    content: 'Dẫu mai sau đi khắp bốn phương trời, chúng em vẫn mãi khắc ghi công ơn dạy dỗ như trời biển của Thầy Cô. Cảm ơn Thầy Cô đã cho chúng em đôi cánh tri thức để tự tin bay xa. Ngày 20/11, xin kính chúc Thầy Cô một mùa hiến chương an lành, dạt dào niềm tự hào khi nhìn đàn chim nhỏ năm xưa đã khôn lớn.',
    tags: ['Cựu học sinh', 'Bay xa', 'Khôn lớn']
  },
  {
    id: 'w-alumni-2',
    category: 'alumni',
    title: 'Bến đò xưa và người lái đò thầm lặng',
    content: 'Chuyến đò tri thức năm nào đã cập bến, chúng em đã bước vào những ngã rẽ cuộc đời, nhưng hình bóng Thầy Cô đứng lặng lẽ nơi bến xưa vẫn vẹn nguyên trong ký ức. Kính chúc Thầy Cô luôn an khang, tiếp tục chở những chuyến đò ước mơ sang sông bình an.',
    tags: ['Người lái đò', 'Kỷ niệm', 'Bến xưa']
  },
  {
    id: 'w-students-1',
    category: 'students',
    title: 'Lời hứa học trò ngoan gửi Thầy Cô',
    content: 'Nhân ngày 20/11, thay mặt cả lớp, chúng em xin kính chúc Thầy Cô luôn mạnh khỏe, hạnh phúc và luôn kiên nhẫn với lũ học trò nghịch ngợm của chúng em. Chúng em hứa sẽ luôn chăm ngoan, học giỏi để không phụ lòng tin yêu và công ơn của Thầy Cô!',
    tags: ['Học trò ngoan', 'Tập thể lớp', 'Tri ân']
  },
  {
    id: 'w-poem-1',
    category: 'poems',
    title: 'Người Lái Đò (Thơ khuyết danh)',
    content: `Một đời người - một dòng sông...\nMấy ai làm kẻ đứng trông bến bờ,\n"Muốn qua sông phải lụy đò"\nĐường đời muôn bước cậy nhờ người đưa...\n\nTháng năm dầu dãi nắng mưa,\nCon đò tri thức Thầy đưa bao người.\nQua sông gửi lại nụ cười,\nTình yêu thương gửi muôn đời ngát hương.`,
    author: 'Thơ tri ân',
    tags: ['Thơ hay', 'Người lái đò', 'Sâu lắng']
  },
  {
    id: 'w-poem-2',
    category: 'poems',
    title: 'Bụi Phấn Vương (Trích thơ & lời ca)',
    content: `Khi thầy viết bảng\nBụi phấn rơi rơi\nCó hạt bụi nào rơi trên bục giảng\nCó hạt bụi nào vương trên tóc thầy...\n\nEm yêu phút giây này\nThầy em chắp cánh bay\nCho em khôn lớn mai sau thành người...`,
    author: 'Vũ Hoàng & Lê Văn Lộc',
    tags: ['Bụi phấn', 'Bất hủ', 'Hoài niệm']
  },
  {
    id: 'w-poem-3',
    category: 'poems',
    title: 'Bàn Tay Cô Giáo (Thơ)',
    content: `Bàn tay cô ấm áp\nNâng từng nét chữ hoa\nUốn cho em ngay thẳng\nNhư lời mẹ thiết tha.\n\nĐường đời dẫu gập ghềnh\nNhớ bàn tay của cô\nLòng em như thêm sáng\nVững vàng trước sóng xô.`,
    author: 'Thơ sưu tầm',
    tags: ['Bàn tay cô', 'Nét chữ', 'Ân tình']
  },
  {
    id: 'w-quotes-1',
    category: 'quotes',
    title: 'Tôn sư trọng đạo',
    content: '"Nhất tự vi sư, bán tự vi sư. Một chữ cũng là thầy, nửa chữ cũng là thầy. Công ơn dạy dỗ vỡ lòng của thầy cô là nền móng soi sáng cho cả một đời người."',
    author: 'Tục ngữ Việt Nam',
    tags: ['Truyền thống', 'Đạo nghĩa']
  },
  {
    id: 'w-quotes-2',
    category: 'quotes',
    title: 'Người gieo hạt tâm hồn',
    content: '"Nghề dạy học là nghề cao quý nhất trong những nghề cao quý, nghề sáng tạo nhất trong những nghề sáng tạo, vì nó tạo ra những con người có ích cho đời."',
    author: 'Thủ tướng Phạm Văn Đồng',
    tags: ['Nghề cao quý', 'Tự hào']
  }
];

export const CARD_THEMES = [
  {
    id: 'vintage-wood' as const,
    name: 'Hoài Niệm Bụi Phấn',
    description: 'Tone gỗ ấm, bảng đen, phấn trắng & nét bút cổ điển',
    bgGradient: 'from-[#2A1E17] via-[#3E2B20] to-[#1A120E]',
    paperBg: 'bg-[#FDFBF7]',
    accentColor: '#B8860B',
    borderColor: 'border-[#8B5A2B]/30',
    ribbonColor: '#9A3412',
    sealColor: '#8B2500'
  },
  {
    id: 'lotus-gold' as const,
    name: 'Hương Sen Tri Ân',
    description: 'Tone sen hồng thuần khiết, viền chỉ vàng hoàng gia & trang nhã',
    bgGradient: 'from-[#3A2228] via-[#4A2D33] to-[#201317]',
    paperBg: 'bg-[#FFFDF9]',
    accentColor: '#D4AF37',
    borderColor: 'border-[#D4AF37]/40',
    ribbonColor: '#BE185D',
    sealColor: '#9D174D'
  },
  {
    id: 'crimson-rose' as const,
    name: 'Hoa Hồng Kính Dâng',
    description: 'Tone đỏ nhung thắm thiết, tôn vinh tình nghĩa sư đồ sâu nặng',
    bgGradient: 'from-[#3B151E] via-[#521C29] to-[#280C14]',
    paperBg: 'bg-[#FFFBF7]',
    accentColor: '#E11D48',
    borderColor: 'border-[#E11D48]/30',
    ribbonColor: '#B91C1C',
    sealColor: '#991B1B'
  },
  {
    id: 'autumn-chalk' as const,
    name: 'Mùa Thu Tựu Trường',
    description: 'Tone vàng ấm lá phong, nắng sớm sân trường & tri thức',
    bgGradient: 'from-[#2D2418] via-[#433522] to-[#1C1710]',
    paperBg: 'bg-[#FAF6EE]',
    accentColor: '#D97706',
    borderColor: 'border-[#D97706]/35',
    ribbonColor: '#C2410C',
    sealColor: '#9A3412'
  }
];
