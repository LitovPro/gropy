import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { tokens } from '../design/tokens'
import { useJournal } from '../hooks/useJournal'
import { Mood, Intensity, JournalEntry } from '../types/journal'
import { MOOD_LABELS, MOOD_ICONS, INTENSITY_LABELS } from '../types/journal'
import { playDiarySave, playButtonClick } from '../utils/sounds'
import { ShareCard } from './ShareCard'

const DiaryContainer = styled.div`
  padding: ${tokens.space.lg};
  padding-bottom: calc(${tokens.space.lg} + 56px + env(safe-area-inset-bottom, 0));
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 480px) {
    padding: ${tokens.space.md};
    padding-bottom: calc(${tokens.space.md} + 56px + env(safe-area-inset-bottom, 0));
  }
`

const DiaryHeader = styled.div`
  text-align: center;
  margin-bottom: ${tokens.space.xl};

  @media (max-width: 480px) {
    margin-bottom: ${tokens.space.lg};
  }
`

const DiaryTitle = styled.h2`
  font-size: ${tokens.typography.fontSize['2xl']};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.color.text};
  margin: 0 0 ${tokens.space.sm} 0;
  font-family: ${tokens.typography.fontFamily.primary};
  line-height: ${tokens.typography.lineHeight.tight};

  @media (max-width: 480px) {
    font-size: ${tokens.typography.fontSize.xl};
  }
`

const DiarySubtitle = styled.p`
  font-size: ${tokens.typography.fontSize.base};
  color: ${({ theme }) => theme.color.textMuted};
  margin: 0;
  font-family: ${tokens.typography.fontFamily.primary};
  line-height: ${tokens.typography.lineHeight.relaxed};

  @media (max-width: 480px) {
    font-size: ${tokens.typography.fontSize.sm};
  }
`

const EmotionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${tokens.space.sm};
  margin-bottom: ${tokens.space.lg};

  @media (max-width: 480px) {
    gap: ${tokens.space.xs};
  }
`

const EmotionCard = styled(motion.div)<{ $isSelected: boolean }>`
  background: ${({ theme, $isSelected }) =>
    $isSelected
      ? `linear-gradient(135deg, ${theme.color.pet.accent}20, ${theme.color.warm.medium}20)`
      : theme.color.surface};
  border: 3px solid ${({ theme, $isSelected }) =>
    $isSelected ? theme.color.pet.accent : theme.color.border};
  border-radius: ${tokens.radius.card};
  padding: ${tokens.space.lg};
  text-align: center;
  cursor: pointer;
  transition: all ${tokens.motion.fast} ${tokens.motion.easing};
  position: relative;
  overflow: hidden;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme, $isSelected }) =>
    $isSelected
      ? `0 4px 16px ${theme.color.pet.accent}30`
      : `0 2px 8px ${theme.color.border}20`};
  padding: ${tokens.space.md} ${tokens.space.xs};

  @media (max-width: 480px) {
    min-height: 80px;
    padding: ${tokens.space.sm} ${tokens.space.xs};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, ${({ theme }) => theme.color.warm.light}10, transparent);
    opacity: ${({ $isSelected }) => $isSelected ? 1 : 0};
    transition: opacity ${tokens.motion.base} ${tokens.motion.easing};
  }

  &:hover {
    border-color: ${({ theme }) => theme.color.pet.accent};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${tokens.color.shadow};
  }
`

const EmotionIcon = styled.div`
  font-size: 28px;
  margin-bottom: ${tokens.space.xs};
  line-height: 1;
  position: relative;
  z-index: 1;

  @media (max-width: 480px) {
    font-size: 24px;
  }
`

const EmotionLabel = styled.div`
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  color: ${({ theme }) => theme.color.text};
  font-family: ${tokens.typography.fontFamily.primary};
  line-height: ${tokens.typography.lineHeight.tight};
  position: relative;
  z-index: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  text-align: center;

  @media (max-width: 480px) {
    font-size: ${tokens.typography.fontSize.xs};
  }
