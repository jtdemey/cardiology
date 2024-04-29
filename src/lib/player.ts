import { type Writable, writable } from "svelte/store";

export let playerId: string = "";
export const playerName: Writable<string> = writable("Player");
export let socket: WebSocket;

export const setPlayerId = (value: string): void => {
  playerId = value;
};
export const setPlayerSocket = (sock: WebSocket): void => {
  socket = sock;
};
