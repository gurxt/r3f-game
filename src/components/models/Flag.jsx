import { ShaderMaterial } from "three"
import vsh from '../shaders/flag/vertex-shader.glsl'
import fsh from '../shaders/flag/fragment-shader.glsl'
import * as THREE from "three"
import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import LegionOfElves from "../../assets/LegionOfElves.png"

export default function Flag() {
  const ref = useRef()

  const texture = useTexture(LegionOfElves)

  const material = new ShaderMaterial({ 
    side: THREE.DoubleSide,
    vertexShader: vsh,
    fragmentShader: fsh,
    uniforms: {
      uFrequency: { value: new THREE.Vector2(1.0, 1.5) },
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('green') },
      uTexture: { value: texture }
    }
  })

  useEffect(() => {
    const count = ref.current.geometry.attributes.position.count
    const randoms = new Float32Array(count)

    for (let i=0; i < count; i++) {
      randoms[i] = Math.random()
    }

    ref.current.geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
  }, [])

  useFrame(({ clock }) => {
    ref.current.material.uniforms.uTime.value = clock.elapsedTime;
  }, [])

  return (
    <mesh ref={ref} material={material} position={[1, 2.25, 0]} scale={3}>
      <boxGeometry args={[1, 1.5, 0.01, 64]} />
    </mesh>
  )
}