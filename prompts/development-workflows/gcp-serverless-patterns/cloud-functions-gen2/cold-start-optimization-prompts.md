# Prompts for Cold Start Optimization

This file contains prompts for strategies to minimize the impact of cold starts in Cloud Functions.

**What is a Cold Start?**
A cold start happens when your function is invoked and there isn't an idle, pre-warmed instance ready to serve the request. GCP has to create a new instance, which involves downloading your code and starting the runtime. This adds latency to the first request.

**Key Strategies:**
1.  **Minimize Dependencies:** The fewer dependencies you have, the smaller your deployment package and the faster it can be downloaded and installed.
2.  **Use Global Variables:** Initialize objects that can be reused across invocations (like GCP clients or database connection pools) in the global scope. This code runs only once per instance, during the cold start.
3.  **Configure Minimum Instances:** For latency-sensitive applications, you can configure a minimum number of instances to be kept warm and ready to serve traffic. This has cost implications.
4.  **Lazy Loading:** Avoid importing large modules at the top level if they are only used in specific, less-common code paths. Import them inside the function that needs them.

**Prompt:**
"Analyze the provided Cloud Function code. Identify any client initializations or other expensive operations happening inside the main function body that could be moved to the global scope to reduce per-request latency. Refactor the code to apply this optimization."