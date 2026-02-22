import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { Model } from './components/ThreeModel'
import { Navbar } from './components/Navbar'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* Navbar sits on top of the canvas */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <Navbar />
      </div>

      <Canvas camera={{ position: [3, 3, 3] }}>
        <Stage>
          <Model />
        </Stage>
        <OrbitControls />
      </Canvas>
    </div>
  )
}