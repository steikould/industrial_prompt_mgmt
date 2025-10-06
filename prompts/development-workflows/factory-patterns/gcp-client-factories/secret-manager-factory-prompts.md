# Prompts to Generate a Secret Manager Client Factory

This file contains prompts to generate a factory pattern for creating `SecretManagerServiceClient` instances.

**Purpose:**
- **Client Reuse:** Avoids creating a new client for every secret access request.
- **Caching:** Includes an optional in-memory cache to avoid repeated calls for the same secret within a short timeframe, which is very useful for Cloud Functions that might process multiple requests.
- **Simplified Usage:** Provides a simple `get_secret` method that abstracts the details of version strings.

---

### Generated Code Example

```python
from google.cloud import secretmanager
from typing import Optional

class SecretManagerFactory:
    """Factory for creating Secret Manager clients and accessing secrets."""

    _client_instance: Optional[secretmanager.SecretManagerServiceClient] = None
    _secret_cache: dict[str, str] = {}

    @classmethod
    def _get_client(cls) -> secretmanager.SecretManagerServiceClient:
        """Create or reuse a single client instance."""
        if cls._client_instance is None:
            cls._client_instance = secretmanager.SecretManagerServiceClient()
        return cls._client_instance

    @classmethod
    def get_secret(
        cls,
        project_id: str,
        secret_id: str,
        version_id: str = "latest",
        use_cache: bool = True
    ) -> str:
        """Retrieve a secret's value, with optional caching."""
        cache_key = f"{project_id}/{secret_id}/{version_id}"
        if use_cache and cache_key in cls._secret_cache:
            return cls._secret_cache[cache_key]

        client = cls._get_client()
        name = client.secret_version_path(project_id, secret_id, version_id)

        response = client.access_secret_version(request={"name": name})
        payload = response.payload.data.decode("UTF-8")

        if use_cache:
            cls._secret_cache[cache_key] = payload

        return payload
```