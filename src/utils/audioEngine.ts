/**
 * Web Audio API Acoustic Engine for Vietnamese Teacher's Day
 * Plays authentic synthesized piano / celesta melodies with rich resonance
 * Zero external audio file failures, works 100% offline and hermetically.
 */

export interface NoteEvent {
  note: string; // e.g. "C4", "E4", "G4"
  duration: number; // in beats
  time: number; // start beat
  velocity?: number; // 0 to 1
}

// Frequency lookup table for equal temperament (A4 = 440Hz)
const NOTE_FREQS: Record<string, number> = {
  'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
  'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
  'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
  'C6': 1046.50, 'D6': 1174.66, 'E6': 1318.51, 'REST': 0
};

// Melody 1: "Bụi Phấn" (Tribute classic)
const BUI_PHAN_TRACK: { notes: NoteEvent[]; chords: NoteEvent[]; bpm: number } = {
  bpm: 78,
  notes: [
    // Khi thầy viết bảng (E4 G4 A4 G4)
    { note: 'E4', time: 0, duration: 1, velocity: 0.8 },
    { note: 'G4', time: 1, duration: 1, velocity: 0.85 },
    { note: 'A4', time: 2, duration: 1.5, velocity: 0.9 },
    { note: 'G4', time: 3.5, duration: 0.5, velocity: 0.75 },
    // Bụi phấn rơi rơi (E4 D4 C4 D4)
    { note: 'E4', time: 4, duration: 1, velocity: 0.8 },
    { note: 'D4', time: 5, duration: 1, velocity: 0.8 },
    { note: 'C4', time: 6, duration: 1.5, velocity: 0.85 },
    { note: 'D4', time: 7.5, duration: 0.5, velocity: 0.7 },
    // Có hạt bụi nào (E4 G4 A4 C5)
    { note: 'E4', time: 8, duration: 1, velocity: 0.85 },
    { note: 'G4', time: 9, duration: 1, velocity: 0.85 },
    { note: 'A4', time: 10, duration: 1.5, velocity: 0.9 },
    { note: 'C5', time: 11.5, duration: 0.5, velocity: 0.95 },
    // Rơi trên bục giảng (A4 G4 E4 G4)
    { note: 'A4', time: 12, duration: 1, velocity: 0.85 },
    { note: 'G4', time: 13, duration: 1, velocity: 0.8 },
    { note: 'E4', time: 14, duration: 1.5, velocity: 0.8 },
    { note: 'G4', time: 15.5, duration: 0.5, velocity: 0.75 },
    // Có hạt bụi nào vương trên tóc thầy (A4 C5 D5 C5 A4 G4 E4 G4 A4)
    { note: 'A4', time: 16, duration: 1, velocity: 0.9 },
    { note: 'C5', time: 17, duration: 1, velocity: 0.95 },
    { note: 'D5', time: 18, duration: 1.5, velocity: 1.0 },
    { note: 'C5', time: 19.5, duration: 0.5, velocity: 0.85 },
    { note: 'A4', time: 20, duration: 1, velocity: 0.85 },
    { note: 'G4', time: 21, duration: 1, velocity: 0.8 },
    { note: 'E4', time: 22, duration: 1, velocity: 0.8 },
    { note: 'G4', time: 23, duration: 1, velocity: 0.8 },
    { note: 'A4', time: 24, duration: 3, velocity: 0.9 },
    // Em yêu phút giây này (C5 C5 B4 A4 G4)
    { note: 'C5', time: 28, duration: 1, velocity: 0.9 },
    { note: 'C5', time: 29, duration: 1, velocity: 0.9 },
    { note: 'B4', time: 30, duration: 1, velocity: 0.85 },
    { note: 'A4', time: 31, duration: 1, velocity: 0.85 },
    { note: 'G4', time: 32, duration: 2, velocity: 0.8 },
    // Thầy em chắp cánh bay (E4 G4 A4 C5)
    { note: 'E4', time: 34, duration: 1, velocity: 0.85 },
    { note: 'G4', time: 35, duration: 1, velocity: 0.85 },
    { note: 'A4', time: 36, duration: 1, velocity: 0.9 },
    { note: 'C5', time: 37, duration: 2, velocity: 0.95 },
    // Cho em khôn lớn mai sau thành người (D5 C5 A4 G4 C5)
    { note: 'D5', time: 39, duration: 1, velocity: 0.95 },
    { note: 'C5', time: 40, duration: 1, velocity: 0.9 },
    { note: 'A4', time: 41, duration: 1, velocity: 0.85 },
    { note: 'G4', time: 42, duration: 1, velocity: 0.85 },
    { note: 'C5', time: 43, duration: 4, velocity: 0.95 },
  ],
  chords: [
    // C - G - Am - Em - F - C - Dm - G
    { note: 'C3', time: 0, duration: 4, velocity: 0.55 },
    { note: 'G3', time: 4, duration: 4, velocity: 0.5 },
    { note: 'A3', time: 8, duration: 4, velocity: 0.55 },
    { note: 'E3', time: 12, duration: 4, velocity: 0.5 },
    { note: 'F3', time: 16, duration: 4, velocity: 0.55 },
    { note: 'C3', time: 20, duration: 4, velocity: 0.5 },
    { note: 'D3', time: 24, duration: 4, velocity: 0.5 },
    { note: 'G3', time: 28, duration: 4, velocity: 0.55 },
    { note: 'A3', time: 32, duration: 4, velocity: 0.55 },
    { note: 'F3', time: 36, duration: 4, velocity: 0.55 },
    { note: 'G3', time: 40, duration: 4, velocity: 0.55 },
    { note: 'C3', time: 44, duration: 4, velocity: 0.6 },
  ]
};

