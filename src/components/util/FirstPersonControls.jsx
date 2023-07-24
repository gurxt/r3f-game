import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import { Euler, MathUtils, Quaternion, Vector3 } from 'three'
import  PlayerCharacter from '../models/PlayerCharacter'
import useKeyboard from '../hooks/useKeyboard'

// global vars
const vec = new Vector3()
const crouchHeight = 1
const baseHeight = 1.67

export default function FirstPersonControls() {
  const characterRef = useRef()
  const controlsRef = useRef()
  const [sprint, setSprint] = useState(false)
  const keyMap = useKeyboard(sprint, setSprint)

  useFrame(() => {
    // fetch keyboard input 
    const { forward, backward, left, right, crouch, sprint } = {
      forward:  keyMap['KeyW'],
      backward: keyMap['KeyS'],
      left: keyMap['KeyA'],
      right: keyMap['KeyD'],
      crouch: keyMap['KeyC'],
      sprint: keyMap['KeyR']
    }
  
    // adjust speed + head bob
    const velocity = sprint && !crouch ? 0.1 : 0.05
    const bobSpeed = sprint ? 3 : 2
    const bobAmount =  sprint ? 0.02 : 0.01

    // determine direction
    const mX = (right ? 1 : 0) - (left ? 1 : 0)
    const mZ = (forward ? 1 : 0) - (backward ? 1 : 0)

    // apply movement
    controlsRef.current.moveRight(mX * velocity)
    controlsRef.current.moveForward(mZ * velocity)

    const targetY = crouch ? crouchHeight : 2
    const newY = MathUtils.lerp(
      controlsRef.current.camera.position.y,
      targetY,
      0.1
    )
    controlsRef.current.camera.position.y = newY

    const t = controlsRef.current.camera.position.length() * bobSpeed
    const headBobOffset = Math.sin(t) * bobAmount

    if (forward != 0 ||  backward != 0)
      controlsRef.current.camera.position.y = newY + headBobOffset

    // rotate the character with the camera
    const cameraWorldMatrix = controlsRef.current.camera.matrixWorld;
    vec.set(0,0,0)
    cameraWorldMatrix.decompose(vec, new Quaternion(), vec)
    const targetQuaternion = new Quaternion().setFromRotationMatrix(cameraWorldMatrix);
    const euler = new Euler().setFromQuaternion(targetQuaternion, 'YXZ');

    // apply rotation and positional movement to the character
    // characterRef.current.rotation.y = Math.PI + euler.y
    // characterRef.current.position.set(
    //   controlsRef.current.camera.position.x,
    //   controlsRef.current.camera.position.y - baseHeight,
    //   controlsRef.current.camera.position.z,
    // )
})

  return (
    <>
      <group>
        <PointerLockControls maxPolarAngle={Math.PI / 1.15} minPolarAngle={Math.PI / 2.5} pointerSpeed={0.3} ref={controlsRef} />
        {/* <PlayerCharacter position={[0, -1.67, 0]}  ref={characterRef} /> */}
      </group>
    </>
  )
}