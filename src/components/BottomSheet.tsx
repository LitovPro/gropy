import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence, animate } from "framer-motion";
import styled from "styled-components";

type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
};

const CLOSE_THRESHOLD_PX = 120;
const CLOSE_VELOCITY_PX_S = 900;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 40;
  will-change: opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
`;

const SheetContainer = styled.div`
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  z-index: 50;
  pointer-events: none;
`;

const SheetContent = styled(motion.div)`
  pointer-events: auto;
  background: white;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.12),
              0 -2px 8px rgba(0, 0, 0, 0.08);
  padding: 24px;
  padding-bottom: calc(24px + env(safe-area-inset-bottom, 0));
  min-height: 50vh;
  max-height: 85vh;
  overflow-y: auto;
  will-change: transform;
  transform: translateZ(0);
`;

const GripArea = styled.div<{ $isDragging: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
  cursor: ${({ $isDragging }) => ($isDragging ? "grabbing" : "grab")};
  user-select: none;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
`;

const Grip = styled.div`
  width: 48px;
  height: 6px;
  background: rgba(167, 199, 183, 0.6);
  border-radius: 3px;
`;

export const BottomSheet = React.memo(function BottomSheet({ open, onClose, children, ariaLabel = "Диалог" }: BottomSheetProps) {
  const y = useMotionValue(0);
  const backdropOpacity = useTransform(y, [0, 240], [0.6, 0]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // Сбрасываем позицию листа при открытии, чтобы исключить артефакты
      y.set(0);
    } else {
      document.body.style.overflow = "";
    }

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      // Восстанавливаем скролл при размонтировании
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence mode="sync" initial={false}>
      {open && (
        <>
          <Overlay
            onClick={onClose}
            style={{ opacity: backdropOpacity }}
            initial={{ opacity: 0.6 }} // мгновенно появляется с полной прозрачностью
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          />

          <SheetContainer>
            <SheetContent
              role="dialog"
              aria-modal="true"
              aria-label={ariaLabel}
              drag="y"
              dragDirectionLock
              dragElastic={0}
              dragConstraints={{ top: 0, bottom: (typeof window !== 'undefined' ? window.innerHeight : 800) }}
              dragMomentum={false}
              style={{ y }}
              initial={{ y: 0 }} // мгновенное появление в финальной позиции
              animate={{ y: 0 }}
              transition={{
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1],
              }}
              onDragEnd={async (_, info) => {
                const offset = info.offset.y;
                const velocity = info.velocity.y;
                const shouldClose =
                  offset > CLOSE_THRESHOLD_PX || velocity > CLOSE_VELOCITY_PX_S;

                if (shouldClose) {
                  try {
                    (window as unknown as { Telegram?: { WebApp?: { HapticFeedback?: { impactOccurred?: (type: string) => void } } } }).Telegram?.WebApp?.HapticFeedback?.impactOccurred?.("light");
                  } catch {
                    // Ignore haptic feedback errors
                  }
                  // Плавное закрытие вниз вручную, затем закрываем
                  await animate(y, window.innerHeight, {
                    duration: 0.22,
                    ease: [0.4, 0, 0.2, 1],
                  });
                  onClose();
                } else {
                  // Возврат в исходную позицию с пружинной анимацией
                  await animate(y, 0, {
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    mass: 0.8,
                  });
                }
              }}
            >
              <GripArea $isDragging={false}><Grip /></GripArea>
              {children}
            </SheetContent>
          </SheetContainer>
        </>
      )}
    </AnimatePresence>
  );
})
