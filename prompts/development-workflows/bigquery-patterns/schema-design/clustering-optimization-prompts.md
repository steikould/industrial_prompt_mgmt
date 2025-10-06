# Prompts for BigQuery Clustering Optimization

This file provides prompts about using clustering in BigQuery tables to optimize query performance and reduce costs.

**What is Clustering?**
- While partitioning works on a macro level (dividing a table into large segments), clustering works on a micro level.
- Clustering physically sorts the data *within each partition* based on the values of one or more columns (up to four).
- When you filter on a clustered column in your `WHERE` clause, BigQuery uses the sorted blocks to avoid scanning all the data within a partition.

**Partitioning + Clustering = Performance**
- The most powerful optimization strategy is to combine partitioning and clustering.
- **Example:** A table of user actions is **partitioned** by `event_date` and **clustered** by `user_id`.
- A query for `WHERE event_date = '2023-10-27' AND user_id = 'abc-123'` will first prune to just the partition for that date, and then within that partition, it will use the clustered index to read only the blocks containing data for `user_id` 'abc-123'.

**When to Use Clustering:**
- On columns with high cardinality (many distinct values) that you frequently use as filters.
- Good candidates: `user_id`, `session_id`, `customer_id`, `product_id`, `pi_tag`.

**Prompt:**
"You have a large table of SCADA data that is partitioned by `timestamp`. The schema includes a `pi_tag` column (a string identifying the sensor). Queries that filter for a specific list of `pi_tag` values within a date range are still scanning a lot of data.
1.  Explain how adding clustering on the `pi_tag` column would improve the performance of these queries.
2.  Modify the `CREATE TABLE` statement to include clustering by `pi_tag`.
3.  Explain the order in which BigQuery applies partitioning and clustering to optimize a query."