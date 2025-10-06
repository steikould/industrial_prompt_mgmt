# Prompts to Generate an Oracle Replication Processor Factory

This file contains prompts to generate a factory for creating processors that handle data replicated from an Oracle database.

**Purpose:**
- **Table-Specific Logic:** In a database replication scenario, different tables often require different cleaning, transformation, or enrichment logic before being loaded into BigQuery.
- **Decoupling:** A Cloud Function or Dataflow job can use this factory to get the correct processor for a given source table name without needing to contain a giant `if/elif/else` block.
- **Extensibility:** To handle a new replicated table, you simply add a new processor class and register it in the factory.

---

### Generated Code Example

```python
from abc import ABC, abstractmethod
import pandas as pd

class OracleReplicationProcessor(ABC):
    @abstractmethod
    def transform(self, data: pd.DataFrame) -> pd.DataFrame:
        """Applies business logic transformations."""
        pass

    @abstractmethod
    def get_target_table(self) -> str:
        """Returns the destination BigQuery table ID."""
        pass

class CustomerTableProcessor(OracleReplicationProcessor):
    def transform(self, data: pd.DataFrame) -> pd.DataFrame:
        # Example: Anonymize personally identifiable information (PII)
        print("Processing CUSTOMER table data...")
        if 'email' in data.columns:
            data['email'] = 'REDACTED'
        return data

    def get_target_table(self) -> str:
        return "crm.customers"

class OrdersTableProcessor(OracleReplicationProcessor):
    def transform(self, data: pd.DataFrame) -> pd.DataFrame:
        # Example: Convert currency fields
        print("Processing ORDERS table data...")
        if 'order_value_usd' in data.columns:
            data['order_value_eur'] = data['order_value_usd'] * 0.92
        return data

    def get_target_table(self) -> str:
        return "finance.orders"

class OracleReplicationFactory:
    _processors = {
        "HR.CUSTOMERS": CustomerTableProcessor(),
        "FIN.ORDERS": OrdersTableProcessor()
    }

    @staticmethod
    def create_processor(source_table: str) -> OracleReplicationProcessor:
        """Creates a processor based on the Oracle source table name."""
        processor = OracleReplicationFactory._processors.get(source_table.upper())
        if not processor:
            raise ValueError(f"No processor registered for source table: {source_table}")
        return processor
```