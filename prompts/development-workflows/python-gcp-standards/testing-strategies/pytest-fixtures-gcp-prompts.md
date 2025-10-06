# Prompts for Creating Reusable Pytest Fixtures for GCP

This file contains prompts for creating `pytest` fixtures to simplify testing of GCP-related code.

**Key Fixture Ideas:**
- **`project_id` fixture:** A simple fixture that returns the test GCP project ID.
- **`mock_bigquery_client` fixture:** A fixture that uses `unittest.mock.patch` to mock the `google.cloud.bigquery.Client` and returns the mock instance. This allows you to assert that methods like `query()` or `load_table_from_uri()` were called with the correct parameters.
- **`mock_pubsub_publisher` fixture:** A fixture that mocks the `google.cloud.pubsub_v1.PublisherClient`.
- **`test_data` fixture:** A fixture that loads sample data from a file (e.g., a JSON file) and returns it as a Python object, useful for testing data transformations.

**Prompt:**
"Create a `pytest` fixture in `conftest.py` named `mock_bigquery_client`. This fixture should patch the `google.cloud.bigquery.Client` for the duration of a test and return the mock object. Use this fixture to test that the `load_data` function calls the client's `load_table_from_dataframe` method."