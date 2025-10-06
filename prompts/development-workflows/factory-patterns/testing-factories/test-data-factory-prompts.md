# Prompts to Generate a Test Data Factory

This file contains prompts to generate a factory for creating realistic test data for unit and integration tests.

**Purpose:**
- **Dynamic Data Generation:** Instead of relying on static, hardcoded data in files, this factory uses libraries like `faker` to generate fresh, realistic data for each test run.
- **Reduces Test Data Maintenance:** Avoids having to manage and update numerous static test data files.
- **Structured Output:** Can be configured to generate data in various formats, such as pandas DataFrames, lists of dictionaries, or Pydantic models.
- **Customizable:** Easily adaptable to generate data that matches the specific schemas of your application.

---

### Generated Code Example

```python
import pandas as pd
from faker import Faker
from typing import List, Dict, Any

class TestDataFactory:
    """A factory for generating realistic test data."""

    def __init__(self, seed: int = None):
        self._faker = Faker()
        if seed:
            Faker.seed(seed)

    def create_user_data(self, count: int = 1) -> List[Dict[str, Any]]:
        """Generates a list of user records."""
        return [
            {
                "user_id": self._faker.uuid4(),
                "name": self._faker.name(),
                "email": self._faker.email(),
                "created_at": self._faker.iso8601(),
            }
            for _ in range(count)
        ]

    def create_scada_dataframe(self, count: int = 10) -> pd.DataFrame:
        """Generates a DataFrame of SCADA tag readings."""
        data = [
            {
                "pi_tag": f"Sensor_{i:03d}.Value",
                "timestamp": self._faker.iso8601(),
                "value": self._faker.pyfloat(min_value=0, max_value=100),
                "status": "Good",
            }
            for i in range(count)
        ]
        return pd.DataFrame(data)

# --- Pytest Fixture (in conftest.py) ---
#
# import pytest
#
# @pytest.fixture(scope="session")
# def data_factory():
#     """Provides a session-scoped instance of the TestDataFactory."""
#     return TestDataFactory(seed=42)
#
# --- Usage in a test ---
#
# def test_process_users(data_factory):
#     # Generate 5 realistic user records
#     users = data_factory.create_user_data(count=5)
#
#     # Now you can pass this data to your function under test
#     result = process_users(users)
#     assert result is True
#
# def test_transform_scada_data(data_factory):
#     # Generate a DataFrame with 100 SCADA readings
#     scada_df = data_factory.create_scada_dataframe(count=100)
#
#     # Pass the generated DataFrame to your transformation function
#     transformed_df = transform_scada_data(scada_df)
#     assert 'normalized_value' in transformed_df.columns

```