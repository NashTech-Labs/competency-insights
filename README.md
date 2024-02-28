# Competency Insights
Developing a user-friendly Nashar-Insights platform capable of gathering social insights from platforms such as LinkedIn, as well as internal activities like blogs, Knolex, and certifications.

Key technical benefits
--
- Scalability is ensured through GCP Kubernetes, supporting varying workloads.
- Flexibility in data handling is achieved using MongoDB and Snowflake.
- Real-time data ingestion is facilitated by Snowpipe streaming in Snowflake.
- Efficient data retrieval, processing, and storage with Snowflake contribute to improved performance.
- Modern user interface experiences are provided through NextJs.

System functionality
--
Competency Insights system provides the following functionality:

- **Report Service-** Retrieves data from the Snowflake GOLD table and presents it on the user interface (UI). This service is responsible for fetching information from a designated Snowflake table and displaying it in a user-friendly manner.


- **Contribute Service-**  Receives user input regarding competency contributions. It stores this information in both MongoDB and the Snowflake RAW table. This service handles the interaction where users provide input related to competency contributions, and it ensures that the data is stored in the appropriate databases.


- **Master Service-**  Processes an Excel file containing Nasher information, such as names and relationship manager details, from the UI. It then saves this data to the Snowflake RAW table. This service manages the import of Nasher-related data from an Excel file, handling the extraction and storage process in the designated Snowflake table.

Architecture
--
![insights-arch.png](documentation%2Finsights-arch.png)

Get the source code:
-------------------
Clone the repository:

	 $ git clone https://github.com/NashTech-Labs/competency-insights.git

Getting Started for Local
--
Let's execute the application using the default local settings, which include a separate .env file for each service, and configurations. In the root of the competency-insights, there is a *local-dev/docker-compose.yml* file that enables us to launch necessary resource such as MongoDb and competency-insights service `[repost-service,contribution-service, master-service]`. The following steps outline the setup and launch process for the applications.

**1) Run docker-compose**
```
Resource Launches
$ docker-compose up -d

Resource Down
$ docker-compose down
```

CP Infrastructure and Deployment
-- 
### GCP Infrastructure by using Terraform
To deploy the GCP infrastructure required, follow the steps in deployment readme:
[readme.md](deployment%2Fgcpresources%2Freadme.md) deployment/gcpresources/readme.md

### Deploy Services via Github Action
- Add required secrets in https://github.com/NashTech-Labs/competency-insights/settings/secrets/actions
- GKE_KEY : the service account json key having these permission:
  ```
    Cloud Datastore Owner
    Cloud Functions Admin
    Compute Admin
    Container Registry Service Agent
    Create Service Accounts
    Firestore Service Agent
    Kubernetes Engine Admin
    Project IAM Admin
    Pub/Sub Admin
    Secret Manager Admin
    Secret Manager Secret Accessor
    Security Reviewer
    Service Account Admin
    Service Account User
    Service Usage Admin
    Storage Admin
    Storage Object Admin
   ```
- GKE_PROJECT: Project name
  github workflow for CI/CD can be found here:
 [work-flow.yml](.github%2Fworkflows%2Fwork-flow.yml)

- Keep the service name in [projects-changes-deploy.txt](projects-changes-deploy.txt) which you want to deploy.

When a commit push to main branch it will start the deployment of the services/project mentioned in
file *projects-changes-deploy.txt*.
deployments steps for each project are mentioned in [apps-deployment-script.sh](apps-deployment-script.sh)

####  Obtain a GCP Service Account json key
The process to obtain a JSON key for a Google Cloud Platform (GCP) service account involves the following steps:
```arm
1. Open the Google Cloud Console: Navigate to the Google Cloud Console at https://console.cloud.google.com/.

2. Access the IAM & Admin Section: In the console, locate and click on the "IAM & Admin" section.

3. Choose the Project: Select the project for which you want to create a service account or ensure that you are working within the correct project.

4. Navigate to Service Accounts: In the IAM & Admin section, find and click on "Service accounts" to view the existing service accounts for the selected project.

5. Create a New Service Account: Click on the "Create Service Account" button to initiate the process of creating a new service account.

6. Provide Details: Enter a name for your service account, add a description (optional), and choose the appropriate role(s) for the service account based on your project's needs.

7. Generate a Key: After creating the service account, click on the "Create Key" button. Choose the key type as JSON, and a JSON key file will be generated and downloaded to your device.
```
Keep the JSON Key Secure: Ensure that you securely store the downloaded JSON key file, as it contains sensitive information and grants access to your GCP resources.

#### CI/CD Pipeline for GCP
The [ReadMe.md](GCP_Ci-Cd_Pipeline_README.md) file contains the steps for deploying the system.


#### Check Deployment of Kubernetes on GCP
To verify the deployment of Kubernetes on Google Cloud Platform (GCP), follow these steps:
```arm
1. Access GCP Console:
   Log in to the Google Cloud Console at https://console.cloud.google.com/.

2. Navigate to Kubernetes Engine:
   In the console, go to the "Kubernetes Engine" section.

3. Select Cluster:
   Choose the Kubernetes cluster you want to check.

4. Review Cluster Details:
   Examine the cluster details, including the status, version, and other relevant information.

5. Verify Nodes:
   Confirm that the nodes in your cluster are in the "RUNNING" state.

6. Check Workloads:
   Examine the workloads running on the cluster to ensure that your applications and services are deployed as expected.

7. Inspect Pods:
   Review the status of individual pods within the cluster to ensure they are running without errors.

8. Examine Services:
   Confirm that the Kubernetes services associated with your applications are accessible and running correctly.

9. Monitor Events:
   Check the cluster events for any warnings or errors that might indicate deployment issues.

10. Test Connectivity:
    Verify that you can connect to your deployed applications and services from external sources if applicable.

11. Check External Access:
    If your applications are supposed to be externally accessible, confirm that external access is properly configured.

12. Review Logs:
    Examine logs for applications and services to identify any issues or error messages.
```

How to merge a feature
--
- Create a branch from main branch and name it based on the feature to be implemented
- Implement feature in new feature branch
- Raise a PR against the main branch
- Get it approved from Approver and merge the feature branch to master
