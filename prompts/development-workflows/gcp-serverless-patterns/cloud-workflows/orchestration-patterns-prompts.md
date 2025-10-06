# Prompts for Cloud Workflows Orchestration Patterns

This file contains prompts for using Cloud Workflows to orchestrate calls to other GCP services, including Cloud Functions and Cloud Run.

**Why Cloud Workflows?**
- **Serverless Orchestration:** Define complex, multi-step processes in a simple YAML syntax.
- **Reliability:** Workflows have built-in retry logic, error handling, and state management. They can wait for long-running jobs to complete.
- **Service Integration:** Native connectors for calling any HTTP-based API, including your own Cloud Functions and Cloud Run services.
- **Clarity:** The workflow definition provides a clear, auditable source of truth for your business process.

**Common Pattern: ETL Orchestration**
1.  **Trigger:** A workflow is triggered by a GCS file upload.
2.  **Step 1: Validate:** Call a Cloud Function to validate the file format and metadata.
3.  **Step 2: Load:** If valid, call the BigQuery API to start a load job from the GCS file.
4.  **Step 3: Wait & Check:** The workflow polls the BigQuery job status until it completes.
5.  **Step 4: Transform:** If the load is successful, call a Cloud Run service to execute a dbt transformation or other SQL script.
6.  **Step 5: Notify:** On success or failure, publish a message to a Pub/Sub topic.

**Prompt:**
"Generate a Cloud Workflows YAML file that orchestrates the following process:
1.  The workflow receives a JSON payload containing a customer ID.
2.  It calls a Cloud Function (HTTP trigger) to fetch customer details.
3.  It calls a second Cloud Function to check the customer's credit score.
4.  It uses a `switch` statement to decide the next step:
    - If the credit score is > 700, call a Cloud Run service to approve a loan.
    - Otherwise, call a different Cloud Run service to deny the loan.
5.  The final result (approved/denied) should be returned by the workflow."