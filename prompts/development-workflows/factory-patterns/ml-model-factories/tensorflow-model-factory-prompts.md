# Prompts to Generate a TensorFlow/Keras Model Factory

This file contains prompts to generate a factory for building different TensorFlow/Keras model architectures.

**Purpose:**
- **Standardized Construction:** Provides a central place where all Keras model architectures are defined as builder functions.
- **Simplified Instantiation:** The main application logic can request a model by name (e.g., "mlp", "cnn_classifier") without needing to know the specific Keras layers involved.
- **Configuration-Driven:** Allows the model architecture details (like layer sizes, activation functions, number of classes) to be passed in a configuration dictionary, promoting reproducible experiments.

---

### Generated Code Example

```python
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from typing import Dict, Any, Callable

# --- Define model builder functions ---
def build_mlp_model(input_shape: tuple, num_classes: int, hidden_units: list = [128, 128]) -> keras.Model:
    """Builds a simple Multi-Layer Perceptron model."""
    print(f"Building MLP with hidden units: {hidden_units}")
    inputs = keras.Input(shape=input_shape)
    x = inputs
    for units in hidden_units:
        x = layers.Dense(units, activation="relu")(x)
    outputs = layers.Dense(num_classes, activation="softmax")(x)
    return keras.Model(inputs, outputs)

def build_cnn_model(input_shape: tuple, num_classes: int) -> keras.Model:
    """Builds a simple Convolutional Neural Network model."""
    print("Building CNN")
    inputs = keras.Input(shape=input_shape)
    x = layers.Conv2D(32, (3, 3), activation="relu")(inputs)
    x = layers.MaxPooling2D((2, 2))(x)
    x = layers.Flatten()(x)
    outputs = layers.Dense(num_classes, activation="softmax")(x)
    return keras.Model(inputs, outputs)


# --- The Factory ---
class TensorFlowModelFactory:
    """Factory for creating TensorFlow/Keras model instances."""

    _model_builders: Dict[str, Callable[..., keras.Model]] = {
        "mlp": build_mlp_model,
        "cnn": build_cnn_model,
    }

    @staticmethod
    def create_model(model_name: str, model_config: Dict[str, Any]) -> keras.Model:
        """
        Creates an instance of a Keras model using a builder function.

        Args:
            model_name: The name of the model architecture to build.
            model_config: A dictionary of keyword arguments to pass to the
                          model builder function (e.g., input_shape, num_classes).

        Returns:
            A compiled Keras model instance.
        """
        if model_name not in TensorFlowModelFactory._model_builders:
            raise ValueError(f"Unknown model name: {model_name}")

        builder = TensorFlowModelFactory._model_builders[model_name]
        return builder(**model_config)

# --- Usage Example ---
#
# mlp_config = {"input_shape": (784,), "num_classes": 10, "hidden_units": [256, 256]}
# cnn_config = {"input_shape": (28, 28, 1), "num_classes": 10}
#
# mlp_model = TensorFlowModelFactory.create_model("mlp", mlp_config)
# cnn_model = TensorFlowModelFactory.create_model("cnn", cnn_config)
#
# mlp_model.summary()
# cnn_model.summary()
```