import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface WindowIconProps {
  size?: number;
  className?: string;
  onOpen?: () => void;
}

export const WindowIcon: React.FC<WindowIconProps> = ({
  size = 24,
  className = '',
  onOpen
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen?.();
    }, 1500); // Увеличили время анимации на 0.3 секунды
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
      className={className}
      onClick={handleClick}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          cursor: 'pointer',
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Left shutter */}
        <motion.path
          d="M10 22Q14 20 18 22L18 42Q14 44 10 42Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ willChange: 'opacity' }}
          initial={{ opacity: 0 }}
          animate={isOpening ? {
            opacity: 1,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.1
            }
          } : { opacity: 0 }}
        />

        {/* Right shutter */}
        <motion.path
          d="M46 22Q50 20 54 22L54 42Q50 44 46 42Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ willChange: 'opacity' }}
          initial={{ opacity: 0 }}
          animate={isOpening ? {
            opacity: 1,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.1
            }
          } : { opacity: 0 }}
        />

        {/* Window frame - fades out when opening */}
        <motion.rect
          x="18" y="22" width="28" height="20" rx="2" ry="2"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ willChange: 'opacity' }}
          initial={{ opacity: 1 }}
          animate={isOpening ? {
            opacity: 0,
            transition: {
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.4
            }
          } : { opacity: 1 }}
        />

        {/* Window cross (mullion) - fades out when opening */}
        <motion.line
          x1="32" y1="22" x2="32" y2="42"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          style={{ willChange: 'opacity' }}
          initial={{ opacity: 1 }}
          animate={isOpening ? {
            opacity: 0,
            transition: {
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.4
            }
          } : { opacity: 1 }}
        />

        <motion.line
          x1="18" y1="32" x2="46" y2="32"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          style={{ willChange: 'opacity' }}
          initial={{ opacity: 1 }}
          animate={isOpening ? {
            opacity: 0,
            transition: {
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.4
            }
          } : { opacity: 1 }}
        />

        {/* Window content - appears when opening */}
        <motion.g
          style={{ willChange: 'opacity' }}
          initial={{ opacity: 0 }}
          animate={isOpening ? {
            opacity: 1,
            transition: {
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.5
            }
          } : { opacity: 0 }}
        >
          {/* Sky/outside view - only within window frame */}
          <rect x="18" y="22" width="28" height="20" rx="2" ry="2"
                fill="rgba(135, 206, 235, 0.3)"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"/>

          {/* Simple landscape - only within window frame */}
          <path d="M18 35 Q32 30 46 35 L46 42 L18 42 Z"
                fill="rgba(144, 238, 144, 0.4)"
                stroke="currentColor"
                strokeWidth="0.5"/>

          {/* Sun - only within window frame */}
          <circle cx="40" cy="28" r="2.5"
                  fill="rgba(255, 255, 0, 0.6)"
                  stroke="currentColor"
                  strokeWidth="0.5"/>
        </motion.g>
      </svg>
    </div>
  );
};

export default WindowIcon;
