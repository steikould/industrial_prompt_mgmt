# Prompts to Generate a BigQuery Client Factory

This file contains prompts to generate a factory pattern for creating and managing `google.cloud.bigquery.Client` instances.

**Purpose:**
- **Singleton Pattern:** Ensures that only one client instance is created per GCP project, preventing resource leaks and unnecessary overhead.
- **Centralized Configuration:** Provides a single place to configure client settings (e.g., location, project ID).
- **Simplified Usage:** Makes it easy for application code to get a properly configured client without worrying about the instantiation details.
- **Job Configuration Factory:** Includes a helper method to create standardized `JobConfig` objects.

---

### Generated Code Example

```python
# bigquery-client-factory-prompts.md generates:

from abc import ABC, abstractmethod
from google.cloud import bigquery
from typing import Optional
import os

class BigQueryClientFactory:
    """Factory for creating BigQuery clients with proper configuration."""

    _instances: dict[str, bigquery.Client] = {}

    @classmethod
    def create_client(
        cls,
        project_id: Optional[str] = None,
        location: str = "US"
    ) -> bigquery.Client:
        """Create or reuse BigQuery client (singleton per project)."""
        project_id = project_id or os.getenv("GCP_PROJECT")

        cache_key = f"{project_id}:{location}"
        if cache_key not in cls._instances:
            cls._instances[cache_key] = bigquery.Client(
                project=project_id,
                location=location
            )
        return cls._instances[cache_key]

    @classmethod
    def create_job_config(
        cls,
        config_type: str,
        **kwargs
    ) -> bigquery.QueryJobConfig | bigquery.LoadJobConfig:
        """Factory for job configurations."""
        configs = {
            "query": bigquery.QueryJobConfig,
            "load": bigquery.LoadJobConfig,
            "extract": bigquery.ExtractJobConfig
        }
        return configs[config_type](**kwargs)
```