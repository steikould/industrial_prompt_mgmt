# Prompts for BigQuery Time-Series Schema Design

This file provides prompts for designing efficient schemas for time-series data in BigQuery, which is common in SCADA, IoT, and financial applications.

**Key Best Practices:**
- **Timestamp Column:** Have a top-level `TIMESTAMP` or `DATETIME` column. This will be used for partitioning.
- **Identifier Column:** Have a column that identifies the source of the data (e.g., `sensor_id`, `pi_tag`, `meter_id`). This will be used for clustering.
- **Wide vs. Narrow:**
    - **Narrow Format:** `(timestamp, sensor_id, value)`. This is generally the **preferred** format. It's flexible, easy to query, and scales well as you add new sensors.
    - **Wide Format:** `(timestamp, sensor_1_value, sensor_2_value, ...)` This is generally an **anti-pattern**. It's inflexible (requires a schema change to add a sensor) and can lead to very wide tables with many `NULL` values.
- **Data Type Selection:** Use `FLOAT64` for measurements, `STRING` for identifiers, and `TIMESTAMP` for time.

**Prompt:**
"You need to design a BigQuery table to store temperature readings from thousands of sensors across multiple facilities.
1.  Propose a schema that follows the 'narrow' table format best practice.
2.  Specify which column should be used for time-based partitioning.
3.  Specify which column(s) should be used for clustering to improve query performance when filtering for specific sensors."