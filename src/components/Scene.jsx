import { Html, OrbitControls, Sky, Stage } from "@react-three/drei"
import { Perf } from "r3f-perf"
import { Model } from "./models/Town"
import Ground from "./models/Ground"
import ThirdPersonControls from "./util/ThirdPersonControls"
import { useMemo, useRef, useState } from "react"
import { CharacterContext } from "./hooks/useContext"

export default function Scene() {
  const [animation, setAnimation] = useState("Idle");
  const [previousAnimation, setPreviousAnimation] = useState(null)
  const contextValue = useMemo(() => ({ animation, previousAnimation, setAnimation, setPreviousAnimation }), [animation, previousAnimation, setAnimation, setPreviousAnimation])

  return (
    <>
    <Perf position="bottom-left" />
    <Sky />
    <Ground position={[0, 0, 0]} />
    <Model />
    <CharacterContext.Provider value={contextValue}>
      <ThirdPersonControls />
    </CharacterContext.Provider>
    <directionalLight />
    </>
  )
}

