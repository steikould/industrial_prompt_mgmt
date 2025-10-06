# Prompts for HTTP Triggers with FastAPI in Cloud Functions

This file provides prompts for using FastAPI within a Gen2 HTTP-triggered Cloud Function. While Functions Framework is the default, FastAPI offers more features like dependency injection and automatic API docs.

**Why FastAPI?**
- **Structured Code:** Encourages separation of concerns.
- **Dependency Injection:** Simplifies managing dependencies like GCP clients.
- **Automatic Docs:** Generates OpenAPI (Swagger) and ReDoc documentation automatically.
- **Data Validation:** Uses Pydantic for robust request body validation.

**Setup:**
- The entrypoint in your `main.py` will be the FastAPI app instance.
- `functions-framework` is still a dependency, as it provides the server that runs your FastAPI application.

**Prompt:**
"Create a Gen2 Cloud Function with an HTTP trigger. Use FastAPI to define an endpoint that accepts a POST request with a Pydantic model, validates it, and returns a success message. Include the necessary dependencies in `requirements.txt`."