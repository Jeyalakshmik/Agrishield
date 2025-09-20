
// src/lib/animalDeterrentSound.ts
let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let scheduler: number | null = null;
let isRunning = false;

function ensureAudioCtx() {
    if (!audioCtx || audioCtx.state === 'closed') {
        try {
            audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            masterGain = audioCtx.createGain();
            masterGain.gain.setValueAtTime(0.5, audioCtx.currentTime);
            masterGain.connect(audioCtx.destination);
        } catch(e) {
            console.error("Web Audio API is not supported in this browser.");
            audioCtx = null;
            masterGain = null;
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(console.error);
    }
}

function cleanup() {
    if (scheduler) {
        clearInterval(scheduler);
        scheduler = null;
    }
    
    if (audioCtx && audioCtx.state !== 'closed') {
        audioCtx.close().catch(console.error);
    }
    audioCtx = null;
    masterGain = null;
    isRunning = false;
}

// create a single siren oscillator with sweeping frequency
function sirenSweep(duration = 0.5, startFreq = 600, endFreq = 1200, timeOffset = 0, volume = 0.6) {
    if (!audioCtx || !masterGain) return;
    const ctx = audioCtx;
    const now = ctx.currentTime + timeOffset;

    const osc = ctx.createOscillator();
    osc.type = "sawtooth"; // harsh, attention-grabbing
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.linearRampToValueAtTime(endFreq, now + duration);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(volume, now + 0.05);
    g.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(g);
    g.connect(masterGain);
    osc.start(now);
    osc.stop(now + duration);

    osc.onended = () => {
        try {
            osc.disconnect();
            g.disconnect();
        } catch {}
    };
}


/** Start threatening deterrent sound for given duration (ms) */
export function startThreateningSound(durationMs = 120000, volume = 0.6) {
    if (isRunning) return;
    ensureAudioCtx();
    if (!audioCtx || !masterGain) return;
    isRunning = true;
    masterGain.gain.setValueAtTime(volume, audioCtx.currentTime);

    const endTime = Date.now() + durationMs;
    const sweepInterval = 800; // ms

    function scheduleSound() {
        if (Date.now() > endTime) {
            stopThreateningSound();
            return;
        }
        // sweep up then down
        sirenSweep(0.4, 600, 1200, 0, volume);
        sirenSweep(0.4, 1200, 600, 0.4, volume);
    }
    
    scheduleSound();
    scheduler = window.setInterval(scheduleSound, sweepInterval);
}

/** Stop immediately */
export function stopThreateningSound() {
  if (!isRunning) return;
  cleanup();
}
