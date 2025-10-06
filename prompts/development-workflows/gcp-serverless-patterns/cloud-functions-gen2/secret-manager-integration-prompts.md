# Prompts for Secret Manager Integration

This file contains prompts for securely accessing secrets from Google Secret Manager within a Cloud Function.

**Best Practice:**
- **Do not hardcode secrets.**
- **Use the Secret Manager client library.**
- **Grant the function's service account the "Secret Manager Secret Accessor" IAM role** on the specific secrets it needs to access. This follows the principle of least privilege.
- **Access secrets at startup:** For secrets that don't change often (like API keys), access them once when the function instance starts up and store them in a global variable. This avoids the latency of accessing Secret Manager on every function invocation.

**Prompt:**
"You have a Cloud Function that needs to connect to a third-party API using an API key.
1.  Write a Python helper function that retrieves the latest version of a secret from Secret Manager given a secret ID.
2.  Modify the Cloud Function to call this helper at startup to fetch the API key and store it in a global variable.
3.  Ensure the function's service account has the correct IAM permissions via Terraform."