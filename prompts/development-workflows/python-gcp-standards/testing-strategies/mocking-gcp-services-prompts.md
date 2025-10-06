# Prompts for Mocking GCP Services

This file contains prompts and best practices for mocking GCP services in unit tests.

**Why Mock?**
- **Speed:** Unit tests should be fast. Hitting live GCP APIs is slow.
- **Cost:** Avoids incurring costs for API calls during test runs.
- **Reliability:** Tests are not dependent on network connectivity or GCP service availability.
- **Isolation:** Allows you to test your code's logic in isolation from external services.

**Primary Tool: `unittest.mock` (via `pytest-mock`)**
- The `mocker` fixture provided by `pytest-mock` is the preferred way to patch GCP clients.

**Strategy:**
- **Patch the Client, Not the Function:** In your tests, patch the GCP client class (e.g., `google.cloud.bigquery.Client`) where it is *imported*, not where it is defined.
- **Assert Calls:** Your tests should assert that your code calls the correct methods on the mocked client with the expected arguments.
- **Set Return Values:** Configure the mock to return data to simulate a successful API response.

**Prompt:**
"You have a function that writes data to a GCS bucket. Write a `pytest` test that uses `mocker.patch` to mock the `google.cloud.storage.Client`. The test should ensure that the `bucket` and `blob` methods are called, and that `blob.upload_from_string` is called with the correct data."