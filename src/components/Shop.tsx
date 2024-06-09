import React from 'react';
import styled from 'styled-components';
import { Item } from '../App';

interface ShopProps {
  items: Item[];
  buyItem: (item: Item) => void;
}

const ShopContainer = styled.div`
  margin-top: 20px;
`;

const ShopList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ShopItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

const Price = styled.span`
  color: #ffcc00;
`;

const Shop: React.FC<ShopProps> = ({ items, buyItem }) => {
  return (
    <ShopContainer>
      <h2>Shop</h2>
      <ShopList>
        {items.map(item => (
          <ShopItem key={item.id}>
            <span>{item.name}</span>
            <Price>⚡ {item.price}</Price>
            <button onClick={() => buyItem(item)}>Buy</button>
          </ShopItem>
        ))}
      </ShopList>
    </ShopContainer>
  );
};

export default Shop;