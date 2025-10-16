# Section 4: Feature Engineering with Apache Beam/Dataflow

Raw sensor data, while valuable, is not directly usable for sophisticated analytics or machine learning. The crucial intermediate step is **feature engineering**: the art and science of transforming raw data into informative features that expose underlying patterns and relationships. Our platform elevates this process through a data-product-centric approach using **Golden Feature Tables**, which are created and managed by a powerful, scalable pipeline built on Apache Beam and executed on a managed service like Google Cloud Dataflow.

### The Golden Feature Table Concept

We treat engineered data not as a temporary byproduct of analysis but as a first-class **data product**. This is embodied in the concept of Golden Feature Tables.

-   **Definition:** A Golden Feature Table is a curated, high-quality, versioned, and well-documented dataset designed for a specific analytical purpose (e.g., "Pump Power Consumption Analytics").
-   **Single Source of Truth:** Unlike raw data, these tables contain pre-computed, validated features at multiple, optimal aggregation levels. They serve as the definitive source of truth for any analysis related to pump performance, ensuring consistency across all dashboards, models, and user queries.
-   **Governance:** Each table is governed by a defined schema, data quality rules, and Service Level Agreements (SLAs) for freshness and availability, ensuring reliability and trustworthiness.

### Multi-Level Aggregation Strategy

To serve a variety of business needs, from real-time operator alerts to long-term strategic planning, our feature engineering pipeline computes and stores features at four distinct aggregation levels:

**1. Real-Time Layer (1-5 minute aggregations)**
*   **Use Case:** Immediate anomaly detection, live operator dashboards, and instant alerting.
*   **Features:** Current power consumption vs. a rolling baseline, instantaneous efficiency, real-time outlier flags.
*   **Computational Pattern:** A streaming pipeline using fixed or sliding time windows to provide near-instantaneous feature values.

**2. Operational Layer (15-minute, hourly aggregations)**
*   **Use Case:** Shift-level optimization, intraday pump coordination, and performance tracking for supervisors.
*   **Features:** Rolling statistics (mean, std, min, max), power consumption trends, efficiency scores, and metrics on concurrent pump operations.
*   **Computational Pattern:** Micro-batch processing, which provides a balance between real-time responsiveness and computational efficiency.

**3. Tactical Layer (daily aggregations)**
*   **Use Case:** Daily performance reporting, short-term forecasting, and maintenance planning.
*   **Features:** Daily energy consumption totals and costs, peak demand period identification, cumulative operating hours, and day-over-day comparison metrics.
*   **Computational Pattern:** Daily batch processing jobs that run overnight, incorporating a full day's historical context.

**4. Strategic Layer (weekly, monthly aggregations)**
*   **Use Case:** Executive-level reporting, budget planning, long-term optimization strategy, and capital investment planning.
*   **Features:** Monthly energy spend and trends, seasonal patterns, long-term efficiency degradation curves, and inputs for ROI calculations.
*   **Computational Pattern:** Weekly or monthly batch processing with extended lookback windows to identify long-term trends.

### Covariate Feature Engineering

The platform's true power comes from its ability to create rich, domain-specific features by combining sensor data with contextual information.

**Temporal Features:**
*   Time-based indicators like hour of the day, day of the week, and month of the year.
*   Flags for weekends, holidays, and different operational shifts (day/night).
*   Counters such as time since the last maintenance event or cumulative operating hours.

**Operational Context Features:**
*   Metrics related to the plant's operational state, such as production volume or system demand levels.
*   Features capturing the number of concurrently operating pumps or the required system pressure.

**Environmental Features:**
*   External factors like ambient temperature and humidity, which can significantly impact cooling systems and overall efficiency.

**Derived Pump Features:**
*   **Efficiency Metrics:** Calculating the specific energy consumption (e.g., kWh per gallon pumped) and comparing a pump's actual performance against its manufacturer design curve.
*   **Comparative Features:** Benchmarking a pump against its peers by calculating its relative efficiency ranking or its deviation from the fleet average.
*   **Relationship Features:** Identifying system-level interdependencies, such as the correlation in power consumption between upstream and downstream pumps or patterns in how pumps are operated in coordination.

