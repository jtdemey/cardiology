import * as Babylon from "babylonjs";

// TODO add "shape" and support for different mesh options
const TABLES: any = {
  default: { 
    table_face: {
      diameter: 2,
      height: 0.1,
      x: 0,
      y: 10,
      z: 0
    },
    table_leg_1: {
      diameter: 0.1,
      height: 1,
      x: 0.2,
      y: 0,
      z: 0.2
    },
    table_leg_2: {
      diameter: 0.1,
      height: 1,
      x: 0.4,
      y: 0,
      z: 0.4
    },
    table_leg_3: {
      diameter: 0.1,
      height: 1,
      x: 0.6,
      y: 0,
      z: 0.2
    }
  }
};

export const addTable = (
  tableName: string = "default",
  scene: Babylon.Scene
): void => {
  const tableMeshOptions = TABLES[tableName];
  if (!tableMeshOptions) {
    console.error(`No table name ${tableName}`);
    return;
  }
  Object.keys(tableMeshOptions).forEach(segmentKey => {
    const segment = tableMeshOptions[segmentKey];
    Babylon.MeshBuilder.CreateCylinder(segment.name, segment, scene);
  });
  // const verticalVector = new Babylon.Vector3(0, 1, 0);
};
