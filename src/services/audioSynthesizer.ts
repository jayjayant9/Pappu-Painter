/**
 * Procedural Web Audio Ambient Sound Engine
 * Generates realistic studio ambient textures:
 * - Coarse hog-bristle brush sweeps on tin plate / canvas
 * - Metal paint can clinks and stirrer sounds
 * - Faint 2000s Indian street / chai-tapri ambiance with subtle auto horns and tea hiss
 * - Retro analog tape hiss & vinyl crackle
 */

class StudioAmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;

  // Master Gain
  private masterGainNode: GainNode | null = null;

  // Channel Gain Nodes
  private brushGainNode: GainNode | null = null;
  private paintCanGainNode: GainNode | null = null;
  private streetGainNode: GainNode | null = null;
  private vinylGainNode: GainNode | null = null;

  // Loop & Event Timers
  private brushTimer: number | null = null;
  private clinkTimer: number | null = null;
  private streetHornTimer: number | null = null;
  private isMuted: boolean = false;

  public init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      // Master Gain
      this.masterGainNode = this.ctx.createGain();
      this.masterGainNode.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.masterGainNode.connect(this.ctx.destination);

      // Channel Gain Nodes
      this.brushGainNode = this.ctx.createGain();
      this.brushGainNode.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.brushGainNode.connect(this.masterGainNode);

      this.paintCanGainNode = this.ctx.createGain();
      this.paintCanGainNode.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.paintCanGainNode.connect(this.masterGainNode);

      this.streetGainNode = this.ctx.createGain();
      this.streetGainNode.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.streetGainNode.connect(this.masterGainNode);

      this.vinylGainNode = this.ctx.createGain();
      this.vinylGainNode.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.vinylGainNode.connect(this.masterGainNode);

      this.startContinuousTapeHiss();
      this.startContinuousStreetBed();
      this.scheduleBrushLoops();
      this.schedulePaintCanClinks();
      this.scheduleDistantStreetHorns();

      this.isRunning = true;
    } catch (e) {
      console.warn('AudioContext initialization deferred until user gesture:', e);
    }
  }

  public resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    } else if (!this.ctx) {
      this.init();
    }
  }

  // Brush sound generator: swept noise with dynamic filter modulation
  private triggerSingleBrushStroke(duration = 1.2, intensity = 0.6) {
    if (!this.ctx || !this.brushGainNode || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);

      // Pinkish noise with gritty texture
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99765 * b0 + white * 0.0990460;
        b1 = 0.96300 * b1 + white * 0.2965164;
        b2 = 0.57000 * b2 + white * 1.0526913;
        output[i] = (b0 + b1 + b2 + white * 0.1848) * 0.1;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = buffer;

      // Bandpass filter for coarse hog bristle on canvas / tin sheet
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800 + Math.random() * 400, now);
      filter.frequency.exponentialRampToValueAtTime(1600 + Math.random() * 600, now + duration * 0.5);
      filter.frequency.exponentialRampToValueAtTime(600, now + duration);
      filter.Q.setValueAtTime(1.8, now);

      const strokeGain = this.ctx.createGain();
      strokeGain.gain.setValueAtTime(0.001, now);
      strokeGain.gain.linearRampToValueAtTime(intensity * 0.7, now + duration * 0.3);
      strokeGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noiseSource.connect(filter);
      filter.connect(strokeGain);
      strokeGain.connect(this.brushGainNode);

      noiseSource.start(now);
      noiseSource.stop(now + duration);
    } catch {
      // safe fallback
    }
  }

  // Paint Can Stir / Clink: Metallic resonant pings
  private triggerPaintCanClink(type: 'clink' | 'stir' = 'clink') {
    if (!this.ctx || !this.paintCanGainNode || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const freqs = type === 'clink' 
        ? [1420, 2180, 3650, 4890] 
        : [840, 1120, 1680];

      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.paintCanGainNode) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        const actualFreq = freq + (Math.random() * 60 - 30);
        osc.frequency.setValueAtTime(actualFreq, now);

        const decay = type === 'clink' ? (0.2 + idx * 0.1) : 0.4;
        const volume = (0.15 / (idx + 1)) * (type === 'clink' ? 0.8 : 0.4);

        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(gain);
        gain.connect(this.paintCanGainNode);

        osc.start(now);
        osc.stop(now + decay);
      });
    } catch {
      // safe fallback
    }
  }

  // Distant Indian Auto-Rickshaw / Scooter Horn
  private triggerDistantHorn() {
    if (!this.ctx || !this.streetGainNode || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const dualTones = [440, 466]; // Classic Indian horn interval
      const duration = 0.4 + Math.random() * 0.3;

      const panner = this.ctx.createStereoPanner?.() || null;
      if (panner) {
        panner.pan.setValueAtTime((Math.random() * 1.6) - 0.8, now);
      }

      const hornGain = this.ctx.createGain();
      hornGain.gain.setValueAtTime(0.001, now);
      hornGain.gain.linearRampToValueAtTime(0.06, now + 0.05);
      hornGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      dualTones.forEach(freq => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, now); // muffled distance

        osc.connect(filter);
        filter.connect(hornGain);

        osc.start(now);
        osc.stop(now + duration);
      });

      if (panner) {
        hornGain.connect(panner);
        panner.connect(this.streetGainNode);
      } else {
        hornGain.connect(this.streetGainNode);
      }
    } catch {
      // safe fallback
    }
  }

  // Continuous Street Bed (Distant city murmur & tea stall kettle sizzle)
  private startContinuousStreetBed() {
    if (!this.ctx || !this.streetGainNode) return;

    try {
      const bufferSize = this.ctx.sampleRate * 4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Low frequency Brownian rumble + gentle kettle steam
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 0.3;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(320, this.ctx.currentTime);

      noise.connect(lowpass);
      lowpass.connect(this.streetGainNode);
      noise.start();
    } catch {
      // safe fallback
    }
  }

  // Vintage Radio Analog Tape Hiss & Grain
  private startContinuousTapeHiss() {
    if (!this.ctx || !this.vinylGainNode) return;

    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        // Soft white noise with occasional tiny vinyl pops
        let sample = (Math.random() * 2 - 1) * 0.05;
        if (Math.random() < 0.001) {
          sample += (Math.random() * 0.5 - 0.25); // tiny pop
        }
        data[i] = sample;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const highpass = this.ctx.createBiquadFilter();
      highpass.type = 'highpass';
      highpass.frequency.setValueAtTime(800, this.ctx.currentTime);

      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(4500, this.ctx.currentTime);

      noise.connect(highpass);
      highpass.connect(lowpass);
      lowpass.connect(this.vinylGainNode);
      noise.start();
    } catch {
      // safe fallback
    }
  }

  private scheduleBrushLoops() {
    const nextInterval = () => (2000 + Math.random() * 3500);
    const loop = () => {
      this.triggerSingleBrushStroke(0.8 + Math.random() * 0.8, 0.4 + Math.random() * 0.4);
      this.brushTimer = window.setTimeout(loop, nextInterval());
    };
    this.brushTimer = window.setTimeout(loop, 1200);
  }

  private schedulePaintCanClinks() {
    const nextInterval = () => (4000 + Math.random() * 8000);
    const loop = () => {
      const isStir = Math.random() > 0.4;
      this.triggerPaintCanClink(isStir ? 'stir' : 'clink');
      this.clinkTimer = window.setTimeout(loop, nextInterval());
    };
    this.clinkTimer = window.setTimeout(loop, 3000);
  }

  private scheduleDistantStreetHorns() {
    const nextInterval = () => (7000 + Math.random() * 12000);
    const loop = () => {
      this.triggerDistantHorn();
      this.streetHornTimer = window.setTimeout(loop, nextInterval());
    };
    this.streetHornTimer = window.setTimeout(loop, 6000);
  }

  // Volume Controls
  public setMasterVolume(val: number) {
    if (this.masterGainNode && this.ctx) {
      this.masterGainNode.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }

  public setBrushVolume(val: number) {
    if (this.brushGainNode && this.ctx) {
      this.brushGainNode.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }

  public setPaintCanVolume(val: number) {
    if (this.paintCanGainNode && this.ctx) {
      this.paintCanGainNode.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }

  public setStreetVolume(val: number) {
    if (this.streetGainNode && this.ctx) {
      this.streetGainNode.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }

  public setVinylVolume(val: number) {
    if (this.vinylGainNode && this.ctx) {
      this.vinylGainNode.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGainNode && this.ctx) {
      this.masterGainNode.gain.setValueAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public playManualStroke() {
    this.resume();
    this.triggerSingleBrushStroke(0.7, 0.7);
  }

  public playManualClink() {
    this.resume();
    this.triggerPaintCanClink('clink');
  }

  public playManualHorn() {
    this.resume();
    this.triggerDistantHorn();
  }

  public cleanup() {
    if (this.brushTimer) clearTimeout(this.brushTimer);
    if (this.clinkTimer) clearTimeout(this.clinkTimer);
    if (this.streetHornTimer) clearTimeout(this.streetHornTimer);
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
    this.isRunning = false;
  }
}

export const studioAmbientEngine = new StudioAmbientAudioEngine();
