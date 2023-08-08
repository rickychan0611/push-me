import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Box = () => {
  const meshRef = useRef();
  const [initialQuaternion, setInitialQuaternion] = useState(null);

  // Function to update the orientation of the 3D object
  const updateOrientation = (event) => {
    const { alpha, beta, gamma } = event;
    const rotationQuaternion = new THREE.Quaternion();

    // Convert the Euler angles to quaternions
    rotationQuaternion.setFromEuler(new THREE.Euler(
      THREE.MathUtils.degToRad(beta),
      THREE.MathUtils.degToRad(alpha),
      -THREE.MathUtils.degToRad(gamma),
      'YXZ' // The order of the rotations (Y, X, Z)
    ));

    // Save the initial quaternion when it's null
    if (initialQuaternion === null) {
      setInitialQuaternion(rotationQuaternion);
    }

    // Combine the initial rotation with the current rotation
    rotationQuaternion.multiply(initialQuaternion);

    // Apply the quaternion to the 3D object
    meshRef.current.quaternion.copy(rotationQuaternion);
  };

  // Add event listener for orientation change
  useState(() => {
    window.addEventListener('deviceorientation', updateOrientation);
    return () => {
      window.removeEventListener('deviceorientation', updateOrientation);
    };
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshBasicMaterial color="blue" />
    </mesh>
  );
};


export default Box;
