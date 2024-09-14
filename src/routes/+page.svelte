<script lang="ts">
  import { onMount, untrack } from 'svelte';
  import {
    ConnectButton,
    testnetWalletAdapter as walletAdapter
  } from '@builders-of-stuff/svelte-sui-wallet-adapter';

  import Walrus from '$lib/assets/walrus-250.png';
  import { mintWalrus } from '$lib/shared/shared.sdk';
  import { WALRUS_GAME_PACKAGE_ID, walrusLink } from '$lib/shared/shared.stuff';

  /**
   * - Fetch walruses upon connect
   * - select walrus
   * - link to walrus site
   */

  let hasCheckedOwnedObjects = $state(false);
  let selectedWalrusId = $state('');

  let ownedWalruses = $state([] as any);

  const handleWalrusMint = async () => {
    const mintResponse = (await mintWalrus()) as any;

    const walrusId = mintResponse?.objectChanges?.find?.((obj: any) => {
      return obj?.objectType === `${WALRUS_GAME_PACKAGE_ID}::walrus::Walrus`;
    })?.objectId;

    console.log(' walrusId: ', walrusId);

    if (walrusId) {
      selectedWalrusId = walrusId;
      ownedWalruses = [...ownedWalruses, walrusId];
    }
  };

  /**
   * ==========================================================================
   */

  $effect(() => {
    console.log('ownedWalruses: ', $state.snapshot(ownedWalruses));
  });

  /**
   * Fetch existing walrus upon connect
   */
  $effect(() => {
    if (!walletAdapter.isConnected || hasCheckedOwnedObjects) {
      return;
    }

    untrack(() => {
      (async () => {
        const ownedObjects = await walletAdapter.suiClient.getOwnedObjects({
          owner: walletAdapter?.currentAccount?.address as any,
          filter: {
            StructType: `${WALRUS_GAME_PACKAGE_ID}::walrus::Walrus`
          },
          options: {
            showContent: true,
            showDisplay: true,
            showOwner: true,
            showType: true,
            showStorageRebate: true
          }
        });

        console.log('ownedObjects: ', ownedObjects);

        const walruses = ownedObjects?.data?.map((obj: any) => obj.data.objectId);
        ownedWalruses = walruses;

        hasCheckedOwnedObjects = true;
      })();
    });
  });
</script>

<main class="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 text-white">
  <div class="container mx-auto px-4 py-4">
    <div class="mb-8 flex justify-end">
      <ConnectButton {walletAdapter} />
    </div>

    <div class="flex flex-col items-center justify-between gap-12 md:flex-row">
      <div class="w-full md:w-1/2">
        <h1 class="mb-4 text-4xl font-bold md:text-5xl">
          <p>Own a walrus,</p>
          <p>Grow a penguin farm</p>
        </h1>
        <p class="mb-8 text-xl opacity-80">Catch fish, buy penguins, profit</p>
        <button
          onclick={handleWalrusMint}
          class="transform rounded-lg bg-white px-6 py-3 text-xl font-bold text-purple-600 transition duration-300 ease-in-out hover:scale-105 hover:bg-opacity-90"
        >
          Mint walrus
        </button>
      </div>

      <div class="flex w-full flex-col items-center md:w-1/2">
        <img
          src={Walrus}
          alt="Cool Walrus"
          class="mb-6 h-64 w-64 rounded-full object-cover shadow-lg"
        />
        <div class="w-full max-w-sm">
          <h2 class="mb-4 text-2xl font-semibold">Your Walruses</h2>
          <div class="max-h-48 overflow-y-auto rounded-lg bg-white bg-opacity-10 p-4">
            {#if ownedWalruses.length > 0}
              {#each ownedWalruses as walrusId}
                <a
                  href={walrusLink(walrusId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mb-2 block w-full rounded p-2 text-left transition duration-200 ease-in-out hover:bg-white hover:bg-opacity-10"
                >
                  {walrusId}
                </a>
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
