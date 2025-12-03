import { useState, useEffect, useRef } from 'react';
import { Scene3D } from './components/Scene3D';
import { Overlay } from './components/Overlay';
import { PDFViewer } from './components/PDFViewer';
import { createAnimationSequence } from './utils/animations';
import { createAudioManager } from './utils/audioManager';
import * as THREE from 'three';

function App() {
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [showPDF, setShowPDF] = useState(false);

  const fadeOverlayRef = useRef<HTMLDivElement>(null);
  const sceneElementsRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    sweater: THREE.Group | THREE.Mesh | null;
  } | null>(null);
  const audioManagerRef = useRef(createAudioManager());

  useEffect(() => {
    audioManagerRef.current.preload();

    return () => {
      audioManagerRef.current.destroy();
    };
  }, []);

  useEffect(() => {
    const checkSceneElements = () => {
      const container = document.querySelector('[data-scene-container]');
      if (!container) return;

      const canvas = container.querySelector('canvas');
      if (!canvas) return;

      const interval = setInterval(() => {
        const sceneData = (window as any).__threeScene;
        if (sceneData && sceneData.sweater) {
          sceneElementsRef.current = sceneData;
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    };

    if (sceneLoaded) {
      checkSceneElements();
    }
  }, [sceneLoaded]);

  const handleStart = () => {
    if (animationStarted || !sceneElementsRef.current?.sweater || !fadeOverlayRef.current) {
      return;
    }

    setAnimationStarted(true);
    setOverlayVisible(false);

    const elements = {
      sweater: sceneElementsRef.current.sweater,
      camera: sceneElementsRef.current.camera,
      scene: sceneElementsRef.current.scene
    };

    createAnimationSequence(
      elements,
      fadeOverlayRef.current,
      {
        onOpenComplete: () => {
          console.log('Sweater opened');
        },
        onZoomComplete: () => {
          console.log('Camera zoom complete');
        },
        onFadeToBlackComplete: () => {
          console.log('Faded to black');
        },
        onFadeFromBlackComplete: () => {
          console.log('Revealing PDF');
          setShowPDF(true);
          audioManagerRef.current.fadeIn(3000);
        },
        onSequenceComplete: () => {
          console.log('Full sequence complete');
        }
      }
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div data-scene-container>
        <Scene3D
          onLoadComplete={() => setSceneLoaded(true)}
        />
      </div>

      <Overlay
        visible={overlayVisible && sceneLoaded}
        onStart={handleStart}
      />

      <div
        ref={fadeOverlayRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          display: 'none',
          zIndex: 40,
          backgroundColor: 'black',
          opacity: 0
        }}
      />

      <PDFViewer
        visible={showPDF}
      />

      {!sceneLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="text-white text-2xl font-light tracking-wide animate-pulse">
            Loading experience...
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
