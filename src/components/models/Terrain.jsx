import { extend } from "@react-three/fiber"
import { ShaderMaterial } from "three"
import * as THREE from "three"
import vsh from "../shaders/ground/vertex-shader.glsl"
import fsh from "../shaders/ground/fragment-shader.glsl"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import Cobblestone from "../../assets/cobblestone.png"
import Grass from "../../assets/grass.png"
import { useTexture } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"

const COLOR1 = "#A89A8E"
const COLOR2 = "#9B7643"

class CustomShaderMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader: vsh,
      fragmentShader: fsh,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uColorA: { value: new THREE.Color(COLOR1) },
        uColorB: { value: new THREE.Color(COLOR2) },
        uTextureCobblestone: { value: null },
        uTextureGrass: { value: null }
      }
    })
  }
}

extend({ CustomShaderMaterial })

export default function Ground({ position }) {
  const ref = useRef()
  const textureCobblestone = useTexture(Cobblestone)
  const textureGrass = useTexture(Grass)

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.uniforms.uTime.value = clock.elapsedTime;
    }
  })

  return (
    <RigidBody type="heightfield">
        <mesh receiveShadow castShadow position={position} rotation={[-Math.PI / 2, 0, 0]} ref={ref}>
          <planeGeometry receiveShadow castShadow args={[250, 250, 256, 256]} />
          <customShaderMaterial castShadow receiveShadow attach="material" uniforms-uTextureCobblestone-value={textureCobblestone} uniforms-uTextureGrass-value={textureGrass} />
        </mesh>
    </RigidBody>
  )
}
