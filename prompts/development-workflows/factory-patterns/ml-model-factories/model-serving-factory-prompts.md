# Prompts to Generate a Model Serving Factory

This file contains prompts to generate a factory that provides a consistent interface for getting predictions from a model, regardless of whether it's running locally or deployed on a Vertex AI Endpoint.

**Purpose:**
- **Location Agnostic:** The application code doesn't need to know if it's calling a local model file or a remote API. It just asks the factory for a "predictor" object and calls its `predict` method.
- **Simplified Testing:** Allows for easy local testing by configuring the factory to return a local predictor that loads a model from a file.
- **Production Ready:** In a production environment, the factory is configured to return a predictor that calls a live Vertex AI Endpoint.
- **Decoupling:** Separates the application logic from the infrastructure details of model serving.

---

### Generated Code Example

```python
from abc import ABC, abstractmethod
from typing import List, Any, Dict
from google.cloud import aiplatform
import joblib # Using joblib for sklearn example

class Predictor(ABC):
    """Abstract interface for getting predictions."""
    @abstractmethod
    def predict(self, instances: List[Any]) -> List[Any]:
        pass

class LocalPredictor(Predictor):
    """Predictor for a model loaded from a local file."""
    def __init__(self, model_path: str):
        self._model = joblib.load(model_path)
        print(f"Loaded model from local path: {model_path}")

    def predict(self, instances: List[Any]) -> List[Any]:
        return self._model.predict(instances).tolist()

class VertexAIPredictor(Predictor):
    """Predictor for a deployed Vertex AI Endpoint."""
    def __init__(self, endpoint_id: str, project: str, location: str):
        endpoint_path = f"projects/{project}/locations/{location}/endpoints/{endpoint_id}"
        self._endpoint = aiplatform.Endpoint(endpoint_name=endpoint_path)
        print(f"Initialized predictor for Vertex AI endpoint: {endpoint_id}")

    def predict(self, instances: List[Any]) -> List[Any]:
        response = self._endpoint.predict(instances=instances)
        return response.predictions

class ModelServingFactory:
    """Factory to create the correct predictor based on configuration."""

    @staticmethod
    def create_predictor(config: Dict[str, Any]) -> Predictor:
        """
        Creates a predictor instance.

        Args:
            config: A dictionary defining the predictor type and its settings.
                    Example for local: {"type": "local", "model_path": "./model.joblib"}
                    Example for vertex: {"type": "vertex_ai", "endpoint_id": "123", ...}
        """
        predictor_type = config.pop("type")

        if predictor_type == "local":
            return LocalPredictor(**config)
        elif predictor_type == "vertex_ai":
            return VertexAIPredictor(**config)
        else:
            raise ValueError(f"Unknown predictor type: {predictor_type}")

# --- Usage Example ---
#
# import os
#
# # In a local/testing environment
# local_config = {"type": "local", "model_path": "my_local_model.joblib"}
# local_predictor = ModelServingFactory.create_predictor(local_config)
#
# # In a production environment (config could come from env vars)
# prod_config = {
#     "type": "vertex_ai",
#     "endpoint_id": os.getenv("PREDICTION_ENDPOINT_ID"),
#     "project": os.getenv("GCP_PROJECT"),
#     "location": "us-central1"
# }
# prod_predictor = ModelServingFactory.create_predictor(prod_config)
```