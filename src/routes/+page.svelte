<script lang="ts">
  import * as Babylon from "babylonjs";
  import { onMount } from "svelte";
  import { connect } from "$lib/client";
  import { addDeck } from "$lib/decks";
  import { setPlayerSocket } from "$lib/player";
  import { createScene } from "$lib/scene";
  import PlayerList from "$lib/components/PlayerList.svelte";

  onMount(() => {
    createScene();
    setPlayerSocket(connect());
  });
</script>

<div id="wrapper">
  <header>
    <h1>Cardiology!</h1>
  </header>
  <main>
    <PlayerList />
  </main>
</div>

<style>
  /* Theme:
      white: hsl(30, 2%, 84%);
      orange: hsl(17, 51%, 48%);
  */
  #wrapper {
    width: 100%;
    min-height: 100vh;
    background: hsl(86, 5%, 73%);
  }

  main {
    overflow-y: scroll;
  }

  h1 {
    position: absolute;
    top: 12px;
    left: 12px;
    color: hsl(30, 2%, 84%);
    font-family: "Rowdies";
    font-size: 42px;
    text-shadow: -4px -4px hsl(17, 51%, 48%);
  }
</style>
