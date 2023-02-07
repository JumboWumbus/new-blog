
import { extend, useFrame, useLoader } from "@react-three/fiber"
import { Mesh, TextureLoader } from "three"
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js'

extend(TWEEN);


import bun1 from 'public/cubeTextures/Bun1.jpg'
import bun2 from 'public/cubeTextures/Bun2.jpg'
import bun3 from 'public/cubeTextures/Bun3.jpg'
import bun4 from 'public/cubeTextures/Bun4.jpg'
import bun5 from 'public/cubeTextures/Bun5.jpg'
import bun6 from 'public/cubeTextures/Bun6.jpg'
import { useTexture } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"

//TODO get EULER rotations for each fact to animate between them

export default function BenBox(){

  const textures=useTexture([
'cubeTextures/Bun1.jpg',
'cubeTextures/Bun2.jpg',
'cubeTextures/Bun3.jpg',
'cubeTextures/Bun4.jpg',
'cubeTextures/Bun5.jpg',
'cubeTextures/Bun6.jpg',
  ])
  const texture_1 = useLoader(TextureLoader, 'cubeTextures/Bun1.jpg')
  const texture_2 = useLoader(TextureLoader, 'cubeTextures/Bun2.jpg')
  const texture_3 = useLoader(TextureLoader, 'cubeTextures/Bun3.jpg')
  const texture_4 = useLoader(TextureLoader, 'cubeTextures/Bun4.jpg')
  const texture_5 = useLoader(TextureLoader, 'cubeTextures/Bun5.jpg')
  const texture_6 = useLoader(TextureLoader, 'cubeTextures/Bun6.jpg')


  const [index, setIndex] = useState(0);
  const rotations =[
    new THREE.Euler(-Math.PI/2, 0, 0, 'XYZ'),
    new THREE.Euler(Math.PI/2, 0, 0, 'XYZ'),
    new THREE.Euler(Math.PI, Math.PI, Math.PI, 'XYZ'),
    new THREE.Euler(Math.PI, 0, Math.PI, 'XYZ'),

  ]

// [-Math.PI/2, 0, 0]
// [Math.PI/2, 0, 0]
// [Math.PI,0,Math.PI]
// [Math.PI,Math.PI,Math.PI]

const ref = useRef<Mesh>(null)

useEffect(() => {
  const intervalId = setInterval(() => {
    setIndex((i) => (i + 1) % rotations.length);
    animateRotation(index);

  }, 3500);

  return () => {
    clearInterval(intervalId);
  };
}, [index]);


useFrame((state) => {
  //ref.current.rotation.x = clock.getElapsedTime()
  TWEEN.update();


})

const animateRotation = (index: number) => {
  if (!ref.current) return;

  const targetRotation = rotations[index];
  const currentRotation = new THREE.Euler().copy(ref.current.rotation);
  const tweener = new TWEEN.Tween(currentRotation)
    .to(targetRotation, 2500)
    .easing(TWEEN.Easing.Elastic.InOut)
    .onUpdate(() => {
      if (ref.current) {
        ref.current.rotation.set(currentRotation.x, currentRotation.y, currentRotation.z);
      }
    });

    tweener.start();


};


  return(
    <mesh ref={ref} rotation={[0,Math.PI,0]}>
      <boxBufferGeometry attach="geometry" args={[3,3,3]}/>
      {textures.map((texture, idx) =>
      <meshBasicMaterial key={texture.id} attach={`material-${idx}`} map={texture}/>
      )}
    </mesh>
  )
}