import * as Babylon from "babylonjs";
import "babylonjs-materials";
import { addMeshToScene } from "./scene";
import { type Table, makeCylinder } from "./shapes";

const TABLES: { [key: string]: Table } = {
  default: {
    table_face: makeCylinder(0, 1, 0, 2, 0.1),
    table_leg_1: makeCylinder(-0.7, 0.5, 0, 0.1, 1),
    table_leg_2: makeCylinder(0, 0.5, 0.7, 0.1, 1),
    table_leg_3: makeCylinder(0.6, 0.5, 0.2, 0.1, 1)
  }
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
    addMeshToScene(shapeKey, shape, scene, "#592b11", `${shapeKey}Material`);
  });
};
