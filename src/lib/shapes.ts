export const SHAPES: { [key: string]: string } = {
  CYLINDER: "cylinder",
  RECTANGLE: "rectangle"
} as const;

type Position = {
  x: number;
  y: number;
  z: number;
};

export type ShapeName = (typeof SHAPES)[keyof typeof SHAPES];

export type Shape = {
  shape: ShapeName;
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
  shape: ShapeName,
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
  depth: number
): RectangleShape => ({
  ...makeShape(SHAPES.CYLINDER, x, y, z),
  depth,
  height,
  width
});
