# Section 3: Sensor Data Ingestion & Integration

A successful AI platform is built on a foundation of comprehensive and high-quality data. This requires a flexible and robust ingestion layer capable of integrating data from a wide variety of sources, each with its own format, frequency, and potential quality issues. Our platform is designed to handle the complex reality of a modern industrial data landscape.

### Data Sources

Our system ingests two primary categories of data: core performance metrics from the pumps themselves and crucial contextual data that provides the "why" behind the numbers.

**Primary Metrics:**
*   **Power Consumption:** Kilowatts (kW) and kilowatt-hours (kWh) are the fundamental measures of energy usage.
*   **Motor Vitals:** Current (amps) and voltage (volts) provide insight into the electrical health of the motor.
*   **Hydraulics:** Flow rate and pressure are key indicators of the pump's workload and performance.
*   **Condition Monitoring:** Temperature (motor, bearings, fluid) and vibration signatures are leading indicators of mechanical stress and potential failures.
*   **Operational State:** Pump speed (RPM) and calculated efficiency metrics provide a direct view of the pump's operating point.

**Contextual Data:**
*   **Asset Information:** Equipment specifications, manufacturer ratings, and performance curves.
*   **Operational Schedules:** Planned operational schedules and control system setpoints.
*   **Maintenance History:** A log of all maintenance events, repairs, and component replacements.
*   **Environmental Factors:** Weather data, particularly ambient temperature and humidity for HVAC and cooling systems.
*   **Business Context:** Production schedules and product demand forecasts.
*   **Economic Data:** Real-time or time-of-use energy pricing from utility providers.

### Integration Patterns

No single integration method fits all sources. Our platform employs a multi-pronged approach:

*   **OSIsoft PI System:** For facilities with existing PI systems, we leverage the **PI Web API** for robust, scalable access to time-series sensor data. With its library of over 450 interfaces, this is a primary channel for OT data.
*   **SCADA Systems:** We connect to Supervisory Control and Data Acquisition (SCADA) systems using the industry-standard **OPC-UA protocol**, ensuring compatibility with a wide range of industrial control hardware.
*   **Modern IoT Platforms:** For newer assets, we integrate directly with cloud-based IoT platforms like **AWS IoT Core** and **Azure IoT Hub**.
*   **Manual & Supplementary Data:** We provide simple interfaces for manual data uploads (e.g., via CSV) for information not available in automated systems, such as maintenance logs or offline readings.
*   **External APIs:** The platform ingests data from external services via REST APIs, such as weather forecasts and real-time energy pricing feeds.

### Data Quality at Ingestion

Operational Technology (OT) data is notoriously challenging. Our ingestion layer has a strong focus on data quality from the moment data arrives:

*   **Handling Common OT Issues:** The system is designed to identify and flag varying identifiers, unevenly spaced timestamps, value spikes, out-of-range readings, and bad sensor data.
*   **Timestamp Alignment:** A critical step is to synchronize timestamps across all sensors to a common, standardized time zone (UTC), ensuring that events can be accurately correlated.
*   **Missing Data Imputation:** We employ intelligent imputation strategies to handle gaps in data, from simple linear interpolation to more advanced model-based methods, while always flagging imputed values for transparency.
*   **Calibration Drift Detection:** The platform monitors sensor data for gradual drift, a common sign of a sensor requiring recalibration, preventing slow degradation of data quality.
*   **Buffering and Resilience:** Ingestion endpoints are designed to buffer data during network disruptions, ensuring no data is lost during periods of intermittent connectivity.

By addressing these data source and quality challenges at the point of ingestion, we ensure that the rest of the analytics pipeline is built upon a foundation of clean, reliable, and trustworthy data.

---
**[Previous: Architecture Overview](./02_architecture_overview.md) | [Next: Feature Engineering with Apache Beam/Dataflow](./04_feature_engineering.md)**