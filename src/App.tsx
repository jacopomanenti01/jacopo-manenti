// src/App.tsx
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { Model } from './components/ThreeModel'
import { Navbar } from './components/Navbar'
import { ChatBox } from './components/ChatBox'
import { SpeechBubble } from './components/SpeechBubble'
import { useState, useEffect, useRef } from 'react'

const CAMERA_DISTANCE = 5  // ← change this to adjust starting zoom

function Scene({ isTalking, bubbleMessage, bubbleVisible, onBubbleClose, initialDistance, shouldReset, onResetDone }: {
  isTalking: boolean
  bubbleMessage: string
  bubbleVisible: boolean
  onBubbleClose: () => void
  initialDistance: number
  shouldReset: boolean
  onResetDone: () => void
}) {
  const controlsRef = useRef<any>(null)
  const isLerping = useRef(false)

  useEffect(() => {
    if (shouldReset) {
      isLerping.current = true
      onResetDone()
    }
  }, [shouldReset])

  useFrame(() => {
      if (!isLerping.current || !controlsRef.current) return
      const controls = controlsRef.current
      const current = controls.getDistance()
      const target = initialDistance
      const newDist = current + (target - current) * 0.12  // ← was 0.05
      controls.target.lerp({ x: 0, y: 0, z: 0 }, 0.12)   // ← was 0.05
      controls.object.position.lerp({ x: 0, y: 1, z: newDist }, 0.12)  // ← was 0.05
      controls.update()
      if (Math.abs(newDist - target) < 0.01) {
        isLerping.current = false
      }
    })

  return (
    <>
      <Stage adjustCamera={false} environment="city" intensity={0.5}>
        <Model isTalking={isTalking} />
      </Stage>
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={initialDistance * 1.5}
      />
      <SpeechBubble
        message={bubbleMessage}
        visible={bubbleVisible}
        onClose={onBubbleClose}
      />
    </>
  )
}

export default function App() {
  const [cameraDistance] = useState(CAMERA_DISTANCE)
  const [isTalking, setIsTalking] = useState(false)
  const [bubbleMessage, setBubbleMessage] = useState('')
  const [bubbleVisible, setBubbleVisible] = useState(false)
  const [shouldReset, setShouldReset] = useState(false)

  const handleAssistantMessage = (message: string) => {
    if (message === '') {
      setBubbleVisible(false)
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

      <Canvas camera={{ position: [0, 0, cameraDistance], fov: 40 }}>
        <Scene
          isTalking={isTalking}
          bubbleMessage={bubbleMessage}
          bubbleVisible={bubbleVisible}
          onBubbleClose={() => setBubbleVisible(false)}
          initialDistance={cameraDistance}
          shouldReset={shouldReset}
          onResetDone={() => setShouldReset(false)}
        />
      </Canvas>

      <ChatBox
        onTalkingChange={setIsTalking}
        onAssistantMessage={handleAssistantMessage}
        onSend={() => setShouldReset(true)}
      />
    </div>
  )
}