// Melody 2: "Người Thầy" (Poetic contemplative)
const NGUOI_THAY_TRACK: { notes: NoteEvent[]; chords: NoteEvent[]; bpm: number } = {
  bpm: 72,
  notes: [
    // Người thầy vẫn lặng lẽ (E4 A4 B4 C5 B4)
    { note: 'E4', time: 0, duration: 1, velocity: 0.8 },
    { note: 'A4', time: 1, duration: 1.5, velocity: 0.85 },
    { note: 'B4', time: 2.5, duration: 0.5, velocity: 0.8 },
    { note: 'C5', time: 3, duration: 1.5, velocity: 0.9 },
    { note: 'B4', time: 4.5, duration: 0.5, velocity: 0.8 },
    // Đi về sớm trưa (A4 G4 E4)
    { note: 'A4', time: 5, duration: 1.5, velocity: 0.85 },
    { note: 'G4', time: 6.5, duration: 0.5, velocity: 0.75 },
    { note: 'E4', time: 7, duration: 2, velocity: 0.8 },
    // Từng ngày giọt mồ hôi rơi (G4 A4 B4 C5 D5 C5)
    { note: 'G4', time: 9, duration: 1, velocity: 0.8 },
    { note: 'A4', time: 10, duration: 1, velocity: 0.85 },
    { note: 'B4', time: 11, duration: 1, velocity: 0.85 },
    { note: 'C5', time: 12, duration: 1, velocity: 0.9 },
    { note: 'D5', time: 13, duration: 1.5, velocity: 0.95 },
    { note: 'C5', time: 14.5, duration: 0.5, velocity: 0.85 },
    // Nhòe trang giấy (B4 A4 E4)
    { note: 'B4', time: 15, duration: 1.5, velocity: 0.85 },
    { note: 'A4', time: 16.5, duration: 0.5, velocity: 0.8 },
    { note: 'E4', time: 17, duration: 2, velocity: 0.75 },
    // Để đàn em thơ lớn khôn (E4 A4 B4 C5 E5 D5)
    { note: 'E4', time: 19, duration: 1, velocity: 0.85 },
    { note: 'A4', time: 20, duration: 1, velocity: 0.9 },
    { note: 'B4', time: 21, duration: 1, velocity: 0.9 },
    { note: 'C5', time: 22, duration: 1, velocity: 0.95 },
    { note: 'E5', time: 23, duration: 2, velocity: 1.0 },
    { note: 'D5', time: 25, duration: 1.5, velocity: 0.9 },
    // Bay đến những chân trời (C5 B4 A4)
    { note: 'C5', time: 26.5, duration: 0.5, velocity: 0.85 },
    { note: 'B4', time: 27, duration: 1.5, velocity: 0.85 },
    { note: 'A4', time: 28.5, duration: 2.5, velocity: 0.9 },
  ],
  chords: [
    { note: 'A3', time: 0, duration: 4, velocity: 0.5 },
    { note: 'F3', time: 4, duration: 4, velocity: 0.5 },
    { note: 'C3', time: 8, duration: 4, velocity: 0.5 },
    { note: 'G3', time: 12, duration: 4, velocity: 0.5 },
    { note: 'A3', time: 16, duration: 4, velocity: 0.5 },
    { note: 'F3', time: 20, duration: 4, velocity: 0.5 },
    { note: 'G3', time: 24, duration: 4, velocity: 0.5 },
    { note: 'A3', time: 28, duration: 4, velocity: 0.55 },
  ]
};

