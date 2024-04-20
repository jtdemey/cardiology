<script lang="ts">
  import * as Babylon from "babylonjs";
  import { onMount } from "svelte";
  import { addDeck } from "$lib/decks";
  import { createScene } from "$lib/scene";
  import { connect } from "$lib/client";

  let socket = null;

  onMount(() => {
    createScene();
    socket = connect();
  });
</script>

<div id="wrapper">
  <header>
    <h1>Cardiology</h1>
  </header>
  <main></main>
</div>

<style>
  #wrapper {
    width: 100%;
    min-height: 100vh;
    background: hsl(86, 5%, 73%);
  }

  main {
    overflow-y: scroll;
  }
</style>
