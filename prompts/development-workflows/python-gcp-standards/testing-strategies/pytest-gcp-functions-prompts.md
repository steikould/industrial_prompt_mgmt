# Prompts for Testing GCP Cloud Functions with Pytest

This file provides prompts for writing effective `pytest` tests for GCP Cloud Functions.

**Key Concepts:**
- **Event Functions:** For functions triggered by Pub/Sub or GCS, create mock event objects (`cloudevents.http.CloudEvent`) to pass to your function.
- **HTTP Functions:** Use a `pytest-httpserver` or `requests-mock` to test HTTP-triggered functions without needing a live server.
- **Environment Variables:** Use `pytest.monkeypatch` to set environment variables that your function relies on (e.g., `GCP_PROJECT`).
- **Focus on the logic:** Your tests should primarily validate the business logic within your function, not the GCP infrastructure itself.

**Prompt:**
"You have a Pub/Sub-triggered Cloud Function. Write a `pytest` test that creates a mock CloudEvent with a base64-encoded payload and asserts that your function correctly decodes and processes it."