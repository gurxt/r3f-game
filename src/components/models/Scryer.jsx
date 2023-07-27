import { ShaderMaterial } from "three"
import * as THREE from "three"
import vsh from "../shaders/scryer/vertex-shader.glsl"
import fsh from "../shaders/scryer/fragment-shader.glsl"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function Scryer() {
  const ref = useRef()

  const material = new ShaderMaterial({
    vertexShader: vsh,
    fragmentShader: fsh,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    }
  })

  useFrame(({ clock }) => {
    ref.current.material.uniforms.uTime.value = clock.elapsedTime;
  })

  return (
    <mesh ref={ref} material={material} rotation={[-Math.PI / 2, 0, 0]}>
      <icosahedronGeometry args={[100, 100, 256 * 4, 256 * 4]} />
    </mesh>
  )
}