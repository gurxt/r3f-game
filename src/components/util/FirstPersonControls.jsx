import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import { Vector3, MathUtils } from 'three'
import PlayerCharacter from '../models/PlayerCharacter'
import useKeyboard from '../hooks/useKeyboard'

const PLAYER_SPEED = 0.1;
const CROUCH_HEIGHT = 1;
const BASE_HEIGHT = 1.67;

export default function FirstPersonControls() {
  const characterRef = useRef()
  const controlsRef = useRef()
  const [height, setHeight] = useState(BASE_HEIGHT);
  const keyMap = useKeyboard();

  useFrame(() => {
    const { forward, backward, left, right, crouch, sprint } = {
      forward: keyMap['KeyW'],
      backward: keyMap['KeyS'],
      left: keyMap['KeyA'],
      right: keyMap['KeyD'],
      crouch: keyMap['KeyC'],
      sprint: keyMap['KeyR']
    }
  
    const velocity = sprint && !crouch ? PLAYER_SPEED : PLAYER_SPEED / 2;

    const direction = new Vector3(
      right - left,
      0,
      forward - backward
    ).normalize();

    direction.multiplyScalar(velocity);
    controlsRef.current.moveRight(direction.x);
    controlsRef.current.moveForward(direction.z);

    setHeight(crouch ? CROUCH_HEIGHT : BASE_HEIGHT);

    const newY = MathUtils.lerp(controlsRef.current.camera.position.y, height, 0.1);
    controlsRef.current.camera.position.y = newY;
    
    characterRef.current.position.copy(controlsRef.current.camera.position);
    characterRef.current.rotation.y = Math.PI + controlsRef.current.getDirection(new Vector3()).y;
  });

  return (
    <>
      <group>
        <PointerLockControls maxPolarAngle={Math.PI / 1.15} pointerSpeed={0.3} ref={controlsRef} />
        <mesh ref={characterRef}>
          <boxGeometry args={[1, 2, 1]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      </group>
    </>
  )
}
