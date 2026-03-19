# Scripts

## `check_live_parity.py`

Quick live parity check for the current job-line blocker pages across `lifa-su.github.io` and `lifa-su.com`.

Usage:

```bash
python3 scripts/check_live_parity.py
python3 scripts/check_live_parity.py --green-gate
python3 scripts/check_live_parity.py --page /job-toolkit.html --marker "*::ko-fi.com/s/41d7ec67e7"
python3 scripts/check_live_parity.py --green-gate --resume-route-page /linkedin-audit.html
```

Use `--green-gate` for the operator preset: the three blocker pages plus one ResumeForge downstream spot-check page, with `gate`, `last-modified`, freshness, and header-signal summaries.

Use `--domain`, `--page`, and `--marker PAGE::TEXT` to rerun the same checker against other pages or extra markers later.

## `find_direct_checkout_exits.py`

Inventory tracked site-source files for direct `gumroad`, `kofi_sku`, and `kofi_shop` links during cleanup review.

Usage:

```bash
python3 scripts/find_direct_checkout_exits.py
python3 scripts/find_direct_checkout_exits.py --path blog
```

By default it scans tracked `.html`, `.js`, `.json`, and `.xml` files and prints tab-separated `kind`, `path`, `line`, and `url` rows plus a summary.