// Melody 3: "Khi Tóc Thầy Bạc Trắng" / Khúc Ca Tri Ân
const KHUC_CA_TRI_AN: { notes: NoteEvent[]; chords: NoteEvent[]; bpm: number } = {
  bpm: 75,
  notes: [
    { note: 'C4', time: 0, duration: 1, velocity: 0.8 },
    { note: 'E4', time: 1, duration: 1, velocity: 0.85 },
    { note: 'G4', time: 2, duration: 1.5, velocity: 0.9 },
    { note: 'C5', time: 3.5, duration: 0.5, velocity: 0.95 },
    { note: 'B4', time: 4, duration: 1, velocity: 0.85 },
    { note: 'A4', time: 5, duration: 1, velocity: 0.8 },
    { note: 'G4', time: 6, duration: 2, velocity: 0.85 },

    { note: 'F4', time: 8, duration: 1, velocity: 0.8 },
    { note: 'A4', time: 9, duration: 1, velocity: 0.85 },
    { note: 'C5', time: 10, duration: 1.5, velocity: 0.9 },
    { note: 'B4', time: 11.5, duration: 0.5, velocity: 0.85 },
    { note: 'A4', time: 12, duration: 1, velocity: 0.85 },
    { note: 'G4', time: 13, duration: 1, velocity: 0.8 },
    { note: 'E4', time: 14, duration: 2, velocity: 0.8 },

    { note: 'D4', time: 16, duration: 1, velocity: 0.8 },
    { note: 'F4', time: 17, duration: 1, velocity: 0.85 },
    { note: 'A4', time: 18, duration: 1.5, velocity: 0.9 },
    { note: 'G4', time: 19.5, duration: 0.5, velocity: 0.8 },
    { note: 'E4', time: 20, duration: 1, velocity: 0.8 },
    { note: 'D4', time: 21, duration: 1, velocity: 0.75 },
    { note: 'C4', time: 22, duration: 3, velocity: 0.9 },
  ],
  chords: [
    { note: 'C3', time: 0, duration: 4, velocity: 0.5 },
    { note: 'E3', time: 4, duration: 4, velocity: 0.45 },
    { note: 'F3', time: 8, duration: 4, velocity: 0.5 },
    { note: 'C3', time: 12, duration: 4, velocity: 0.45 },
    { note: 'D3', time: 16, duration: 4, velocity: 0.45 },
    { note: 'G3', time: 20, duration: 4, velocity: 0.5 },
    { note: 'C3', time: 24, duration: 4, velocity: 0.55 },
  ]
};

export const TRACK_LIST = [
  { id: 'bui-phan', title: 'Bụi Phấn', artist: 'Vũ Hoàng & Lê Văn Lộc', data: BUI_PHAN_TRACK },
  { id: 'nguoi-thay', title: 'Người Thầy', artist: 'Nguyễn Nhất Huy', data: NGUOI_THAY_TRACK },
  { id: 'tri-an', title: 'Khúc Ca Tri Ân', artist: 'Giai Điệu Nghĩa Sư Đồ', data: KHUC_CA_TRI_AN },
];

class AudioController {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentTrackIndex = 0;
  private volume = 0.55;
  private isMuted = false;
  private masterGain: GainNode | null = null;
  private scheduledTimeouts: number[] = [];
  private loopTimer: number | null = null;
  private listeners: Array<() => void> = [];
  private hasInteracted = false;

  constructor() {
    // Set up auto-unlock on first user interaction if browser blocks initial autoplay
    if (typeof window !== 'undefined') {
      const unlockAudio = () => {
        if (!this.hasInteracted) {
          this.hasInteracted = true;
          this.initContext();
          if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().then(() => {
              if (this.isPlaying) {
                this.scheduleTrack(this.currentTrackIndex);
              }
            });
          }
        }
      };

      window.addEventListener('click', unlockAudio, { once: true, passive: true });
      window.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
      window.addEventListener('keydown', unlockAudio, { once: true, passive: true });
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
  }

