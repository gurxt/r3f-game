import React, { useContext, useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import Battri from "../models/BigBattri"
import { CharacterContext } from '../hooks/useContext'

const ThirdPersonControls = () => {
  const characterRef = useRef()
  const { camera, gl } = useThree()
  const [moveStates, setMoveStates] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  })

  const { animation, setAnimation, setPreviousAnimation } = useContext(CharacterContext);
  const [sprinting, setSprinting] = useState(false)
  const [crouching, setCrouching] = useState(false)
  const [yaw, setYaw] = useState(0)
  const [pitch, setPitch] = useState(0)
  const [targetCamDistance, setTargetCamDistance] = useState(1)
  const [camDistance, setCamDistance] = useState(0.5)
  const [targetYOffset, setTargetYOffset] = useState(2)
  const [currentYOffset, setCurrentYOffset] = useState(2)

  const handleKeyDown = (event) => {
    const key = event.key.toLowerCase()
    if (key === 'w') setMoveStates((states) => ({ ...states, forward: true }))
    else if (key === 's') setMoveStates((states) => ({ ...states, backward: true }))
    else if (key === 'a') setMoveStates((states) => ({ ...states, left: true }))
    else if (key === 'd') setMoveStates((states) => ({ ...states, right: true }))
    else if (key === 'capslock') setSprinting((prevSprinting) => !prevSprinting)
    else if (key === 'c') setCrouching((prevCrouching) => !prevCrouching)
  }

  const handleKeyUp = (event) => {
    const key = event.key.toLowerCase()
    if (key === 'w') setMoveStates((states) => ({ ...states, forward: false }))
    else if (key === 's') setMoveStates((states) => ({ ...states, backward: false }))
    else if (key === 'a') setMoveStates((states) => ({ ...states, left: false }))
    else if (key === 'd') setMoveStates((states) => ({ ...states, right: false }))
  }

  const handleMouseMove = (event) => {
    setYaw((prevState) => prevState - event.movementX * 0.002)
    setTargetYOffset(prevState => Math.max(0.5, Math.min(5, prevState + event.movementY * 0.002)))
    setPitch((prevState) => Math.max(-Math.PI / 2, Math.min(Math.PI / 2, prevState + event.movementY * 0.002)))
  }
  
  const handlePointerLockChange = () => {
    if (document.pointerLockElement === gl.domElement) {
      gl.domElement.addEventListener('mousemove', handleMouseMove, false)
    } else {
      gl.domElement.removeEventListener('mousemove', handleMouseMove, false)
    }
  }

  useEffect(() => {
    const handleClick = () => gl.domElement.requestPointerLock();
    const handleWheelScroll = (event) => {
      setTargetCamDistance((prevState) => Math.max(1, Math.min(5, prevState - event.deltaY * -0.001)));
    };
  
    gl.domElement.addEventListener('click', handleClick);
    gl.domElement.addEventListener('wheel', handleWheelScroll, {passive: true});
    document.addEventListener('pointerlockchange', handlePointerLockChange, false);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  
    return () => {
      gl.domElement.removeEventListener('click', handleClick);
      gl.domElement.removeEventListener('wheel', handleWheelScroll);
      document.removeEventListener('pointerlockchange', handlePointerLockChange, false);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gl.domElement]);
  

  useFrame((state, delta) => {
    if (!characterRef.current) return;

    let speed = 2
    if (sprinting && !crouching) {
      if (moveStates.forward && !(moveStates.left || moveStates.right)) speed = 4
      else if (moveStates.forward && (moveStates.left || moveStates.right)) speed = 3.5
      else if (moveStates.backward && (moveStates.left || moveStates.right)) speed = 3
      else if (moveStates.backward) speed = 2.5
    }

    if (crouching) speed = 1

    const direction = new Vector3()
    direction.set(
      Number(moveStates.right) - Number(moveStates.left),
      0,
      Number(moveStates.forward) - Number(moveStates.backward)
    ).normalize()

    if (direction.x === 0 && direction.y === 0 && direction.z === 0) {
      setAnimation('Idle')
      setPreviousAnimation(animation)
    } else {
      if (animation !== 'Walk') {
        setAnimation('Walk')
        setPreviousAnimation(animation)
      }
    }

    if (moveStates.forward || moveStates.backward)
      characterRef.current.translateZ(-direction.z * speed * delta)
    if (moveStates.left || moveStates.right)
      characterRef.current.translateX(direction.x * speed * delta)

    characterRef.current.rotation.y = yaw
    camera.rotation.x = pitch
    camera.rotation.y = yaw

    const yOffsetDamping = 3
    const camDistanceDamping = 3

    setCurrentYOffset(prevState => prevState + (targetYOffset - prevState) * yOffsetDamping * delta)
    setCamDistance(prevState => prevState + (targetCamDistance - prevState) * camDistanceDamping * delta)

    const baseOffset = new Vector3(0.2, currentYOffset, camDistance).applyQuaternion(characterRef.current.quaternion)
    const offset = baseOffset;
    camera.position.copy(characterRef.current.position).add(offset)

    const lookAtBaseY = 3
    const lookAtY = lookAtBaseY - currentYOffset
    const lookAtPosition = new Vector3(0, lookAtY, -4 - camDistance).applyQuaternion(characterRef.current.quaternion)
    camera.lookAt(lookAtPosition.add(characterRef.current.position))
  })

  return (
    <Battri ref={characterRef} />
  )
}

export default ThirdPersonControls