// src/components/ThreeModel.tsx
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

interface ModelProps {
  isTalking?: boolean
}

export function Model({ isTalking = false }: ModelProps) {
  const { scene } = useGLTF('/model.glb')
  const ref = useRef<THREE.Group>(null)
  const t = useRef(0)

  useFrame((_, delta) => {
    if (!ref.current) return

    if (isTalking) {
      t.current += delta * 18 // speed of shake
      ref.current.rotation.z = Math.sin(t.current) * 0.08  // left-right shake
      ref.current.position.y = Math.abs(Math.sin(t.current)) * 0.05 // slight bounce
    } else {
      // smoothly reset
      ref.current.rotation.z *= 0.85
      ref.current.position.y *= 0.85
    }
  })

  return <primitive ref={ref} object={scene} />
}

useGLTF.preload('/model.glb')