### Apache Beam/Dataflow Implementation

We use Apache Beam for its unified programming model for both batch and streaming data processing, and Google Cloud Dataflow for its managed, serverless execution environment.

```python
# Conceptual Dataflow pipeline structure
import apache_beam as beam
from apache_beam.options.pipeline_options import PipelineOptions
from apache_beam.transforms import window

# Assume pre-defined ParDo functions for each step
# e.g., ParseSensorEvent(), ComputeRealTimeFeatures(), EnrichWithContext(), etc.

with beam.Pipeline(options=PipelineOptions()) as pipeline:
    # 1. Read from a streaming source like Pub/Sub
    sensor_data = (
        pipeline
        | 'Read Sensor Data' >> beam.io.ReadFromPubSub(topic='projects/my-project/topics/sensors')
        | 'Parse JSON' >> beam.Map(ParseSensorEvent())
    )

    # 2. Create windowed aggregations for the real-time layer
    real_time_features = (
        sensor_data
        | 'Window 1-min' >> beam.WindowInto(window.FixedWindows(60))
        | 'Group by Pump ID' >> beam.GroupByKey()
        | 'Compute Real-Time Features' >> beam.ParDo(ComputeRealTimeFeatures())
    )

    # 3. Enrich with covariate features (e.g., operational context, weather)
    enriched_features = (
        real_time_features
        | 'Add Temporal Features' >> beam.ParDo(AddTemporalFeatures())
        | 'Add Operational Context' >> beam.ParDo(EnrichWithOperationalContext())
    )

    # 4. Compute advanced derived features
    golden_features = (
        enriched_features
        | 'Calculate Efficiency Metrics' >> beam.ParDo(CalculateEfficiency())
        | 'Compute Comparative Features' >> beam.ParDo(ComputeComparativeMetrics())
    )

    # 5. Score the data quality of the generated features
    quality_scored_features = (
        golden_features
        | 'Score Data Quality' >> beam.ParDo(DataQualityScorer())
        | 'Flag Anomalies' >> beam.ParDo(FlagDataAnomalies())
    )

    # 6. Write the final, high-quality features to the Feature Store
    (
        quality_scored_features
        | 'Write to BigQuery' >> beam.io.WriteToBigQuery(
            table='my-project:my_dataset.golden_features',
            schema='SCHEMA_AUTODETECT',
            write_disposition=beam.io.BigQueryDisposition.WRITE_APPEND,
            create_disposition=beam.io.BigQueryDisposition.CREATE_IF_NEEDED
        )
    )
```

### Parameterized Feature Generation

To empower business users, feature creation is not hard-coded. Instead, it's driven by metadata.

-   **Feature Metadata Table:** A central table stores the definition for every feature, including its name, description, aggregation method (e.g., `sum`, `avg`), window size, and data quality rules.
-   **User-Defined Features:** A business user can specify a new feature through a UI. This action updates the metadata table, which in turn triggers a reconfiguration of the Dataflow pipeline. This allows for rapid, A/B testable feature development without custom engineering.

### Data Quality Metrics

Every feature in the Golden Table is accompanied by a set of quality scores to ensure trustworthiness.
-   **Completeness:** The percentage of non-null values over a given period.
-   **Freshness:** The time elapsed since the last data point was received.
-   **Accuracy:** Validation against known physical or operational bounds.
-   **Consistency:** Cross-validation against related sensors to detect deviations.
-   **Reliability:** An overall score based on the health and calibration status of the source sensors.

This comprehensive approach to feature engineering ensures that the data fed into our ML models and user dashboards is not just raw information, but refined, context-rich, and reliable intelligence.

---
**[Previous: Sensor Data Ingestion & Integration](./03_data_ingestion.md) | [Next: Feature Store & Self-Service Query Interface](./05_feature_store_and_ui.md)**