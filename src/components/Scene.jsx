import Tifa from "./models/Tifa"
import { Html, OrbitControls, Sky, Stage } from "@react-three/drei"
import { Perf } from "r3f-perf"
import { Suspense } from "react"
import FirstPersonControls from "./util/FirstPersonControls"
import { Town } from "./models/Town"
import Flag from "./models/Flag"
import Patterns from "./models/Patterns"
import River from "./models/River"
import Ground from "./models/Ground"
import Math from "./models/Math"

export default function Scene() {
  return (
    <>
    <Perf position="bottom-left" />
    {/* models */}
    {/* <Patterns />
    <Flag /> */}
    <Sky />
    <Math />
    {/* <Ground />
    <River /> */}
    <OrbitControls />
    {/**********/}
    {/* <FirstPersonControls /> */}
    </>
  )
}

