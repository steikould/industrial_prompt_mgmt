# Prompts to Generate a SCADA Processor Factory

This file contains prompts to generate a factory for creating different types of SCADA data processors.

**Purpose:**
- **Strategy Pattern:** Implements the strategy design pattern, where the specific data processing algorithm is selected at runtime based on the source system.
- **Decoupling:** The main application logic (e.g., the Cloud Function) doesn't need to know the implementation details of each processor. It just asks the factory for the correct processor.
- **Extensibility:** To support a new SCADA system, you only need to create a new processor class and add it to the factory's dictionary. The calling code doesn't change.

---

### Generated Code Example

```python
# scada-processor-factory-prompts.md generates:

from abc import ABC, abstractmethod
from typing import Protocol
import pandas as pd

class DataProcessor(Protocol):
    """Protocol for data processors."""
    def process(self, data: pd.DataFrame) -> pd.DataFrame: ...
    def validate(self, data: pd.DataFrame) -> bool: ...

# --- Concrete Implementations for different SCADA systems ---
class ModbusProcessor:
    def process(self, data: pd.DataFrame) -> pd.DataFrame:
        # Logic specific to Modbus data
        print("Processing Modbus data...")
        data['processed_by'] = 'modbus'
        return data
    def validate(self, data: pd.DataFrame) -> bool:
        return 'modbus_register' in data.columns

class OPCUAProcessor:
    def process(self, data: pd.DataFrame) -> pd.DataFrame:
        # Logic specific to OPC-UA data
        print("Processing OPC-UA data...")
        data['processed_by'] = 'opc_ua'
        return data
    def validate(self, data: pd.DataFrame) -> bool:
        return 'opc_node_id' in data.columns

class AvevaPIProcessor:
    def process(self, data: pd.DataFrame) -> pd.DataFrame:
        # Logic specific to AVEVA PI data
        print("Processing AVEVA PI data...")
        data['processed_by'] = 'aveva_pi'
        return data
    def validate(self, data: pd.DataFrame) -> bool:
        return 'pi_tag' in data.columns

class GenericSCADAProcessor:
    def process(self, data: pd.DataFrame) -> pd.DataFrame:
        # Generic fallback logic
        print("Processing generic SCADA data...")
        data['processed_by'] = 'generic'
        return data
    def validate(self, data: pd.DataFrame) -> bool:
        return True

class SCADAProcessorFactory:
    """Factory for creating SCADA data processors."""

    _processors = {
        "modbus": ModbusProcessor(),
        "opc_ua": OPCUAProcessor(),
        "aveva_pi": AvevaPIProcessor(),
        "generic": GenericSCADAProcessor()
    }

    @staticmethod
    def create_processor(source_type: str) -> DataProcessor:
        """Create processor based on SCADA source type."""
        processor = SCADAProcessorFactory._processors.get(source_type)

        if not processor:
            raise ValueError(f"Unknown SCADA type: {source_type}")

        return processor

# --- Usage in a Cloud Function ---
#
# def process_scada_message(request):
#     request_json = request.get_json()
#     source = request_json["source_type"]
#     data = pd.DataFrame(request_json["data"])
#
#     try:
#         processor = SCADAProcessorFactory.create_processor(source)
#
#         if processor.validate(data):
#             processed_df = processor.process(data)
#             # Write processed_df to BigQuery...
#             return "Success", 200
#         else:
#             return "Invalid data for source type", 400
#
#     except ValueError as e:
#         return str(e), 400

```