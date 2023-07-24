import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'

const App = () => {
  return (
    <Canvas shadows={false}>
      <EffectComposer>
        <Vignette />
        <Bloom />
      </EffectComposer>
      <color args={[0x333333]} attach="background" />
      <Scene />
    </Canvas>
  )
}

export default App
