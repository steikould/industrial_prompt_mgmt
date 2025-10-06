# Prompts for BigQuery Partitioning Strategies

This file provides prompts about how and when to partition BigQuery tables to optimize query performance and reduce cost.

**What is Partitioning?**
- Partitioning divides a large table into smaller segments (partitions) based on the values in a specific column.
- When you query a partitioned table and filter on the partitioning column, BigQuery can scan only the relevant partitions, dramatically reducing the amount of data processed. This saves both time and money.

**Common Strategies:**
1.  **Time-unit Column (Most Common):** Partition by a `TIMESTAMP`, `DATE`, or `DATETIME` column. You can choose the granularity (hour, day, month, year). Daily partitioning is a very common and effective strategy for event data.
2.  **Integer Range:** Partition by an integer column. This is useful for tables with a key like `customer_id` where you can create partitions for ranges of customers (e.g., partition 1 for IDs 1-1,000,000, partition 2 for 1,000,001-2,000,000, etc.).

**Key Requirement:**
- To get the benefit of partitioning, your queries **must** include a `WHERE` clause that filters on the partitioning column. This is called "partition pruning."

**Prompt:**
"You have a 10TB table of user events that is not partitioned. Queries that look for events in the last 7 days are scanning the entire 10TB table and are slow and expensive.
1.  Explain how partitioning the table by the `event_timestamp` column would solve this problem.
2.  Provide the `CREATE TABLE` DDL statement to create a new, partitioned version of the table with daily partitioning.
3.  Write an example query that demonstrates partition pruning."