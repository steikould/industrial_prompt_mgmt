# Part 9: Monitoring, Detection & Response

Even with the most robust defenses, we must assume that attacks will occur. A comprehensive monitoring, detection, and response strategy is therefore essential for identifying threats quickly and minimizing their impact. This strategy must cover not only traditional infrastructure but also the unique behaviors of ML models and AI agents.

### Security Monitoring Strategy

Our monitoring strategy is focused on detecting anomalies across four key areas:

1.  **Anomalous Access Patterns:** We monitor for user and service account behavior that deviates from the norm, such as logins from unusual locations, access to resources outside of a user's normal job function, or bulk data downloads.
2.  **ML-Specific Anomalies:** This includes a sudden spike in prediction requests from a single source (potential model extraction), unusual input data distributions (potential adversarial attack), or a sudden degradation in model performance (potential data poisoning).
3.  **Agent Behavior Anomalies:** We monitor for agents making unusual API calls, a high volume of tool invocations, or reasoning patterns that deviate from established norms.
4.  **Infrastructure Anomalies:** We alert on any unexpected changes to the environment, such as the deployment of new services, modifications to IAM policies, or changes to firewall rules.

### Detection Technologies

We leverage a suite of GCP services to implement this strategy:

-   **Cloud Security Command Center (SCC):** This provides a centralized dashboard for security findings. It automatically scans for vulnerabilities and misconfigurations and can be integrated with custom detection rules to flag ML-specific threats.
-   **Chronicle SIEM:** We export all logs to Chronicle, Google's cloud-native SIEM. This allows us to correlate security events from our IT/cloud environment with alerts from our OT monitoring systems, providing a unified view of the entire threat landscape. It also enables powerful behavioral analytics and threat hunting capabilities.

### Incident Response

When an incident is detected, a swift and coordinated response is critical. This is guided by a pre-defined Incident Response Plan and a series of specific playbooks.

**Preparation:**
-   **Incident Response Plan:** Our plan defines the clear stages of a response: Identification, Containment, Eradication, Recovery, and Lessons Learned.
-   **Roles & Responsibilities:** We have a clearly defined incident response team that includes not only security and IT leads, but also ML/AI and OT experts who understand the specific systems involved.

**Response Playbooks:**
We have developed specific, step-by-step playbooks for likely AI-related security incidents.

**Playbook 1: Suspected Model Extraction Attack**
-   **Indicators:** High volume of prediction requests from a single IP or user; systematic input patterns.
-   **Immediate Actions (Automated):**
    1.  Automatically apply a strict rate limit to or block the offending source IP/user.
    2.  Alert the security and ML teams.
    3.  Create an incident ticket.
-   **Follow-on Actions (Manual):**
    1.  Investigate the user/source identity.
    2.  Assess what model information may have been leaked.
    3.  If necessary, rotate the model to a new version to invalidate the leaked information.

**Playbook 2: Suspected Data Poisoning**
-   **Indicators:** Sudden model performance degradation; unexpected predictions on a golden validation set; anomalies in training data statistics.
-   **Immediate Actions (Automated):**
    1.  Halt all automated model deployments.
    2.  Automatically roll back the production endpoint to the last known-good model version.
    3.  Quarantine the suspicious training data batch.
-   **Follow-on Actions (Manual):**
    1.  Forensically analyze the quarantined data to confirm poisoning.
    2.  Review access logs for the data source to identify the point of compromise.
    3.  Retrain the model on a cleaned dataset and validate thoroughly before redeployment.

**Playbook 3: Suspected Compromised AI Agent**
-   **Indicators:** Agent performing unauthorized actions; unusual reasoning patterns in logs; agent attempting to access restricted tools or resources.
-   **Immediate Actions (Automated):**
    1.  Immediately revoke the agent's service account credentials, disabling it.
    2.  Alert the operations team to switch to manual fallback procedures.
    3.  Isolate the agent's execution environment for forensic analysis.
-   **Follow-on Actions (Manual):**
    1.  Review the agent's action and reasoning logs to understand the scope of the compromise.
    2.  Assess the impact on the physical industrial systems.
    3.  Restore the agent from a known-good configuration, apply any necessary security patches or guardrails, and thoroughly test it in a sandbox environment before re-enabling it in production.

By combining continuous monitoring with pre-planned, automated incident response, we can dramatically reduce the time it takes to detect and contain AI-specific security threats, thereby minimizing their potential impact on critical operations.

---
**[Previous: Defense-in-Depth Strategy](./08_defense_in_depth.md) | [Next: Compliance & Governance](./10_compliance_and_governance.md)**