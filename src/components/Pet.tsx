import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Item } from '../App';

interface PetProps {
  items: Item[];
}

const PetContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PetImage = styled.div`
  font-size: 50px;
  animation: ${keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
  `} 2s infinite;
`;

const PetItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top:35px;
`;

const PetItem = styled.div`
  margin-top: 10px;
  background: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Pet: React.FC<PetProps> = ({ items }) => {
  return (
    <PetContainer>
      <PetImage>🐱</PetImage>
      <PetItems>
        {items.map(item => (
          <PetItem key={item.id}>
            {item.name}
          </PetItem>
        ))}
      </PetItems>
    </PetContainer>
  );
};

export default Pet;