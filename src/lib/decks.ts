import * as Babylon from "babylonjs";
import { animateTween, makeFrame } from "./animations";

const BASE_DECK_WIDTH = 0.89 / 3;
const BASE_DECK_DEPTH = 0.64 / 3;
const BASE_CARD_HEIGHT = 0.0044 / 3;
const BASE_DECK_HEIGHT = BASE_CARD_HEIGHT * 52;

enum Suit {
  Clubs,
  Diamonds,
  Hearts,
  Spades
}

type Card = {
  suit: Suit;
  value: string | number;
};

export type Deck = {
  cards: Card[];
};

let deckId = 0;

export const addDeck = (scene: Babylon.Scene): Babylon.Mesh => {
  const box = Babylon.MeshBuilder.CreateBox(
    `deck${deckId}`,
    {
      depth: BASE_DECK_DEPTH,
      width: BASE_DECK_WIDTH,
      height: BASE_DECK_HEIGHT
    },
    scene
  );
  deckId++;
  const verticalVector = new Babylon.Vector3(0, 1, 0);
  box.translate(verticalVector, 1.5);
  return box;
};

export const animateDeckToPlayer = (
  mesh: Babylon.Mesh,
  scene: Babylon.Scene
) => {
  animateTween(
    mesh,
    [makeFrame(0, 0), makeFrame(60, 0.5)],
    "position.x",
    scene,
    "deckSpawnX"
  );
  animateTween(
    mesh,
    [makeFrame(0, 1.5), makeFrame(60, 1 + BASE_DECK_HEIGHT)],
    "position.y",
    scene,
    "deckSpawnY"
  );
  animateTween(
    mesh,
    [makeFrame(0, 0), makeFrame(60, 12.6)],
    "rotation.y",
    scene,
    "deckSpawnSpin"
  );
};
