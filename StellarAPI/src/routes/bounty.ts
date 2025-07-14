import { Router } from "express";
import { Keypair, TransactionBuilder, Networks } from "@stellar/stellar-sdk";

import { Client as BountyEngine } from "../index.js";

const router = Router();

const RPC_URL = process.env.RPC_URL!;
const CONTRACT_ID = process.env.CONTRACT_ID!;
const ADMIN_SECRET = process.env.ADMIN_SECRET!;
const ADMIN_ADDR = process.env.ADMIN_PUBLIC!;
const network = Networks.TESTNET;

const adminKp = Keypair.fromSecret(ADMIN_SECRET);
const adminAdr = ADMIN_ADDR;

const bounty = new BountyEngine({
  rpcUrl: RPC_URL,
  contractId: CONTRACT_ID,
  networkPassphrase: network,
});

bounty.options.publicKey = adminAdr;
bounty.options.signTransaction = async (xdr: string) => {
  const tx = TransactionBuilder.fromXDR(xdr, network);
  tx.sign(adminKp);
  return { signedTxXdr: tx.toXDR() };
};

async function exec(p: Promise<any>) {
  const tx = (await p) as any;
  const { result } = await tx.signAndSend();
  return result;
}

// POST /bounty  { id, reward, deadline }
router.post("/", async (req, res, next) => {
  try {
    const { id, reward, deadline } = req.body;

    await exec(
      bounty.create_bounty({
        admin: adminAdr,
        id: Number(id),
        reward: BigInt(reward),
        deadline: BigInt(deadline),
      })
    );

    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

// POST /bounty/:id/claim  { user }
router.post("/:id/claim", async (req, res, next) => {
  try {
    const bountyId = Number(req.params.id);
    const userAddr = req.body.user as string;

    await exec(
      bounty.claim({
        admin: adminAdr,
        id: bountyId,
        user: userAddr,
      })
    );

    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

// GET /bounty/:id
router.get("/:id", async (req, res, next) => {
  try {
    const bountyId = Number(req.params.id);
    const { result } = await bounty.get_bounty({ id: bountyId });
    res.json(result);
  } catch (e) {
    next(e);
  }
});

export default router;
