import vsh from "../shaders/patterns/vertex-shader.glsl"
import fsh from "../shaders/patterns/fragment-shader.glsl"
import { ShaderMaterial } from "three"
import * as THREE from "three"
import { useEffect, useRef } from "react"

export default function Patterns() {
  const ref = useRef()

  const material = new ShaderMaterial({ 
    side: THREE.DoubleSide,
    vertexShader: vsh,
    fragmentShader: fsh,
  })

  useEffect(() => {

  }, [])

  return (
    <mesh ref={ref} material={material} position={[3, 1.5, 2]} scale={3}>
      <planeGeometry args={[1, 1, 32, 32]} />
    </mesh>
  )
}