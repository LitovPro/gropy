import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { soundManager, ambientManager, playButtonClick } from '../utils/sounds'
import { tokens } from '../design/tokens'

const SettingsContainer = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 2px solid ${({ theme }) => theme.color.border};
  border-radius: ${tokens.radius.card};
  padding: ${tokens.space.lg};
  margin-bottom: ${tokens.space.lg};
`

const SettingsTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
  margin: 0 0 ${tokens.space.md} 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`

const SettingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${tokens.space.md};

  &:last-child {
    margin-bottom: 0;
  }
`

const SettingLabel = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.color.text};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${tokens.space.sm};
`

const ToggleSwitch = styled.div<{ $isOn: boolean }>`
  width: 44px;
  height: 24px;
  background: ${({ theme, $isOn }) => 
    $isOn ? theme.color.pet.primary : theme.color.border};
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: all ${tokens.motion.fast} ${tokens.motion.easing};

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ $isOn }) => $isOn ? '22px' : '2px'};
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: all ${tokens.motion.fast} ${tokens.motion.easing};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`

const VolumeSliderContainer = styled.div`
  position: relative;
  width: 120px;
  height: 8px;
  background: ${({ theme }) => theme.color.border};
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: all ${tokens.motion.fast} ${tokens.motion.easing};

  &:hover {
    transform: scaleY(1.2);
  }
`

const VolumeSliderTrack = styled.div<{ $progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background: linear-gradient(90deg, 
    ${({ theme }) => theme.color.pet.primary} 0%, 
    ${({ theme }) => theme.color.warm.medium} 100%
  );
  border-radius: 4px;
  transition: width ${tokens.motion.fast} ${tokens.motion.easing};
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.3);
`

const VolumeSlider = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  opacity: 0;
  z-index: 2;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background: white;
    border: 3px solid ${({ theme }) => theme.color.pet.primary};
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: all ${tokens.motion.fast} ${tokens.motion.easing};
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: white;
    border: 3px solid ${({ theme }) => theme.color.pet.primary};
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: all ${tokens.motion.fast} ${tokens.motion.easing};
  }

  &:hover::-webkit-slider-thumb {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:hover::-moz-range-thumb {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active::-webkit-slider-thumb {
    transform: scale(0.95);
  }

  &:active::-moz-range-thumb {
    transform: scale(0.95);
  }
`

