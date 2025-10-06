# Prompts for Cloud Scheduler Retry Configuration

This file provides prompts for configuring the retry policy for a Cloud Scheduler job.

**Why Configure Retries?**
- If the target service (e.g., a Cloud Run instance) is temporarily unavailable or returns a transient error, you want the scheduler to automatically try again.
- This improves the reliability of your scheduled tasks without requiring manual intervention.

**Key Parameters:**
- **`max_retry_attempts`:** The maximum number of times the job will be retried after a failure.
- **`max_retry_duration`:** The maximum amount of time to continue retrying. The job will stop retrying once either `max_retry_attempts` or `max_retry_duration` is reached.
- **`min_backoff_duration`:** The minimum time to wait after a failure before the first retry.
- **`max_backoff_duration`:** The maximum time to wait between retries. Cloud Scheduler uses exponential backoff between the min and max values.

**Prompt:**
"You have a Cloud Scheduler job that calls a critical billing API. This API sometimes has brief outages lasting a few minutes.
1.  Provide the Terraform configuration for the Cloud Scheduler job.
2.  Configure the `retry_config` block with the following policy:
    - Retry up to 5 times.
    - Use a minimum backoff of 10 seconds.
    - Use a maximum backoff of 120 seconds.
    - Allow retries to continue for up to 1 hour if necessary."