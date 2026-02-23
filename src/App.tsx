// src/App.tsx
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stage, Environment } from '@react-three/drei'
import { Model } from './components/ThreeModel'
import { Navbar } from './components/Navbar'
import { ChatBox } from './components/ChatBox'
import { SpeechBubble } from './components/SpeechBubble'
import { useState, useEffect, useRef } from 'react'

const CAMERA_DISTANCE = 5

const ENV_URL = window.location.hostname === 'localhost'
  ? '//background.hdr'
  : '/jacopo-manenti//background.hdr'


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
    const newDist = current + (target - current) * 0.12
    controls.target.lerp({ x: 0, y: 0, z: 0 }, 0.12)
    controls.object.position.lerp({ x: 0, y: 1, z: newDist }, 0.12)
    controls.update()
    if (Math.abs(newDist - target) < 0.01) {
      isLerping.current = false
    }
  })

  return (
    <>
      <Environment
        background
        files={ENV_URL}
        backgroundBlurriness={0.3}
      />
      <Stage adjustCamera={false} intensity={0.5}>
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
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Navbar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <Navbar />
      </div>

      {/* 3D scene — takes remaining space */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
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
      </div>

      {/* Chat section — fixed height bar at the bottom */}
      <div style={{
        height: '80px',           
        background: '#0a0a0a',    
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 20px',
        flexShrink: 0,
      }}>
        <ChatBox
          onTalkingChange={setIsTalking}
          onAssistantMessage={handleAssistantMessage}
          onSend={() => setShouldReset(true)}
        />
      </div>

    </div>
  )
}