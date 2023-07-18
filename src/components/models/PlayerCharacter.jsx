/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.8 .\public\PlayerCharacter.glb
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Character(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/PlayerCharacter.glb')
  const { actions } = useAnimations(animations, group)
  
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Tifa_Body_FullNude">
          <mesh name="Mesh030" geometry={nodes.Mesh030.geometry} material={materials.Tifa_Face} morphTargetDictionary={nodes.Mesh030.morphTargetDictionary} morphTargetInfluences={nodes.Mesh030.morphTargetInfluences} />
          <mesh name="Mesh030_1" geometry={nodes.Mesh030_1.geometry} material={materials.Tifa_Body} morphTargetDictionary={nodes.Mesh030_1.morphTargetDictionary} morphTargetInfluences={nodes.Mesh030_1.morphTargetInfluences} />
          <mesh name="Mesh030_2" geometry={nodes.Mesh030_2.geometry} material={materials.Tifa_Skirt} morphTargetDictionary={nodes.Mesh030_2.morphTargetDictionary} morphTargetInfluences={nodes.Mesh030_2.morphTargetInfluences} />
          <mesh name="Mesh030_3" geometry={nodes.Mesh030_3.geometry} material={materials.Tifa_Materia} morphTargetDictionary={nodes.Mesh030_3.morphTargetDictionary} morphTargetInfluences={nodes.Mesh030_3.morphTargetInfluences} />
          <mesh name="Mesh030_4" geometry={nodes.Mesh030_4.geometry} material={materials.Tifa_Hair} morphTargetDictionary={nodes.Mesh030_4.morphTargetDictionary} morphTargetInfluences={nodes.Mesh030_4.morphTargetInfluences} />
          <mesh name="Mesh030_5" geometry={nodes.Mesh030_5.geometry} material={materials.Tifa_HairPin} morphTargetDictionary={nodes.Mesh030_5.morphTargetDictionary} morphTargetInfluences={nodes.Mesh030_5.morphTargetInfluences} />
          <mesh name="Mesh030_6" geometry={nodes.Mesh030_6.geometry} material={materials.Tifa_Eyes} morphTargetDictionary={nodes.Mesh030_6.morphTargetDictionary} morphTargetInfluences={nodes.Mesh030_6.morphTargetInfluences} />
          <mesh name="Mesh030_7" geometry={nodes.Mesh030_7.geometry} material={materials.Tifa_Eyelashes} morphTargetDictionary={nodes.Mesh030_7.morphTargetDictionary} morphTargetInfluences={nodes.Mesh030_7.morphTargetInfluences} />
          <mesh name="Mesh030_8" geometry={nodes.Mesh030_8.geometry} material={materials.Tifa_Accs} morphTargetDictionary={nodes.Mesh030_8.morphTargetDictionary} morphTargetInfluences={nodes.Mesh030_8.morphTargetInfluences} />
          <mesh name="Mesh030_9" geometry={nodes.Mesh030_9.geometry} material={materials.Tifa_Tops} morphTargetDictionary={nodes.Mesh030_9.morphTargetDictionary} morphTargetInfluences={nodes.Mesh030_9.morphTargetInfluences} />
          <mesh name="Mesh030_10" geometry={nodes.Mesh030_10.geometry} material={materials.Tifa_Arms} morphTargetDictionary={nodes.Mesh030_10.morphTargetDictionary} morphTargetInfluences={nodes.Mesh030_10.morphTargetInfluences} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/PlayerCharacter.glb')
