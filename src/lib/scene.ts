import * as Babylon from "babylonjs";
import { addDeck, animateDeckToPlayer } from "./decks";
import { SHAPES, type Shape } from "./shapes";
import { addTable } from "./tables";
import { nanoid } from "nanoid";

const BANNER_HEIGHT = 16;

export const SceneAxes: { [key: string]: Babylon.Vector3 } = {};

const positionMesh = (
  mesh: Babylon.Mesh,
  value: number,
  vector: Babylon.Vector3
): void => {
  if (value === 0) return;
  mesh.translate(vector, value);
};

export const addMeshToScene = (
  meshName: string,
  shape: Shape,
  scene: Babylon.Scene,
  materialColor?: string,
  materialName?: string
) => {
  let mesh;
  if (shape.shape === SHAPES.CYLINDER) {
    mesh = Babylon.MeshBuilder.CreateCylinder(
      meshName,
      // @ts-ignore
      shape,
      scene
    );
  } else {
    mesh = Babylon.MeshBuilder.CreateBox(
      meshName,
      // @ts-ignore
      shape,
      scene
    );
  }

  const position = shape.position;
  positionMesh(mesh, position.x, SceneAxes.X);
  positionMesh(mesh, position.y, SceneAxes.Y);
  positionMesh(mesh, position.z, SceneAxes.Z);

  const standardMaterial = new Babylon.StandardMaterial(
    materialName ?? nanoid(16),
    scene
  );
  standardMaterial.diffuseColor = Babylon.Color3.FromHexString(
    materialColor ?? "#eeeeee"
  );
  mesh.material = standardMaterial;
};

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
    0,
    0,
    new Babylon.Vector3(2, 3, 0),
    scene
  );
  camera.panningSensibility = 0;
  camera.setTarget(new Babylon.Vector3(0, 1, 0));
  camera.attachControl(canvas, true);
  const light = new Babylon.HemisphericLight(
    "light",
    new Babylon.Vector3(0.5, 1, 0.5),
    scene
  );
  light.intensity = 0.7;
  Babylon.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
  addTable("default", scene);
  const deck = addDeck(scene);
  engine.runRenderLoop(() => scene.render());
  window.addEventListener("resize", () => engine.resize());

  animateDeckToPlayer(deck, scene);
};
