import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'

const App = () => {
  return (
    <Canvas shadows={false}>
      <EffectComposer>
        <Vignette />
      </EffectComposer>
      <Scene />
    </Canvas>
  )
}

export default App
