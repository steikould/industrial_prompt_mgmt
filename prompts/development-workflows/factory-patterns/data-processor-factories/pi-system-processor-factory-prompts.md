# Prompts to Generate an AVEVA PI System Processor Factory

This file contains prompts to generate a factory for creating data processors specifically for the AVEVA PI System.

**Purpose:**
- **Specialized Logic:** While the generic SCADA factory might handle PI data, this factory would be responsible for creating processors that handle more complex PI-specific tasks.
- **Example Processors:**
    - `PITagSearchProcessor`: A processor for handling the results of a PI tag search query.
    - `PISnapshotProcessor`: A processor for cleaning and formatting snapshot (real-time) data.
    - `PIArchiveProcessor`: A processor for handling and aligning archived (historical) data.
- **Decoupling:** Allows the main application to request a PI processor based on the type of data it needs to handle (e.g., "snapshot", "archive").

---

### Generated Code Example

```python
from abc import ABC, abstractmethod
import pandas as pd

class PIProcessor(ABC):
    @abstractmethod
    def process(self, data: pd.DataFrame) -> pd.DataFrame:
        pass

class PISnapshotProcessor(PIProcessor):
    def process(self, data: pd.DataFrame) -> pd.DataFrame:
        # Logic to flatten and clean snapshot data from PI Web API
        print("Processing PI snapshot data...")
        # ... implementation
        return data

class PIArchiveProcessor(PIProcessor):
    def process(self, data: pd.DataFrame) -> pd.DataFrame:
        # Logic to resample or align historical data
        print("Processing PI archive data...")
        # ... implementation
        return data

class PISystemProcessorFactory:
    _processors = {
        "snapshot": PISnapshotProcessor(),
        "archive": PIArchiveProcessor()
    }

    @staticmethod
    def create_processor(data_type: str) -> PIProcessor:
        processor = PISystemProcessorFactory._processors.get(data_type)
        if not processor:
            raise ValueError(f"Unknown PI data type: {data_type}")
        return processor
```