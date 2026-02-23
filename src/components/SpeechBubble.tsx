// src/components/SpeechBubble.tsx
import { Html } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useState, useEffect } from 'react'

interface SpeechBubbleProps {
  message: string
  visible: boolean
  onClose: () => void
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [breakpoint])
  return isMobile
}

function getBubbleWidth(): string {
  const w = window.innerWidth
  if (w > 1024) return `${Math.round(w * 0.35)}px`
  if (w > 768)  return `${Math.round(w * 0.5)}px`
  return `${Math.round(w * 0.55)}px`
}

const MAX_CHARS = 300

export function SpeechBubble({ message, visible, onClose }: SpeechBubbleProps) {
  const isMobile = useIsMobile()
  const width = getBubbleWidth()
  const { viewport } = useThree()

  const position: [number, number, number] = (() => {
    const w = window.innerWidth
    if (w > 1024) return [viewport.width * 0.28,  viewport.height * 0.15, 0]
    return             [viewport.width * -0.0,  -viewport.height * 0.05, 0]
  })()

  const isTailUp = position[1] < 0
  const isTailLeft = !isTailUp

  if (!visible || !message) return null

  return (
    <Html position={position} style={{ pointerEvents: 'none' }}>
      <div
        onWheelCapture={e => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '20px',
          border: '3px solid black',
          padding: '12px 16px',
          paddingRight: '32px',
          position: 'relative',
          boxShadow: '4px 4px 0px black',
          fontFamily: '"Bangers", "Comic Sans MS", cursive',
          fontSize: '14px',
          lineHeight: '1.5',
          color: '#111',
          width,
          transform: 'translateX(-50%)',  // ← expands equally left and right
          maxHeight: message.length > MAX_CHARS ? '180px' : 'none',
          overflowY: message.length > MAX_CHARS ? 'auto' : 'visible',
          overscrollBehavior: 'contain',
          whiteSpace: 'normal',
          pointerEvents: 'auto',
          scrollbarWidth: 'thin',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'sticky',
            top: '0px',
            float: 'right',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#555',
            padding: 0,
            fontFamily: 'sans-serif',
            zIndex: 1,
          }}
        >✕</button>

        {message}

        {isTailUp && (
          <>
            <div style={{
              position: 'absolute', top: '-22px', left: '30px',
              width: 0, height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderBottom: '22px solid black',
            }} />
            <div style={{
              position: 'absolute', top: '-15px', left: '32px',
              width: 0, height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderBottom: '18px solid white',
            }} />
          </>
        )}

        {isTailLeft && (
          <>
            <div style={{
              position: 'absolute', bottom: '20px', left: '-22px',
              width: 0, height: 0,
              borderTop: '10px solid transparent',
              borderBottom: '10px solid transparent',
              borderRight: '22px solid black',
            }} />
            <div style={{
              position: 'absolute', bottom: '22px', left: '-15px',
              width: 0, height: 0,
              borderTop: '8px solid transparent',
              borderBottom: '8px solid transparent',
              borderRight: '18px solid white',
            }} />
          </>
        )}
      </div>
    </Html>
  )
}