# Scripts

## `check_live_parity.py`

Quick live parity check for the current job-line blocker pages across `lifa-su.github.io` and `lifa-su.com`.

Usage:

```bash
python3 scripts/check_live_parity.py
python3 scripts/check_live_parity.py --page /job-toolkit.html --marker "*::ko-fi.com/s/41d7ec67e7"
```

Use `--domain`, `--page`, and `--marker PAGE::TEXT` to rerun the same checker against other pages or extra markers later.
