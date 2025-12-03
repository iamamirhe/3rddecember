import gsap from 'gsap';
import * as THREE from 'three';

export interface AnimationElements {
  sweater: THREE.Group | THREE.Mesh;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
}

export const playOpeningAnimation = (
  elements: AnimationElements,
  onComplete: () => void
): gsap.core.Timeline => {
  const { sweater, camera, scene } = elements;

  const timeline = gsap.timeline({
    onComplete
  });

  timeline
    .to(sweater.rotation, {
      y: Math.PI * 2,
      duration: 1.5,
      ease: 'power2.inOut'
    }, 0)
    .to(sweater.scale, {
      x: 1.3,
      y: 1.3,
      z: 1.3,
      duration: 1,
      ease: 'power2.out'
    }, 0.5);

  if (sweater.children.length > 0) {
    sweater.children.forEach((child, index) => {
      const offset = (index % 2 === 0 ? 0.3 : -0.3);
      timeline.to(child.position, {
        x: child.position.x + offset,
        duration: 0.8,
        ease: 'power2.out'
      }, 0.7);
    });
  }

  return timeline;
};

export const playCameraZoomAnimation = (
  elements: AnimationElements,
  onComplete: () => void
): gsap.core.Timeline => {
  const { sweater, camera } = elements;

  const timeline = gsap.timeline({
    onComplete
  });

  timeline
    .to(camera.position, {
      z: 0.5,
      duration: 2.5,
      ease: 'power2.inOut'
    }, 0)
    .to(sweater.scale, {
      x: 4,
      y: 4,
      z: 4,
      duration: 2.5,
      ease: 'power2.inOut'
    }, 0);

  return timeline;
};

export const fadeToBlack = (
  overlayElement: HTMLElement,
  onComplete: () => void
): gsap.core.Tween => {
  overlayElement.style.display = 'block';
  overlayElement.style.backgroundColor = 'black';
  overlayElement.style.opacity = '0';

  return gsap.to(overlayElement, {
    opacity: 1,
    duration: 1.5,
    ease: 'power2.inOut',
    onComplete
  });
};

export const fadeFromBlack = (
  overlayElement: HTMLElement,
  onComplete: () => void
): gsap.core.Tween => {
  return gsap.to(overlayElement, {
    opacity: 0,
    duration: 2,
    ease: 'power2.inOut',
    onComplete: () => {
      overlayElement.style.display = 'none';
      onComplete();
    }
  });
};

export const createAnimationSequence = (
  elements: AnimationElements,
  fadeOverlay: HTMLElement,
  callbacks: {
    onOpenComplete?: () => void;
    onZoomComplete?: () => void;
    onFadeToBlackComplete?: () => void;
    onFadeFromBlackComplete?: () => void;
    onSequenceComplete?: () => void;
  }
): gsap.core.Timeline => {
  const masterTimeline = gsap.timeline({
    onComplete: callbacks.onSequenceComplete
  });

  masterTimeline
    .add(() => {
      playOpeningAnimation(elements, () => {
        callbacks.onOpenComplete?.();
      });
    })
    .add(() => {
      playCameraZoomAnimation(elements, () => {
        callbacks.onZoomComplete?.();
      });
    }, '+=0.5')
    .add(() => {
      fadeToBlack(fadeOverlay, () => {
        callbacks.onFadeToBlackComplete?.();
      });
    }, '-=0.8')
    .add(() => {
      setTimeout(() => {
        fadeFromBlack(fadeOverlay, () => {
          callbacks.onFadeFromBlackComplete?.();
        });
      }, 1000);
    }, '+=1.5');

  return masterTimeline;
};
