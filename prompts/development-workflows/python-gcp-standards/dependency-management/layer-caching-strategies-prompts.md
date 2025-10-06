# Prompts for Docker Layer Caching Strategies

This file contains prompts for optimizing Dockerfiles to leverage layer caching, leading to faster Cloud Run builds.

**Key Strategies:**
1.  **Order matters:** Place instructions that change less frequently (like installing system dependencies with `apt-get`) before instructions that change more frequently (like copying application code).
2.  **Copy `requirements.txt` first:** Copy the `requirements.txt` file and install the dependencies in a separate layer *before* copying the rest of the application source code. This ensures that the dependency layer is only rebuilt when `requirements.txt` changes, not on every code change.

**Example Dockerfile snippet:**
```Dockerfile
# Install dependencies first to leverage caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Then copy the application code
COPY . .
```

**Prompt:**
"This Dockerfile is inefficient. Refactor it to copy the `requirements.txt` file and install dependencies in an earlier layer to take advantage of Docker's layer caching mechanism."