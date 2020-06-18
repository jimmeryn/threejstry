import { PointLight } from "three";

export const createPointLight = (x, y, z, i = 1, color = 0xffffff) => {
  const light = new PointLight(color, i);
  light.position.set(x, y, z);
  return light;
};
