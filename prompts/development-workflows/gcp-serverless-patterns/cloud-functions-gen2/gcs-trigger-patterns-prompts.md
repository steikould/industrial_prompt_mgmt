# Prompts for GCS Trigger Patterns

This file contains prompts for patterns related to Gen2 Cloud Functions triggered by Google Cloud Storage (GCS) events.

**Key Event Types:**
- `google.cloud.storage.object.v1.finalized`: Triggered when a new object is created (or a new version of an existing object is created). This is the most common trigger type.
- `google.cloud.storage.object.v1.deleted`: Triggered when an object is permanently deleted.
- `google.cloud.storage.object.v1.archived`: Triggered when an object's version is archived.
- `google.cloud.storage.object.v1.metadataUpdated`: Triggered when an object's metadata changes.

**Event Payload:**
- The function receives a CloudEvent where the `subject` contains the object name and the `data` payload contains details about the object, including `bucket` and `name`.

**Prompt:**
"Generate a Cloud Function that triggers on the `google.cloud.storage.object.v1.finalized` event in a specific GCS bucket. The function should:
1. Log the name of the bucket and the file that triggered the event.
2. Download the file content using the GCS client library.
3. Perform a simple transformation on the content (e.g., count the number of lines).
4. Log the result."