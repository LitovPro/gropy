// Sound system for Gropy - calm and non-intrusive audio

interface SoundConfig {
  volume: number
  enabled: boolean
}

class SoundManager {
  private config: SoundConfig = {
    volume: 0.3,
    enabled: true,
  }

  private audioContext: AudioContext | null = null
  private sounds: Map<string, AudioBuffer> = new Map()

  constructor() {
    this.initializeAudioContext()
    this.loadSounds()
  }

  private async initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)()
    } catch {
      // Audio context not supported
    }
  }

  private async loadSounds() {
    if (!this.audioContext) return

    // Generate simple, calm sounds programmatically
    this.generateCalmSounds()
  }

  private generateCalmSounds() {
    if (!this.audioContext) return

    // Soft bell sound for ritual completion
    this.sounds.set('ritualComplete', this.generateBellSound(800, 0.3))
    
    // Gentle pop for button interactions
    this.sounds.set('buttonClick', this.generatePopSound(400, 0.2))
    
    // Soft chime for diary save
    this.sounds.set('diarySave', this.generateChimeSound(600, 0.25))
    
    // Gentle whoosh for transitions
    this.sounds.set('transition', this.generateWhooshSound(0.4))
    
    // Pet interaction sound
    this.sounds.set('petInteraction', this.generatePetSound(500, 0.3))
  }

  private generateBellSound(frequency: number, duration: number): AudioBuffer {
    if (!this.audioContext) throw new Error('Audio context not available')

    const sampleRate = this.audioContext.sampleRate
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate
      const envelope = Math.exp(-t * 3) // Exponential decay
      const wave = Math.sin(2 * Math.PI * frequency * t) * envelope
      data[i] = wave * 0.1 // Very soft volume
    }

    return buffer
  }

  private generatePopSound(frequency: number, duration: number): AudioBuffer {
    if (!this.audioContext) throw new Error('Audio context not available')

    const sampleRate = this.audioContext.sampleRate
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate
      const envelope = Math.exp(-t * 8) // Quick decay
      const wave = Math.sin(2 * Math.PI * frequency * t) * envelope
      data[i] = wave * 0.05 // Very soft
    }

    return buffer
  }

  private generateChimeSound(frequency: number, duration: number): AudioBuffer {
    if (!this.audioContext) throw new Error('Audio context not available')

    const sampleRate = this.audioContext.sampleRate
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate
      const envelope = Math.exp(-t * 2) // Gentle decay
      const wave = Math.sin(2 * Math.PI * frequency * t) * envelope
      data[i] = wave * 0.08 // Soft
    }

    return buffer
  }

  private generateWhooshSound(duration: number): AudioBuffer {
    if (!this.audioContext) throw new Error('Audio context not available')

    const sampleRate = this.audioContext.sampleRate
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate
      const envelope = Math.exp(-t * 4)
      const noise = (Math.random() * 2 - 1) * envelope
      data[i] = noise * 0.03 // Very soft white noise
    }

    return buffer
  }

  private generatePetSound(frequency: number, duration: number): AudioBuffer {
    if (!this.audioContext) throw new Error('Audio context not available')

    const sampleRate = this.audioContext.sampleRate
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate
      const envelope = Math.exp(-t * 2)
      const wave = Math.sin(2 * Math.PI * frequency * t) * envelope
      data[i] = wave * 0.06 // Soft and gentle
    }

    return buffer
  }

  async playSound(soundName: string): Promise<void> {
    if (!this.config.enabled || !this.audioContext) return

    const sound = this.sounds.get(soundName)
    if (!sound) return

    try {
      const source = this.audioContext.createBufferSource()
      const gainNode = this.audioContext.createGain()
      
      source.buffer = sound
      gainNode.gain.value = this.config.volume
      
      source.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      
      source.start()
    } catch {
      // Failed to play sound
    }
  }

  setVolume(volume: number): void {
    this.config.volume = Math.max(0, Math.min(1, volume))
  }

  setEnabled(enabled: boolean): void {
    this.config.enabled = enabled
  }

  isEnabled(): boolean {
    return this.config.enabled
  }

  getVolume(): number {
    return this.config.volume
  }
}

// Create singleton instance
export const soundManager = new SoundManager()

// Convenience functions
export const playRitualComplete = () => soundManager.playSound('ritualComplete')
export const playButtonClick = () => soundManager.playSound('buttonClick')
export const playDiarySave = () => soundManager.playSound('diarySave')
export const playTransition = () => soundManager.playSound('transition')
export const playPetInteraction = () => soundManager.playSound('petInteraction')

// Ambient sound system
class AmbientSoundManager {
  private audioContext: AudioContext | null = null
  private ambientSource: AudioBufferSourceNode | null = null
  private isPlaying = false
  private volume = 0.1

  async initialize() {
    try {
      this.audioContext = new (window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)()
    } catch {
      // Ambient audio not supported
    }
  }

  private generateAmbientSound(): AudioBuffer | null {
    if (!this.audioContext) return null

    const duration = 10 // 10 seconds loop
    const sampleRate = this.audioContext.sampleRate
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate
      // Very subtle ambient tone
      const wave = Math.sin(2 * Math.PI * 60 * t) * 0.01 // Very low frequency, very quiet
      data[i] = wave
    }

    return buffer
  }

  async startAmbient() {
    if (this.isPlaying || !this.audioContext) return

    const buffer = this.generateAmbientSound()
    if (!buffer) return

    this.ambientSource = this.audioContext.createBufferSource()
    const gainNode = this.audioContext.createGain()
    
    this.ambientSource.buffer = buffer
    this.ambientSource.loop = true
    gainNode.gain.value = this.volume
    
    this.ambientSource.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    
    this.ambientSource.start()
    this.isPlaying = true
  }

  stopAmbient() {
    if (this.ambientSource) {
      this.ambientSource.stop()
      this.ambientSource = null
    }
    this.isPlaying = false
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(0.2, volume)) // Cap at 20% for ambient
  }
}

export const ambientManager = new AmbientSoundManager()
