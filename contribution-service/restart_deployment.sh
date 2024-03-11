#!/bin/bash

# Replace '<deployment_name>' with the actual name of your deployment
kubectl rollout restart deployment/contributionservice

echo "Deployment contributionservice restarted successfully."
