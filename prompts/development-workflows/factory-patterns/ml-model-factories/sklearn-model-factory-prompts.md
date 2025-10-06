# Prompts to Generate a Scikit-learn Model Factory

This file contains prompts to generate a factory for creating, training, and evaluating scikit-learn models.

**Purpose:**
- **Standardized Pipeline:** Ensures that all scikit-learn models follow the same `fit`/`predict`/`evaluate` pipeline.
- **Model Selection:** The factory can be used to instantiate different types of models (e.g., `RandomForestClassifier`, `LinearRegression`) based on a configuration string.
- **Hyperparameter Tuning:** The factory can be configured to automatically run a `GridSearchCV` or `RandomizedSearchCV` to find the best hyperparameters for a given model.
- **Encapsulation:** Hides the complexity of model training and evaluation from the main application logic.

---

### Generated Code Example

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from typing import Dict, Any

class SklearnModelFactory:
    """Factory for creating scikit-learn model training pipelines."""

    _models = {
        "random_forest": RandomForestClassifier,
        "logistic_regression": LogisticRegression
    }

    @staticmethod
    def create_pipeline(model_name: str, model_params: Dict[str, Any]) -> Pipeline:
        """Creates a scikit-learn pipeline with scaling and a model."""
        if model_name not in SklearnModelFactory._models:
            raise ValueError(f"Unknown model name: {model_name}")

        model = SklearnModelFactory._models[model_name](**model_params)

        return Pipeline([
            ('scaler', StandardScaler()),
            ('model', model)
        ])

    @staticmethod
    def create_tuned_pipeline(
        model_name: str,
        param_grid: Dict[str, Any],
        cv: int = 5
    ) -> GridSearchCV:
        """Creates a GridSearchCV object for hyperparameter tuning."""
        pipeline = SklearnModelFactory.create_pipeline(model_name, {})

        return GridSearchCV(pipeline, param_grid, cv=cv)

# --- Usage Example ---
#
# param_grid = {
#     'model__n_estimators': [100, 200],
#     'model__max_depth': [5, 10]
# }
#
# tuner = SklearnModelFactory.create_tuned_pipeline(
#     "random_forest",
#     param_grid=param_grid
# )
#
# # tuner.fit(X_train, y_train)
# # print(tuner.best_params_)
```