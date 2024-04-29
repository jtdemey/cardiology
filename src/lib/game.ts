import { type Writable, writable } from "svelte/store";

export const gameId: Writable<string> = writable("");
