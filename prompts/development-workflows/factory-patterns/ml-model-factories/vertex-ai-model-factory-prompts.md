# Prompts to Generate a Vertex AI Model Factory

This file contains prompts to generate a factory for uploading and deploying models to Google Cloud's Vertex AI platform.

**Purpose:**
- **Abstract Factory Pattern:** Implements an abstract factory to handle the specifics of deploying models from different frameworks (scikit-learn, PyTorch, TensorFlow) to Vertex AI.
- **Standardized Deployment:** Provides a single, consistent interface (`create_model`, `create_training_job`) for all MLOps pipelines, regardless of the underlying ML framework.
- **Encapsulation:** Hides the details of the Vertex AI SDK, such as finding the correct pre-built container image for a given framework.

---

### Generated Code Example

```python
# vertex-ai-model-factory-prompts.md generates:

from abc import ABC, abstractmethod
from google.cloud import aiplatform
from typing import Any, Dict

class ModelFactory(ABC):
    """Abstract factory for ML models."""

    @abstractmethod
    def create_model(self, config: Dict[str, Any]):
        """Uploads and creates a model in the Vertex AI Model Registry."""
        pass

    @abstractmethod
    def create_training_job(self, config: Dict[str, Any]):
        """Creates a custom training job in Vertex AI."""
        pass

class VertexModelFactory(ModelFactory):
    """Factory for Vertex AI model training and deployment."""

    def __init__(self, project: str, location: str = "us-central1"):
        aiplatform.init(project=project, location=location)

    def create_model(self, config: Dict[str, Any]) -> aiplatform.Model:
        """Uploads a model to the Vertex AI Model Registry based on its framework."""
        framework = config["framework"]

        factories = {
            "sklearn": self._create_sklearn_model,
            "pytorch": self._create_pytorch_model,
            "tensorflow": self._create_tensorflow_model
        }

        if framework not in factories:
            raise ValueError(f"Unsupported framework: {framework}")

        return factories[framework](config)

    def _create_sklearn_model(self, config: Dict[str, Any]) -> aiplatform.Model:
        """Uploads a scikit-learn model."""
        # Your team's actual sklearn models
        return aiplatform.Model.upload(
            display_name=config["name"],
            artifact_uri=config["model_path"],
            serving_container_image_uri="us-docker.pkg.dev/vertex-ai/prediction/sklearn-cpu.1-0:latest"
        )

    def _create_pytorch_model(self, config: Dict[str, Any]) -> aiplatform.Model:
        """Uploads a PyTorch model."""
        return aiplatform.Model.upload(
            display_name=config["name"],
            artifact_uri=config["model_path"],
            serving_container_image_uri="us-docker.pkg.dev/vertex-ai-prediction/pytorch-cpu.1-9:latest" # Example image
        )

    def _create_tensorflow_model(self, config: Dict[str, Any]) -> aiplatform.Model:
        """Uploads a TensorFlow model."""
        return aiplatform.Model.upload(
            display_name=config["name"],
            artifact_uri=config["model_path"],
            serving_container_image_uri="us-docker.pkg.dev/vertex-ai-prediction/tf2-cpu.2-8:latest" # Example image
        )

    def create_training_job(self, config: Dict[str, Any]):
        # Implementation for creating a Vertex AI CustomJob would go here
        print("Creating training job...")
        pass
```