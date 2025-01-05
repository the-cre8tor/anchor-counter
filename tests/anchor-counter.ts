import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorCounter } from "../target/types/anchor_counter";
import { PublicKey } from "@solana/web3.js";

describe("anchor-counter", () => {
  // Configure the client to use the local cluster.
  let provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.AnchorCounter as Program<AnchorCounter>;

  const [counter_pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("counter")],
    program.programId
  );

  it("Is initialized!", async () => {
    try {
      const tx_sign = await program.methods.initialize().rpc();

      const account_data = await program.account.counter.fetch(counter_pda);

      console.log(`Transaction Signature: ${tx_sign}`);
      console.log(`Count: ${account_data.count}`);
    } catch (error) {
      console.error("Initialization failed:", error);
      throw error;
    }
  });

  it("Increment", async () => {
    try {
      const tx_signature = await program.methods.increment().rpc();

      const account_data = await program.account.counter.fetch(counter_pda);

      console.log(`Transaction Signature: ${tx_signature}`);
      console.log(`Count: ${account_data.count}`);
    } catch (error) {
      console.error("Increment failed:", error);
      throw error;
    }
  });
});
