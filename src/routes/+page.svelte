<script>
  import { onMount } from 'svelte';
  import {
    ConnectButton,
    testnetWalletAdapter as walletAdapter
  } from '@builders-of-stuff/svelte-sui-wallet-adapter';

  let ownedWalruses = [];

  onMount(async () => {
    // Fetch owned walruses from the blockchain
    // This is a placeholder, replace with actual blockchain interaction
    ownedWalruses = [
      { id: 1, name: 'Wally' },
      { id: 2, name: 'Tusker' },
      { id: 3, name: 'Blubber' }
    ];
  });

  function mintWalrus() {
    // Implement minting logic here
    alert('Minting a new walrus!');
  }

  function goToExplorer(walrusId) {
    // Implement navigation to explorer
    alert(`Navigating to explorer for walrus ${walrusId}`);
  }
</script>

<main class="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 text-white">
  <div class="container mx-auto px-4 py-4">
    <div class="mb-8 flex justify-end">
      <ConnectButton {walletAdapter} />
    </div>

    <div class="flex flex-col items-center justify-between gap-12 md:flex-row">
      <div class="w-full md:w-1/2">
        <h1 class="mb-4 text-4xl font-bold md:text-5xl">
          Own a walrus, grow your penguin farm
        </h1>
        <p class="mb-8 text-xl opacity-80">
          Dive into the coolest Web3 game on Sui. Collect unique walruses and build your
          penguin empire!
        </p>
        <button
          on:click={mintWalrus}
          class="transform rounded-lg bg-white px-6 py-3 text-xl font-bold text-purple-600 transition duration-300 ease-in-out hover:scale-105 hover:bg-opacity-90"
        >
          Mint a Walrus
        </button>
      </div>

      <div class="flex w-full flex-col items-center md:w-1/2">
        <img
          src="https://i.imgur.com/XWWUeNf.png"
          alt="Cool Walrus"
          class="mb-6 h-64 w-64 rounded-full object-cover shadow-lg"
        />
        <div class="w-full max-w-sm">
          <h2 class="mb-4 text-2xl font-semibold">Your Walruses</h2>
          <div class="max-h-48 overflow-y-auto rounded-lg bg-white bg-opacity-10 p-4">
            {#if ownedWalruses.length > 0}
              {#each ownedWalruses as walrus}
                <button
                  on:click={() => goToExplorer(walrus.id)}
                  class="mb-2 block w-full rounded p-2 text-left transition duration-200 ease-in-out hover:bg-white hover:bg-opacity-10"
                >
                  {walrus.name} (ID: {walrus.id})
                </button>
              {/each}
            {:else}
              <p class="text-white text-opacity-80">
                No walruses owned yet. Mint one to get started!
              </p>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
