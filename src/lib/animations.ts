import * as Babylon from "babylonjs";
import { nanoid } from "nanoid";

type Frame = {
  frame: number;
  value: number;
};

export const makeFrame = (frame: number, value: number): Frame => ({
  frame,
  value
});

export const animateTween = (
  mesh: Babylon.Mesh,
  frames: Frame[],
  property: string,
  scene: Babylon.Scene,
  animationName?: string,
  easingFunction?: Babylon.EasingFunction
): string => {
  let _animationName = animationName ?? nanoid(16);
  const animation = new Babylon.Animation(
    _animationName,
    property,
    60,
    Babylon.Animation.ANIMATIONTYPE_FLOAT
  );
  animation.setKeys(frames);

  if (!easingFunction) {
    easingFunction = new Babylon.CubicEase;
    easingFunction.setEasingMode(Babylon.EasingFunction.EASINGMODE_EASEINOUT);
  }
  animation.setEasingFunction(easingFunction ?? new Babylon.CubicEase());

  mesh.animations.push(animation);
  scene.beginAnimation(mesh, 0, 60);
  return _animationName;
};
