# Prompts for Error Handling and Dead-Letter Queues (DLQ)

This file contains prompts for implementing robust error handling in event-driven Cloud Functions, including the use of a Dead-Letter Queue (DLQ).

**Key Concepts:**
- **Retries:** Event-driven functions can be configured to automatically retry on failure. This is useful for transient errors.
- **Dead-Letter Queue (DLQ):** If a message consistently fails processing even after retries, you don't want it to block new messages. A DLQ is a Pub/Sub topic where these "poison pill" messages are sent for later inspection.
- **Configuration:** The retry policy and DLQ are configured during deployment (e.g., via the `gcloud` command or Terraform).

**Prompt:**
"You have a Pub/Sub-triggered function that processes user sign-up events. Occasionally, a malformed event causes the function to crash.
1. Configure the function to retry up to 3 times on failure.
2. Create a new Pub/Sub topic to serve as a Dead-Letter Queue.
3. Configure the function's Eventarc trigger to send failed messages to this DLQ after all retry attempts are exhausted.
4. Provide the Terraform configuration to deploy this setup."