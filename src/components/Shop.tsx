import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { ShopItem } from '../types';
import { useTheme } from '../ThemeContext';

interface ShopProps {
  items: ShopItem[];
  onBuyItem: (item: ShopItem) => void;
  userPoints: number;
}

const ShopContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const ShopHeader = styled.div`
  padding: 1.5rem;
  background: ${({ theme }) => theme.gradients.secondary};
  color: white;
  text-align: center;
  position: relative;
  
  h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

const ShopList = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const rarityColors = {
  common: '#6b7280',
  rare: '#3b82f6', 
  epic: '#8b5cf6',
  legendary: '#f59e0b'
};

const ItemCard = styled.div<{ rarity: string; canAfford: boolean; isPurchasing: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.gradients.card};
  border: 2px solid ${({ rarity }) => rarityColors[rarity as keyof typeof rarityColors]}40;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  opacity: ${({ canAfford }) => canAfford ? 1 : 0.6};
  
  ${({ isPurchasing }) => isPurchasing && css`
    animation: ${purchaseAnimation} 0.3s ease;
  `}
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.large};
    border-color: ${({ rarity }) => rarityColors[rarity as keyof typeof rarityColors]};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ rarity }) => rarityColors[rarity as keyof typeof rarityColors]};
    border-radius: ${({ theme }) => theme.borderRadius.medium} ${({ theme }) => theme.borderRadius.medium} 0 0;
  }
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

const ItemEmoji = styled.span`
  font-size: 2rem;
  filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.1));
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const ItemDescription = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
`;

const ItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const RarityBadge = styled.span<{ rarity: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background: ${({ rarity }) => rarityColors[rarity as keyof typeof rarityColors]}20;
  color: ${({ rarity }) => rarityColors[rarity as keyof typeof rarityColors]};
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Price = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const BuyButton = styled.button<{ canAfford: boolean }>`
  padding: 0.75rem 1.5rem;
  background: ${({ theme, canAfford }) => 
    canAfford ? theme.gradients.primary : theme.colors.border
  };
  color: ${({ canAfford }) => canAfford ? 'white' : '#999'};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: ${({ canAfford }) => canAfford ? 'pointer' : 'not-allowed'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const purchaseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const EmptyShop = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  div:first-child {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`;

const Shop: React.FC<ShopProps> = ({ items, onBuyItem, userPoints }) => {
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const { setTheme } = useTheme();

  const handleBuy = async (item: ShopItem) => {
    if (userPoints < item.price) return;
    
    setPurchasingId(item.id);
    
    // Анимация покупки
    setTimeout(() => {
      onBuyItem(item);
      
      // Если это тема - активируем её
      if (item.type === 'theme') {
        const themeMap: { [key: string]: any } = {
          'ocean-theme': 'ocean',
          'forest-theme': 'forest'
        };
        if (themeMap[item.id]) {
          setTheme(themeMap[item.id]);
        }
      }
      
      setPurchasingId(null);
    }, 300);
  };

  return (
    <ShopContainer>
      <ShopHeader>
        <h2>🏪 Магазин</h2>
      </ShopHeader>
      
      {items.length === 0 ? (
        <EmptyShop>
          <div>🎉</div>
          <div>Все предметы куплены!</div>
          <div style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Выполняйте задачи, чтобы получить новые предметы
          </div>
        </EmptyShop>
      ) : (
        <ShopList>
          {items.map(item => {
            const canAfford = userPoints >= item.price;
            const isPurchasing = purchasingId === item.id;
            
            return (
              <ItemCard 
                key={item.id} 
                rarity={item.rarity}
                canAfford={canAfford}
                isPurchasing={isPurchasing}
              >
                <ItemHeader>
                  <ItemEmoji>{item.emoji}</ItemEmoji>
                  <ItemInfo>
                    <ItemName>{item.name}</ItemName>
                    <ItemDescription>{item.description}</ItemDescription>
                  </ItemInfo>
                </ItemHeader>
                
                <ItemFooter>
                  <RarityBadge rarity={item.rarity}>
                    {item.rarity}
                  </RarityBadge>
                  
                  <PriceContainer>
                    <Price>⚡ {item.price}</Price>
                    <BuyButton 
                      canAfford={canAfford && !isPurchasing}
                      onClick={() => handleBuy(item)}
                      disabled={!canAfford || isPurchasing}
                    >
                      {isPurchasing ? '⏳' : canAfford ? 'Купить' : 'Мало очков'}
                    </BuyButton>
                  </PriceContainer>
                </ItemFooter>
              </ItemCard>
            );
          })}
        </ShopList>
      )}
    </ShopContainer>
  );
};

export default Shop;