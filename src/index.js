import "./style/style";
import gsap from "gsap";
import * as THREE from "three";

import { createInitialRendererObjects } from "./init";
import { createPointLight } from "./lights";
import { createSphere, createBox } from "./MeshCreator";

const rendererObjects = createInitialRendererObjects();

function onKeyDown(event) {
  const keyCode = event.which;
  if (keyCode == 87) {
    rendererObjects.nucleus.position.z -= 5;
    tl.to(rendererObjects.nucleus.position, 0.1, { y: 1, delay: 0.3 });
    tl.to(rendererObjects.nucleus.position, 0.1, { y: -10 });
  } else if (keyCode == 83) {
    rendererObjects.nucleus.position.z += 5;
  } else if (keyCode == 65) {
    rendererObjects.nucleus.position.x -= 1;
  } else if (keyCode == 68) {
    rendererObjects.nucleus.position.x += 1;
  } else if (keyCode == 32) {
    rendererObjects.nucleus.position.set(0, 0, 0);
  }
}

function init() {
  rendererObjects.renderer.setPixelRatio(window.devicePixelRatio);
  rendererObjects.renderer.setSize(window.innerWidth, window.innerHeight);

  rendererObjects.camera.position.set(0, 0, 50);

  const l1 = createPointLight(30, 5, 10, 0.7);
  const l2 = createPointLight(-60, 0, 5, 0.1);
  const nucleus = createBox(10, 10, 10);
  nucleus.translateY(-10);
  const sphere = createSphere(4);
  sphere.translateX(15);
  sphere.translateY(-11);
  rendererObjects.nucleus = nucleus;
  rendererObjects.sphere = sphere;
  rendererObjects.scene.add(nucleus, l1, l2, sphere);

  document.body.appendChild(rendererObjects.renderer.domElement);

  window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener("keydown", onKeyDown, false);
}

const render = () => {
  rendererObjects.renderer.render(
    rendererObjects.scene,
    rendererObjects.camera
  );
};

const animate = () => {
  requestAnimationFrame(animate);
  render();
};

init(rendererObjects);

const ray = new THREE.Raycaster();
const mouse = new THREE.Vector2();
function mouseHover(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  ray.setFromCamera(mouse, rendererObjects.camera);
  const intersects = ray.intersectObjects(rendererObjects.scene.children, true);
  intersects.forEach(e => e.object.material.color.set(0xff0000));
}
window.addEventListener("mousemove", mouseHover);
let tl = gsap.timeline({ defaults: { ease: "Power3.inOut" } });
tl.to(rendererObjects.sphere.scale, 1, { x: 1, y: 1, z: 1 });
animate(rendererObjects);
