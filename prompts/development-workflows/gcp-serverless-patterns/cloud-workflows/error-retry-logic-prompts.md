# Prompts for Error and Retry Logic in Cloud Workflows

This file provides prompts for implementing robust error handling and retry policies within a Cloud Workflow definition.

**Key Syntax:**
- **`try/except`:** Similar to Python, you can wrap steps that might fail in a `try` block and catch errors in an `except` block. You can access error details (like the HTTP status code) in the `except` block.
- **`retry` predicate:** You can define a custom retry policy for any HTTP call. This allows you to retry on specific status codes (e.g., `503 Service Unavailable`) but not others (e.g., `400 Bad Request`).
- **`for` loop with `range`:** You can combine a loop with a `try/except` block to implement a custom retry loop with a delay.

**Example: Retry with exponential backoff**
```yaml
- try_step:
    try:
      - http_call:
          call: http.get
          args:
              url: "https://api.example.com/data"
          result: api_response
    except:
      - assign:
          last_error: ${last_error}
      - check_retries:
          switch:
            - condition: ${retry_count < 5}
              next: sleep_and_retry
          next: fail_workflow
- sleep_and_retry:
    call: sys.sleep
    args:
        seconds: ${2 * retry_count} # Exponential backoff
    next: try_step
```

**Prompt:**
"You are calling an external API from a Cloud Workflow that is known to be flaky and sometimes returns `502` or `503` errors.
1.  Wrap the HTTP call in a `try/except` block.
2.  Implement a retry policy that:
    - Retries up to 5 times.
    - Only retries if the HTTP status code is `502` or `503`.
    - Uses an exponential backoff strategy for the delay between retries.
3.  If the call fails after all retries, the workflow should log the final error and exit gracefully."