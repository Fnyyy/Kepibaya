/**
 * Web Audio API synthesizer for serene onsen ambiances & tactile capybara sound effects
 */

let audioCtx: AudioContext | null = null;
let isPlayingAmbient = false;
let ambientTimer: number | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a cute tactile bubble pop / tap sound
 */
export function playPopSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(540, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch {
    // Non-fatal
  }
}

/**
 * Authentic Capybara Whistle / Squeak ("Eh-eh-eh" chirp)
 */
export function playCapySqueak() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    [0, 0.08, 0.16].forEach((delay, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      const startFreq = 1600 + idx * 80;
      osc.frequency.setValueAtTime(startFreq, now + delay);
      osc.frequency.exponentialRampToValueAtTime(2200 + idx * 100, now + delay + 0.04);
      osc.frequency.exponentialRampToValueAtTime(1400, now + delay + 0.07);

      gain.gain.setValueAtTime(0.2, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + 0.07);
    });
  } catch {
    // Non-fatal
  }
}

/**
 * Plays a warm watermelon feeding "crunch & happy chime"
 */
export function playSnackSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Pop / chomp oscillator
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.12);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);

    // Warm wooden kalimba resonant chime
    const chime = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    chime.type = 'triangle';
    chime.frequency.setValueAtTime(1046.5, now + 0.05); // C6
    chimeGain.gain.setValueAtTime(0.15, now + 0.05);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    chime.connect(chimeGain);
    chimeGain.connect(ctx.destination);
    chime.start(now + 0.05);
    chime.stop(now + 0.4);
  } catch {
    // Non-fatal
  }
}

/**
 * Capybara Contented Low Purr Sound
 */
export function playPurrSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(95, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.2);
    osc.frequency.linearRampToValueAtTime(90, now + 0.4);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.45);
  } catch {
    // Non-fatal
  }
}

/**
 * Onsen Water Splash / Ripple
 */
export function playWaterSplash() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Filtered noise pop
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.25);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  } catch {
    // Non-fatal
  }
}

/**
 * Star Twinkle / Reward Chime
 */
export function playSparkleSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    [1318.5, 1567.98, 2093.0].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.18, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.25);
    });
  } catch {
    // Non-fatal
  }
}

/**
 * Tibetan Singing Bowl / Zen onsen bell chime
 */
export function playZenBell() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    [440, 660, 880].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.1 / (i + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.5);
    });
  } catch {
    // Non-fatal
  }
}

export function isAmbientActive(): boolean {
  return isPlayingAmbient;
}

/**
 * Toggle simulated peaceful onsen water drops & warm spring breeze
 */
export function toggleAmbientSound(callback?: (active: boolean) => void) {
  try {
    const ctx = getAudioContext();

    if (isPlayingAmbient) {
      isPlayingAmbient = false;
      if (ambientTimer) {
        clearInterval(ambientTimer);
        ambientTimer = null;
      }
      callback?.(false);
      return false;
    }

    isPlayingAmbient = true;
    callback?.(true);

    const triggerDrop = () => {
      if (!isPlayingAmbient) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const freq = 1200 + Math.random() * 400;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    };

    ambientTimer = window.setInterval(triggerDrop, 900);
    return true;
  } catch {
    return false;
  }
}
