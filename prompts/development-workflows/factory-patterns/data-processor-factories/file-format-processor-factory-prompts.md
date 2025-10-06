# Prompts to Generate a File Format Processor Factory

This file contains prompts to generate a factory for creating processors that can handle different file formats (e.g., CSV, JSON, Parquet).

**Purpose:**
- **Strategy Pattern:** A GCS-triggered Cloud Function can receive many different file types. This factory allows the function to dynamically select the correct parsing strategy based on the file's extension.
- **Decoupling:** The main function logic is not cluttered with parsing details for every possible format.
- **Extensibility:** To support a new file format, you only need to create a new processor class and register it with the factory using its file extension.

---

### Generated Code Example

```python
from abc import ABC, abstractmethod
import pandas as pd
import io

class FileProcessor(ABC):
    @abstractmethod
    def read_to_dataframe(self, file_content: bytes) -> pd.DataFrame:
        """Reads file content from bytes into a pandas DataFrame."""
        pass

class CsvProcessor(FileProcessor):
    def read_to_dataframe(self, file_content: bytes) -> pd.DataFrame:
        print("Using CSV processor...")
        return pd.read_csv(io.BytesIO(file_content))

class JsonProcessor(FileProcessor):
    def read_to_dataframe(self, file_content: bytes) -> pd.DataFrame:
        print("Using JSON processor...")
        return pd.read_json(io.BytesIO(file_content))

class ParquetProcessor(FileProcessor):
    def read_to_dataframe(self, file_content: bytes) -> pd.DataFrame:
        print("Using Parquet processor...")
        return pd.read_parquet(io.BytesIO(file_content))

class FileFormatProcessorFactory:
    _processors = {
        ".csv": CsvProcessor(),
        ".json": JsonProcessor(),
        ".parquet": ParquetProcessor()
    }

    @staticmethod
    def create_processor(file_name: str) -> FileProcessor:
        """Creates a processor based on the file's extension."""
        import os
        _, extension = os.path.splitext(file_name)

        processor = FileFormatProcessorFactory._processors.get(extension.lower())
        if not processor:
            raise ValueError(f"Unsupported file format: {extension}")
        return processor

# --- Usage in a GCS-triggered function ---
#
# from google.cloud import storage
#
# def process_gcs_file(event, context):
#     bucket_name = event['bucket']
#     file_name = event['name']
#
#     try:
#         # Get the correct processor from the factory
#         processor = FileFormatProcessorFactory.create_processor(file_name)
#
#         # Download the file content
#         storage_client = storage.Client()
#         bucket = storage_client.bucket(bucket_name)
#         blob = bucket.blob(file_name)
#         file_content = blob.download_as_bytes()
#
#         # Process into a DataFrame
#         df = processor.read_to_dataframe(file_content)
#
#         # Now, load the DataFrame to BigQuery...
#         print(f"Successfully processed {file_name} into a DataFrame with {len(df)} rows.")
#
#     except (ValueError, KeyError) as e:
#         print(f"Error processing {file_name}: {e}")

```