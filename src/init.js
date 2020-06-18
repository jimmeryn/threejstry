import * as THREE from "three";

export function createInitialRendererObjects() {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  createInitialRendererObjects = null;
  return { renderer, scene, camera };
}
