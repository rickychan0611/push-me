import React, { useRef, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Interactive, useXR } from '@react-three/xr';
import { Box, Text, useTexture, Plane } from '@react-three/drei';
import { Clock, CatmullRomCurve3, Vector3 } from 'three';

const NewBox = ({ position, goodPhoto, badPhoto }: { position: any, goodPhoto: string, badPhoto: string }) => {
  // const texture = useTexture('/images/ava_good.jpg')
  const { session } = useXR();
  const [color, setColor] = useState<any>('blue')

  const mesh = useRef<any>();
  const textRef = useRef<any>();
  const decimal = 3
  const { camera } = useThree()
  const [pos, setPos] = useState({
    x: parseFloat(camera.position.x.toFixed(decimal)),
    y: parseFloat(camera.position.y.toFixed(decimal)),
    z: parseFloat(camera.position.z.toFixed(decimal)),
  });

  // Variable to store the last endpoint
  let lastEndpoint = new Vector3(); // You might want to initialize this with some appropriate value
  const minDistance = 2; // Set your desired minimum distance


  const distanceBetween = (a: any, b: any) => {
    return a.clone().sub(b).length();
  };

  const generateRandomWaypoint = (maxDistance: any, previousPoints: Vector3[]) => {
    let point;
    let isTooClose;

    do {
      isTooClose = false;
      point = new Vector3(
        (Math.random() - 0.5) * maxDistance,
        0,
        (Math.random() - 0.5) * maxDistance
      );

      for (const previousPoint of previousPoints) {
        if (distanceBetween(point, previousPoint) < minDistance) {
          isTooClose = true;
          break;
        }
      }
    } while (isTooClose);

    return point;
  };

  const initialWaypoints = [
    generateRandomWaypoint(5, []),
    generateRandomWaypoint(5, [lastEndpoint]),
    generateRandomWaypoint(5, [lastEndpoint]),
    generateRandomWaypoint(5, [lastEndpoint]),
  ];

  const [waypoints, setWaypoints] = useState(initialWaypoints);

  const minSpeed = 2; // Minimum speed in units per second

  const totalDistance = waypoints.reduce((sum, waypoint, index, array) => {
    if (index === 0) return 0;
    return sum + waypoint.distanceTo(array[index - 1]);
  }, 0);

  const speed = Math.max(minSpeed / totalDistance, 0.1); // The second value is the existing speed factor


  // Create a Catmull-Rom spline through the waypoints
  const spline = new CatmullRomCurve3(waypoints);
  const clock = useRef(new Clock());

  // Variable to store the current parameter along the path
  let t = 0;

  useFrame(() => {
    // Get elapsed time from the clock, apply a scaling factor for speed control

    if (!session) {
      mesh.current.position.x = position[0]
      mesh.current.position.y = position[1]
      mesh.current.position.z = position[2]
      return
    }

    // x and z is flipped, don't know why
    if (mesh) {
      textRef.current.lookAt(camera.position)
      //update text numbers
      const meshPosition = mesh.current.position;
      const distanceX = camera.position.x - meshPosition.x;
      const distanceY = camera.position.y - meshPosition.y;
      const distanceZ = camera.position.z - meshPosition.z;
      setPos({
        x: parseFloat(distanceX.toFixed(decimal)),
        // y: parseFloat(distanceY.toFixed(decimal)),
        y: parseFloat(distanceY.toFixed(t)),
        z: parseFloat(distanceZ.toFixed(decimal)),
      });


      //==============movemnt
      const elapsedTime = clock.current.getElapsedTime();

      // Increment the parameter based on time (adjust the speed as needed)
      t += elapsedTime * speed;

      // If t exceeds 1, we've reached the end of the waypoints, so generate a new one and reset t
      if (t >= 1) {
        t -= 1;
        lastEndpoint.copy(waypoints[waypoints.length - 1]); // Use the last waypoint in the current array
        const newWaypoints = [
          lastEndpoint.clone(),
          generateRandomWaypoint(5, waypoints),
          generateRandomWaypoint(5, waypoints),
          generateRandomWaypoint(5, waypoints),
        ];
        setWaypoints(newWaypoints);
        clock.current.start(); // Restart the clock
      }

      // Get the current point and tangent on the path
      const point = spline.getPoint(t);
      const tangent = spline.getTangent(t);

      // Set the car's position to the current point
      mesh.current.position.copy(point);

      // Orient the car's Z-axis to the tangent of the path
      mesh.current.quaternion.setFromAxisAngle(new Vector3(0, 1, 0), Math.atan2(tangent.x, tangent.z));



      //=====================touch
      if (distanceX > -0.2 && distanceZ < 0.3) {
        mesh.current.position.x = mesh.current.position.x + 0.05
        setColor("yellow")
      }
      else setColor("blue")
    }
  });


  return (
    <group position={position} ref={mesh}>
      <Interactive
        onSelect={() => setColor((Math.random() * 0xffffff) | 0)}>
        {/* z, y ,x */}
        {/* <Box args={[0.3, 0.3, 0.3]} position={[0, 0, 0]} >
          <meshPhongMaterial color={color} />
        </Box> */}
        {/* <Plane  position={[0, 0, 0]}>
          <meshBasicMaterial map={texture} />
        </Plane> */}

        <group ref={textRef}>
          <Text
            position={[0, 0.07, 0]} fontSize={0.02} color="#fff" anchorX="center" anchorY="middle">
            x: {pos.x}
          </Text>
          <Text
            position={[0, 0.09, 0]} fontSize={0.02} color="#fff" anchorX="center" anchorY="middle">
            y:{pos.y}
          </Text>
          <Text
            position={[0, 0.11, 0]} fontSize={0.02} color="#fff" anchorX="center" anchorY="middle">
            z:{pos.z}
          </Text>
        </group>
      </Interactive>
    </group >
  )
}

export default NewBox;
