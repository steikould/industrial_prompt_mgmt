# Part 7: Data Pipeline Security (Sensor to Model)

The journey of data from an industrial sensor on the OT network to an ML model in the cloud is fraught with security risks. Securing this end-to-end pipeline requires a layered approach, applying specific controls at each stage of the data's lifecycle.

### The End-to-End Pipeline Architecture

A typical industrial AI data pipeline can be visualized as follows:

```
[OT Network: Sensors, PLCs]
    ↓ (OT/IT Boundary)
[Data Historian: OSIsoft PI System]
    ↓ (Authenticated API)
[Cloud Ingestion: Pub/Sub, Dataflow]
    ↓ (Encrypted Transport)
[Data Lake & Feature Store: Cloud Storage, BigQuery, Vertex AI Feature Store]
    ↓ (Authenticated & Authorized Access)
[ML Model Training & Serving: Vertex AI]
```

### Security at Each Layer

**Layer 1: The OT Network (Data Generation)**
-   **Challenge:** Legacy equipment, proprietary protocols, and high-availability requirements make this layer difficult to secure.
-   **Security Measures:**
    -   **Network Segmentation:** Follow the Purdue Model for Industrial Control Systems. Isolate the process control network (Levels 0-2) from the enterprise IT network (Levels 4-5) with a secure DMZ (Level 3).
    -   **Data Diodes:** Where possible, use hardware-enforced, one-way data diodes to ensure that data can only flow *out* of the OT network to the IT/cloud environment, and no commands can flow back in.
    -   **OT Anomaly Detection:** Use specialized OT security monitoring tools (e.g., Nozomi, Claroty) to detect unauthorized devices or anomalous traffic patterns on the industrial network.

**Layer 2: The Data Historian (e.g., PI System)**
-   **Challenge:** The data historian is often the bridge between the OT and IT worlds, making it a high-value target.
-   **Security Measures:**
    -   **Harden the PI Server:** Isolate it on a secure network segment, enforce strong authentication (MFA for administrators), and apply the principle of least privilege for access to PI points (sensor tags).
    -   **Data Integrity:** Enable digital signatures on PI archives to detect tampering of historical data.

**Layer 3: Cloud Ingestion**
-   **Challenge:** Securely transferring data from the on-premises historian to the cloud.
-   **Security Measures:**
    -   **Authenticated & Encrypted Transport:** Use authenticated APIs (e.g., the PI Web API with OAuth 2.0) and encrypt all data in transit using TLS 1.3. For high-volume streams, a dedicated VPN or Cloud Interconnect is recommended.
    -   **Data Validation at the Boundary:** Before data is published to a cloud service like Pub/Sub, it should pass through a validation function that checks its schema, verifies that values are within physics-based bounds, and checks for abnormal rates of change. Suspicious data should be quarantined for investigation, not ingested.

**Layer 4: Data Lake & Feature Store**
-   **Challenge:** Protecting large volumes of potentially sensitive training data and curated features in cloud storage.
-   **Security Measures:**
    -   **Strict Access Control:** Use IAM to enforce the principle of least privilege on all storage buckets and tables. By default, there should be no public access.
    -   **Encryption:** Use Customer-Managed Encryption Keys (CMEK) for all sensitive training data and feature stores.
    -   **Data Classification:** Use tags and labels to classify data by sensitivity level, and apply stricter security controls to more sensitive data.

**Layer 5: Feature Engineering Pipeline (e.g., Dataflow)**
-   **Challenge:** Ensuring the code that transforms raw data into features is secure and the environment it runs in is locked down.
-   **Security Measures:**
    -   **Secure Runtime Environment:** Configure Dataflow pipelines to run with private IPs only, within a secure VPC, and with a dedicated, least-privilege service account.
    -   **Code Security:** Integrate security scanning tools (for secrets, dependencies, and static analysis) into the CI/CD pipeline for your feature engineering code.

By securing each of these layers, we build a data pipeline that is resilient against attacks at any point in its lifecycle, ensuring the integrity and confidentiality of the data that our AI systems rely on.

---
**[Previous: Agentspace Security Considerations](./06_agentspace_security.md) | [Next: Defense-in-Depth Strategy](./08_defense_in_depth.md)**