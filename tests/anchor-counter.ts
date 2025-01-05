import * as anchor from "@coral-xyz/anchor";
import { Program, Wallet } from "@coral-xyz/anchor";
import { AnchorCounter } from "../target/types/anchor_counter";
import { PublicKey, Keypair } from "@solana/web3.js";

describe("anchor-counter", () => {
  // Configure the client to use the local cluster.
  let provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.AnchorCounter as Program<AnchorCounter>;
  const counter_account = new Keypair(); // creates a wallet

  // const wallet = provider.wallet as Wallet;
  // const connection = provider.connection;

  it("Is initialized!", async () => {
    try {
      const tx_sign = await program.methods
        .initialize()
        .accounts({ counter: counter_account.publicKey })
        .signers([counter_account])
        .rpc({ skipPreflight: true });

      // Fetch the counter account data
      const account_data = await program.account.counter.fetch(
        counter_account.publicKey
      );

      console.log(`Transaction Signature: ${tx_sign}`);
      console.log(`Count: ${account_data.count}`);
    } catch (error) {
      // If PDA Account alreadt created, then we expect an error
      console.log(error);
    }
  });

  it("Increment", async () => {
    const tx_signature = await program.methods
      .increment()
      .accounts({ counter: counter_account.publicKey })
      .rpc({ skipPreflight: true });
    const account_data = await program.account.counter.fetch(
      counter_account.publicKey
    );

    console.log(`Wallet Public Key: ${counter_account.publicKey}`);
    console.log(`Transaction Signature: ${tx_signature}`);
    console.log(`Count: ${account_data.count}`);
  });
});
