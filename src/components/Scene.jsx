import Tifa from "./models/Tifa"
import { Html, Stage } from "@react-three/drei"
import { Perf } from "r3f-perf"
import { Suspense } from "react"
import FirstPersonControls from "./util/FirstPersonControls"
import { Town } from "./models/Town"
import Cube from "./models/Cube"

export default function Scene() {
  return (
    <>
    <Perf position="bottom-left" />
    <Cube  />
    <ambientLight />
    <directionalLight intensity={2} />
    <gridHelper />
    <FirstPersonControls />
    </>
  )
}

