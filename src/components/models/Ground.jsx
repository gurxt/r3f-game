import { ShaderMaterial } from "three"
import * as THREE from "three"
import vsh from "../shaders/ground/vertex-shader.glsl"
import fsh from "../shaders/ground/fragment-shader.glsl"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import Cobblestone from "../../assets/cobblestone.png"
import Grass from "../../assets/grass.png"
import { useTexture } from "@react-three/drei"
import { CuboidCollider, HeightfieldCollider, RigidBody } from "@react-three/rapier"

export default function Ground({ position }) {
  const ref = useRef()
  const COLOR1 = "#A89A8E"
  const COLOR2 = "#9B7643"
  const textureCobblestone = useTexture(Cobblestone)
  const textureGrass = useTexture(Grass)

  const material = new ShaderMaterial({
    vertexShader: vsh,
    fragmentShader: fsh,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uColorA: { value: new THREE.Color(COLOR1) },
      uColorB: { value: new THREE.Color(COLOR2) },
      uTextureCobblestone: { value: textureCobblestone },
      uTextureGrass: { value: textureGrass }
    }
  })

  useFrame(({ clock }) => {
    ref.current.material.uniforms.uTime.value = clock.elapsedTime;
  })

  return (
    <RigidBody friction={1} type="Heightfield">
      <mesh receiveShadow castShadow position={position} ref={ref} material={material} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[250, 250, 256, 256]} />
      </mesh>
    </RigidBody>
  )
}