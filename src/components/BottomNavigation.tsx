import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { tokens } from '../design/tokens'

const NavigationContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.color.surface};
  border-top: 1px solid ${({ theme }) => theme.color.border};
  padding: ${tokens.space.sm} ${tokens.space.md};
  padding-bottom: max(${tokens.space.sm}, env(safe-area-inset-bottom));
  z-index: ${tokens.zones.layerBottomElev};
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -4px 20px ${tokens.color.shadow};
  min-height: calc(56px + env(safe-area-inset-bottom, 0));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`

const NavButton = styled.button<{ $isActive: boolean }>`
  display: grid;
  place-items: center;
  background: ${({ $isActive, theme }) => 
    $isActive ? theme.color.pet.accent + '15' : 'none'};
  border: ${({ $isActive, theme }) => 
    $isActive ? `2px solid ${theme.color.pet.primary}` : '2px solid transparent'};
  cursor: pointer;
  padding: ${tokens.space.sm};
  border-radius: ${tokens.radius.button};
  transition: all ${tokens.motion.base} ${tokens.motion.easing};
  min-width: 48px;
  min-height: 48px;
  position: relative;
  box-shadow: ${({ $isActive, theme }) => 
    $isActive ? `0 2px 8px ${theme.color.pet.primary}30` : 'none'};
  /* Улучшенное центрирование для эмодзи */
  line-height: 1;

  &:hover {
    background: ${({ $isActive, theme }) => 
      $isActive ? theme.color.pet.accent + '20' : theme.color.pet.accent + '10'};
    border-color: ${({ $isActive, theme }) => 
      $isActive ? theme.color.pet.primary : theme.color.pet.accent + '50'};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.pet.accent};
    outline-offset: 2px;
  }
`

const NavIcon = styled.div<{ $isActive: boolean }>`
  font-size: ${({ $isActive }) => $isActive ? '30px' : '28px'};
  line-height: 1;
  color: ${({ $isActive, theme }) => 
    $isActive ? theme.color.pet.primary : theme.color.textMuted};
  transition: all ${tokens.motion.base} ${tokens.motion.easing};
  transform: ${({ $isActive }) => $isActive ? 'scale(1.1) translateY(-0.5px)' : 'translateY(-0.5px)'};
  filter: ${({ $isActive }) => $isActive ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' : 'none'};
  /* Оптимизированное центрирование для эмодзи */
  text-align: center;
  display: block;
`

// const NavLabel = styled.div<{ $isActive: boolean }>`
//   font-size: 11px;
//   font-weight: ${tokens.typography.fontWeight.medium};
//   color: ${({ $isActive, theme }) => 
//     $isActive ? theme.color.pet.primary : theme.color.textMuted};
//   line-height: 1.2;
//   font-family: ${tokens.typography.fontFamily.primary};
//   transition: all ${tokens.motion.base} ${tokens.motion.easing};
//   text-align: center;
//   white-space: nowrap;
// `

const Badge = styled(motion.div)`
  position: absolute;
  top: 4px;
  right: 4px;
  background: #EF4444;
  color: white;
  font-size: 10px;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`

export type NavItem = {
  id: string
  label: string
  icon: string
  badge?: number
}

interface BottomNavigationProps {
  items: NavItem[]
  activeItem: string
  onItemClick: (itemId: string) => void
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  items,
  activeItem,
  onItemClick,
}) => {
  return (
    <NavigationContainer>
      {items.map((item) => (
        <motion.div
          key={item.id}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <NavButton
            $isActive={activeItem === item.id}
            onClick={() => onItemClick(item.id)}
            aria-label={item.label}
          >
            <NavIcon $isActive={activeItem === item.id}>
              {item.icon}
            </NavIcon>
            {item.badge && item.badge > 0 && (
              <Badge
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                {item.badge > 99 ? '99+' : item.badge}
              </Badge>
            )}
          </NavButton>
        </motion.div>
      ))}
    </NavigationContainer>
  )
}


