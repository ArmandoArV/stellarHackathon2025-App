import "dotenv/config";
import express from "express";
import cors from "cors";

import bountyRoutes from "./routes/bounty.js";
import bountyCliRoutes from "./routes/bountyCli.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/bounty", bountyRoutes);
app.use("/cli/bounty", bountyCliRoutes);

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`API running on :${port}`));
