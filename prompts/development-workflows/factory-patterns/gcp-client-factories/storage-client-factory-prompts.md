# Prompts to Generate a GCS Client Factory

This file contains prompts to generate a factory pattern for creating and managing `google.cloud.storage.Client` instances.

**Purpose:**
- **Singleton Pattern:** Ensures that only one Storage client instance is created per GCP project, which is generally efficient.
- **Centralized Configuration:** Provides a single place to configure the client.
- **Simplified Usage:** Makes it easy for application code to get a properly configured client.

---

### Generated Code Example

```python
from google.cloud import storage
from typing import Optional
import os

class StorageClientFactory:
    """Factory for creating and reusing Google Cloud Storage clients."""

    _instances: dict[str, storage.Client] = {}

    @classmethod
    def create_client(
        cls,
        project_id: Optional[str] = None
    ) -> storage.Client:
        """Create or reuse a Storage client (singleton per project)."""
        project_id = project_id or os.getenv("GCP_PROJECT")

        if project_id not in cls._instances:
            cls._instances[project_id] = storage.Client(project=project_id)
        return cls._instances[project_id]

```