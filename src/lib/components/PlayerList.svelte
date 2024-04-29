<script lang="ts">
  export let playerNames: string[] = [];
</script>

<section>
  <ul>
  {#each playerNames as playerName}
    <li>{playerName}</li>
  {/each}
  </ul>
</section>

<style>
  section {
    position: absolute;
    top: 12px;
    right: 12px;
    background: green;
  }
</style>