  public subscribe(cb: () => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getCurrentTrack() {
    return TRACK_LIST[this.currentTrackIndex];
  }

  // Synthesize realistic warm acoustic piano tone with harmonic richness and soft attack
  private playPianoTone(freq: number, durationSeconds: number, velocity = 0.8, isBass = false) {
    if (!this.ctx || !this.masterGain || freq <= 0) return;

    const now = this.ctx.currentTime;
    const gainNode = this.ctx.createGain();
    gainNode.connect(this.masterGain);

    // Primary fundamental oscillator (triangle for mellow wood resonance)
    const osc1 = this.ctx.createOscillator();
    osc1.type = isBass ? 'triangle' : 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Secondary oscillator for celesta shimmer / sparkle (sine at 2x harmonic)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now);

    // Warmth harmonic
    const osc3 = this.ctx.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(freq * 0.5, now);

    const osc1Gain = this.ctx.createGain();
    const osc2Gain = this.ctx.createGain();
    const osc3Gain = this.ctx.createGain();

    osc1Gain.gain.value = 0.65;
    osc2Gain.gain.value = isBass ? 0.05 : 0.25;
    osc3Gain.gain.value = isBass ? 0.35 : 0.1;

    osc1.connect(osc1Gain);
    osc2.connect(osc2Gain);
    osc3.connect(osc3Gain);

    osc1Gain.connect(gainNode);
    osc2Gain.connect(gainNode);
    osc3Gain.connect(gainNode);

    // Envelope: quick gentle attack, bell-like decay, gentle release
    const attackTime = 0.03;
    const peakLevel = velocity * 0.35;
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(peakLevel, now + attackTime);
    gainNode.gain.exponentialRampToValueAtTime(peakLevel * 0.45, now + attackTime + 0.3);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds + 0.4);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    const stopTime = now + durationSeconds + 0.45;
    osc1.stop(stopTime);
    osc2.stop(stopTime);
    osc3.stop(stopTime);
  }

  private clearScheduled() {
    this.scheduledTimeouts.forEach(id => window.clearTimeout(id));
    this.scheduledTimeouts = [];
    if (this.loopTimer) {
      window.clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
  }

  private scheduleTrack(trackIndex: number) {
    this.clearScheduled();
    const track = TRACK_LIST[trackIndex];
    if (!track) return;

    const secPerBeat = 60 / track.data.bpm;
    let maxBeat = 0;

    // Schedule melody notes
    track.data.notes.forEach(note => {
      const delayMs = note.time * secPerBeat * 1000;
      const durationSec = note.duration * secPerBeat;
      if (note.time + note.duration > maxBeat) {
        maxBeat = note.time + note.duration;
      }

      const timerId = window.setTimeout(() => {
        if (!this.isPlaying) return;
        const freq = NOTE_FREQS[note.note] || 0;
        this.playPianoTone(freq, durationSec, note.velocity || 0.8, false);
      }, delayMs);

      this.scheduledTimeouts.push(timerId);
    });

    // Schedule accompaniment chords
    track.data.chords.forEach(chord => {
      const delayMs = chord.time * secPerBeat * 1000;
      const durationSec = chord.duration * secPerBeat;

      const timerId = window.setTimeout(() => {
        if (!this.isPlaying) return;
        const freq = NOTE_FREQS[chord.note] || 0;
        this.playPianoTone(freq, durationSec, chord.velocity || 0.5, true);
      }, delayMs);

      this.scheduledTimeouts.push(timerId);
    });

    // Loop after finished + 2 second breathing pause
    const loopDurationMs = (maxBeat + 3) * secPerBeat * 1000;
    this.loopTimer = window.setTimeout(() => {
      if (this.isPlaying) {
        this.scheduleTrack(this.currentTrackIndex);
      }
    }, loopDurationMs);
  }

  public play(trackIndex?: number) {
    this.initContext();
    if (typeof trackIndex === 'number') {
      this.currentTrackIndex = (trackIndex + TRACK_LIST.length) % TRACK_LIST.length;
    }

    this.isPlaying = true;

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {
        // Will resume on next user gesture
      });
    }

    this.scheduleTrack(this.currentTrackIndex);
    this.notify();
  }

  public pause() {
    this.isPlaying = false;
    this.clearScheduled();
    this.notify();
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public nextTrack() {
    const nextIdx = (this.currentTrackIndex + 1) % TRACK_LIST.length;
    this.play(nextIdx);
  }

  public prevTrack() {
    const prevIdx = (this.currentTrackIndex - 1 + TRACK_LIST.length) % TRACK_LIST.length;
    this.play(prevIdx);
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    this.notify();
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    this.notify();
  }

  // Pleasant interactive chime sound when opening greeting card or selecting wish
  public playChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    const chimeFreqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
    chimeFreqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.25);
    });
  }

  // Subtle paper rustle sound effect on envelope open
  public playPaperRustle() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    try {
      const bufferSize = this.ctx.sampleRate * 0.25;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.07));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 850;
      filter.Q.value = 1.2;

      const gain = this.ctx.createGain();
      gain.gain.value = 0.08;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start();
    } catch {
      // Audio buffer creation safe fallback
    }
  }
}

export const audioEngine = new AudioController();
