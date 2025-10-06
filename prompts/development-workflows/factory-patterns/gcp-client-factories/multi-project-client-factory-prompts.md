# Prompts to Generate a Multi-Project GCP Client Factory

This file contains prompts for a factory that can create and manage GCP clients for **multiple target projects** from a single application instance.

**Purpose:**
- **Centralized Management:** Manages a dictionary of client instances, where each key is a GCP Project ID.
- **Cross-Project Operations:** Essential for central management services, data pipelines that read from a source project and write to a destination project, or any application that needs to interact with resources across project boundaries.
- **Extensibility:** Can be adapted to manage any type of GCP client (BigQuery, Storage, Pub/Sub, etc.).

---

### Generated Code Example

This example shows a factory that can create BigQuery clients for different projects. It leverages the previously defined `BigQueryClientFactory`.

```python
from google.cloud import bigquery
from typing import Type, Dict

# Assume BigQueryClientFactory is defined in another file
# from .bigquery_client_factory import BigQueryClientFactory

class MultiProjectClientFactory:
    """A factory to manage clients for multiple GCP projects."""

    def __init__(self, client_factory: Type):
        """
        Initializes the factory with a specific client factory class.

        Args:
            client_factory: The class of the factory to use for creating clients
                            (e.g., BigQueryClientFactory, StorageClientFactory).
        """
        self._client_factory = client_factory
        self._clients: Dict[str, any] = {}

    def get_client(self, project_id: str) -> any:
        """
        Gets a client for a specific project, creating it if it doesn't exist.

        Args:
            project_id: The GCP project ID for which to get a client.

        Returns:
            A client instance for the requested project.
        """
        if project_id not in self._clients:
            # Uses the underlying factory to create the client for the specific project
            self._clients[project_id] = self._client_factory.create_client(project_id=project_id)

        return self._clients[project_id]

# --- Usage Example ---
#
# multi_bq_factory = MultiProjectClientFactory(BigQueryClientFactory)
#
# source_client = multi_bq_factory.get_client("gcp-project-source")
# destination_client = multi_bq_factory.get_client("gcp-project-destination")
#
# print(f"Source Project: {source_client.project}")
# print(f"Destination Project: {destination_client.project}")

```