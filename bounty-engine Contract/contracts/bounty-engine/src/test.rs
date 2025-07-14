// #![cfg(test)]
// use super::*;
// use soroban_sdk::{testutils::Address, Env};

// Pending fix for testing errors

// #[test]
// fn happy_path() {
//     let env = Env::default();
//     env.mock_all_auths();

//     let contract_id = env.register(BountyEngine, {});
//     let client = BountyEngineClient::new(&env, &contract_id);

//     let admin = Address::generate(&env);
//     let token = Address::generate(&env);
//     let user = Address::generate(&env);

//     client.create_bounty(&admin, &1, &100, &(env.ledger().timestamp() + 1000));
//     client.claim(&admin, &1, &user.clone());
//     assert!(client.has_claimed(&1, &user));
// }

// #[test]
// #[should_panic] // any panic is considered success
// fn duplicate_bounty_panics() {
//     let (env, client, admin, _, _) = setup();
//     let ts = env.ledger().timestamp() + 1000;
//     client.create_bounty(&admin, 1, 100, ts);
//     // second call should panic
//     client.create_bounty(&admin, 1, 100, ts);
// }

// #[test]
// #[should_panic]
// fn duplicate_claim_panics() {
//     let (env, client, admin, _, user) = setup();
//     client.create_bounty(&admin, 2, 100, env.ledger().timestamp() + 1000);
//     client.claim(&admin, 2, user.clone());
//     client.claim(&admin, 2, user); // panics with AlreadyClaimed
// }
