import { Html, OrbitControls, Sky, Stage } from "@react-three/drei"
import { Perf } from "r3f-perf"
import { Model } from "./models/Town"
import Ground from "./models/Ground"
import ThirdPersonControls from "./util/ThirdPersonControls"

export default function Scene() {
  return (
    <>
    <Perf position="bottom-left" />
    <Sky />
    <Ground position={[0, 0, 0]} />
    <Model />
    <ThirdPersonControls />
    <directionalLight />
    {/**********/}
    </>
  )
}

