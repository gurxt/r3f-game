import Tifa from "./Tifa"
import { Stage } from "@react-three/drei"
import { Perf } from "r3f-perf"
import { Suspense, useRef } from "react"
import FirstPersonControls from "./util/FirstPersonControls"


export default function Scene() {
  const ref = useRef()

  return (
    <>
    <Perf position="bottom-left" />
    <Stage
      ContactShadow={{ opacity: 0.2, blur: 3 }}
      environment="sunset" 
      preset="portrait"
      intensity={2}
    >
      <Suspense fallback={<mesh><boxGeometry /><meshBasicMaterial wireframe/></mesh>}>
        <Tifa position={[0, -1, 0]} />
      </Suspense>
    </Stage>
    <gridHelper args={[100, 100]} />
    <FirstPersonControls />
    </>
  )
}

