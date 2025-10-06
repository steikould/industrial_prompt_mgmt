# Prompts for Eventarc Trigger Patterns

This file contains prompts for using Eventarc to trigger Gen2 Cloud Functions from a wide variety of GCP sources.

**Why Eventarc?**
- Eventarc standardizes the event format using CloudEvents.
- It allows functions to be triggered by over 90 GCP sources that emit logs, such as BigQuery job completions, IAM policy changes, or even custom events from your own applications.

**Example: BigQuery Job Completion Trigger**
- **Service:** `bigquery.googleapis.com`
- **Method:** `jobservice.jobcompleted`
- **Eventarc Filter:** You can filter events based on their data payload. For example, you could trigger a function only for BigQuery jobs that failed.

**Prompt:**
"Create a Gen2 Cloud Function that is triggered by Eventarc when a BigQuery query job completes in your project. The function should:
1. Receive the CloudEvent for the `jobservice.jobcompleted` event.
2. Check the event payload to see if the job had an error.
3. If the job failed, send a notification to a Pub/Sub topic named `bq-job-failures`."