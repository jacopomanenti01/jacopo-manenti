// src/components/ChatBox.tsx
import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatBoxProps {
  onTalkingChange?: (talking: boolean) => void
  onAssistantMessage?: (message: string) => void
  onSend?: () => void
}

export function ChatBox({ onTalkingChange, onAssistantMessage, onSend }: ChatBoxProps) {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [hasSentOnce, setHasSentOnce] = useState(false)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    onSend?.() 

    setInput('')
    setLoading(true)
    onTalkingChange?.(true)

    if (timerRef.current) clearTimeout(timerRef.current)

    if (hasSentOnce) {
      onAssistantMessage?.('...')
    }

    setTimeout(() => {
      const reply = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

      onAssistantMessage?.(reply)
      setHasSentOnce(true)
      setLoading(false)
      onTalkingChange?.(false)

      timerRef.current = setTimeout(() => {
        onAssistantMessage?.('')
      }, 60_000)
    }, 2000)
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(480px, 90vw)',
        zIndex: 20,
        background: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 12px',
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder={loading ? 'Thinking...' : 'Type a message...'}
          disabled={loading}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'white',
            fontSize: '13px',
            caretColor: 'white',
            opacity: loading ? 0.5 : 1,
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            borderRadius: '10px',
            padding: '7px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            opacity: loading || !input.trim() ? 0.3 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {loading ? (
            <div style={{ display: 'flex', gap: '3px' }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: '4px', height: '4px', borderRadius: '50%',
                  background: 'white',
                  animation: 'bounce 1.2s infinite',
                  animationDelay: `${i * 0.2}s`,
                  display: 'inline-block',
                }} />
              ))}
            </div>
          ) : (
            <Send size={14} />
          )}
        </button>
      </div>
    </div>
  )
}