import React, { useState, useEffect, useRef, useMemo } from 'react'
import styled from 'styled-components'

interface VirtualizedListProps<T> {
  items: T[]
  itemHeight: number
  containerHeight: number
  renderItem: (item: T, index: number) => React.ReactNode
  overscan?: number
  className?: string
}

const VirtualizedContainer = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`

const VirtualizedContent = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  position: relative;
`

const VirtualizedItems = styled.div<{ transform: string }>`
  transform: ${({ transform }) => transform};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`

export const VirtualizedList = React.memo(function VirtualizedList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5,
  className
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const totalHeight = items.length * itemHeight

  const visibleRange = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    )
    return { startIndex, endIndex }
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan])

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1)
  }, [items, visibleRange])

  const offsetY = visibleRange.startIndex * itemHeight
  const transform = `translateY(${offsetY}px)`

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      setScrollTop(container.scrollTop)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <VirtualizedContainer
      ref={containerRef}
      height={containerHeight}
      className={className}
    >
      <VirtualizedContent height={totalHeight}>
        <VirtualizedItems transform={transform}>
          {visibleItems.map((item, index) => (
            <div
              key={visibleRange.startIndex + index}
              style={{ height: itemHeight }}
            >
              {renderItem(item, visibleRange.startIndex + index)}
            </div>
          ))}
        </VirtualizedItems>
      </VirtualizedContent>
    </VirtualizedContainer>
  )
})

// Hook for virtualized list performance
export const useVirtualization = (
  items: unknown[],
  itemHeight: number,
  containerHeight: number,
  overscan = 5
) => {
  const [scrollTop, setScrollTop] = useState(0)

  const visibleRange = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    )
    return { startIndex, endIndex }
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan])

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1)
  }, [items, visibleRange])

  const totalHeight = items.length * itemHeight
  const offsetY = visibleRange.startIndex * itemHeight

  return {
    visibleItems,
    visibleRange,
    totalHeight,
    offsetY,
    setScrollTop
  }
}
