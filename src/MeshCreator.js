import { SphereGeometry, Mesh, MeshPhongMaterial, BoxGeometry } from "three";

export const createSphere = (r = 1, color = 0xffffff, shininess = 30) => {
  const sphereGeo = new SphereGeometry(r, 20, 20);
  const sphereMat = new MeshPhongMaterial({
    color,
    shininess
  });
  return new Mesh(sphereGeo, sphereMat);
};

export const createBox = (
  w = 1,
  h = 1,
  d = 1,
  color = 0xffffff,
  shininess = 30
) => {
  const sphereGeo = new BoxGeometry(w, h, d);
  const sphereMat = new MeshPhongMaterial({
    color,
    shininess
  });
  return new Mesh(sphereGeo, sphereMat);
};
