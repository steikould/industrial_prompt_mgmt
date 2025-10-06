# Prompts to Generate an ETL Pipeline Factory

This file contains prompts to generate a factory for creating and running different ETL (Extract, Transform, Load) pipelines.

**Purpose:**
- **Abstracts Execution Engine:** The code that *triggers* a pipeline doesn't need to know *how* it runs. The factory can return a "pipeline" object that might be a wrapper around a Cloud Function, a Dataflow job, a BigQuery scheduled query, or a dbt run.
- **Standardized Interface:** All pipeline objects returned by the factory share a common interface (e.g., a `run()` method).
- **Configuration-Driven:** The specific pipeline to run, along with its parameters, can be defined in a configuration file and passed to the factory. This is great for orchestration tools like Cloud Workflows.

---

### Generated Code Example

```python
from abc import ABC, abstractmethod
from typing import Dict, Any

class Pipeline(ABC):
    """An abstract interface for an ETL pipeline."""
    @abstractmethod
    def run(self, params: Dict[str, Any]) -> bool:
        """Runs the pipeline and returns True on success."""
        pass

class BqLoadFromGcsPipeline(Pipeline):
    """A simple pipeline that loads a CSV from GCS into BigQuery."""
    def run(self, params: Dict[str, Any]) -> bool:
        # Uses the BigQuery client to run a load job
        print(f"Running BigQuery load pipeline for table {params['table_id']}...")
        # from google.cloud import bigquery
        # client = bigquery.Client()
        # job = client.load_table_from_uri(...)
        # job.result()
        print("BigQuery load complete.")
        return True

class DbtRunPipeline(Pipeline):
    """A pipeline that executes a 'dbt run' command."""
    def run(self, params: Dict[str, Any]) -> bool:
        # Uses subprocess to run dbt
        print(f"Running dbt pipeline for models: {params['models']}...")
        # import subprocess
        # result = subprocess.run(["dbt", "run", "--select", params["models"]], check=True)
        # return result.returncode == 0
        print("dbt run complete.")
        return True

class EtlPipelineFactory:
    """Factory to create ETL pipeline runners."""
    _pipelines = {
        "bq_load_from_gcs": BqLoadFromGcsPipeline(),
        "dbt_run": DbtRunPipeline()
    }

    @staticmethod
    def create_pipeline(pipeline_type: str) -> Pipeline:
        pipeline = EtlPipelineFactory._pipelines.get(pipeline_type)
        if not pipeline:
            raise ValueError(f"Unknown pipeline type: {pipeline_type}")
        return pipeline

# --- Usage Example (e.g., in a Cloud Workflow or Airflow DAG) ---
#
# pipeline_type = "dbt_run"
# params = {"models": "staging.customers"}
#
# try:
#     pipeline_runner = EtlPipelineFactory.create_pipeline(pipeline_type)
#     success = pipeline_runner.run(params)
#     if success:
#         print(f"Pipeline '{pipeline_type}' completed successfully.")
# except ValueError as e:
#     print(e)
```