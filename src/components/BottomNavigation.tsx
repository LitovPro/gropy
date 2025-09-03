import React from 'react';
import styled from 'styled-components';

export type NavTab = 'home' | 'shop' | 'pet' | 'profile';

interface BottomNavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  pendingTasks: number;
  userPoints: number;
  level: number;
}

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${({ theme }) => theme.colors.surface}f8;
  backdrop-filter: blur(20px);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.5rem 0 max(0.5rem, env(safe-area-inset-bottom));
  
  /* Для iPhone X и новее */
  @supports (padding: max(0px)) {
    padding-bottom: max(0.5rem, env(safe-area-inset-bottom));
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const NavButton = styled.button<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  min-width: 60px;
  position: relative;
  
  ${({ isActive, theme }) => isActive && `
    background: ${theme.colors.primary}15;
    transform: translateY(-2px);
  `}
  
  &:active {
    transform: ${({ isActive }) => isActive ? 'translateY(-1px)' : 'translateY(1px)'};
  }
`;

const NavIcon = styled.div<{ isActive: boolean }>`
  font-size: 1.5rem;
  transition: all 0.3s ease;
  filter: ${({ isActive }) => isActive ? 'none' : 'grayscale(0.3)'};
  transform: ${({ isActive }) => isActive ? 'scale(1.1)' : 'scale(1)'};
`;

const NavLabel = styled.span<{ isActive: boolean }>`
  font-size: 0.7rem;
  font-weight: ${({ isActive }) => isActive ? '600' : '500'};
  color: ${({ isActive, theme }) => 
    isActive ? theme.colors.primary : theme.colors.textSecondary
  };
  transition: all 0.3s ease;
`;

const Badge = styled.div`
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  background: ${({ theme }) => theme.colors.error};
  color: white;
  border-radius: 10px;
  padding: 0.1rem 0.35rem;
  font-size: 0.6rem;
  font-weight: 700;
  min-width: 16px;
  text-align: center;
  line-height: 1.2;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const PulseDot = styled.div`
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  width: 8px;
  height: 8px;
  background: ${({ theme }) => theme.colors.success};
  border-radius: 50%;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 ${({ theme }) => theme.colors.success}66;
    }
    70% {
      box-shadow: 0 0 0 10px ${({ theme }) => theme.colors.success}00;
    }
    100% {
      box-shadow: 0 0 0 0 ${({ theme }) => theme.colors.success}00;
    }
  }
`;

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeTab, 
  onTabChange, 
  pendingTasks,
  userPoints,
  level 
}) => {
  const getTabInfo = (tab: NavTab) => {
    switch (tab) {
      case 'home':
        return {
          icon: '🏠',
          label: 'Дела',
          badge: pendingTasks > 0 ? pendingTasks : null,
          showPulse: false
        };
      case 'shop':
        return {
          icon: '🏪',
          label: 'Магазин', 
          badge: userPoints >= 15 ? '!' : null, // Показываем, если можно что-то купить
          showPulse: false
        };
      case 'pet':
        return {
          icon: level >= 20 ? '🦁' : level >= 10 ? '🐈' : '🐱',
          label: 'Питомец',
          badge: null,
          showPulse: level > 1 // Показываем активность если питомец развивается
        };
      case 'profile':
        return {
          icon: '👤',
          label: 'Профиль',
          badge: null,
          showPulse: false
        };
      default:
        return { icon: '❓', label: 'Unknown', badge: null, showPulse: false };
    }
  };

  return (
    <NavContainer>
      <NavContent>
        {(['home', 'shop', 'pet', 'profile'] as NavTab[]).map(tab => {
          const tabInfo = getTabInfo(tab);
          const isActive = activeTab === tab;
          
          return (
            <NavButton 
              key={tab}
              isActive={isActive}
              onClick={() => onTabChange(tab)}
            >
              <NavIcon isActive={isActive}>
                {tabInfo.icon}
              </NavIcon>
              <NavLabel isActive={isActive}>
                {tabInfo.label}
              </NavLabel>
              
              {tabInfo.badge && (
                <Badge>{tabInfo.badge}</Badge>
              )}
              
              {tabInfo.showPulse && !isActive && (
                <PulseDot />
              )}
            </NavButton>
          );
        })}
      </NavContent>
    </NavContainer>
  );
};

export default BottomNavigation;
