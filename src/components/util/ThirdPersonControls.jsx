import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'

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
      setYaw((prevState) => prevState + event.movementX * 0.002)
    }

    const handlePointerLockChange = () => {
      if (document.pointerLockElement === gl.domElement) {
        gl.domElement.addEventListener('mousemove', handleMouseMove, false)
      } else {
        gl.domElement.removeEventListener('mousemove', handleMouseMove, false)
      }
    }

    gl.domElement.addEventListener('click', () => gl.domElement.requestPointerLock())
    document.addEventListener('pointerlockchange', handlePointerLockChange, false)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      gl.domElement.removeEventListener('click', () => gl.domElement.requestPointerLock())
      document.removeEventListener('pointerlockchange', handlePointerLockChange, false)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [gl.domElement])

  useFrame((state, delta) => {
    if (!characterRef.current) return;

    const speed = 5
    const direction = new Vector3()
    const camDistance = 2

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
    characterRef.current.rotation.set(0, -yaw, 0)

    // Camera follows the character
    camera.rotation.set(0, -yaw, 0)

    // Set camera position to follow the character from behind
    const offset = new Vector3(0, 0, camDistance).applyQuaternion(characterRef.current.quaternion)
    camera.position.copy(characterRef.current.position).add(offset)

    camera.lookAt(characterRef.current.position)
  })

  return (
    <group>
      <mesh ref={characterRef} position={[0, 1, -5]}>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </group>
  )
}

export default ThirdPersonControls
