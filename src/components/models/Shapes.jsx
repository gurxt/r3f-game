import * as THREE from "three"
import vsh from "../shaders/shapes/vertex-shader.glsl"
import fsh from "../shaders/shapes/fragment-shader.glsl"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function Shapes() {
  const ref = useRef()

  const material = new THREE.ShaderMaterial({
    vertexShader: vsh,
    fragmentShader: fsh,
    uniforms: {
      uTime: { value: 0 },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    }
  })

  useFrame(({ clock }) => {
    ref.current.material.uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <mesh ref={ref} material={material}>
      <boxGeometry args={[1, 1, 1, 64, 64]} />
    </mesh>
  )
}