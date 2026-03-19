# Parity Script Toolbox

Short index for the parity/cleanup helper scripts added on 2026-03-19.

| Script | Question it answers | Sample command |
| --- | --- | --- |
| `scripts/check_live_parity.py` | Are the current blocker pages live and in parity across `lifa-su.github.io` and `lifa-su.com`? | `python3 scripts/check_live_parity.py --green-gate` |
| `scripts/parity_snapshot.py` | What is the current handoff snapshot: repo state plus compact live parity status? | `python3 scripts/parity_snapshot.py --strict-exit` |
| `scripts/find_route_entries.py` | Which tracked files still point into the main cleanup landing routes? | `python3 scripts/find_route_entries.py --path blog` |
| `scripts/find_direct_checkout_exits.py` | Which tracked files still contain direct Gumroad or Ko-fi checkout/shop exits? | `python3 scripts/find_direct_checkout_exits.py --path blog` |
| `scripts/rank_cleanup_targets.py` | Which files are the highest-value cleanup targets when route mentions and direct checkout exits overlap? | `python3 scripts/rank_cleanup_targets.py --path blog --top 5` |