`

// Intensity slider
const IntensitySection = styled(motion.div)`
  background: ${({ theme }) => theme.color.surface};
  border: 2px solid ${({ theme }) => theme.color.border};
  border-radius: ${tokens.radius.card};
  padding: ${tokens.space.lg};
  margin-bottom: ${tokens.space.lg};

  @media (max-width: 480px) {
    padding: ${tokens.space.md};
    margin-bottom: ${tokens.space.md};
  }
`

const IntensityTitle = styled.h3`
  font-size: ${tokens.typography.fontSize.lg};
  font-weight: ${tokens.typography.fontWeight.medium};
  color: ${({ theme }) => theme.color.text};
  margin: 0 0 ${tokens.space.md} 0;
  font-family: ${tokens.typography.fontFamily.primary};
  line-height: ${tokens.typography.lineHeight.normal};
  text-align: center;

  @media (max-width: 480px) {
    font-size: ${tokens.typography.fontSize.base};
    margin: 0 0 ${tokens.space.sm} 0;
  }
`

const IntensitySlider = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${tokens.space.md};
`

const IntensityOption = styled(motion.button)<{ $isSelected: boolean }>`
  background: ${({ theme, $isSelected }) =>
    $isSelected
      ? `linear-gradient(135deg, ${theme.color.pet.primary}, ${theme.color.warm.medium})`
      : theme.color.bg};
  color: ${({ theme, $isSelected }) =>
    $isSelected ? 'white' : theme.color.text};
  border: 3px solid ${({ theme, $isSelected }) =>
    $isSelected ? theme.color.pet.primary : theme.color.border};
  border-radius: ${tokens.radius.button};
  padding: ${tokens.space.md} ${tokens.space.lg};
  min-height: 44px;
  font-size: ${tokens.typography.fontSize.sm};

  @media (max-width: 480px) {
    padding: ${tokens.space.sm} ${tokens.space.md};
    min-height: 40px;
    font-size: ${tokens.typography.fontSize.xs};
  }
  font-weight: ${({ $isSelected }) =>
    $isSelected ? tokens.typography.fontWeight.semibold : tokens.typography.fontWeight.medium};
  font-family: ${tokens.typography.fontFamily.primary};
  cursor: pointer;
  transition: all ${tokens.motion.fast} ${tokens.motion.easing};
  position: relative;
  overflow: hidden;
  box-shadow: ${({ theme, $isSelected }) =>
    $isSelected
      ? `0 4px 12px ${theme.color.pet.primary}40`
      : `0 2px 6px ${theme.color.border}20`};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme, isSelected }) =>
      isSelected
        ? `0 6px 16px ${theme.color.pet.primary}50`
        : `0 4px 12px ${theme.color.border}30`};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  flex: 1;
  margin: 0 ${tokens.space.xs};
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

// Prompt section
const PromptSection = styled(motion.div)`
  background: ${({ theme }) => theme.color.surface};
  border: 2px solid ${({ theme }) => theme.color.border};
  border-radius: ${tokens.radius.card};
  padding: ${tokens.space.lg};
  margin-bottom: ${tokens.space.lg};
`

const PromptTitle = styled.h3`
  font-size: ${tokens.typography.fontSize.lg};
  font-weight: ${tokens.typography.fontWeight.medium};
  color: ${({ theme }) => theme.color.text};
  margin: 0 0 ${tokens.space.md} 0;
  font-family: ${tokens.typography.fontFamily.primary};
  line-height: ${tokens.typography.lineHeight.normal};
  text-align: center;
`

const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.space.sm};
  margin-bottom: ${tokens.space.md};
`

