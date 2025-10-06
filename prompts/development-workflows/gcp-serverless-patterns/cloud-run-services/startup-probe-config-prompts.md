# Prompts for Startup Probe Configuration on Cloud Run

This file contains prompts for configuring startup probes for Cloud Run services with long initialization times.

**What is a Startup Probe?**
- A startup probe checks if your application container has started successfully before Cloud Run begins sending it live traffic.
- This is crucial for applications that need a significant amount of time to initialize (e.g., loading a large machine learning model, warming up a cache).
- Without a startup probe, the container might time out and be killed by Cloud Run before it's ready, leading to a crash loop.

**How it Works:**
1.  You define an HTTP endpoint in your application (e.g., `/health/startup`) that should only return a `200 OK` status once the application is fully initialized.
2.  You configure the startup probe in your Cloud Run service definition (Terraform or `gcloud`) to poll this endpoint.
3.  Cloud Run will wait until the probe succeeds before marking the container as "ready" and sending it production traffic. It will also not start the liveness probe until the startup probe succeeds.

**Prompt:**
"You are deploying a Cloud Run service that loads a 500MB ML model into memory on startup, which can take up to 90 seconds.
1.  Add a `/health/startup` endpoint to your FastAPI application that returns `200 OK`.
2.  Provide the Terraform configuration for the Cloud Run service.
3.  Configure a `startup_probe` in Terraform that:
    - Points to the `/health/startup` endpoint.
    - Has a `timeout_seconds` of 2.
    - Has a `period_seconds` of 5.
    - Has a `failure_threshold` of 20 (allowing up to 100 seconds for startup).
"