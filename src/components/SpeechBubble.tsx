// src/components/SpeechBubble.tsx
interface SpeechBubbleProps {
  message: string
  visible: boolean
}

export function SpeechBubble({ message, visible }: SpeechBubbleProps) {
  if (!visible || !message) return null


  return (
    <div
      style={{
        position: 'absolute',
        top: '20%',
        right: '8%',
        maxWidth: '260px',
        zIndex: 20,
        animation: 'popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {/* Bubble */}
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          border: '3px solid black',
          padding: '16px 20px',
          position: 'relative',
          boxShadow: '4px 4px 0px black',
          fontFamily: '"Bangers", "Comic Sans MS", cursive',
          fontSize: '15px',
          lineHeight: '1.5',
          color: '#111',
          letterSpacing: '0.3px',
        }}
      >
        {message}

        {/* Tail pointing left toward the model */}
        <div style={{
          position: 'absolute',
          left: '-22px',
          bottom: '20px',
          width: 0,
          height: 0,
          borderTop: '10px solid transparent',
          borderBottom: '10px solid transparent',
          borderRight: '22px solid black',
        }} />
        <div style={{
          position: 'absolute',
          left: '-16px',
          bottom: '22px',
          width: 0,
          height: 0,
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
          borderRight: '18px solid white',
        }} />
      </div>
    </div>
  )
}