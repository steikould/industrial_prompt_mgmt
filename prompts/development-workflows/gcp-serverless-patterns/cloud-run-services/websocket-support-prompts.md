# Prompts for WebSocket Support on Cloud Run

This file contains prompts and guidance for deploying applications that use WebSockets on Cloud Run.

**Key Requirement: Session Affinity**
- WebSockets require a persistent connection between the client and a specific server instance.
- By default, Cloud Run might route subsequent requests from the same client to different instances.
- To use WebSockets, you **must** enable **session affinity**. This configures the load balancer to route requests from the same client (based on a cookie) to the same Cloud Run instance.

**Configuration:**
- Session affinity is a setting on the Cloud Run service itself. It can be enabled with a flag in the `gcloud` deploy command or an attribute in the Terraform resource.
- `gcloud run deploy --session-affinity`
- `google_cloud_run_v2_service` resource: `template { containers { ... } scaling { ... } }` - session affinity is configured at the service level.

**Frameworks:**
- FastAPI has excellent built-in support for WebSockets.
- Other libraries like `websockets` can also be used.

**Prompt:**
"You are building a real-time chat application that requires WebSocket support.
1.  Generate a FastAPI application with a `/ws` endpoint that handles WebSocket connections.
2.  Provide the Terraform configuration for a Cloud Run service to deploy this application.
3.  Crucially, ensure that **session affinity** is enabled in the Terraform configuration to ensure WebSocket connections are stable."