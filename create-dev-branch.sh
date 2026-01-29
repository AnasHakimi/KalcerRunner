#!/bin/bash

# Script to create the development branch for KalcerRunner
# This script should be run once to set up the development branch

echo "Creating development branch from master..."

# Fetch the latest from master
git fetch origin master

# Create development branch from master
git checkout -b development origin/master

# Push the development branch to remote
git push -u origin development

echo "Development branch created successfully!"
echo "You can now switch to the development branch with: git checkout development"
