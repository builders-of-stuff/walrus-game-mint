import { Transaction } from '@mysten/sui/transactions';
import { testnetWalletAdapter as walletAdapter } from '@builders-of-stuff/svelte-sui-wallet-adapter';

import { WALRUS_GAME_PACKAGE_ID } from './shared.stuff';

export const mintWalrus = async () => {
  if (!walletAdapter?.currentAccount?.address) {
    return;
  }

  const tx = new Transaction();

  const [walrus] = tx.moveCall({
    target: `${WALRUS_GAME_PACKAGE_ID}::walrus::mint`,
    arguments: []
  });

  tx.transferObjects([walrus], walletAdapter?.currentAccount?.address);

  try {
    const { bytes, signature } = await walletAdapter.signTransaction(tx as any, {});

    const executedTx = await walletAdapter.executeTransaction({
      bytes,
      signature
    });

    return executedTx;
  } catch (e) {
    console.log(e);
  }
};
