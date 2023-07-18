import Tifa from "./models/Tifa"
import { Stage } from "@react-three/drei"
import { Perf } from "r3f-perf"
import { Suspense } from "react"
import FirstPersonControls from "./util/FirstPersonControls"


export default function Scene() {
   return (
    <>
    <Perf position="bottom-left" />
    <Stage
      ContactShadow={{ opacity: 0.2, blur: 3 }}
      environment="night" 
      preset="portrait"
      intensity={2}
    >
      <Suspense fallback={<mesh><boxGeometry /><meshBasicMaterial wireframe/></mesh>}>
        {/*<Tifa scale={1.5} position={[0, -1, 0]} />*/}
      </Suspense>
    </Stage>
    <gridHelper args={[100, 100]} />
    <FirstPersonControls />
    </>
  )
}

