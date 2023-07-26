import { ShaderMaterial } from "three"
import * as THREE from "three"
import vsh from "../shaders/ground/vertex-shader.glsl"
import fsh from "../shaders/ground/fragment-shader.glsl"
import { useRef } from "react"

export default function Ground() {
  const ref = useRef()

  const material = new ShaderMaterial({
    vertexShader: vsh,
    fragmentShader: fsh,
    uniforms: {

    }
  })

  return (
    <mesh ref={ref} material={material} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[250, 250, 256, 256]} />
    </mesh>
  )
}