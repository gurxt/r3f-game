import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'

const App = () => {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6]
      }}
      shadows={false}
    >
      <color args={[0x334434]} attach="background" />
      <Scene />
    </Canvas>
  )
}

export default App
