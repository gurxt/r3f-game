import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'

export default function FirstPersonControls () {
  const controlsRef = useRef()
  const movementRef = useRef({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    crouch: false,
    sprint: false
  })

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'w') movementRef.current.moveForward = true
      if (event.key === 's') movementRef.current.moveBackward = true
      if (event.key === 'a') movementRef.current.moveLeft = true
      if (event.key === 'd') movementRef.current.moveRight = true
      if (event.key === 'c') movementRef.current.crouch = !movementRef.current.crouch
      if (event.key === 'r') movementRef.current.sprint = !movementRef.current.sprint
    }

    const handleKeyUp = (event) => {
      if (event.key === 'w') movementRef.current.moveForward = false
      if (event.key === 's') movementRef.current.moveBackward = false
      if (event.key === 'a') movementRef.current.moveLeft = false
      if (event.key === 'd') movementRef.current.moveRight = false
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame(() => {
    const velocity = movementRef.current.sprint && !movementRef.current.crouch ? 0.1 + Math.random() % 0.02 : 0.05 + Math.random() % 0.02
    const crouchHeight = 0.75
    const bobSpeed = movementRef.current.sprint ? 4 : 3
    const bobAmount = movementRef.current.sprint ? 0.03 : 0.015

    const { moveForward, moveBackward, moveLeft, moveRight, crouch } = movementRef.current

    const moveX = (moveLeft ? -1 : 0) + (moveRight ? 1 : 0)
    const moveZ = (moveForward ? 1 : 0) + (moveBackward ? -1 : 0)

    controlsRef.current.moveRight(moveX * velocity);
    controlsRef.current.moveForward(moveZ * velocity);

    if (crouch) {
      controlsRef.current.getObject().position.y = crouchHeight
    } else {
      controlsRef.current.getObject().position.y = 1.5
    }

    const t = controlsRef.current.getObject().position.length() * bobSpeed
    const headBobOffset = Math.sin(t) * bobAmount

    const cameraPosition = controlsRef.current.getObject().position
    cameraPosition.y += headBobOffset
  })

  return (
    <>
      <PointerLockControls pointerSpeed={0.5} ref={controlsRef} />
    </>
  )
}