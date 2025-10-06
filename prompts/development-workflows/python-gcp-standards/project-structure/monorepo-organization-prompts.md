# Prompts for Monorepo Organization

This file contains prompts and strategies for organizing multiple services and libraries within a single monorepo.

**Key Concepts:**
- **`services/` directory:** Contains individual Cloud Functions and Cloud Run services.
- **`libs/` directory:** Contains shared Python libraries consumed by the services.
- **Tooling:** Using `lerna`-like scripts or `bazel` for managing dependencies and running tests across the monorepo.
- **CI/CD:** Configuring GitHub Actions to only build and deploy services that have changed.