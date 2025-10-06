# Prompts for Cloud Scheduler Cron Job Patterns

This file provides prompts for setting up cron jobs using Cloud Scheduler to trigger services at regular intervals.

**Common Targets:**
- **HTTP Endpoint:** Triggering a Cloud Run service or an HTTP-triggered Cloud Function. This is a very common pattern for tasks like generating nightly reports.
- **Pub/Sub Topic:** Publishing a message to a Pub/Sub topic on a schedule. This is useful for kicking off a pipeline of multiple services. For example, a daily "start-of-day" message could trigger several independent worker services.

**Key Concepts:**
- **Cron Syntax:** Cloud Scheduler uses the standard unix-cron syntax to define the schedule (e.g., `0 2 * * *` for 2 AM every day).
- **Timezone:** You can specify a timezone for your job, which is critical for jobs that need to run at a specific local time.
- **Authentication:** When targeting a secure HTTP endpoint (like a private Cloud Run service), you must configure Cloud Scheduler to send an authenticated request. This is typically done by associating a service account with the scheduler job that has the "Cloud Run Invoker" role.

**Prompt:**
"You need to generate a sales report every weekday at 9 AM Pacific Time.
1.  Create a Cloud Run service that has an endpoint `/generate-report`.
2.  Provide the Terraform configuration for a Cloud Scheduler job that:
    - Triggers on the specified schedule and timezone.
    - Sends an HTTP POST request to the Cloud Run service's `/generate-report` endpoint.
    - Is authenticated using a dedicated service account that has permission to invoke the service."