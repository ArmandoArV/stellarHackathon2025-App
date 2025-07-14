#!/usr/bin/env bash
set -euo pipefail

FN="$1"
JSON="$2"

ARGS=$(JSON_ARGS="$JSON" node -e '
  const args = JSON.parse(process.env.JSON_ARGS);
  const out = Object.entries(args)
    .map(([k, v]) => `--${k} "${v}"`)
    .join(" ");
  console.log(out);
')

stellar contract invoke \
  --id "$CONTRACT_ID" \
  --rpc-url "$RPC_URL" \
  --network-passphrase "Test SDF Network ; September 2015" \
  --source-account "$ADMIN_SECRET" \
  --send yes \
  -- "$FN" $ARGS \

