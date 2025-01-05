What is PDA in solana?

A PDA (Program Derived Address) in Solana is a special type of account address that is derived from a program ID and optional seeds. Here are the key points about PDAs:

Key Characteristics:

1. Derivation:

- PDAs are derived using the create_program_address function
- They're created using a program ID and optional seeds (like strings or numbers)
- They must not lie on the ed25519 curve (if they do, you need to add a bump seed)

2. Main Uses:

- Store program data in deterministic addresses
- Allow programs to sign for addresses they own
- Create accounts without needing a private key

3. Example Usage:

```rust
// Deriving a PDA
let (pda, bump_seed) = Pubkey::find_program_address(
    &[b"seed1", b"seed2"],
    program_id
);
```

4. Benefits:

- Deterministic addresses (same inputs always yield same PDA)
- No private key needed
- Program authority over accounts
- Cost-effective (no signature verification needed)

5. Common Applications:

- Token mints
- NFT metadata
- Program configurations
- User data storage

Important Notes:

- Only the program that derived a PDA can sign for it
- PDAs can't sign normal transactions (they're not valid ed25519 keypairs)
- They're commonly used for cross-program invocations (CPIs)
