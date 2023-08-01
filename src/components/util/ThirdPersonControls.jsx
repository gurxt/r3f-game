import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import Battri from "../models/BigBattri"

const ThirdPersonControls = () => {
  const characterRef = useRef()
  const { camera, gl } = useThree()
  const [moveStates, setMoveStates] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  })

  const [yaw, setYaw] = useState(0)
  const [pitch, setPitch] = useState(0)
  const [targetCamDistance, setTargetCamDistance] = useState(0.5)
  const [camDistance, setCamDistance] = useState(0.5)
  const [targetYOffset, setTargetYOffset] = useState(2)
  const [currentYOffset, setCurrentYOffset] = useState(2)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'w') setMoveStates((states) => ({ ...states, forward: true }))
      else if (event.key === 's') setMoveStates((states) => ({ ...states, backward: true }))
      else if (event.key === 'a') setMoveStates((states) => ({ ...states, left: true }))
      else if (event.key === 'd') setMoveStates((states) => ({ ...states, right: true }))
    }

    const handleKeyUp = (event) => {
      if (event.key === 'w') setMoveStates((states) => ({ ...states, forward: false }))
      else if (event.key === 's') setMoveStates((states) => ({ ...states, backward: false }))
      else if (event.key === 'a') setMoveStates((states) => ({ ...states, left: false }))
      else if (event.key === 'd') setMoveStates((states) => ({ ...states, right: false }))
    }

    const handleMouseMove = (event) => {
      setYaw((prevState) => prevState - event.movementX * 0.002)
      setTargetYOffset((prevState) => Math.max(0.5, Math.min(3, prevState + event.movementY * 0.002)))
      setPitch((prevState) => Math.max(-Math.PI / 2, Math.min(Math.PI / 2, prevState + event.movementY * 0.002)))
    }

    const handleWheelScroll = (event) => {
      setTargetCamDistance(prevState => Math.max(0.1, Math.min(5, prevState - event.deltaY * -0.001)));
    }

    const handlePointerLockChange = () => {
      if (document.pointerLockElement === gl.domElement) {
        gl.domElement.addEventListener('mousemove', handleMouseMove, false)
      } else {
        gl.domElement.removeEventListener('mousemove', handleMouseMove, false)
      }
    }

    gl.domElement.addEventListener('click', () => gl.domElement.requestPointerLock())
    gl.domElement.addEventListener('wheel', handleWheelScroll, {passive: true})
    document.addEventListener('pointerlockchange', handlePointerLockChange, false)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      gl.domElement.removeEventListener('click', () => gl.domElement.requestPointerLock())
      gl.domElement.removeEventListener('wheel', handleWheelScroll)
      document.removeEventListener('pointerlockchange', handlePointerLockChange, false)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [gl.domElement])

  useFrame((state, delta) => {
    if (!characterRef.current) return;

    const speed = 3
    const direction = new Vector3()

    direction.set(
      Number(moveStates.right) - Number(moveStates.left),
      0,
      Number(moveStates.forward) - Number(moveStates.backward)
    ).normalize()

    if (moveStates.forward || moveStates.backward)
      characterRef.current.translateZ(-direction.z * speed * delta)
    if (moveStates.left || moveStates.right)
      characterRef.current.translateX(direction.x * speed * delta)

    // Character rotation (only yaw)
    characterRef.current.rotation.y = yaw

    // Camera follows the character
    camera.rotation.x = pitch
    camera.rotation.y = yaw

    // Smoothly interpolate yOffset and camera distance
    const yOffsetDamping = 3
    const camDistanceDamping = 3

    setCurrentYOffset(prevState => prevState + (targetYOffset - prevState) * yOffsetDamping * delta)
    setCamDistance(prevState => prevState + (targetCamDistance - prevState) * camDistanceDamping * delta)

    // Set camera position to follow the character from behind
    const offset = new Vector3(0.2, currentYOffset, camDistance).applyQuaternion(characterRef.current.quaternion)
    camera.position.copy(characterRef.current.position).add(offset)

    // Make camera look at a point in front of the character
    const lookAtBaseY = 3 // Base y position of lookAt, adjust this value as needed
    const lookAtY = lookAtBaseY - currentYOffset // The y position of lookAt will be higher when currentYOffset is lower
    const lookAtPosition = new Vector3(0, lookAtY, -4 - camDistance).applyQuaternion(characterRef.current.quaternion)
    camera.lookAt(lookAtPosition.add(characterRef.current.position))
  })

  return (
    <group>
      <Battri ref={characterRef} />
    </group>
  )
}

export default ThirdPersonControls
