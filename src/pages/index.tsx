import React, { useRef, useEffect, useCallback, useState, forwardRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { XR, toggleSession, useXR } from '@react-three/xr';
import NewBox from '../components/NewBox';

const Interface = forwardRef((props, ref: any) => {
  return (
    <div id="overlay-content" ref={ref}>
      <div className="dom-container">
        <div className="button-container">
          <button id="actionButton" className='p-2 bg-blue-500 rounded m-3 text-white'>
            Start the game
          </button>
        </div>
      </div>
    </div>
  )
})


const Index: React.FC = () => {
  const eventSourceRef = useRef<any>(null);
  const [overlayContent, setOverlayContent] = useState<any>()

  const Scene = () => {

    const { camera, scene } = useThree();
    const { session } = useXR();

    const handleClick = async () => {
      const session = await toggleSession('immersive-ar', {
        sessionInit: {
          optionalFeatures: ["dom-overlay"],
          domOverlay: { root: overlayContent }
        }
      })

      const button = document.getElementById('actionButton');
      if (button) {
        button.innerText = session ? 'Exit AR' : 'Start the game';
      }
    };

    useEffect(() => {
      const button = document.getElementById('actionButton');
      if (button) {
        button.addEventListener('click', handleClick);
        return () => {
          button.removeEventListener('click', handleClick);
        };
      }
    }, [session]);


    useEffect(() => {
      camera.position.set(0, 0, 0); // x, y, z coordinates
      camera.lookAt(0, 0, 0); // x, y, z coordinates of the point the camera is looking at
      camera.updateProjectionMatrix(); // Update the camera's matrix after making changes
    }, [camera]);

    return (
      <>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <NewBox
          position={[0.5, 0, -.5]}
          goodPhoto={"/ava_good.jpg"}
          badPhoto={"/ava-sad.jpg"}
          name="Ava"
        />
        <NewBox
          position={[0.5, 0, 0.5]}
          goodPhoto={"/bella-good.jpg"}
          badPhoto={"/bella-sad.jpg"}
          name="Bella"
        />
      </>
    )
  }


  let interfaceRef = useCallback((node: any) => {
    if (node !== null) {
      setOverlayContent(node);
    }
  }, []);

  return (
    <div>
      <Interface ref={interfaceRef} />
      <Canvas eventSource={eventSourceRef.current} >
        <XR referenceSpace="local">
          <Scene />
        </XR>
      </Canvas>
    </div>
  );
};

export default Index;
