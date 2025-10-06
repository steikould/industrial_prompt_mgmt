# Prompts for Background Workers on Cloud Run

This file contains prompts for creating background worker services using Cloud Run.

**Use Cases:**
- Processing tasks from a Pub/Sub subscription.
- Running batch jobs.
- Performing long-running computations without holding an HTTP request open.

**Pattern: Pub/Sub Push Subscription**
- This is the most common and recommended pattern.
1.  **Create a Pub/Sub Topic:** This is where tasks are sent.
2.  **Create a Cloud Run Service:** This service exposes an HTTP endpoint (e.g., `/process`). It does *not* need to be publicly accessible.
3.  **Create a Pub/Sub Push Subscription:** Configure the subscription to push messages to the Cloud Run service's `/process` endpoint.
4.  **Use IAM for Security:** Create a dedicated service account for the Pub/Sub subscription and grant it the "Cloud Run Invoker" role on your service. This ensures that only Pub/Sub can call your endpoint.

**Prompt:**
"You need to process uploaded videos in the background. Create the architecture for a background worker using Cloud Run and Pub/Sub.
1.  Generate a `main.py` for a FastAPI service with a `/process` endpoint that receives a Pub/Sub push message.
2.  The endpoint should parse the message, which contains a GCS file path.
3.  Provide the Terraform configuration to deploy the Cloud Run service and a Pub/Sub push subscription that targets it securely."