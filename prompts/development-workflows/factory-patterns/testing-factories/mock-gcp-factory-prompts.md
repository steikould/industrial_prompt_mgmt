# Prompts to Generate a Mock GCP Client Factory for Pytest

This file contains prompts to generate a factory that creates mock instances of GCP clients for use in `pytest` unit tests.

**Purpose:**
- **Reduces Boilerplate:** Instead of patching `bigquery.Client` or `storage.Client` in every single test file, this factory provides a single, reusable fixture that does it for you.
- **Standardized Mocks:** Ensures that all tests are using a consistent, pre-configured mock object.
- **Simplified Test Writing:** Test functions can simply request the mock they need (e.g., `mock_bq_client`) as an argument, and the factory fixture will provide it.

---

### Generated Code Example

This code is intended to be placed in a central `conftest.py` file so the fixtures are available to all tests.

```python
import pytest
from unittest.mock import MagicMock, patch

class MockGcpFactory:
    """Creates and patches mock GCP clients for testing."""

    @staticmethod
    def create_mock_bigquery_client() -> MagicMock:
        """Creates a mock BigQuery client."""
        mock_client = MagicMock()
        # You can pre-configure common return values here
        mock_client.query.return_value.result.return_value = []
        return mock_client

    @staticmethod
    def create_mock_storage_client() -> MagicMock:
        """Creates a mock GCS client."""
        mock_client = MagicMock()
        mock_bucket = MagicMock()
        mock_blob = MagicMock()
        mock_client.bucket.return_value = mock_bucket
        mock_bucket.blob.return_value = mock_blob
        return mock_client

    @staticmethod
    def create_mock_pubsub_publisher() -> MagicMock:
        """Creates a mock Pub/Sub publisher client."""
        mock_client = MagicMock()
        mock_client.publish.return_value.result.return_value = "mock-message-id"
        return mock_client

# --- Pytest Fixtures (in conftest.py) ---

@pytest.fixture
def mock_bq_client():
    """Pytest fixture to get a patched BigQuery client."""
    with patch('google.cloud.bigquery.Client', new=MockGcpFactory.create_mock_bigquery_client()) as mock_client:
        yield mock_client

@pytest.fixture
def mock_storage_client():
    """Pytest fixture to get a patched GCS client."""
    with patch('google.cloud.storage.Client', new=MockGcpFactory.create_mock_storage_client()) as mock_client:
        yield mock_client

@pytest.fixture
def mock_pubsub_publisher():
    """Pytest fixture to get a patched Pub/Sub publisher."""
    with patch('google.cloud.pubsub_v1.PublisherClient', new=MockGcpFactory.create_mock_pubsub_publisher()) as mock_client:
        yield mock_client

# --- Usage in a test ---
#
# def test_my_function_that_uses_bigquery(mock_bq_client):
#     # The bigquery.Client is already mocked here
#     from my_app.data import process_data
#     process_data()
#     # Assert that the mock was used correctly
#     mock_bq_client.query.assert_called_once_with("SELECT * FROM my_table")

```