#!/usr/bin/env bash
set -euo pipefail

# Auto-creates a documentation file using the current git branch:
#   <ISSUE_NUMBER>-<branch-name>
# Example: 2-initialize-supabase-project  -> ISSUE 2, title "initialize supabase project"

# --- Resolve branch and parse issue number + title ---
if ! command -v git >/dev/null 2>&1; then
  echo "Error: git is required." >&2
  exit 1
fi

BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || true)"
if [[ -z "${BRANCH}" || "${BRANCH}" == "HEAD" ]]; then
  echo "Error: could not determine current branch." >&2
  exit 1
fi

# Expect "<number>-<slug...>"
if [[ ! "${BRANCH}" =~ ^([0-9]+)-(.*)$ ]]; then
  echo "Error: branch '${BRANCH}' does not match required pattern '<ISSUE_NUMBER>-<branch-name>'." >&2
  exit 1
fi

ISSUE_NUMBER="${BASH_REMATCH[1]}"
SLUG="${BASH_REMATCH[2]}"

# Use slug as the title to keep dashes (matches filename style)
ISSUE_TITLE="${SLUG}"
# For filenames, ensure dashes (no spaces)
SAFE_TITLE="$(echo "${ISSUE_TITLE}" | tr ' ' '-')"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOCS_DIR="$SCRIPT_DIR/../documentation"
mkdir -p "$DOCS_DIR"

FILENAME="ISSUE-${ISSUE_NUMBER}-${SAFE_TITLE}.md"
DOCUMENT_PATH="${DOCS_DIR}/${FILENAME}"

# Avoid overwriting existing files by appending an incrementing suffix
BASENAME="ISSUE-${ISSUE_NUMBER}-${SAFE_TITLE}"
EXT=".md"
if [[ -e "$DOCUMENT_PATH" ]]; then
  n=2
  while [[ -e "${DOCS_DIR}/${BASENAME}-${n}${EXT}" ]]; do
    n=$((n+1))
  done
  DOCUMENT_PATH="${DOCS_DIR}/${BASENAME}-${n}${EXT}"
fi

# ----- Issue type selection (numbered with validation, supports custom tags) -----
# Initialize variables for strict mode (-u) safety
CHOICE=""
LABEL=""
CUSTOM_TAG=""

# Unsorted labels; will sort alphabetically for menu display
LABELS_UNSORTED=(
  "Feature"
  "Enhancement"
  "Bugfix"
  "Documentation"
  "Research"
  "Refactor"
  "Test"
  "Chore / Maintenance"
  "Performance"
  "Security"
  "Design / UI-UX"
  "DevOps / CI-CD"
)
# Sort labels alphabetically (portable for bash 3.x on macOS)
IFS=$'\n' read -r -d '' -a LABELS < <(printf "%s\n" "${LABELS_UNSORTED[@]}" | sort && printf '\0')
unset IFS
LABEL_COUNT=${#LABELS[@]}

SELECTED_TYPES=()

contains() {
  local needle="$1"; shift
  local item
  for item in "$@"; do
    [[ "$item" == "$needle" ]] && return 0
  done
  return 1
}

echo "Choose issue type(s) by number. Press ENTER when finished."
for ((i=1; i<=LABEL_COUNT; i++)); do
  echo "  $i) ${LABELS[$((i-1))]}"
done
echo "  0) Custom tag"

while true; do
  read -r -p "Select number (1-${LABEL_COUNT}), 0 for custom, or ENTER to finish: " CHOICE
  if [[ -z "${CHOICE:-}" ]]; then
    break
  fi

  if [[ "$CHOICE" == "0" ]]; then
    read -r -p "Enter custom tag: " CUSTOM_TAG
    CUSTOM_TAG="${CUSTOM_TAG#"${CUSTOM_TAG%%[![:space:]]*}"}"
    CUSTOM_TAG="${CUSTOM_TAG%"${CUSTOM_TAG##*[![:space:]]}"}"
    if [[ -z "$CUSTOM_TAG" ]]; then
      echo "Custom tag cannot be empty."; continue
    fi
    if contains "$CUSTOM_TAG" ${SELECTED_TYPES[@]+"${SELECTED_TYPES[@]}"}; then
      echo "You already chose '$CUSTOM_TAG'."; continue
    fi
    SELECTED_TYPES+=("$CUSTOM_TAG")
    echo "Added custom tag: $CUSTOM_TAG"
    continue
  fi

  if [[ "$CHOICE" =~ ^[0-9]+$ ]] && (( CHOICE >= 1 && CHOICE <= LABEL_COUNT )); then
    LABEL="${LABELS[$((CHOICE-1))]}"
    if contains "$LABEL" ${SELECTED_TYPES[@]+"${SELECTED_TYPES[@]}"}; then
      echo "You already chose '$LABEL'."; continue
    fi
    SELECTED_TYPES+=("$LABEL")
    echo "Added: $LABEL"
  else
    echo "Invalid choice. Pick 1-${LABEL_COUNT}, 0 for custom, or ENTER to finish."
  fi
done

if [[ ${#SELECTED_TYPES[@]} -eq 0 ]]; then
  echo "No issue types selected. Please run again and choose at least one."
  exit 1
fi

# Sort selected types in ascending (A → Z) alphabetical order,
# then move "Performance" to the end if it exists (per UX preference).
if (( ${#SELECTED_TYPES[@]} )); then
  IFS=$'\n' read -r -d '' -a SORTED_TYPES < <(printf "%s\n" "${SELECTED_TYPES[@]}" | sort && printf '\0')
  unset IFS
  # Move "Performance" to end if present
  TMP_TYPES=()
  PERF_PRESENT=0
  for t in "${SORTED_TYPES[@]}"; do
    if [[ "$t" == "Performance" ]]; then
      PERF_PRESENT=1
    else
      TMP_TYPES+=("$t")
    fi
  done
  if (( PERF_PRESENT )); then
    TMP_TYPES+=("Performance")
  fi
  SORTED_TYPES=("${TMP_TYPES[@]}")
  unset TMP_TYPES PERF_PRESENT
else
  SORTED_TYPES=()
fi

# Join selections with comma+space after sorting
ISSUE_TYPES_JOINED="$(printf "%s, " "${SORTED_TYPES[@]}")"
ISSUE_TYPES_JOINED="${ISSUE_TYPES_JOINED%, }"
# ----- end selection block -----

{
  echo "# ISSUE-${ISSUE_NUMBER}-${ISSUE_TITLE}"
  echo
  echo "**Issue Type(s):** ${ISSUE_TYPES_JOINED}"
  echo
  echo "## Objective:"
  echo "<!--What are the criteria for completion?-->"
  echo
  echo "## Description:"
  echo "<!--What is on this branch-->"
  echo
  echo "## Learnings:"
  echo "<!--What new knowledge was gained while working on this objective?-->"
  echo
  echo "## What's next:"
  echo "<!--After the completion of this objective, where should the focus be next?-->"
  echo
  echo "## Miscellaneous Notes:"
  echo "<!--Any other notes or observations?-->"
  echo
} > "$DOCUMENT_PATH"

echo "Document '${DOCUMENT_PATH}' created successfully (from branch '${BRANCH}', issue types listed alphabetically)."