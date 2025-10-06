# Prompts to Generate a PyTorch Model Factory

This file contains prompts to generate a factory for instantiating different PyTorch neural network architectures.

**Purpose:**
- **Architecture Management:** Provides a central registry for all the custom `torch.nn.Module` architectures used by the team.
- **Simplified Instantiation:** The training or inference script can request a model by name (e.g., "resnet_classifier", "simple_cnn") without needing to import the specific class definition directly.
- **Configuration-Driven:** Allows the model architecture and its specific parameters (e.g., number of layers, number of classes) to be defined in a configuration file (e.g., YAML or JSON), making experiments more repeatable.

---

### Generated Code Example

```python
import torch
import torch.nn as nn
from typing import Dict, Any

# --- Assume these are defined in your project's model library ---
class SimpleCNN(nn.Module):
    def __init__(self, num_classes: int = 10):
        super(SimpleCNN, self).__init__()
        # ... implementation
        self.name = "SimpleCNN"
        print(f"Initialized SimpleCNN for {num_classes} classes")

class ResNetClassifier(nn.Module):
    def __init__(self, num_classes: int = 10, pretrained: bool = True):
        super(ResNetClassifier, self).__init__()
        # ... implementation
        self.name = "ResNetClassifier"
        print(f"Initialized ResNetClassifier for {num_classes} classes, pretrained={pretrained}")

# --- The Factory ---
class PyTorchModelFactory:
    """Factory for creating PyTorch model instances."""

    _models = {
        "simple_cnn": SimpleCNN,
        "resnet_classifier": ResNetClassifier
    }

    @staticmethod
    def create_model(model_name: str, model_config: Dict[str, Any] = {}) -> nn.Module:
        """
        Creates an instance of a PyTorch model.

        Args:
            model_name: The name of the model to create.
            model_config: A dictionary of keyword arguments to pass to the
                          model's __init__ method.

        Returns:
            An instance of the requested torch.nn.Module.
        """
        if model_name not in PyTorchModelFactory._models:
            raise ValueError(f"Unknown model name: {model_name}")

        model_class = PyTorchModelFactory._models[model_name]
        return model_class(**model_config)

# --- Usage Example ---
#
# cnn_config = {"num_classes": 5}
# resnet_config = {"num_classes": 20, "pretrained": False}
#
# cnn_model = PyTorchModelFactory.create_model("simple_cnn", cnn_config)
# resnet_model = PyTorchModelFactory.create_model("resnet_classifier", resnet_config)
#
# print(f"Created model: {cnn_model.name}")
# print(f"Created model: {resnet_model.name}")

```