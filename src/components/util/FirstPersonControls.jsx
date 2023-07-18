import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { PointerLockControls, useGLTF, useAnimations } from '@react-three/drei'
import { Euler, MathUtils, Quaternion, Vector3 } from 'three'

const vec = new Vector3()

export default function FirstPersonControls() {
  const characterRef = useRef()
  const { nodes, materials, animations } = useGLTF('/PlayerCharacter.glb')
  const { actions } = useAnimations(animations, characterRef)
  const controlsRef = useRef()
  const movementRef = useRef({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    crouch: false,
    sprint: false,
    jump: false,
  })

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'w') movementRef.current.moveForward = true
      if (event.key === 's') movementRef.current.moveBackward = true
      if (event.key === 'a') movementRef.current.moveLeft = true
      if (event.key === 'd') movementRef.current.moveRight = true
      if (event.key === 'c') movementRef.current.crouch = !movementRef.current.crouch
      if (event.key === 'r') movementRef.current.sprint = !movementRef.current.sprint
      if (event.key === 'z') {
        if (!movementRef.current.isJumping) {
          movementRef.current.jump = true
          movementRef.current.isJumping = true
        }
      }
    }

    const handleKeyUp = (event) => {
      if (event.key === 'w') movementRef.current.moveForward = false
      if (event.key === 's') movementRef.current.moveBackward = false
      if (event.key === 'a') movementRef.current.moveLeft = false
      if (event.key === 'd') movementRef.current.moveRight = false
    }

    actions.Base.play()
    actions.HoldBow.play()
    actions.ArrowAction.play()

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame((_, delta) => {

    console.log(actions)
    const velocity = movementRef.current.sprint && !movementRef.current.crouch ? 0.1 : 0.05
    const crouchHeight = 1
    const bobSpeed = movementRef.current.sprint ? 3 : 2
    const bobAmount = movementRef.current.sprint ? 0.02 : 0.01

    const { moveForward, moveBackward, moveLeft, moveRight, crouch } = movementRef.current

    const moveX = (moveLeft ? -1 : 0) + (moveRight ? 1 : 0)
    const moveZ = (moveForward ? 1 : 0) - (moveBackward ? 1 : 0)

    controlsRef.current.moveRight(moveX * velocity)
    controlsRef.current.moveForward(moveZ * velocity)

    const targetY = crouch ? crouchHeight : 2
    const newY = MathUtils.lerp(
      controlsRef.current.camera.position.y,
      targetY,
      0.1
    )
    controlsRef.current.camera.position.y = newY

    const t = controlsRef.current.camera.position.length() * bobSpeed
    const headBobOffset = Math.sin(t) * bobAmount

    const cameraPosition = controlsRef.current.camera.position

    if (moveForward != 0 ||  moveBackward != 0)
      cameraPosition.y += headBobOffset

    // rotate the character with the camera
    const cameraWorldMatrix = controlsRef.current.camera.matrixWorld;
    vec.set(0,0,0)
    cameraWorldMatrix.decompose(vec, new Quaternion(), vec)
    const targetQuaternion = new Quaternion().setFromRotationMatrix(cameraWorldMatrix);
    const euler = new Euler().setFromQuaternion(targetQuaternion, 'YXZ');

    characterRef.current.rotation.y = Math.PI + euler.y

    // apply positional offset
    characterRef.current.position.set(
      cameraPosition.x,
      cameraPosition.y - 1.64,
      cameraPosition.z
    )
  })

  return (
    <>
      <group>
        <PointerLockControls maxPolarAngle={Math.PI / 1.2} minPolarAngle={Math.PI / 2.5} pointerSpeed={0.3} ref={controlsRef} />
        <group ref={characterRef} dispose={null}>
        {/*********************************** */}
        <group name="breastL_spring" position={[0.074, 1.369, 0.076]} />
        <group name="breastR_spring" position={[-0.097, 1.351, 0.078]} />
        <group name="chest_spring" position={[0, 1.149, -0.181]} />
        <group name="Armature" position={[0.419, 1.111, 0.217]} rotation={[1.092, -0.962, 0.213]} scale={0.106}>
          <primitive object={nodes.main} />
          <skinnedMesh name="Bow" geometry={nodes.Bow.geometry} material={materials['Dark Brown Marble']} skeleton={nodes.Bow.skeleton} />
        </group>
        <group name="Elf_Swordmaster" position={[0, -0.001, 0]}>
          <primitive object={nodes.root} />
          <primitive object={nodes['MCH-torsoparent']} />
          <primitive object={nodes['MCH-hand_ikparentL']} />
          <primitive object={nodes['MCH-upper_arm_ik_targetparentL']} />
          <primitive object={nodes['MCH-hand_ikparentR']} />
          <primitive object={nodes['MCH-upper_arm_ik_targetparentR']} />
          <primitive object={nodes['MCH-foot_ikparentL']} />
          <primitive object={nodes['MCH-thigh_ik_targetparentL']} />
          <primitive object={nodes['MCH-foot_ikparentR']} />
          <primitive object={nodes['MCH-thigh_ik_targetparentR']} />
          <group name="ElfSwordmaster_Body">
            <skinnedMesh name="Mesh033" geometry={nodes.Mesh033.geometry} material={materials.ElfSwordmaster_Body} skeleton={nodes.Mesh033.skeleton} />
            <lineSegments name="Mesh033_1" geometry={nodes.Mesh033_1.geometry} material={materials.ElfSwordmaster_Body} />
          </group>
          <skinnedMesh name="ElfSwordmaster_Armor_Arms" geometry={nodes.ElfSwordmaster_Armor_Arms.geometry} material={materials.ElfSwordmaster_Armor_Arms} skeleton={nodes.ElfSwordmaster_Armor_Arms.skeleton} />
          <skinnedMesh name="ElfSwordmaster_Armor_Chest" geometry={nodes.ElfSwordmaster_Armor_Chest.geometry} material={materials.ElfSwordmaster_Armor_Chest} skeleton={nodes.ElfSwordmaster_Armor_Chest.skeleton} />
          <skinnedMesh name="ElfSwordmaster_Armor_Earings" geometry={nodes.ElfSwordmaster_Armor_Earings.geometry} material={materials.ElfSwordmaster_Armor_Chest} skeleton={nodes.ElfSwordmaster_Armor_Earings.skeleton} />
          <skinnedMesh name="ElfSwordmaster_Armor_Hips" geometry={nodes.ElfSwordmaster_Armor_Hips.geometry} material={materials.ElfSwordmaster_Armor_Chest} skeleton={nodes.ElfSwordmaster_Armor_Hips.skeleton} />
          <skinnedMesh name="ElfSwordmaster_Armor_Hips_Cloth_Back" geometry={nodes.ElfSwordmaster_Armor_Hips_Cloth_Back.geometry} material={materials.ElfSwordmaster_Armor_Chest} skeleton={nodes.ElfSwordmaster_Armor_Hips_Cloth_Back.skeleton} />
          <skinnedMesh name="ElfSwordmaster_Armor_Hips_Cloth_Front" geometry={nodes.ElfSwordmaster_Armor_Hips_Cloth_Front.geometry} material={materials.ElfSwordmaster_Armor_Chest} skeleton={nodes.ElfSwordmaster_Armor_Hips_Cloth_Front.skeleton} />
          <skinnedMesh name="ElfSwordmaster_Armor_KneeBottomL" geometry={nodes.ElfSwordmaster_Armor_KneeBottomL.geometry} material={materials.ElfSwordmaster_Armor_Legs} skeleton={nodes.ElfSwordmaster_Armor_KneeBottomL.skeleton} />
          <skinnedMesh name="ElfSwordmaster_Armor_KneeBottomR" geometry={nodes.ElfSwordmaster_Armor_KneeBottomR.geometry} material={materials.ElfSwordmaster_Armor_Legs} skeleton={nodes.ElfSwordmaster_Armor_KneeBottomR.skeleton} />
          <skinnedMesh name="ElfSwordmaster_Armor_KneeTopL" geometry={nodes.ElfSwordmaster_Armor_KneeTopL.geometry} material={materials.ElfSwordmaster_Armor_Legs} skeleton={nodes.ElfSwordmaster_Armor_KneeTopL.skeleton} />
          <skinnedMesh name="ElfSwordmaster_Armor_KneeTopR" geometry={nodes.ElfSwordmaster_Armor_KneeTopR.geometry} material={materials.ElfSwordmaster_Armor_Legs} skeleton={nodes.ElfSwordmaster_Armor_KneeTopR.skeleton} />
          <skinnedMesh name="ElfSwordmaster_Armor_LegsL" geometry={nodes.ElfSwordmaster_Armor_LegsL.geometry} material={materials.ElfSwordmaster_Armor_Legs} skeleton={nodes.ElfSwordmaster_Armor_LegsL.skeleton} />
          <skinnedMesh name="ElfSwordmaster_Armor_LegsR" geometry={nodes.ElfSwordmaster_Armor_LegsR.geometry} material={materials.ElfSwordmaster_Armor_Legs} skeleton={nodes.ElfSwordmaster_Armor_LegsR.skeleton} />
          <skinnedMesh name="ElfSwordmaster_Armor_Panties" geometry={nodes.ElfSwordmaster_Armor_Panties.geometry} material={materials.ElfSwordmaster_Armor_Chest} skeleton={nodes.ElfSwordmaster_Armor_Panties.skeleton} />
          <skinnedMesh name="ElfSwordmaster_Hair" geometry={nodes.ElfSwordmaster_Hair.geometry} material={materials.Elfswordmaster_Hair} skeleton={nodes.ElfSwordmaster_Hair.skeleton} />
          <skinnedMesh name="ElfSwordmaster_Armor_ChestExposed" geometry={nodes.ElfSwordmaster_Armor_ChestExposed.geometry} material={materials.ElfSwordmaster_Armor_Chest} skeleton={nodes.ElfSwordmaster_Armor_ChestExposed.skeleton} />
          <skinnedMesh name="ElfSwordmaster_Armor_Hips_Exposed" geometry={nodes.ElfSwordmaster_Armor_Hips_Exposed.geometry} material={materials.ElfSwordmaster_Armor_Chest} skeleton={nodes.ElfSwordmaster_Armor_Hips_Exposed.skeleton} />
        </group>
        <mesh name="Arrow" geometry={nodes.Arrow.geometry} material={materials['Wooden surface']} position={[-0.316, 1.021, 0.138]} rotation={[0.766, -0.364, -0.268]} scale={[0.002, 0.332, 0.002]} />
        {/*********************************** */}
        </group>
      </group>
    </>
  )
}

useGLTF.preload('/PlayerCharacter.glb')
