#!/bin/bash

# The purpose of this script is to create a document with a specified title and content.

# How to use:
# 1. Run the script with the issue number and title as arguments.
#    Example: ./create_document.sh 123 "Sample Issue Title"
# 2. The script will create a Markdown document in `documentation/` with the following structure:
#    - Issue Type
#    - Issue Title
#    - Objective
#    - Description
#    - Learnings
#    - What's next
#    - Miscellaneous Notes

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <issue_number> <issue_title>"
  exit 1
fi

ISSUE_NUMBER="$1"
ISSUE_TITLE="$2"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOCS_DIR="$SCRIPT_DIR/../documentation"
mkdir -p "$DOCS_DIR"

FILENAME="ISSUE-${ISSUE_NUMBER}-${ISSUE_TITLE}.md"
DOCUMENT_PATH="${DOCS_DIR}/${FILENAME}"

echo -n "Enter the issue type (e.g., Enhancement, Bug, Documentation): "
read ISSUE_TYPE

{
  echo "# ISSUE-${ISSUE_NUMBER}-${ISSUE_TITLE}"
  echo
  echo "**Issue Type:** ${ISSUE_TYPE}"
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

echo "Document '${DOCUMENT_PATH}' created successfully."

#! Credit to Jackson-Wu for the original script idea.