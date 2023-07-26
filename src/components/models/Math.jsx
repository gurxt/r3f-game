import * as THREE from "three"
import vsh from "../shaders/math/vertex-shader.glsl"
import fsh from "../shaders/math/fragment-shader.glsl"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function Math() {
  const ref = useRef()

  const material = new THREE.ShaderMaterial({
    vertexShader: vsh,
    fragmentShader: fsh,
    uniforms: {
      uTime: { value: 0 }
    }
  })

  useFrame(({ clock }) => {
    ref.current.material.uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <mesh ref={ref} material={material}>
      <boxGeometry args={[5, 5, 5, 32, 32]} />
    </mesh>
  )
}