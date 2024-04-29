import * as Babylon from "babylonjs";

const CAMERA_POSITIONS: any = {
  BIRD: [0, 3, 0],
  NORTH: [2, 3, 0]
};

export const makeCamera = (
  canvas: HTMLCanvasElement,
  scene: Babylon.Scene
): Babylon.ArcRotateCamera => {
  const camera = new Babylon.ArcRotateCamera(
    "mainCamera",
    0,
    0,
    0,
    new Babylon.Vector3(2, 3, 0),
    scene
  );
  camera.panningSensibility = 0;
  camera.setTarget(new Babylon.Vector3(0, 1, 0));
  camera.attachControl(canvas, true);
  return camera;
};
