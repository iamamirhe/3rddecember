import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const useThreeScene = () => {
  const [sceneReady, setSceneReady] = useState(false);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    sweater: THREE.Group | THREE.Mesh | null;
  } | null>(null);

  const getSceneElements = () => {
    if (!sceneRef.current || !sceneRef.current.sweater) {
      throw new Error('Scene not ready');
    }
    return {
      scene: sceneRef.current.scene,
      camera: sceneRef.current.camera,
      sweater: sceneRef.current.sweater
    };
  };

  const setSceneElements = (elements: {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    sweater: THREE.Group | THREE.Mesh | null;
  }) => {
    sceneRef.current = elements;
  };

  useEffect(() => {
    return () => {
      if (sceneRef.current) {
        sceneRef.current.renderer?.dispose();
      }
    };
  }, []);

  return {
    sceneReady,
    setSceneReady,
    getSceneElements,
    setSceneElements,
    sceneRef
  };
};
