#!/bin/bash

PROJECT_ID="$(gcloud config get-value project)"
REGION="$1"
GKE_CLUSTER="competency-insights-gke"
# install gke-gcloud-auth-plugin to install kubectl and authenticate gke.
gcloud --quiet components install gke-gcloud-auth-plugin

build_and_deploy_service(){
# NON GCP deployment
   SERVICE_NAME=$1
   CLUSTER_NAME=$2
   DEPLOYMENT_NAME=$3
   echo "---------build and deploy $SERVICE_NAME-----------"
   cd "$SERVICE_NAME" || exit
   if [  $SERVICE_NAME != "competency-insights-ui" ]; then
       mvn clean install -s $GITHUB_WORKSPACE/settings.xml -X
   fi
    echo "-------------$SERVICE_NAME deployed----------"
}

build_and_deploy_service1(){

   SERVICE_NAME=$1
   CLUSTER_NAME=$2
   DEPLOYMENT_NAME=$3
   echo "---------build and deploy $SERVICE_NAME-----------"
   cd "$SERVICE_NAME" || exit
   if [  $SERVICE_NAME != "competency-insights-ui" ]; then
       mvn clean install -s $GITHUB_WORKSPACE/settings.xml -X
   fi
   echo "---------packaging done, start docker build-----------"
   docker build -f Dockerfile --tag gcr.io/"$PROJECT_ID"/"$SERVICE_NAME":"$GITHUB_SHA" .
   echo  "--------docker build done, docker push---------------"
   docker push gcr.io/"$PROJECT_ID"/"$SERVICE_NAME":"$GITHUB_SHA"
   echo  "--------pushed docker image, deploy to gke cluster--------------------------"

    gcloud container clusters get-credentials "$CLUSTER_NAME" --region "$REGION"
    # setup kustomize
    curl -sfLo kustomize https://github.com/kubernetes-sigs/kustomize/releases/download/v3.1.0/kustomize_3.1.0_linux_amd64
    chmod u+x ./kustomize

    # set docker image for kustomize
   ./kustomize edit set image gcr.io/PROJECT_ID/IMAGE:TAG=gcr.io/"$PROJECT_ID"/"$SERVICE_NAME":"$GITHUB_SHA"
   # deploy through kubectl
   ./kustomize build . | kubectl apply -f -
    kubectl rollout status deployment/"$DEPLOYMENT_NAME"
    kubectl get services -o wide
    echo "-------------$SERVICE_NAME deployed on $CLUSTER_NAME----------"
}


for project in $(cat projects-changes-deploy.txt)
do
   :
  case $project in
  # case 1 build and deploy okr-insights
  "contribution-service")
    build_and_deploy_service okr-insights $GKE_CLUSTER contributionservice
    cd ..;;

  # case 1 build and deploy report-service
  "report-service")
    build_and_deploy_service okr-insights $GKE_CLUSTER resortservice
    cd ..;;

  # case 1 build and deploy master-service
  "master-service")
    build_and_deploy_service okr-insights $GKE_CLUSTER masterservice
    cd ..;;

  # case 2 build and deploy competency-insights-ui
  "competency-insights-ui")
    build_and_deploy_service competency-insights-ui $GKE_CLUSTER competencyinsightsui
    cd ..;;

  esac

done
