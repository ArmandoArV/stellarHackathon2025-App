import { Router } from "express";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
const exec = promisify(execFile);

const script = path.join(process.cwd(), "invoke.sh");
const router = Router();

async function invoke(fn: string, args: Record<string, any>) {
  try {
    const { stdout, stderr } = await exec(script, [fn, JSON.stringify(args)]);
    console.log("invoke stdout:", stdout);
    console.log("invoke stderr:", stderr);
    return JSON.parse(stdout);
  } catch (e: any) {
    if (e.stdout) {
      try {
        const parsed = JSON.parse(e.stdout);
        throw new Error(`Contract Error: ${JSON.stringify(parsed)}`);
      } catch {

        console.error("Failed parsing stdout:", e.stdout);
      }
    }
    throw e;
  }
}

router.post("/", async (req, res, next) => {
  try {
    const { id, reward, deadline } = req.body;
    await invoke("create_bounty", {
      admin: process.env.ADMIN_PUBLIC,
      id: Number(id),
      reward,
      deadline,
    });
    res.json({ ok: true });
  } catch (e: any) {
    if (e.message.includes("Error(Contract, #2)")) {
      res.status(409).json({ error: "Bounty with this ID already exists" });
    } else {
      next(e);
    }
  }
});

router.post("/:id/claim", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req.body;
    await invoke("claim", {
      admin: process.env.ADMIN_PUBLIC,
      id: Number(id),
      user,
    });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await invoke("get_bounty", { id: Number(id) });
    res.json(data);
  } catch (e) {
    next(e);
  }
});

export default router;
