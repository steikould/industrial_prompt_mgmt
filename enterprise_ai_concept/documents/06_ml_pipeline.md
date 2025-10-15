# Section 6: ML Pipeline - Forecasting & Outlier Detection

The intelligence of our platform is driven by a sophisticated, automated Machine Learning (ML) pipeline. This pipeline is not static; it's dynamically triggered by user interactions, ensuring that the insights provided are always relevant to the user's immediate analytical needs. It focuses on two core capabilities: forecasting future behavior and detecting anomalous deviations from that behavior.

### Automated ML Pipeline Trigger

The ML pipeline is designed for on-demand execution. When a user in the self-service interface defines a dataset and clicks "Analyze" or "Get Predictions," the following automated workflow is triggered:

1.  The user's query, including the selected assets, time frame, and features, is sent to the ML orchestration layer (e.g., Kubeflow Pipelines).
2.  The system intelligently selects the appropriate ML models based on the context of the query, such as the chosen time horizon (e.g., next 24 hours vs. next 6 months) and the specific features included.
3.  The selected models are executed on the precise, point-in-time correct data retrieved from the Feature Store.
4.  The results, complete with predictions, confidence intervals, and explanations, are returned to the user's dashboard for visualization and analysis.

### Forecasting Models: Predicting Future Consumption

To provide accurate forecasts across different planning horizons, the platform employs a suite of specialized models.

**Short-Term Forecasting (Next 1-24 hours):**
*   **Models:** **Random Forest** and **XGBoost** using sliding window features (e.g., statistics from the last 60-120 minutes), and **LSTM (Long Short-Term Memory)** networks to capture fine-grained hourly and daily patterns.
*   **Features:** Recent power consumption trends, scheduled operations for the next shift, short-term weather forecasts, and time-of-day indicators.
*   **Use Case:** Enabling operators to anticipate near-term load changes and make proactive adjustments.

**Medium-Term Forecasting (1-7 days):**
*   **Models:** Facebook's **Prophet** model, which excels at handling daily patterns and holiday effects, and **SARIMA** (Seasonal Auto-Regressive Integrated Moving Average) for capturing strong weekly seasonality.
*   **Features:** Historical daily averages, production schedules for the upcoming week, and day-of-week effects.
*   **Use Case:** Supporting weekly operational planning and maintenance scheduling.

**Long-Term Forecasting (1-12 months):**
*   **Models:** **Ensemble methods** that combine trend extrapolation with change point detection, seasonal decomposition, and regression models that can incorporate macroeconomic indicators.
*   **Features:** Monthly aggregated data, long-term growth trends, and information on planned capital improvements.
*   **Use Case:** Driving annual budget planning and strategic capital investment decisions.

**Model Outputs:**
Every forecast is delivered with:
*   Point forecasts along with **confidence intervals** (e.g., 50%, 80%, 95%) to communicate uncertainty.
*   Model accuracy metrics (MAPE, RMSE) to provide transparency on performance.
*   **Feature importance scores** that explain which factors are contributing most to the forecast.
*   The ability to run **what-if scenario forecasts** based on user-defined assumptions.

### Outlier Detection: Finding the Needle in the Haystack

The platform uses a multi-layered approach to anomaly detection, moving beyond simple thresholds to identify truly meaningful deviations.

**Statistical Methods:**
*   For univariate data, we use classic methods like **Z-score**, modified Z-score, and the **Interquartile Range (IQR)** method to flag statistical outliers.

**ML-Based Detection:**
*   To capture complex, multivariate anomalies, we employ more advanced algorithms:
    *   **Isolation Forest:** Efficiently identifies anomalies in high-dimensional data.
    *   **Autoencoders:** A type of neural network trained to reconstruct normal data; high reconstruction error signals an anomaly.
    *   **One-Class SVM:** A novelty detection algorithm that learns a boundary around "normal" data points.

**Contextual Outlier Assessment:**
Crucially, the system understands that not all outliers are problems. An alert for high power consumption is not useful if it's due to a scheduled, high-demand production run. The platform enriches its outlier analysis with operational context, such as planned maintenance windows or production schedule changes, to classify outliers intelligently:
*   **True Anomaly:** An unexpected deviation that requires investigation.
*   **Expected Deviation:** An outlier that is explainable by operational context.
*   **Data Quality Issue:** An outlier likely caused by a sensor malfunction.

**Outlier Outputs:**
*   An **anomaly score** (0-100) for each data point.
*   A **classification** of the anomaly type.
*   A list of **contributing factors** and potential root cause hints.
*   A **recommended action** (e.g., *Investigate*, *Ignore*, *Create Maintenance Ticket*).

### Data Quality as an Input

The platform's comprehensive data quality scores (Completeness, Freshness, Accuracy, etc.) are not just for monitoring; they are a critical input to the ML pipeline. If the quality of a feature drops below a predefined threshold, it can trigger:
*   Alerts to the relevant data and operations teams.
*   Automatic exclusion of that feature from the ML model to prevent corruption of the results.
*   An adjustment to the model's confidence score, transparently communicating the reduced trust in the output.

This ensures that the intelligence delivered to the user is always built upon a foundation of data that is understood, measured, and trusted.

---
**[Previous: Feature Store & Self-Service Query Interface](./05_feature_store_and_ui.md) | [Next: AI-Powered Intelligence Layer - RAG & Recommendations](./07_ai_intelligence_layer.md)**