import * as Babylon from "babylonjs";
import "babylonjs-materials";
import { SceneAxes } from "./scene";
import { type Table, makeCylinder } from "./shapes";

// TODO add "shape" and support for different mesh options
const TABLES: { [key: string]: Table }= {
  default: {
    table_face: makeCylinder(0, 1, 0, 2, 0.1),
    table_leg_1: makeCylinder(-0.7, 0.5, 0, 0.1, 1),
    table_leg_2: makeCylinder(0, 0.5, 0.7, 0.1, 1),
    table_leg_3: makeCylinder(0.6, 0.5, 0.2, 0.1, 1),
  }
};

const positionMesh = (
  mesh: Babylon.Mesh,
  value: number,
  vector: Babylon.Vector3
): void => {
  if (value === 0) return;
  mesh.translate(vector, value);
};

export const addTable = (
  tableName: string = "default",
  scene: Babylon.Scene
): void => {
  const tableMeshShapes = TABLES[tableName];
  if (!tableMeshShapes) {
    console.error(`No table name ${tableName}`);
    return;
  }

  Object.keys(tableMeshShapes).forEach(shapeKey => {
    const shape = tableMeshShapes[shapeKey];
    console.log(shape);
    const mesh = Babylon.MeshBuilder.CreateCylinder(
      shapeKey,
      // @ts-ignore
      shape,
      scene
    );

    const position = shape.position;
    positionMesh(mesh, position.x, SceneAxes.X);
    positionMesh(mesh, position.y, SceneAxes.Y);
    positionMesh(mesh, position.z, SceneAxes.Z);

    const standardMaterial = new Babylon.StandardMaterial(
      "standardMaterial",
      scene
    );
    standardMaterial.diffuseColor = Babylon.Color3.FromHexString("#592b11");
    mesh.material = standardMaterial;
  });
};