const VolumeLabel = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.color.textMuted};
  min-width: 30px;
  text-align: right;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`

interface SoundSettingsProps {
  className?: string
}

export const SoundSettings: React.FC<SoundSettingsProps> = ({ className }) => {
  const [soundsEnabled, setSoundsEnabled] = useState(true)
  const [ambientEnabled, setAmbientEnabled] = useState(false)
  const [soundVolume, setSoundVolume] = useState(30)
  const [ambientVolume, setAmbientVolume] = useState(10)

  useEffect(() => {
    // Load settings from localStorage
    const savedSoundsEnabled = localStorage.getItem('gropy-sounds-enabled')
    const savedAmbientEnabled = localStorage.getItem('gropy-ambient-enabled')
    const savedSoundVolume = localStorage.getItem('gropy-sound-volume')
    const savedAmbientVolume = localStorage.getItem('gropy-ambient-volume')

    if (savedSoundsEnabled !== null) {
      const enabled = savedSoundsEnabled === 'true'
      setSoundsEnabled(enabled)
      soundManager.setEnabled(enabled)
    }

    if (savedAmbientEnabled !== null) {
      const enabled = savedAmbientEnabled === 'true'
      setAmbientEnabled(enabled)
      if (enabled) {
        ambientManager.startAmbient()
      }
    }

    if (savedSoundVolume !== null) {
      const volume = parseInt(savedSoundVolume) / 100
      setSoundVolume(parseInt(savedSoundVolume))
      soundManager.setVolume(volume)
    }

    if (savedAmbientVolume !== null) {
      const volume = parseInt(savedAmbientVolume) / 100
      setAmbientVolume(parseInt(savedAmbientVolume))
      ambientManager.setVolume(volume)
    }

    // Initialize ambient manager
    ambientManager.initialize()
  }, [])

  const handleSoundsToggle = (enabled: boolean) => {
    setSoundsEnabled(enabled)
    soundManager.setEnabled(enabled)
    localStorage.setItem('gropy-sounds-enabled', enabled.toString())
  }

  const handleAmbientToggle = async (enabled: boolean) => {
    setAmbientEnabled(enabled)
    localStorage.setItem('gropy-ambient-enabled', enabled.toString())
    
    if (enabled) {
      await ambientManager.startAmbient()
    } else {
      ambientManager.stopAmbient()
    }
  }

  const handleSoundVolumeChange = (volume: number) => {
    setSoundVolume(volume)
    soundManager.setVolume(volume / 100)
    localStorage.setItem('gropy-sound-volume', volume.toString())
    
    // Play sound feedback when adjusting volume
    if (soundsEnabled) {
      playButtonClick()
    }
  }

  const handleAmbientVolumeChange = (volume: number) => {
    setAmbientVolume(volume)
    ambientManager.setVolume(volume / 100)
    localStorage.setItem('gropy-ambient-volume', volume.toString())
    
    // Play sound feedback when adjusting volume
    if (soundsEnabled) {
      playButtonClick()
    }
  }

  const testSound = () => {
    if (soundsEnabled) {
      playButtonClick()
    }
  }

  return (
    <SettingsContainer className={className}>
      <SettingsTitle>звуки и атмосфера</SettingsTitle>
      
      {soundsEnabled && (
        <SettingRow>
          <SettingLabel>
            <span>🎵</span>
            тест звука
          </SettingLabel>
          <button 
            onClick={testSound}
            style={{
              background: 'transparent',
              border: '1px solid #22C55E',
              borderRadius: '8px',
              padding: '4px 12px',
              color: '#22C55E',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.1s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#22C55E'
              e.currentTarget.style.color = 'white'
            }}
            onFocus={(e) => {
              e.currentTarget.style.background = '#22C55E'
              e.currentTarget.style.color = 'white'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#22C55E'
            }}
            onBlur={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#22C55E'
            }}
          >
            проиграть
          </button>
        </SettingRow>
      )}
      
      <SettingRow>
        <SettingLabel>
          <span>🔊</span>
          звуки действий
        </SettingLabel>
        <ToggleSwitch 
          $isOn={soundsEnabled}
          onClick={() => handleSoundsToggle(!soundsEnabled)}
        />
      </SettingRow>

      <SettingRow>
        <SettingLabel>
          <span>🌿</span>
          фоновые звуки
        </SettingLabel>
        <ToggleSwitch 
          $isOn={ambientEnabled}
          onClick={() => handleAmbientToggle(!ambientEnabled)}
        />
      </SettingRow>

      {soundsEnabled && (
        <SettingRow>
          <SettingLabel>
            <span>🔉</span>
            громкость звуков
          </SettingLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.sm }}>
            <VolumeSliderContainer>
              <VolumeSliderTrack $progress={soundVolume} />
              <VolumeSlider
                type="range"
                min="0"
                max="100"
                value={soundVolume}
                onChange={(e) => handleSoundVolumeChange(parseInt(e.target.value))}
              />
            </VolumeSliderContainer>
            <VolumeLabel>{soundVolume}%</VolumeLabel>
          </div>
        </SettingRow>
      )}

      {ambientEnabled && (
        <SettingRow>
          <SettingLabel>
            <span>🌊</span>
            громкость фона
          </SettingLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.sm }}>
            <VolumeSliderContainer>
              <VolumeSliderTrack $progress={(ambientVolume / 20) * 100} />
              <VolumeSlider
                type="range"
                min="0"
                max="20"
                value={ambientVolume}
                onChange={(e) => handleAmbientVolumeChange(parseInt(e.target.value))}
              />
            </VolumeSliderContainer>
            <VolumeLabel>{ambientVolume}%</VolumeLabel>
          </div>
        </SettingRow>
      )}
    </SettingsContainer>
  )
}
