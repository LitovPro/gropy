import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { tokens } from '../design/tokens'

const ShopContainer = styled.div`
  padding: 16px;
  padding-bottom: calc(16px + 56px + env(safe-area-inset-bottom, 0));
  background: ${({ theme }) => theme.color.surface};
  border-radius: ${tokens.radius.card};
  margin: 16px;
  border: 1px solid ${({ theme }) => theme.color.border};
`

const ShopTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
  margin: 0 0 16px 0;
  line-height: 1.4;
`

const Section = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
  margin: 0;
  line-height: 1.4;
`

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.color.textMuted};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: ${tokens.radius.button};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.color.bg};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
  }
`

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
`

const ShopItem = styled.div<{ $canAfford: boolean; $owned: boolean }>`
  background: ${({ $owned, theme }) =>
    $owned ? theme.color.effort.easy : theme.color.surface};
  border: 1px solid ${({ $owned, theme }) =>
    $owned ? theme.color.effort.easy : theme.color.border};
  border-radius: ${tokens.radius.card};
  padding: 12px;
  text-align: center;
  position: relative;
  opacity: ${({ $canAfford, $owned }) => $canAfford || $owned ? 1 : 0.6};
`

const ItemEmoji = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`

const ItemName = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
  margin-bottom: 4px;
  line-height: 1.4;
`

const ItemPrice = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`

const BuyButton = styled.button<{ $canAfford: boolean; $owned: boolean }>`
  width: 100%;
  height: ${tokens.size.tap};
  border-radius: ${tokens.radius.button};
  font-size: 12px;
  font-weight: 600;
  cursor: ${({ $canAfford, $owned }) =>
    $owned ? 'default' : $canAfford ? 'pointer' : 'not-allowed'};
  border: none;
  margin-top: 8px;
  transition: all 0.2s ease;

  ${({ $owned, $canAfford, theme }) => {
    if ($owned) {
      return `
        background: ${theme.color.effort.easy};
        color: white;
      `
    }
    if ($canAfford) {
      return `
        background: ${theme.color.accent};
        color: white;

        &:hover {
          opacity: 0.9;
        }

        &:active {
          transform: scale(0.98);
        }
      `
    }
    return `
      background: ${theme.color.bg};
      color: ${theme.color.textMuted};
    `
  }}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
  }
`

const LockedMessage = styled.div`
  font-size: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.textMuted};
  margin-top: 4px;
  line-height: 1.3;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 24px 16px;
  color: ${({ theme }) => theme.color.textMuted};
`

const EmptyText = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  line-height: 1.4;
`

interface ShopItem {
  id: string
  name: string
  emoji: string
  price: number
  type: 'theme' | 'pet'
  rarity: 'common' | 'rare' | 'epic'
  description?: string
}

interface ShopProps {
  points: number
  ownedItems: string[]
  onPurchase: (itemId: string) => void
}

const shopItems: ShopItem[] = [
  {
    id: 'theme-ocean',
    name: 'Океан',
    emoji: '🌊',
    price: 10,
    type: 'theme',
    rarity: 'common',
    description: 'Спокойные голубые тона',
  },
  {
    id: 'theme-forest',
    name: 'Лес',
    emoji: '🌲',
    price: 10,
    type: 'theme',
    rarity: 'common',
    description: 'Свежие зелёные оттенки',
  },
  // Pet items temporarily disabled
  // {
  //   id: 'pet-cat',
  //   name: 'Кот',
  //   emoji: '🐱',
  //   price: 25,
  //   type: 'pet',
  //   rarity: 'rare',
  //   description: 'Мягкий и пушистый друг',
  // },
  // {
  //   id: 'pet-dog',
  //   name: 'Собака',
  //   emoji: '🐶',
  //   price: 25,
  //   type: 'pet',
  //   rarity: 'rare',
  //   description: 'Верный и игривый компаньон',
  // },
  // {
  //   id: 'pet-unicorn',
  //   name: 'Единорог',
  //   emoji: '🦄',
  //   price: 50,
  //   type: 'pet',
  //   rarity: 'epic',
  //   description: 'Волшебный и редкий питомец',
  // },
]

const ShopComponent: React.FC<ShopProps> = React.memo(({
  points,
  ownedItems,
  onPurchase,
}) => {
  const [showOwned, setShowOwned] = useState(true)

  const ownedItemsList = shopItems.filter(item => ownedItems.includes(item.id))
  const availableItems = shopItems.filter(item => !ownedItems.includes(item.id))

  const canAfford = (price: number) => points >= price
  const isOwned = (itemId: string) => ownedItems.includes(itemId)

  const getButtonText = (item: ShopItem) => {
    if (isOwned(item.id)) return 'Куплено'
    if (canAfford(item.price)) return 'Купить'
    return 'Недоступно'
  }

  const getLockedMessage = (item: ShopItem) => {
    if (isOwned(item.id) || canAfford(item.price)) return null
    const needed = item.price - points
    return `Ещё ${needed}⚡ — и сможем взять 😊`
  }

  return (
    <ShopContainer>
      <ShopTitle>Магазин</ShopTitle>

      <Section>
        <SectionHeader>
          <SectionTitle>Мои предметы</SectionTitle>
          <ToggleButton onClick={() => setShowOwned(!showOwned)}>
            {showOwned ? 'Скрыть' : 'Показать'}
          </ToggleButton>
        </SectionHeader>

        <AnimatePresence>
          {showOwned && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {ownedItemsList.length > 0 ? (
                <ItemsGrid>
                  {ownedItemsList.map(item => (
                    <ShopItem
                      key={item.id}
                      $canAfford={true}
                      $owned={true}
                    >
                      <ItemEmoji>{item.emoji}</ItemEmoji>
                      <ItemName>{item.name}</ItemName>
                      <ItemPrice>Куплено</ItemPrice>
                    </ShopItem>
                  ))}
                </ItemsGrid>
              ) : (
                <EmptyState>
                  <EmptyText>Пока ничего не куплено</EmptyText>
                </EmptyState>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Section>

      <Section>
        <SectionTitle>Доступно сейчас</SectionTitle>
        <ItemsGrid>
          {availableItems.map(item => (
            <ShopItem
              key={item.id}
              $canAfford={canAfford(item.price)}
              $owned={false}
            >
              <ItemEmoji>{item.emoji}</ItemEmoji>
              <ItemName>{item.name}</ItemName>
              <ItemPrice>⚡ {item.price}</ItemPrice>
              <BuyButton
                $canAfford={canAfford(item.price)}
                $owned={false}
                onClick={() => canAfford(item.price) && onPurchase(item.id)}
                disabled={!canAfford(item.price)}
              >
                {getButtonText(item)}
              </BuyButton>
              {getLockedMessage(item) && (
                <LockedMessage>{getLockedMessage(item)}</LockedMessage>
              )}
            </ShopItem>
          ))}
        </ItemsGrid>
      </Section>
    </ShopContainer>
  )
})

ShopComponent.displayName = 'Shop'

export const Shop = React.memo(ShopComponent)



