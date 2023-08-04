import { OrbitControls, Sky } from "@react-three/drei"
import { Perf } from "r3f-perf"
import ThirdPersonControls from "./util/ThirdPersonControls"
import { useMemo, useState } from "react"
import { CharacterContext } from "./hooks/useContext"
import { Physics, RigidBody } from "@react-three/rapier"
import Terrain from "./models/Terrain"
import Battri from "./models/BigBattri"

export default function Scene() {
  const [animation, setAnimation] = useState("Idle");
  const [previousAnimation, setPreviousAnimation] = useState(null)
  const contextValue = useMemo(() => ({ animation, previousAnimation, setAnimation, setPreviousAnimation }), [animation, previousAnimation, setAnimation, setPreviousAnimation])

  return (
    <>
    <Perf position="bottom-left" />
    <Sky />
    <Physics gravity={[0, -9.8, 0]}>
      <Terrain />
      {/* <CharacterContext.Provider value={contextValue}>
        <ThirdPersonControls />
      </CharacterContext.Provider> */}
      <Battri />

      <RigidBody>
        <mesh castShadow receiveShadow position={[-1, 2, -5]}>
          <boxGeometry args={[1, 1]} />
        </mesh>
      </RigidBody>

      {/* <RigidBody position={[1.5, 2, 0]}>
        <mesh castShadow>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh> 
      </RigidBody> */}

    </Physics>
    <directionalLight
      position={[2, 10, 3]}
      intensity={1}
      castShadow={true}
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-camera-far={50}
      shadow-camera-left={-10}
      shadow-camera-right={10}
      shadow-camera-top={10}
      shadow-camera-bottom={-10}
    />

    <OrbitControls />
    {/* <OrbitControls /> */}
    <ambientLight intensity={0.25}/>
    </>
  )
}

