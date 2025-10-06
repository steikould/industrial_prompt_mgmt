# Prompts for Pub/Sub Trigger Patterns

This file contains prompts for common patterns when using Pub/Sub to trigger a Gen2 Cloud Function.

**Key Concepts:**
- **CloudEvent:** The function receives a `cloudevents.http.CloudEvent` object. The actual Pub/Sub message is in `event.data["message"]`.
- **Payload:** The message payload is base64-encoded and can be found at `event.data["message"]["data"]`. It must be decoded.
- **Attributes:** Custom message attributes are in `event.data["message"]["attributes"]`.
- **Idempotency:** Pub/Sub offers at-least-once delivery. Design your function to be idempotent to handle duplicate messages gracefully. This might involve tracking processed message IDs in a database like Firestore or Redis.

**Prompt:**
"Generate a Cloud Function that is triggered by a Pub/Sub topic. The function should:
1. Receive a CloudEvent.
2. Decode the base64-encoded message payload.
3. Parse the payload, assuming it's a JSON string.
4. Extract a specific key from the parsed JSON.
5. Log the value of the key."