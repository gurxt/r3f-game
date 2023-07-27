import { useEffect, useRef } from "react"
import vsh from "../shaders/sea/vertex-shader.glsl"
import fsh from "../shaders/sea/fragment-shader.glsl"
import { ShaderMaterial } from "three"
import { useControls } from "leva"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

export default function River({ position }) {
  const ref = useRef()

  const seaColors = {}
  seaColors.depthColor = '#1B6699'
  seaColors.surfaceColor = '#9bd8ff'

  const { elevation, frequencyX, frequencyY} = useControls('elevation', {
   elevation: { value: 0.05, min: 0.0, max: 1.0, step: 0.001 },
   frequencyX: { value: 1.00, min: 0.0, max: 5.0, step: 0.001 },
   frequencyY: { value: 0.50, min: 0.0, max: 5.0, step: 0.001 }
  })

  const material = new ShaderMaterial({
    vertexShader: vsh,
    fragmentShader: fsh,
    uniforms: {
      uTime: { value: 0 },
      uBigWaveElevation: { value: elevation },
      uBigWaveFrequency: { value: new THREE.Vector2(frequencyX, frequencyY) },
      uDepthColor: { value: new THREE.Color(seaColors.depthColor ) },
      uSurfaceColor: { value: new THREE.Color(seaColors.surfaceColor) }
    },
  })

  useEffect(() => {
    //console.log(ref.current.material)
  }, [])

  useFrame(({ clock }) => {
    ref.current.material.uniforms.uTime.value = clock.elapsedTime
  })


  return (
    <>
      <mesh ref={ref} material={material} position={position} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[300, 5, 1, 128, 128]} />
      </mesh>
    </>
  )
}