# Prompts to Generate a Streaming Pipeline Factory

This file contains prompts for generating a factory that creates and manages streaming data pipelines.

**Purpose:**
- **Technology Abstraction:** A streaming pipeline can be implemented in many ways (e.g., Apache Beam on Dataflow, a simple Pub/Sub-triggered Cloud Function). This factory allows the triggering system to start a "streaming-ingest" pipeline without knowing the underlying implementation.
- **Standardized Interface:** All streaming pipeline objects share a common `start()` and `stop()` interface.
- **Configuration-Driven:** The choice of which pipeline to run and its specific parameters (e.g., source Pub/Sub topic, sink BigQuery table, windowing strategy) can be defined in a configuration and passed to the factory.

---

### Generated Code Example

```python
from abc import ABC, abstractmethod
from typing import Dict, Any

class StreamingPipeline(ABC):
    """An abstract interface for a streaming pipeline."""
    @abstractmethod
    def start(self, params: Dict[str, Any]) -> str:
        """Starts the pipeline and returns a job ID or identifier."""
        pass

    @abstractmethod
    def stop(self, job_id: str) -> bool:
        """Stops a running pipeline."""
        pass

class DataflowStreamingPipeline(StreamingPipeline):
    """A pipeline that launches a Dataflow job."""
    def start(self, params: Dict[str, Any]) -> str:
        print(f"Launching Dataflow streaming job from template: {params['template_path']}...")
        # from googleapiclient.discovery import build
        # dataflow = build('dataflow', 'v1b3')
        # request = dataflow.projects().templates().launch(...)
        # response = request.execute()
        # job_id = response['job']['id']
        # print(f"Dataflow job launched with ID: {job_id}")
        job_id = "fake-dataflow-job-123"
        return job_id

    def stop(self, job_id: str) -> bool:
        print(f"Stopping Dataflow job: {job_id}...")
        return True

class CloudFunctionStreamer(StreamingPipeline):
    """A 'pipeline' that relies on an already-deployed Cloud Function."""
    def start(self, params: Dict[str, Any]) -> str:
        # For a function, "starting" might just mean ensuring the topic exists
        # and the function is enabled.
        function_name = params['function_name']
        print(f"Ensuring streaming Cloud Function '{function_name}' is active...")
        print("Function is already active by nature of being deployed.")
        return function_name

    def stop(self, job_id: str) -> bool:
        # "Stopping" could mean disabling the function, but that's less common.
        print(f"Streaming via Cloud Function '{job_id}' cannot be stopped via this interface.")
        return False

class StreamingPipelineFactory:
    """Factory to create streaming pipeline runners."""
    _pipelines = {
        "dataflow": DataflowStreamingPipeline(),
        "cloud_function": CloudFunctionStreamer()
    }

    @staticmethod
    def create_pipeline(engine: str) -> StreamingPipeline:
        pipeline = StreamingPipelineFactory._pipelines.get(engine)
        if not pipeline:
            raise ValueError(f"Unknown streaming engine: {engine}")
        return pipeline

# --- Usage Example ---
#
# engine = "dataflow"
# params = {"template_path": "gs://my-templates/pubsub-to-bq", "topic": "my-topic"}
#
# runner = StreamingPipelineFactory.create_pipeline(engine)
# job_id = runner.start(params)
```