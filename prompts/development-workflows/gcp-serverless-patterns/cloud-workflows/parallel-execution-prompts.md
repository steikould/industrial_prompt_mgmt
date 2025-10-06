# Prompts for Parallel Execution in Cloud Workflows

This file provides prompts for executing steps in parallel within a Cloud Workflow to improve performance.

**Use Case:**
- You have a list of items (e.g., user IDs, file paths, product SKUs) and you need to perform the same action on each of them.
- Instead of processing them sequentially in a loop, you can process them all at once in parallel, significantly reducing the total execution time.

**Key Syntax:**
- **`parallel`:** This keyword defines a block where steps can run concurrently.
- **`for` loop:** A `for` loop inside a `parallel` step will iterate over a list and launch a parallel execution branch for each item.
- **`shared` variables:** To safely write results from parallel branches back to a common variable, you must declare that variable in the `shared` section of the `parallel` step. This prevents race conditions.

**Example: Processing files in parallel**
```yaml
- process_files_in_parallel:
    parallel:
      shared: [processed_results]
      for:
        value: file_path
        in: ${incoming_file_paths}
        steps:
          - call_processing_function:
              call: http.post
              args:
                url: "https://my-function-url"
                body:
                  path: ${file_path}
              result: processing_result
          - append_result:
              assign:
                processed_results: ${list.concat(processed_results, [processing_result.body])}
```

**Prompt:**
"You receive a list of GCS file paths in a workflow. For each file, you need to call a Cloud Function to calculate its size.
1.  Generate a Cloud Workflow that takes a list of file paths as input.
2.  Use a `parallel for` loop to call a 'calculate-size' Cloud Function for each path concurrently.
3.  Store the size returned from each function call in a shared list.
4.  After the parallel step completes, the workflow should return the list of all calculated sizes."