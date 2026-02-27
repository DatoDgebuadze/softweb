$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$hookPath = Join-Path $root ".git/hooks/pre-commit"

$hook = @'
#!/bin/sh

CHANGED_FILES=$(git diff --cached --name-only --diff-filter=ACM)

echo "$CHANGED_FILES" | grep -Eq '^(index\.html|about\.html|services\.html|projects\.html|contact\.html|js/main\.js|scripts/generate_i18n_reports\.py)$'
if [ $? -ne 0 ]; then
  exit 0
fi

echo "[i18n] Regenerating report artifacts..."
python scripts/generate_i18n_reports.py || exit 1

git add reports/i18n_report_overview.csv reports/i18n_functions_report.csv reports/i18n_key_inventory.csv reports/i18n_implementation_workflow.csv reports/i18n_report_workbook.xlsx
exit 0
'@

Set-Content -Path $hookPath -Value $hook -NoNewline

try {
  bash -lc "chmod +x .git/hooks/pre-commit" | Out-Null
} catch {
  # Git for Windows normally handles hooks without chmod, keep going.
}

Write-Output "Installed pre-commit hook: $hookPath"
