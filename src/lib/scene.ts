import * as Babylon from "babylonjs";
import { addDeck } from "$lib/decks";
import { addTable } from "$lib/tables";

export const createScene = (): void => {
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  canvas.setAttribute("width", window.innerWidth.toString());
  canvas.setAttribute("height", window.innerHeight.toString());
  const root: HTMLElement | null = document.querySelector("main");
  if (!root) return;
  root.appendChild(canvas);
  const engine = new Babylon.Engine(canvas, true);
  const scene = new Babylon.Scene(engine);
  scene.clearColor = Babylon.Color4.FromHexString("#333725");
  const camera = new Babylon.FreeCamera(
    "mainCamera",
    new Babylon.Vector3(5, 7, 0),
    scene
  );
  camera.setTarget(Babylon.Vector3.Zero());
  camera.attachControl(canvas, true);
  const light = new Babylon.HemisphericLight(
    "light",
    new Babylon.Vector3(0.5, 1, 0.5),
    scene
  );
  light.intensity = 0.7;
  Babylon.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
  addTable("default", scene);
  addDeck(scene);
  engine.runRenderLoop(() => scene.render());
  window.addEventListener("resize", () => engine.resize());
};
