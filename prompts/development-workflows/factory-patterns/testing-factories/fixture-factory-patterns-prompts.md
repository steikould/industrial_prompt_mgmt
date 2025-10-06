# Prompts to Generate Pytest Fixture Factories

This file contains prompts to generate "fixture factories," a powerful pattern in `pytest` where a fixture returns a function. This function can then be called by tests to create customized versions of a resource.

**Purpose:**
- **Reduces Boilerplate:** Avoids creating many slightly different fixtures (e.g., `admin_user`, `guest_user`, `suspended_user`). Instead, you have one `user_factory` and create the specific user you need inside the test.
- **Customizable Setups:** Allows tests to create complex objects (like a BigQuery table with a specific schema and data) with a simple function call.
- **Improved Readability:** Makes the test's setup intent clearer. `user = user_factory(is_admin=True)` is more readable than just having a test depend on a generic `admin_user` fixture.

---

### Generated Code Example

This example shows a fixture factory for creating a temporary BigQuery table, populating it with data, and cleaning it up afterward.

```python
import pytest
from google.cloud import bigquery

# This fixture would live in conftest.py
@pytest.fixture
def bq_table_factory(mock_bq_client):
    """
    A fixture factory for creating temporary BigQuery tables.
    Returns a function that can be called by tests.
    """
    created_tables = []

    def _create_table(table_id: str, schema: list, data: list[dict] = None):
        """The actual factory function that tests will call."""
        print(f"Factory creating table: {table_id}")

        # Configure the mock client to handle this table
        table = bigquery.Table(table_id, schema=schema)
        mock_bq_client.get_table.return_value = table

        if data:
            # Configure mock to return data when this table is queried
            mock_bq_client.query.return_value.result.return_value = data

        created_tables.append(table_id)
        return table

    # This is the "teardown" part of the fixture
    yield _create_table

    # After the test runs, clean up (in a real scenario, this would delete the tables)
    print(f"Factory tearing down tables: {created_tables}")
    # for table_id in created_tables:
    #     real_bq_client.delete_table(table_id, not_found_ok=True)


# --- Usage in a test ---
#
# def test_summarize_user_data(bq_table_factory, data_factory):
#     # Define the schema for the test table
#     user_schema = [
#         bigquery.SchemaField("user_id", "STRING"),
#         bigquery.SchemaField("name", "STRING"),
#     ]
#     # Use the data factory to create some test data
#     user_data = data_factory.create_user_data(count=3)
#
#     # Use the fixture factory to create the exact BQ table we need for this test
#     table_id = "my_test_project.testing.users"
#     bq_table_factory(table_id, schema=user_schema, data=user_data)
#
#     # Now call the function under test, which will query this table
#     summary = summarize_user_data(table_id)
#
#     assert summary['total_users'] == 3
```