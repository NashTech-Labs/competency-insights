
## Deploy gcp resources through terraform

### 1. Authenticate gcloud
```
Install gcloud cli if not installed https://cloud.google.com/sdk/docs/install 
a) export GOOGLE_APPLICATION_CREDENTIALS=key.json
b) gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS
```

### 2. Install 
  - terraform in your local
  https://askubuntu.com/questions/983351/how-to-install-terraform-in-ubuntu
  - Install gcloud kubectl
  https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl#install_kubectl
  - Install helm 
   ```snap install helm --classic```
  - Keep the service account json key (key.json) inside terraform directory and it should have the permission
   ```
Artifact Registry Administrator
Artifact Registry Reader
Artifact Registry Writer
Cloud Build Logging Service Agent
Cloud Trace Admin
Compute Admin
Container Registry Service Agent
Create Service Accounts
DNS Administrator
Firebase Admin
Kubernetes Engine Admin
Logging Admin
Monitoring Admin
Monitoring Metric Writer
Monitoring Metrics Scopes Admin
Monitoring Metrics Scopes Viewer
Project IAM Admin
Pub/Sub Admin
Secret Manager Admin
Secret Manager Secret Accessor
Security Reviewer
Service Account Admin
Service Account User
Service Usage Admin
Stackdriver Accounts Editor
Stackdriver Accounts Viewer
Storage Admin
Storage Object Admin
Storage Object Viewer
View service accounts
   ```
 - Check the [terraform.tfvars](terraform%2Fterraform.tfvars) file for the gcp project and credentials values and path.
 - Create Kubernetes Key to passing service-account 
    ``kubectl create secret generic gac-key --from-file key.json``
    Note:- This is the manual step, we will add through terraform
### 3. run -

- terraform init
- terraform plan
- terraform apply

To destroy the all gcp resources
- terraform destroy

### 4. Resources Created on Google Cloud Platform (GCP)
After a successful Terraform execution, the resources listed below are generated on Google Cloud Platform (GCP)
- Google Kubernetes Engine
  - competency-insights-gke
- Firestore
- Event based Cloud Function [competency-insights]
- Pub/Sub
  - Subscriptions
    - TBD_subscription
  - Topics
    - email-notifications

