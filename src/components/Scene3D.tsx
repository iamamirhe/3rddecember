import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Scene3DProps {
  onLoadComplete: () => void;
  modelPath?: string;
}

const Scene3D = ({ onLoadComplete, modelPath = '/assets/sweater.glb' }: Scene3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    sweater: THREE.Group | null;
    controls: OrbitControls;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 8;
    controls.maxPolarAngle = Math.PI / 1.8;
    controls.minPolarAngle = Math.PI / 3;
    controls.enablePan = false;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 50;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x87ceeb, 0.4);
    fillLight.position.set(-5, 3, -5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffa07a, 0.6);
    rimLight.position.set(0, 3, -5);
    scene.add(rimLight);

    const loader = new GLTFLoader();
    let sweaterModel: THREE.Group | null = null;

    loader.load(
      modelPath,
      (gltf) => {
        sweaterModel = gltf.scene;
        sweaterModel.position.set(0, 0, 0);
        sweaterModel.scale.set(1, 1, 1);

        sweaterModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add(sweaterModel);
        onLoadComplete();
      },
      undefined,
      (error) => {
        console.warn('Model not found, using placeholder');
        const placeholderGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
        const placeholderMaterial = new THREE.MeshStandardMaterial({
          color: 0xd4a373,
          roughness: 0.7,
          metalness: 0.2
        });
        sweaterModel = new THREE.Mesh(placeholderGeometry, placeholderMaterial);
        sweaterModel.castShadow = true;
        sweaterModel.receiveShadow = true;
        scene.add(sweaterModel);
        onLoadComplete();
      }
    );

    sceneRef.current = {
      scene,
      camera,
      renderer,
      sweater: sweaterModel,
      controls
    };

    (window as any).__threeScene = {
      scene,
      camera,
      renderer,
      sweater: sweaterModel,
      controls
    };

    const updateWindowScene = () => {
      if (sceneRef.current) {
        (window as any).__threeScene = sceneRef.current;
      }
    };

    const checkInterval = setInterval(() => {
      if (sweaterModel) {
        sceneRef.current!.sweater = sweaterModel;
        (window as any).__threeScene.sweater = sweaterModel;
        clearInterval(checkInterval);
      }
    }, 100);

    const handleResize = () => {
      if (!sceneRef.current) return;
      const { camera, renderer } = sceneRef.current;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      controls.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [modelPath, onLoadComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0"
      style={{ touchAction: 'none' }}
    />
  );
};

export { Scene3D };
export type { Scene3DProps };
