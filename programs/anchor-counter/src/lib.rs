use anchor_lang::prelude::*;

declare_id!("D9686roKdpWrNCJd5SuwsHXijtXVKyRQSjvCgPbti6Dj");

#[program]
pub mod anchor_counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter = &ctx.accounts.counter;
        msg!("Counter account created! Current count: {}", counter.count);
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        msg!("previous counter: {}", counter.count);

        counter.count = counter.count.checked_add(1).unwrap();
        msg!("counter incremented! current count: {}", counter.count);

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    // The account paying to create the counter account
    #[account(mut)]
    pub user: Signer<'info>, // The signer paying for account creation

    // The counter account being created and initialized in the instruction
    #[account(
        init, // specifies we are creating this account
        payer = user, // specifies account paying for the creation of the account
        space = 8 + 8, // space allocated to the new account (8 byte discriminator + Counter total space)
        seeds = [b"counter"],
        bump
    )]
    pub counter: Account<'info, Counter>, // The new account being created (PDA - Program Derived Address)
    pub system_program: Program<'info, System>, // Required for account creation
}

// Account required by the increment instruction
#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(
        mut,
        seeds = [b"counter"],
        bump
    )]
    pub counter: Account<'info, Counter>,
}

#[account] // an account is also know as a memory region
pub struct Counter {
    pub count: u64,
}