const Chip = styled(motion.button)<{ $isSelected: boolean }>`
  background: ${({ theme, $isSelected }) =>
    $isSelected
      ? `linear-gradient(135deg, ${theme.color.pet.accent}15, ${theme.color.warm.medium}15)`
      : theme.color.bg};
  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.color.pet.accent : theme.color.text};
  border: 2px solid ${({ theme, $isSelected }) =>
    $isSelected ? theme.color.pet.accent : theme.color.border};
  border-radius: ${tokens.radius.button};
  padding: ${tokens.space.sm} ${tokens.space.md};
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${({ $isSelected }) =>
    $isSelected ? tokens.typography.fontWeight.semibold : tokens.typography.fontWeight.normal};
  font-family: ${tokens.typography.fontFamily.primary};
  cursor: pointer;
  transition: all ${tokens.motion.fast} ${tokens.motion.easing};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.3s ease;
  }

  &:hover {
    background: ${({ theme, $isSelected }) =>
      $isSelected
        ? `linear-gradient(135deg, ${theme.color.pet.accent}25, ${theme.color.warm.medium}25)`
        : theme.color.surface};
    border-color: ${({ theme, $isSelected }) =>
      $isSelected ? theme.color.pet.accent : theme.color.pet.accent};
    transform: translateY(-1px);
    box-shadow: ${({ theme, $isSelected }) =>
      $isSelected
        ? `0 4px 12px ${theme.color.pet.accent}30`
        : `0 2px 8px ${theme.color.border}40`};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
`

const NoteTextarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${tokens.radius.button};
  padding: ${tokens.space.md};
  font-size: ${tokens.typography.fontSize.sm};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.text};
  background: ${({ theme }) => theme.color.bg};
  resize: vertical;
  transition: border-color ${tokens.motion.fast} ${tokens.motion.easing};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.pet.accent};
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.textMuted};
  }
`

// Pet reaction section - temporarily disabled
// const PetReactionSection = styled(motion.div)`
//   background: linear-gradient(135deg, ${({ theme }) => theme.color.warm.light}10, ${({ theme }) => theme.color.pet.accent}10);
//   border: 2px solid ${({ theme }) => theme.color.pet.accent}40;
//   border-radius: ${tokens.radius.card};
//   padding: ${tokens.space.lg};
//   margin-bottom: ${tokens.space.lg};
//   text-align: center;
// `

// const PetReactionText = styled.p`
//   font-size: ${tokens.typography.fontSize.lg};
//   font-weight: ${tokens.typography.fontWeight.medium};
//   color: ${({ theme }) => theme.color.text};
//   margin: 0 0 ${tokens.space.md} 0;
//   font-family: ${tokens.typography.fontFamily.primary};
//   line-height: ${tokens.typography.lineHeight.relaxed};
// `

const PetButton = styled(motion.button)`
  background: ${({ theme }) => theme.color.pet.primary};
  color: white;
  border: none;
  border-radius: ${tokens.radius.button};
  padding: ${tokens.space.md} ${tokens.space.lg};
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.medium};
  font-family: ${tokens.typography.fontFamily.primary};
  cursor: pointer;
  transition: all ${tokens.motion.fast} ${tokens.motion.easing};

  &:hover {
    background: ${({ theme }) => theme.color.pet.secondary};
    transform: translateY(-1px);
  }
`

// History section
const HistorySection = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 2px solid ${({ theme }) => theme.color.border};
  border-radius: ${tokens.radius.card};
  padding: ${tokens.space.lg};
  margin-bottom: ${tokens.space.lg};
`

const HistoryTitle = styled.h3`
  font-size: ${tokens.typography.fontSize.lg};
  font-weight: ${tokens.typography.fontWeight.medium};
  color: ${({ theme }) => theme.color.text};
  margin: 0 0 ${tokens.space.md} 0;
  font-family: ${tokens.typography.fontFamily.primary};
  line-height: ${tokens.typography.lineHeight.normal};
`

const HistoryItem = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: ${tokens.space.sm} 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.color.bg};
    border-radius: ${tokens.radius.sm};
    padding-left: ${tokens.space.sm};
    padding-right: ${tokens.space.sm};
  }
`

