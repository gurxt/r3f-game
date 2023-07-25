import Tifa from "./models/Tifa"
import { Html, Stage } from "@react-three/drei"
import { Perf } from "r3f-perf"
import { Suspense } from "react"
import FirstPersonControls from "./util/FirstPersonControls"
import { Town } from "./models/Town"
import Flag from "./models/Flag"
import Patterns from "./models/Patterns"

export default function Scene() {
  return (
    <>
    <Perf position="bottom-left" />
    {/* models */}
    <Patterns />
    <Flag />
    {/**********/}
    <gridHelper />
    <FirstPersonControls />
    </>
  )
}

