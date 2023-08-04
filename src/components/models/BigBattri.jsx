import React, { useContext, useEffect, useRef } from 'react'
import { useAnimations, useGLTF, useKeyboardControls } from '@react-three/drei'
import { CharacterContext } from '../hooks/useContext'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { Vector3, Quaternion } from 'three'

const Battri = (props) => {
  const group = useRef()
  const body = useRef()
  const { nodes, materials, animations } = useGLTF('/BigBattri-transformed.glb')
  const { actions } = useAnimations(animations, group)
  const { animation, previousAnimation } = useContext(CharacterContext)
  const [ subscribeKeys, getKeys ] = useKeyboardControls()

  const yaw = useRef(0)
  const pitch = useRef(0)

  useEffect(() => {
    const canvas = document.querySelector('canvas')
    
    if (!canvas) return
  
    const requestPointerLock = () => {
      canvas.requestPointerLock()
    }
  
    const handleMouseMove = (event) => {
      yaw.current -= event.movementX * 0.0005
      pitch.current += event.movementY * 0.0005
    }
  
    const onPointerLockChange = () => {
      if (document.pointerLockElement === canvas) {
        document.addEventListener("mousemove", handleMouseMove, false)
      } else {
        document.removeEventListener("mousemove", handleMouseMove, false)
      }
    }
  
    canvas.addEventListener('click', requestPointerLock, false)
    document.addEventListener('pointerlockchange', onPointerLockChange, false)
    
    return () => {
      canvas.removeEventListener('click', requestPointerLock, false)
      document.removeEventListener('pointerlockchange', onPointerLockChange, false)
    }
  }, [])

  useFrame(({ camera, clock }, delta) => {
    if (!body.current) return null

    const { forward, backward, left, right } = getKeys()

    const bodyPosition = body.current.nextTranslation()

    let speed = 2 * delta

    const direction = new Vector3()
    direction.set(
      Number(right) - Number(left),
      0,
      Number(backward) - Number(forward)
    ).normalize()

    // Get the body's rotation
    let bodyRotation = new Quaternion()
    bodyRotation.setFromAxisAngle(new Vector3(0, 1, 0), yaw.current)

    // Rotate the direction vector according to body's rotation
    direction.applyQuaternion(bodyRotation)

    // Update the position with the direction and speed
    bodyPosition.x += direction.x * speed
    bodyPosition.z += direction.z * speed

    body.current.setNextKinematicTranslation(bodyPosition)

    // Update body's rotation
    body.current.setNextKinematicRotation(bodyRotation)

    /* Camera */
    const cameraOffset = new Vector3(0, 3, 2)

    // Apply the body's rotation to the offset
    cameraOffset.applyQuaternion(bodyRotation)

    // Add the offset to the body position
    const cameraPosition = new Vector3().addVectors(bodyPosition, cameraOffset)

    camera.position.copy(cameraPosition)

    // Adjust the lookAt position to look down on the body
    const lookAtPosition = new Vector3(bodyPosition.x, bodyPosition.y + 2, bodyPosition.z)
    camera.lookAt(lookAtPosition)
  })



  return (
    <>
    <RigidBody
      ref={body}
      type="kinematicPosition"
      restitution={0.2} 
      friction={0} 
      position={[0, 1, 0]}
      canSleep={false}
    >
      <group {...props} dispose={null}>
        <group ref={group} rotation={[0, -Math.PI, 0]} name="Scene">
          <group name="armature" position={[0, -0.034, -0.011]} scale={0.848}>
            <primitive object={nodes.spine} />
            <primitive object={nodes.pole_targetl} />
            <primitive object={nodes.controllerl} />
            <primitive object={nodes.pole_targetr} />
            <primitive object={nodes.controllerr} />
          </group>
          <skinnedMesh castShadow name="Body" geometry={nodes.Body.geometry} material={materials.Material} skeleton={nodes.Body.skeleton} position={[0, -0.034, -0.011]} scale={0.848} />
        </group>
      </group>
    </RigidBody>
    </>
  )
}

export default Battri

useGLTF.preload('/BigBattri-transformed.glb')
