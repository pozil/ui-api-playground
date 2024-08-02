#!/bin/bash

# Set parameters
ORG_ALIAS="ui-api"

echo ""
echo "Installing UI API Playground org:"
echo "- Org alias:      $ORG_ALIAS"
echo ""

# Install script
echo "Cleaning previous scratch org..."
sf org delete scratch -p -o $ORG_ALIAS &> /dev/null
echo ""

echo "Creating scratch org..." && \
sf org create scratch -f config/project-scratch-def.json -a $ORG_ALIAS -d -y 30 && \
echo "" && \

echo "Pushing source..." && \
sf project deploy start && \
echo "" && \

echo "Assigning permissions..." && \
sf org assign permset -n UI_API_Playground && \
echo ""

EXIT_CODE="$?"

# Check exit code
echo ""
if [ "$EXIT_CODE" -eq 0 ]; then
  echo "Installation completed."
  echo ""
  sf org open -p lightning/n/UI_API_Playground
else
    echo "Installation failed."
fi

exit $EXIT_CODE
