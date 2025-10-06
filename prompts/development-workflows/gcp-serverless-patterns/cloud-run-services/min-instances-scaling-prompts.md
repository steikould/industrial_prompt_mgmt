# Prompts for Minimum Instances Scaling on Cloud Run

This file contains prompts related to configuring the `min-instances` setting on Cloud Run to manage cold starts.

**Use Case:**
- For latency-sensitive applications where the delay from a cold start is unacceptable.
- By setting `min-instances` to 1 or more, you ensure that there are always instances running and ready to serve traffic immediately.

**Trade-offs:**
- **Performance:** Eliminates cold starts for incoming traffic, providing consistent low latency.
- **Cost:** You pay for the instances to be idle 24/7, even when they are not serving requests. This is a significant cost consideration compared to scaling to zero.

**When to Use:**
- Public-facing APIs where user experience is critical.
- Services that are part of a synchronous chain of calls where a cold start would cascade delays.
- Services that have a long initialization time (e.g., loading large ML models or data caches).

**Prompt:**
"You have a user-facing API deployed on Cloud Run that serves real-time stock data. Users are complaining about occasional slow responses, which have been traced to cold starts.
1.  Explain the trade-offs of using the `min-instances` setting.
2.  Provide the Terraform configuration to update the Cloud Run service to set `min-instances` to `1`.
3.  Describe how you would monitor the cost impact of this change using GCP billing reports."