import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { tokens } from '../design/tokens'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  placeholder?: string
  className?: string
  loading?: 'lazy' | 'eager'
  onLoad?: () => void
  onError?: () => void
}

const ImageContainer = styled.div<{ width?: number; height?: number }>`
  position: relative;
  width: ${({ width }) => width ? `${width}px` : '100%'};
  height: ${({ height }) => height ? `${height}px` : 'auto'};
  overflow: hidden;
  background: ${({ theme }) => theme.color.surface};
  border-radius: ${tokens.radius.card};
`

const StyledImage = styled.img<{ loaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ loaded }) => loaded ? 1 : 0};
  transition: opacity ${tokens.motion.base} ${tokens.motion.easing};
`

const Placeholder = styled.div<{ loaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.color.surface};
  display: ${({ loaded }) => loaded ? 'none' : 'flex'};
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.color.textMuted};
  font-size: ${tokens.typography.fontSize.sm};
`

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => theme.color.border};
  border-top: 2px solid ${({ theme }) => theme.color.accent};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

export const OptimizedImage: React.FC<OptimizedImageProps> = React.memo(({
  src,
  alt,
  width,
  height,
  placeholder,
  className,
  loading = 'lazy',
  onLoad,
  onError
}) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [inView, setInView] = useState(loading === 'eager')
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'eager') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '50px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [loading])

  const handleLoad = () => {
    setLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setError(true)
    onError?.()
  }

  return (
    <ImageContainer
      ref={containerRef}
      width={width}
      height={height}
      className={className}
    >
      {inView && (
        <StyledImage
          ref={imgRef}
          src={src}
          alt={alt}
          loaded={loaded}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      <Placeholder loaded={loaded && !error}>
        {error ? (
          placeholder ?? 'Ошибка загрузки'
        ) : (
          <LoadingSpinner />
        )}
      </Placeholder>
    </ImageContainer>
  )
})

OptimizedImage.displayName = 'OptimizedImage'

// Hook for image preloading
export const useImagePreload = (src: string) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setLoaded(true)
    img.onerror = () => setError(true)
    img.src = src
  }, [src])

  return { loaded, error }
}

// Component for responsive images
export const ResponsiveImage: React.FC<OptimizedImageProps & {
  sizes?: string
  srcSet?: string
}> = ({
  src,
  srcSet,
  sizes,
  alt,
  width,
  height,
  placeholder,
  className,
  loading = 'lazy',
  onLoad,
  onError
}) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [inView, setInView] = useState(loading === 'eager')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (loading === 'eager') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '50px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [loading])

  const handleLoad = () => {
    setLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setError(true)
    onError?.()
  }

  return (
    <ImageContainer
      ref={containerRef}
      width={width}
      height={height}
      className={className}
    >
      {inView && (
        <StyledImage
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loaded={loaded}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      <Placeholder loaded={loaded && !error}>
        {error ? (
          placeholder ?? 'Ошибка загрузки'
        ) : (
          <LoadingSpinner />
        )}
      </Placeholder>
    </ImageContainer>
  )
})

OptimizedImage.displayName = 'OptimizedImage'
