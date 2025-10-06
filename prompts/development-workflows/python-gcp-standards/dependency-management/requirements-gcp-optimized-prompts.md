# Prompts for GCP-Optimized Requirements

This file contains prompts for selecting and optimizing Python dependencies for the GCP environment.

**Key Strategies:**
- **Minimize Dependencies:** Especially for Cloud Functions, fewer dependencies mean smaller deployment packages and faster cold starts.
- **Use `protobuf[cpp]`:** For services that heavily use protocol buffers, installing the C++ implementation (`protobuf[cpp]`) can provide a significant performance boost over the pure Python version.
- **Prefer `manylinux` wheels:** Ensure that the packages you use have pre-compiled wheels available on PyPI for the target Linux architecture. This avoids slow and potentially failing source builds during deployment.
- **Avoid heavy libraries:** For simple tasks, avoid pulling in large libraries like Pandas or NumPy if standard library functions or lighter alternatives suffice.

**Prompt:**
"Analyze the `requirements.txt` file. Are there any large dependencies that could be replaced with lighter alternatives to optimize for Cloud Function cold start times?"