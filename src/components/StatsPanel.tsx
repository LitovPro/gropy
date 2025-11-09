import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { tokens } from '../design/tokens'

const StatsContainer = styled.div`
  padding: 16px;
  padding-bottom: calc(16px + 56px + env(safe-area-inset-bottom, 0));
  background: ${({ theme }) => theme.color.surface};
  border-radius: ${tokens.radius.card};
  margin: 16px;
  border: 1px solid ${({ theme }) => theme.color.border};
`

const StatsTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
  margin: 0 0 16px 0;
  line-height: 1.4;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
`

const StatCard = styled(motion.div)`
  background: ${({ theme }) => theme.color.bg};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${tokens.radius.card};
  padding: 16px;
  text-align: center;
  position: relative;
  overflow: hidden;
`

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.text};
  margin-bottom: 4px;
  line-height: 1;
`

const StatLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.4;
`

const StatIcon = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 16px;
  opacity: 0.3;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.color.border};
  border-radius: 2px;
  overflow: hidden;
  margin-top: 8px;
`

const ProgressFill = styled(motion.div)<{ $progress: number }>`
  height: 100%;
  background: ${({ theme }) => theme.color.accent};
  border-radius: 2px;
  width: ${({ $progress }) => Math.min(100, Math.max(0, $progress))}%;
`

const ProgressText = styled.div`
  font-size: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.textMuted};
  margin-top: 4px;
  text-align: center;
`

interface StatsPanelProps {
  level: number
  experience: number
  expForNextLevel: number
  points: number
  streak: number
  totalCompleted: number
  totalPoints: number
}

export const StatsPanel: React.FC<StatsPanelProps> = React.memo(({
  level,
  experience,
  expForNextLevel,
  points,
  streak,
  totalCompleted,
  totalPoints: _totalPoints,
}) => {
  const progressToNextLevel = (experience / expForNextLevel) * 100

  const stats = [
    {
      icon: '⭐',
      value: level,
      label: 'Уровень',
    },
    {
      icon: '⚡',
      value: points,
      label: 'Очки',
    },
    {
      icon: '🔥',
      value: streak,
      label: 'Стрик',
    },
    {
      icon: '✅',
      value: totalCompleted,
      label: 'Выполнено',
    },
  ]

  return (
    <StatsContainer>
      <StatsTitle>Статистика</StatsTitle>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <StatIcon>{stat.icon}</StatIcon>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatsGrid>

      <StatCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        style={{ marginTop: '12px' }}
      >
        <StatIcon>📈</StatIcon>
        <StatValue>{experience}</StatValue>
        <StatLabel>Опыт</StatLabel>
        <ProgressBar>
          <ProgressFill
            $progress={progressToNextLevel}
            initial={{ width: 0 }}
            animate={{ width: `${progressToNextLevel}%` }}
            transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
          />
        </ProgressBar>
        <ProgressText>
          {experience} / {expForNextLevel} до {level + 1} уровня
        </ProgressText>
      </StatCard>
    </StatsContainer>
  )
})

StatsPanel.displayName = 'StatsPanel'
