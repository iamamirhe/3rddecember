export class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private audioUrl: string;

  constructor(audioUrl: string = '/assets/background-music.mp3') {
    this.audioUrl = audioUrl;
  }

  preload(): Promise<void> {
    return new Promise((resolve) => {
      this.audio = new Audio(this.audioUrl);
      this.audio.loop = true;
      this.audio.volume = 0.6;

      this.audio.addEventListener('canplaythrough', () => {
        resolve();
      }, { once: true });

      this.audio.addEventListener('error', () => {
        console.warn('Audio file not found, continuing without music');
        resolve();
      }, { once: true });

      this.audio.load();
    });
  }

  play(): void {
    if (this.audio) {
      this.audio.play().catch(err => {
        console.warn('Autoplay prevented:', err);
      });
    }
  }

  stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  fadeIn(duration: number = 2000): void {
    if (!this.audio) return;

    this.audio.volume = 0;
    this.play();

    const steps = 60;
    const increment = 0.6 / steps;
    const interval = duration / steps;

    let currentStep = 0;
    const fadeInterval = setInterval(() => {
      if (!this.audio || currentStep >= steps) {
        clearInterval(fadeInterval);
        return;
      }

      this.audio.volume = Math.min(0.6, this.audio.volume + increment);
      currentStep++;
    }, interval);
  }

  setVolume(volume: number): void {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume));
    }
  }

  destroy(): void {
    this.stop();
    this.audio = null;
  }
}

export const createAudioManager = (audioUrl?: string): AudioManager => {
  return new AudioManager(audioUrl);
};
