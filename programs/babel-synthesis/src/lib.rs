use anchor_lang::prelude::*;

declare_id!("BabeL11111111111111111111111111111111111111");

#[program]
pub mod babel_synthesis {
    use super::*;

    /// Initializes the registry or a new language primitive.
    pub fn register_primitive(
        ctx: Context<RegisterPrimitive>,
        short_id: u8,
        instruction_template: String,
        metadata: String,
    ) -> Result<()> {
        let primitive = &mut ctx.accounts.primitive;
        primitive.short_id = short_id;
        primitive.template = instruction_template;
        primitive.metadata = metadata;
        primitive.usage_count = 0;
        primitive.last_updated = Clock::get()?.unix_timestamp;
        primitive.proposer = ctx.accounts.proposer.key();
        
        msg!("Babel: Registered primitive {} -> {}", short_id, primitive.template);
        Ok(())
    }

    /// Increments usage metrics to drive evolution/decay logic.
    pub fn track_usage(ctx: Context<TrackUsage>) -> Result<()> {
        let primitive = &mut ctx.accounts.primitive;
        primitive.usage_count = primitive.usage_count.checked_add(1).unwrap();
        primitive.last_updated = Clock::get()?.unix_timestamp;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(short_id: u8)]
pub struct RegisterPrimitive<'info> {
    #[account(
        init,
        payer = proposer,
        space = 8 + 1 + 200 + 100 + 8 + 8 + 32, // Discriminator + u8 + template + meta + usage + timestamp + pubkey
        seeds = [b"primitive", &[short_id]],
        bump
    )]
    pub primitive: Account<'info, LanguagePrimitive>,
    #[account(mut)]
    pub proposer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct TrackUsage<'info> {
    #[account(mut)]
    pub primitive: Account<'info, LanguagePrimitive>,
}

#[account]
pub struct LanguagePrimitive {
    pub short_id: u8,
    pub template: String,    // The instruction pattern (e.g. "JUP_SWAP:{A}->{B}")
    pub metadata: String,    // Optional context or agent-authored rationale
    pub usage_count: u64,
    pub last_updated: i64,
    pub proposer: Pubkey,
}
