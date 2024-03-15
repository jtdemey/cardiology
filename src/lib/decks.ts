import * as Babylon from "babylonjs";

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

export const addDeck = (scene: Babylon.Scene): void => {
  const box = Babylon.MeshBuilder.CreateBox(
    `deck${deckId}`,
    {
      depth: 1,
      width: 0.4,
      height: 0.1
    },
    scene
  );
  deckId++;
  const verticalVector = new Babylon.Vector3(0, 1, 0);
  box.translate(verticalVector, 2);
};
