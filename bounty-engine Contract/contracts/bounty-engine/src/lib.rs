#![no_std]
use soroban_sdk::{
    contract, contracterror, contractimpl, contracttype, panic_with_error, symbol_short, Address,
    Env, IntoVal, Symbol,
};

//--------------------------------------------------
// Persistent keys
//--------------------------------------------------
#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Config,
    Bounty(u32),           // id → BountyData
    Claimed(u32, Address), // (bountyId, user) → ()
}

//--------------------------------------------------
// Stored structs
//--------------------------------------------------
#[derive(Clone)]
#[contracttype]
pub struct ConfigData {
    pub admin: Address, // admin address
    pub token: Address, // default token contract address
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct BountyData {
    pub reward: i128,
    pub deadline: u64,
}

//--------------------------------------------------
// Errors
//--------------------------------------------------
#[contracterror]
#[derive(Clone, Debug)]
#[repr(u32)]
pub enum Error {
    AlreadyInitialised = 1,
    BountyExists = 2,
    BountyNotFound = 3,
    DeadlinePassed = 4,
    AlreadyClaimed = 5,
    NotAuthorised = 6,
}

//--------------------------------------------------
// Event symbols
//--------------------------------------------------
const EVT_BC: Symbol = symbol_short!("BC"); // bounty created
const EVT_CL: Symbol = symbol_short!("CL"); // claimed

//--------------------------------------------------
// Contract
//--------------------------------------------------
#[contract]
pub struct BountyEngine;

#[contractimpl]
impl BountyEngine {
    pub fn init(env: Env, admin: Address, token: Address) {
        if env.storage().instance().has(&DataKey::Config) {
            panic_with_error!(&env, Error::AlreadyInitialised);
        }
        admin.require_auth();
        env.storage()
            .instance()
            .set(&DataKey::Config, &ConfigData { admin, token });
    }

    fn cfg(env: &Env) -> ConfigData {
        env.storage()
            .instance()
            .get::<DataKey, ConfigData>(&DataKey::Config)
            .unwrap()
    }

    //----------------------------------------------
    // create_bounty(admin, id, reward, deadline)
    //----------------------------------------------
    pub fn create_bounty(env: Env, admin: Address, id: u32, reward: i128, deadline: u64) {
        admin.require_auth();
        let cfg = Self::cfg(&env);
        if admin != cfg.admin {
            panic_with_error!(&env, Error::NotAuthorised);
        }
        if env.storage().instance().has(&DataKey::Bounty(id)) {
            panic_with_error!(&env, Error::BountyExists);
        }
        if deadline <= env.ledger().timestamp() {
            panic_with_error!(&env, Error::DeadlinePassed);
        }
        let data = BountyData { reward, deadline };
        env.storage().instance().set(&DataKey::Bounty(id), &data);
        env.events().publish((EVT_BC, id.clone()), data.clone());
    }

    //----------------------------------------------
    // claim(admin, id, user)
    //----------------------------------------------
    pub fn claim(env: Env, admin: Address, id: u32, user: Address) {
        admin.require_auth();
        let cfg = Self::cfg(&env);
        if admin != cfg.admin {
            panic_with_error!(&env, Error::NotAuthorised);
        }
        let bounty: BountyData = env
            .storage()
            .instance()
            .get(&DataKey::Bounty(id))
            .unwrap_or_else(|| panic_with_error!(&env, Error::BountyNotFound));
        if env.ledger().timestamp() > bounty.deadline {
            panic_with_error!(&env, Error::DeadlinePassed);
        }
        if env
            .storage()
            .instance()
            .has(&DataKey::Claimed(id, user.clone()))
        {
            panic_with_error!(&env, Error::AlreadyClaimed);
        }

        // Reward the user calling the default token contract
        let args = (admin.clone(), user.clone(), bounty.reward).into_val(&env);
        let _: () = env.invoke_contract(&cfg.token, &symbol_short!("transfer"), args);

        // Mark as claimed
        env.storage()
            .instance()
            .set(&DataKey::Claimed(id, user.clone()), &());
        env.events()
            .publish((EVT_CL, id.clone(), user.clone()), &bounty.reward);
    }

    pub fn get_bounty(env: Env, id: u32) -> Option<BountyData> {
        env.storage().instance().get(&DataKey::Bounty(id))
    }

    pub fn has_claimed(env: Env, id: u32, user: Address) -> bool {
        env.storage().instance().has(&DataKey::Claimed(id, user))
    }
}

mod test;