const HistoryDate = styled.div`
  font-size: ${tokens.typography.fontSize.xs};
  color: ${({ theme }) => theme.color.textMuted};
  margin-right: ${tokens.space.md};
  min-width: 60px;
  font-family: ${tokens.typography.fontFamily.primary};
`

const HistoryEmotion = styled.div`
  font-size: 20px;
  margin-right: ${tokens.space.sm};
`

const HistoryText = styled.div`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${({ theme }) => theme.color.text};
  flex: 1;
  font-family: ${tokens.typography.fontFamily.primary};
  line-height: ${tokens.typography.lineHeight.normal};
`

interface EmotionalDiaryProps {
  onSaveEntry?: (entry: JournalEntry) => void
  showShareCard?: boolean
}

export const EmotionalDiary: React.FC<EmotionalDiaryProps> = React.memo(({
  onSaveEntry,
  showShareCard = true,
}) => {
  const {
    addEntry,
    getPrompt,
    // getPetReaction, // Temporarily disabled
    getTodayEntries,
    isLoading
  } = useJournal()

  const [selectedMood, setSelectedMood] = useState<Mood | null>(null)
  const [selectedIntensity, setSelectedIntensity] = useState<Intensity | null>(null)
  const [currentPrompt, setCurrentPrompt] = useState<{ text: string; chips: string[] } | null>(null)
  const [selectedChips, setSelectedChips] = useState<string[]>([])
  const [note, setNote] = useState('')
  // const [petReaction, setPetReaction] = useState<string | null>(null) // Temporarily disabled
  const [isSaving, setIsSaving] = useState(false)

  // Get all available moods
  const moods: Mood[] = ['sun', 'clouds', 'rain', 'wind', 'storm', 'rainbow', 'moon', 'stars', 'leaves']

  const handleMoodSelect = useCallback((mood: Mood) => {
    setSelectedMood(mood)
    setSelectedIntensity(null)
    setCurrentPrompt(null)
    setSelectedChips([])
    setNote('')
    // pet reaction temporarily disabled
    playButtonClick()
  }, [])

  const handleIntensitySelect = useCallback((intensity: Intensity) => {
    setSelectedIntensity(intensity)
    playButtonClick()
  }, [])

  const handleChipSelect = useCallback((chip: string) => {
    if (chip === 'написать своё') {
      setSelectedChips([])
      return
    }

    setSelectedChips(prev =>
      prev.includes(chip)
        ? prev.filter(c => c !== chip)
        : [...prev, chip]
    )
    playButtonClick()
  }, [])

  const handleSave = useCallback(async () => {
    if (!selectedMood) return

    setIsSaving(true)
    playDiarySave()

    try {
      const entry = addEntry(
        selectedMood,
        selectedIntensity ?? undefined,
        note.trim() || undefined,
        selectedChips.length > 0 ? selectedChips : undefined
      )

      // Get pet reaction - temporarily disabled
      // const reaction = getPetReaction(selectedMood, entry.petReactionSeed)
      // setPetReaction(reaction)

      // Call parent callback if provided
      if (onSaveEntry) {
        onSaveEntry(entry)
      }

      // Reset form after a delay
      setTimeout(() => {
        setSelectedMood(null)
        setSelectedIntensity(null)
        setCurrentPrompt(null)
        setSelectedChips([])
        setNote('')
        // setPetReaction(null) // Temporarily disabled
      }, 2000)

    } catch {
      // Failed to save entry
    } finally {
      setIsSaving(false)
    }
  }, [selectedMood, selectedIntensity, note, selectedChips, addEntry, onSaveEntry])

  // Get prompt when mood is selected
  useEffect(() => {
    if (selectedMood && !currentPrompt) {
      const prompt = getPrompt(selectedMood)
      setCurrentPrompt(prompt)
    }
  }, [selectedMood, currentPrompt, getPrompt])

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit'
    })
  }

  const todayEntries = getTodayEntries()

  if (isLoading) {
    return (
      <DiaryContainer>
        <DiaryTitle>загружаю...</DiaryTitle>
      </DiaryContainer>
    )
  }

  return (
    <DiaryContainer>
      <DiaryHeader>
        <DiaryTitle>какая погода в твоей душе?</DiaryTitle>
        <DiarySubtitle>выбери, что больше всего похоже на твоё настроение</DiarySubtitle>
      </DiaryHeader>

      <EmotionsGrid>
        {moods.map((mood) => (
          <EmotionCard
            key={mood}
            $isSelected={selectedMood === mood}
            onClick={() => handleMoodSelect(mood)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
          >
            <EmotionIcon>{MOOD_ICONS[mood]}</EmotionIcon>
            <EmotionLabel>{MOOD_LABELS[mood]}</EmotionLabel>
          </EmotionCard>
        ))}
      </EmotionsGrid>

      {/* Intensity Selection */}
      {selectedMood && !selectedIntensity && (
        <AnimatePresence>
          <IntensitySection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <IntensityTitle>насколько сильно это чувство?</IntensityTitle>
            <IntensitySlider>
              {([1, 2, 3] as Intensity[]).map((intensity) => (
                <IntensityOption
                  key={intensity}
                  $isSelected={selectedIntensity === intensity}
                  onClick={() => handleIntensitySelect(intensity)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1, ease: 'easeOut' }}
                >
                  {INTENSITY_LABELS[intensity]}
                </IntensityOption>
              ))}
            </IntensitySlider>
          </IntensitySection>
        </AnimatePresence>
      )}

      {/* Prompt Section */}
      {selectedMood && selectedIntensity && currentPrompt && (
        <AnimatePresence>
          <PromptSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <PromptTitle>{currentPrompt.text}</PromptTitle>

            {currentPrompt.chips && (
              <ChipsContainer>
                {currentPrompt.chips.map((chip: string) => (
                  <Chip
                    key={chip}
                    $isSelected={selectedChips.includes(chip)}
                    onClick={() => handleChipSelect(chip)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.1, ease: 'easeOut' }}
                  >
                    {chip}
                  </Chip>
                ))}
              </ChipsContainer>
            )}

            <NoteTextarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="если хочешь — добавь пару слов…"
              maxLength={280}
            />

            <PetButton
              onClick={handleSave}
              disabled={isSaving}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
            >
              {isSaving ? 'сохраняю...' : 'это было прекрасно'}
            </PetButton>
          </PromptSection>
        </AnimatePresence>
      )}

      {/* Pet Reaction - temporarily disabled
      {petReaction && (
        <AnimatePresence>
          <PetReactionSection
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <PetReactionText>{petReaction}</PetReactionText>
            <PetButton
              onClick={() => {
                setSelectedMood(null)
                setSelectedIntensity(null)
                setCurrentPrompt(null)
                setSelectedChips([])
                setNote('')
                setPetReaction(null)
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
            >
              спасибо, что заглянул(а) 💚
            </PetButton>
          </PetReactionSection>
        </AnimatePresence>
      )}
      */}

      {/* History */}
      {todayEntries.length > 0 && (
        <HistorySection>
          <HistoryTitle>твои размышления сегодня</HistoryTitle>
          {todayEntries.slice(0, 3).map((entry) => (
            <HistoryItem
              key={entry.id}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.1 }}
            >
              <HistoryDate>{formatDate(entry.ts)}</HistoryDate>
              <HistoryEmotion>{MOOD_ICONS[entry.mood]}</HistoryEmotion>
              <HistoryText>
                {entry.note ?? entry.chips?.join(', ') ?? 'запись без заметки'}
              </HistoryText>
            </HistoryItem>
          ))}
        </HistorySection>
      )}

      {showShareCard && todayEntries.length > 0 && (
        <ShareCard
          type="diaryEntry"
          customMessage={`сегодня в моей душе ${MOOD_LABELS[todayEntries[0].mood]}`}
        />
      )}
    </DiaryContainer>
  )
})

EmotionalDiary.displayName = 'EmotionalDiary'
