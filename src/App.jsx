import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { KeyboardControls } from '@react-three/drei'
import { useEffect } from 'react'

const App = () => {
  return (
    <KeyboardControls
      map={[
        { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
        { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
        { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
        { name: 'right', keys: ['ArrowRight', 'KeyD'] },
        { name: 'jump', keys: ['Space'] },
        { name: 'sprint', keys: ['CapsLock']}
      ]}
    >
      <Canvas shadows>
        <EffectComposer>
          <Vignette />
        </EffectComposer>
        <Scene />
      </Canvas>
    </KeyboardControls>
  )
}

export default App
