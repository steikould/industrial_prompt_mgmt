# Prompts to Generate a Pub/Sub Client Factory

This file contains prompts to generate a factory pattern for creating and managing `PublisherClient` and `SubscriberClient` instances.

**Purpose:**
- **Client Reuse:** Publisher clients, in particular, should be reused to avoid the overhead of creating new gRPC connections for every publish request. This factory implements a singleton pattern.
- **Centralized Configuration:** Provides a single place to configure client settings.
- **Simplified Usage:** Abstracts away the client instantiation logic.

---

### Generated Code Example

```python
from google.cloud import pubsub_v1
from typing import Optional
import os

class PubSubClientFactory:
    """Factory for creating and reusing Pub/Sub clients."""

    _publisher_instance: Optional[pubsub_v1.PublisherClient] = None
    _subscriber_instances: dict[str, pubsub_v1.SubscriberClient] = {}

    @classmethod
    def get_publisher(cls) -> pubsub_v1.PublisherClient:
        """Create or reuse a single PublisherClient instance."""
        if cls._publisher_instance is None:
            cls._publisher_instance = pubsub_v1.PublisherClient()
        return cls._publisher_instance

    @classmethod
    def create_subscriber(cls) -> pubsub_v1.SubscriberClient:
        """Creates a new subscriber client.

        Note: Subscriber clients are generally not reused in the same way
        as publishers because each subscriber is tied to a specific
        subscription and callback.
        """
        return pubsub_v1.SubscriberClient()

```