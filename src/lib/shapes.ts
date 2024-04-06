const SHAPES: { [key: string]: string } = {
  CYLINDER: "cylinder",
  RECTANGLE: "rectangle"
};

type Position = {
  x: number;
  y: number;
  z: number;
};

type Shape = {
  shape: keyof typeof SHAPES;
  position: Position;
};

type CylinderShape = Shape & {
  diameter: number;
  height: number;
};

type RectangleShape = Shape & {
  depth: number;
  height: number;
  width: number;
};

export type Table = {
  [key: string]: Shape;
};

const makeShape = (
  shape: keyof typeof SHAPES,
  x: number,
  y: number,
  z: number
): Shape => ({
  position: {
    x,
    y,
    z
  },
  shape
});

export const makeCylinder = (
  x: number,
  y: number,
  z: number,
  diameter: number,
  height: number
): CylinderShape => ({
  ...makeShape(SHAPES.CYLINDER, x, y, z),
  diameter,
  height
});

export const makeRectangle = (
  x: number,
  y: number,
  z: number,
  width: number,
  height: number,
  depth: number,
): RectangleShape => ({
  ...makeShape(SHAPES.CYLINDER, x, y, z),
  depth,
  height,
  width,
});
