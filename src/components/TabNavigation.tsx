import React from 'react';
import styled from 'styled-components';

export type TabType = 'todos' | 'shop' | 'pet';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  todosCount: number;
  completedCount: number;
}

const TabContainer = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: 0.25rem;
  margin: 1rem 0;
  box-shadow: ${({ theme }) => theme.shadows.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  
  @media (min-width: 768px) {
    display: none; /* Скрываем на десктопе */
  }
`;

const Tab = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ isActive, theme }) => 
    isActive ? theme.gradients.primary : 'transparent'
  };
  color: ${({ isActive, theme }) => 
    isActive ? 'white' : theme.colors.textSecondary
  };
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  
  &:hover {
    background: ${({ isActive, theme }) => 
      isActive ? theme.gradients.primary : theme.colors.primary + '10'
    };
    color: ${({ isActive, theme }) => 
      isActive ? 'white' : theme.colors.primary
    };
  }
`;

const TabIcon = styled.div`
  font-size: 1.2rem;
`;

const TabLabel = styled.div`
  font-size: 0.75rem;
`;

const Badge = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  background: ${({ theme }) => theme.colors.error};
  color: white;
  border-radius: 10px;
  padding: 0.1rem 0.4rem;
  font-size: 0.65rem;
  font-weight: 600;
  min-width: 18px;
  text-align: center;
`;

const TabWithBadge = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const TabNavigation: React.FC<TabNavigationProps> = ({ 
  activeTab, 
  onTabChange, 
  todosCount,
  completedCount 
}) => {
  return (
    <TabContainer>
      <Tab 
        isActive={activeTab === 'todos'} 
        onClick={() => onTabChange('todos')}
      >
        <TabWithBadge>
          <TabIcon>📝</TabIcon>
          <TabLabel>Дела</TabLabel>
          {todosCount > 0 && <Badge>{todosCount}</Badge>}
        </TabWithBadge>
      </Tab>
      
      <Tab 
        isActive={activeTab === 'shop'} 
        onClick={() => onTabChange('shop')}
      >
        <TabIcon>🏪</TabIcon>
        <TabLabel>Магазин</TabLabel>
      </Tab>
      
      <Tab 
        isActive={activeTab === 'pet'} 
        onClick={() => onTabChange('pet')}
      >
        <TabWithBadge>
          <TabIcon>🐱</TabIcon>
          <TabLabel>Питомец</TabLabel>
          {completedCount > 0 && <Badge>{completedCount}</Badge>}
        </TabWithBadge>
      </Tab>
    </TabContainer>
  );
};

export default TabNavigation;
