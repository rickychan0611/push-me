import { useEffect, useState } from 'react'
import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr'
import { Canvas, useFrame, Vector3 } from '@react-three/fiber'
import Cube from './Cube';
//@ts-ignore
import { ARCanvas, ARMarker } from "@artcom/react-three-arjs"
import * as THREE from 'three';

function ThreeScene() {
  let currentSession: any = null;
  let renderer: any = null;
  let geometry = null
  let material = null
  let mesh: any = null

  // build three.js scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();

  const start = async () => {
    currentSession = await navigator?.xr?.requestSession('immersive-ar', {
      optionalFeatures: ['dom-overlay'], domOverlay: { root: document.body }
    });

    renderer.xr.enabled = true;
    renderer.xr.setReferenceSpaceType('local');
    await renderer.xr.setSession(currentSession);

    renderer.setAnimationLoop(() => {
      mesh.position.set(Math.sin(Date.now() * 0.001) * 0.1, 0, -0.3);
      scene.add(mesh);
      renderer.render(scene, camera);
    });
  }

  const end = async () => {
    currentSession.end();
    renderer.setAnimationLoop(null);
    renderer.clear();
    renderer = null
    initialize()
  }

  const initialize = async () => {

    // check and request webxr session 
    const supported = navigator.xr && await navigator.xr.isSessionSupported('immersive-ar');
    if (!supported) {
      console.log("not supported")
      return;
    }

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    // create AR object
    geometry = new THREE.BoxGeometry(0.06, 0.06, 0.06);
    material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -1);
    scene.add(mesh);

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);


    renderer.xr.addEventListener("sessionstart", (e: any) => {
      console.log("session start");
    });
    renderer.xr.addEventListener("sessionend", () => {
      console.log("session end");
    });

  }

  useEffect(() => {
    initialize();
  }, [])

  return (
    <>
      <button onClick={start} className='bg-slate-200 p-2 mr-2'>Start</button>
      <button onClick={end} className='bg-slate-200 p-2 mr-2'>end</button>
    </>
  )
}

export default ThreeScene