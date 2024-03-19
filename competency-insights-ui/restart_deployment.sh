#!/bin/bash

# Replace '<deployment_name>' with the actual name of your deployment
kubectl rollout restart deployment/competency-insights-ui

echo "Deployment competency-insights-ui restarted successfully."
