import { Canvas, useFrame, useLoader, useAnimations } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useRef, useEffect, Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const Lighting = () => {
  const ambientLightRef = useRef();
  const directionalLightRef = useRef();
  const pointLightRef = useRef();

  useFrame(() => {
    // Animate the lights
    ambientLightRef.current.intensity =
      Math.sin(Date.now() * 0.001) * 0.5 + 0.5;
    directionalLightRef.current.position.x = Math.cos(Date.now() * 0.001) * 5;
    directionalLightRef.current.position.z = Math.sin(Date.now() * 0.001) * 5;
    pointLightRef.current.position.x = Math.cos(Date.now() * 0.002) * 3;
    pointLightRef.current.position.y = Math.sin(Date.now() * 0.003) * 3;
  });

  return (
    <>
      {/* Ambient Light */}
      <ambientLight ref={ambientLightRef} intensity={0.5} />

      {/* Directional Light */}
      <directionalLight
        ref={directionalLightRef}
        position={[5, 5, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Point Light */}
      <pointLight
        ref={pointLightRef}
        position={[0, 3, 0]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={10}
      />
    </>
  );
};

const ModelWithAnimation = () => {
  const gltf = useLoader(GLTFLoader, "/assets/3d/handcube.glb");
  const mixer: any = useRef();

  useEffect(() => {
    mixer.current = new THREE.AnimationMixer(gltf.scene);
    gltf.animations.forEach((clip: any) => {
      const action = mixer.current.clipAction(clip);
      action.play();
    });
  }, [gltf.animations]);

  useFrame((state, delta) => {
    mixer.current.update(delta);
  });

  return <primitive object={gltf.scene} scale={1} position={[0, 0, 0]} />;
};

const AcademyHeroScene = () => {
  return (
    <Canvas>
      <Lighting />
      <ModelWithAnimation />
    </Canvas>
  );
};

export default AcademyHeroScene;
