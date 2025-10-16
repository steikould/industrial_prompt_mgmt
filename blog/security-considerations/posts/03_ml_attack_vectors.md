# Part 3: Attack Vectors - ML Model Specific

Machine learning models, despite their sophistication, are susceptible to a new class of attacks that target their unique properties. In an industrial context, where models are used for critical tasks like fault prediction, these vulnerabilities can have severe consequences.

### Attack Vector 1: Adversarial Attacks

**Description:** Adversarial attacks involve feeding a model with carefully crafted, malicious inputs that are designed to cause it to make an incorrect prediction. To a human observer, this input might look perfectly normal, but it exploits the model's decision-making process.

**Industrial Context:** Consider a predictive maintenance model that analyzes vibration, temperature, and pressure data to predict pump failures. An attacker could subtly manipulate the incoming sensor data to hide the signs of an impending failure.

**Attack Examples:**
-   **Evasion Attack:** The most common form, where the goal is to evade detection. An attacker could gradually shift temperature readings to keep them just below the anomaly detection threshold, allowing a pump to overheat without triggering an alarm. The impact could be catastrophic equipment failure, leading to safety incidents and environmental damage.
-   **Exploratory Attack:** The attacker probes the model's decision boundaries by sending systematic queries to its API. By observing the outputs, they can reverse-engineer the model's logic, enabling them to craft a more effective and targeted evasion attack later.

**Technical Details:** These attacks can be digital (manipulating data at the API level) or physical (spoofing the sensor itself). Common techniques include the Fast Gradient Sign Method (FGSM) and Projected Gradient Descent (PGD), which use the model's own gradients to find the smallest possible perturbation to fool it.

**Mitigations:**
-   **Input Validation:** Implement strict, physics-based bounds checking on all sensor data. A temperature reading cannot physically exceed a certain limit, and its rate of change is also constrained. Cross-sensor consistency checks can also detect anomalies (e.g., if pressure rises but flow rate does not).
-   **Adversarial Training:** Proactively include adversarial examples in the model's training data. This process, which involves generating perturbations during training, can make the final model more robust to input variations.
-   **Ensemble Models:** Use multiple models with different architectures. An attacker would need to fool all models simultaneously, and a disagreement between the models can itself be a trigger for a security alert.
-   **Uncertainty Quantification:** Design models to report not just a prediction, but also a confidence score. Predictions with low confidence can be automatically flagged for human review.

### Attack Vector 2: Data Poisoning

**Description:** Data poisoning involves an attacker injecting malicious data into the training dataset. This corrupts the model during the training process, causing it to learn incorrect patterns or even hidden backdoors.

**Industrial Context:** This is a major concern for systems that continuously retrain on new data from sources like a PI System. An attacker could compromise the data historian, inject malicious data via an API, or use insider access to alter training data stored in the cloud.

**Attack Examples:**
-   **Label Flipping:** An attacker changes the labels on training examples. For instance, they could relabel historical "pump failure" events as "normal operation." The resulting model would be effectively blind to the very failures it was designed to detect.
-   **Backdoor Injection:** The attacker inserts a hidden trigger into the training data. For example, they could teach the model that whenever a specific, unusual combination of sensor readings occurs, it should always predict "normal," regardless of other indicators. This allows the attacker to selectively disable the monitoring system on command.

**Mitigations:**
-   **Data Provenance Tracking:** Use tools like Vertex ML Metadata and Kubeflow Metadata to maintain a complete, auditable lineage for all training data. Cryptographic signatures can be used to verify the integrity of data batches.
-   **Statistical Analysis of Training Data:** Before training, perform outlier detection and distribution analysis on the dataset to identify suspicious data points or sources.
-   **Trusted Data Sources:** Enforce strict access controls on all systems that store or transmit training data. Use authenticated and encrypted ingestion channels.
-   **Regular Model Validation:** Continuously test models against a "golden" validation set that is known to be clean. Monitor for any unexpected degradation in performance, which could be a sign of poisoning.

### Attack Vector 3: Model Theft & IP Leakage

**Description:** The ML models themselves are valuable intellectual property. An attacker may attempt to steal the model's parameters, architecture, or even the sensitive training data it was built from.

**Industrial Context:** A proprietary model for optimizing pipeline flow could represent years of domain expertise and a significant competitive advantage. Leaking this model or the operational data it contains would be a major blow.

**Attack Examples:**
-   **Model Extraction:** An attacker queries a model's prediction API repeatedly with a wide range of inputs to reverse-engineer its behavior and reconstruct a functionally equivalent model.
-   **Training Data Inference:** The attacker uses the model's predictions to infer information about the private data it was trained on. This could involve determining if a specific event was in the training set (membership inference) or learning sensitive attributes about the training data.

**Mitigations:**
-   **API Rate Limiting and Monitoring:** Implement per-user query limits and use anomaly detection to spot suspicious query patterns indicative of a model extraction attempt.
-   **Differential Privacy:** Add a carefully calibrated amount of noise to the model's training process or outputs. This provides mathematical guarantees about how much information can be leaked about the training data, though it often comes with a trade-off in model accuracy.
-   **Model Watermarking:** Embed a unique, secret identifier into the model's weights, which can be used to prove if a stolen model is being used elsewhere.
-   **Strict Access Controls:** Apply the principle of least privilege to the model registry and storage buckets where model artifacts are stored. Encrypt all model artifacts at rest and in transit.

---
**[Previous: Understanding the Threat Landscape](./02_threat_landscape.md) | [Next: Attack Vectors - AI Agent Specific](./04_agent_attack_vectors.md)**