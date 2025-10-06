# Prompts for FastAPI on Cloud Run

This file contains prompts for building and deploying a FastAPI application to Cloud Run.

**Why FastAPI on Cloud Run?**
- **Full Web Framework:** Gives you complete control over your application, routing, middleware, etc.
- **Portability:** It's a standard containerized web application that can run anywhere Docker runs.
- **Scalability:** Cloud Run can scale down to zero (cost-effective) or handle thousands of requests per second.
- **Concurrency:** A single Cloud Run instance can handle multiple requests concurrently, which is highly efficient for I/O-bound tasks.

**Key Components:**
- **`main.py`:** Your FastAPI application code.
- **`Dockerfile`:** Defines the container image. The base image should be a slim Python image (e.g., `python:3.12-slim`). The `CMD` should use a production-grade ASGI server like `uvicorn` with multiple worker processes.
- **`pyproject.toml` or `requirements.txt`:** To install dependencies.
- **`.dockerignore`:** To exclude unnecessary files from the container image.

**Prompt:**
"Generate the necessary files to deploy a basic FastAPI application to Cloud Run. This should include:
1. A `main.py` with a single root endpoint (`/`).
2. A `Dockerfile` that uses `uvicorn` as the entrypoint with 4 worker processes.
3. A `.dockerignore` file.
4. A `requirements.txt` file with `fastapi` and `uvicorn`."