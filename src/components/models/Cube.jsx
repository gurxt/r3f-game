import { RawShaderMaterial } from "three"
import vsh from '../shaders/vertex-shader.glsl'
import fsh from '../shaders/fragment-shader.glsl'

export default function Cube() {
  const material = new RawShaderMaterial({ 
    vertexShader: vsh,
    fragmentShader: fsh,
  })

  return (
    <mesh material={material} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  )
}