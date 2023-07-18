import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'

const App = () => {
  return (
    <Canvas shadows={false}>
      <color args={[0x334434]} attach="background" />
      <Scene />
    </Canvas>
  )
}

export default App
