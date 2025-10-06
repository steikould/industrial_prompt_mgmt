# Prompts to Generate a Batch Job Factory

This file contains prompts for generating a factory that creates and runs container-based batch jobs.

**Purpose:**
- **Execution Abstraction:** A batch job can be run on different platforms (e.g., Cloud Run Jobs, Google Kubernetes Engine Jobs). This factory abstracts away the specifics of the execution environment.
- **Standardized Interface:** Provides a simple `run()` interface to start a job and wait for its completion.
- **Configuration-Driven:** The job to run, its container image, and its compute requirements can all be defined in a configuration file and passed to the factory.

---

### Generated Code Example

```python
from abc import ABC, abstractmethod
from typing import Dict, Any

class BatchJob(ABC):
    """An abstract interface for a runnable batch job."""
    @abstractmethod
    def run(self, job_name: str, image: str, command: list[str], resources: Dict[str, str]) -> bool:
        """Runs the job and returns True on success."""
        pass

class CloudRunJob(BatchJob):
    """A job runner for Google Cloud Run Jobs."""
    def run(self, job_name: str, image: str, command: list[str], resources: Dict[str, str]) -> bool:
        print(f"Executing job '{job_name}' on Cloud Run...")
        # from google.cloud.run_v2 import JobsClient, Job
        # client = JobsClient()
        # request = client.create_job(...)
        # poller = client.run_job(name=job_name)
        # poller.result() # Waits for completion
        print("Cloud Run job finished successfully.")
        return True

class GkeJob(BatchJob):
    """A job runner for Google Kubernetes Engine Jobs."""
    def run(self, job_name: str, image: str, command: list[str], resources: Dict[str, str]) -> bool:
        print(f"Executing job '{job_name}' on GKE...")
        # from kubernetes import client, config
        # config.load_kube_config()
        # batch_v1 = client.BatchV1Api()
        # job = client.V1Job(...)
        # batch_v1.create_namespaced_job(body=job, namespace="default")
        print("GKE job created.")
        # Additional logic needed here to wait for completion
        return True

class BatchJobFactory:
    """Factory to create batch job runners."""
    _runners = {
        "cloud_run": CloudRunJob(),
        "gke": GkeJob()
    }

    @staticmethod
    def create_runner(runner_type: str) -> BatchJob:
        runner = BatchJobFactory._runners.get(runner_type.lower())
        if not runner:
            raise ValueError(f"Unknown batch job runner: {runner_type}")
        return runner

# --- Usage Example ---
#
# runner_type = "cloud_run"
# job_config = {
#     "job_name": "process-daily-data-123",
#     "image": "gcr.io/my-project/data-processor:latest",
#     "command": ["python", "process.py", "--date=2023-10-27"],
#     "resources": {"cpu": "1", "memory": "4Gi"}
# }
#
# runner = BatchJobFactory.create_runner(runner_type)
# success = runner.run(**job_config)

```