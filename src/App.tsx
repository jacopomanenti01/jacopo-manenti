import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { Model } from './components/ThreeModel'
import { Navbar } from './components/Navbar'
import { ChatBox } from './components/ChatBox'
import { SpeechBubble } from './components/SpeechBubble'
import { useState } from 'react'

export default function App() {
  const [isTalking, setIsTalking] = useState(false)
  const [bubbleMessage, setBubbleMessage] = useState('')
  const [bubbleVisible, setBubbleVisible] = useState(false)

  const handleAssistantMessage = (message: string) => {
  if (message === '') {
    setBubbleVisible(false)  // hide when ChatBox sends empty string
  } else {
    setBubbleMessage(message)
    setBubbleVisible(true)
  }
}

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <Navbar />
      </div>

      <Canvas camera={{ position: [3, 3, 3] }}>
        <Stage>
          <Model isTalking={isTalking} />
        </Stage>
        <OrbitControls />
      </Canvas>

      <SpeechBubble message={bubbleMessage} visible={bubbleVisible} />
      <ChatBox onTalkingChange={setIsTalking} onAssistantMessage={handleAssistantMessage} />
    </div>
  )
}