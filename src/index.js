import "./style/style";

import { createInitialRendererObjects } from "./init";
import { createPointLight } from "./lights";
import { createSphere, createBox } from "./MeshCreator";

const rendererObjects = createInitialRendererObjects();

function onKeyDown(event) {
  const keyCode = event.which;
  if (keyCode == 87) {
    rendererObjects.nucleus.position.z -= 10;
  } else if (keyCode == 83) {
    rendererObjects.nucleus.position.z += 10;
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
  // rendererObjects.nucleus.translateZ(-1);
  render();
};

init(rendererObjects);
animate(rendererObjects);
