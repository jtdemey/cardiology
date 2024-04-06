import * as Babylon from "babylonjs";
import { addDeck } from "$lib/decks";
import { addTable } from "$lib/tables";

const BANNER_HEIGHT = 16;

export const SceneAxes: { [key: string]: Babylon.Vector3 } = {};

export const createScene = (): void => {
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  canvas.setAttribute("width", window.innerWidth.toString());
  canvas.setAttribute("height", `${window.innerHeight - (BANNER_HEIGHT + 3)}`);
  const root: HTMLElement | null = document.querySelector("main");
  if (!root) return;

  root.appendChild(canvas);
  const engine = new Babylon.Engine(canvas, true);
  const scene = new Babylon.Scene(engine);
  scene.clearColor = Babylon.Color4.FromHexString("#333725");

  SceneAxes.X = new Babylon.Vector3(1, 0, 0);
  SceneAxes.Y = new Babylon.Vector3(0, 1, 0);
  SceneAxes.Z = new Babylon.Vector3(0, 0, 1);

  const camera = new Babylon.ArcRotateCamera(
    "mainCamera",
    0,
    1,
    0,
    new Babylon.Vector3(2, 3, 0),
    scene
  );
  camera.panningSensibility = 0;
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
