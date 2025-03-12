import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Bounds } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';

function Model({ scale }) {
 
  const { scene } = useGLTF('/models/Shop.glb');

  return (
    <Bounds fit margin={1.2}>
      <primitive object={scene} scale={scale} position={[0, -1, 0]} />
    </Bounds>
  );
}

export default function ModelViewer({ scale = 1, autoRotate = false }) {
  const controlsRef = useRef();
  const [enteredStore, setEnteredStore] = useState(false);
  const thresholdDistance = 3;


  const CameraUpdater = () => {
    useFrame(() => {
      if (controlsRef.current) {
        const distance = controlsRef.current.getDistance();
        if (distance < thresholdDistance && !enteredStore) {
          setEnteredStore(true);
        } else if (distance >= thresholdDistance && enteredStore) {
          setEnteredStore(false);
        }
      }
    });
    return null;
  };

  return (
    <Canvas 
      camera={{ position: [0, 2, 5], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      className="w-full h-full"
    >
      <ambientLight intensity={1.5} />
      <spotLight position={[10, 15, 10]} angle={0.25} penumbra={1} intensity={2} />
      <Environment preset="studio" />
      
      <Suspense fallback={null}>
        <Model scale={scale} />
      </Suspense>

      <OrbitControls 
        ref={controlsRef}
        enableZoom
        enablePan
        enableRotate
        zoomSpeed={1.5}
        panSpeed={1.2}
        rotateSpeed={1.2}
      
        minDistance={enteredStore ? 0.5 : 2}
        maxDistance={15}
        autoRotate={autoRotate}
        autoRotateSpeed={1.5}
        enableDamping
        dampingFactor={0.1}
        screenSpacePanning={false}
      
        target={[0, -1, 0]}
     
        minPolarAngle={enteredStore ? 0 : Math.PI / 6}
        maxPolarAngle={enteredStore ? Math.PI : Math.PI / 1.8}
      />

     
      <CameraUpdater />
    </Canvas>
  );
}
