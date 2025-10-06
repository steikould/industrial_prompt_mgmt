# Prompts for BigQuery Partition Pruning

This file provides prompts focused on ensuring that queries correctly leverage table partitioning to minimize data scanned.

**What is Partition Pruning?**
- It is the single most important concept for controlling BigQuery costs.
- When you run a query against a partitioned table, if you include a filter on the partitioning column in your `WHERE` clause, BigQuery can determine which partitions it needs to scan *before* starting the query. It "prunes" or ignores all other partitions.
- The query cost is based on the size of the partitions it scans, not the total size of the table.

**How to Check for Pruning:**
- **Query Validator (Dry Run):** Before running a query in the BigQuery UI, the validator will show an estimate of the data to be processed. If this number is much smaller than the total table size, pruning is working. If it's equal to the table size, pruning is not working.
- **`INFORMATION_SCHEMA.JOBS`:** After running a query, you can inspect the job details to see the `total_bytes_processed`.

**Common Mistake:**
- Applying a function to the partitioning column in the `WHERE` clause can prevent BigQuery from being able to prune.
- **Bad (No Pruning):** `WHERE DATE(my_timestamp_column) = '2023-10-27'`
- **Good (Pruning Works):** `WHERE my_timestamp_column >= '2023-10-27 00:00:00' AND my_timestamp_column < '2023-10-28 00:00:00'`

**Prompt:**
"A user has written the following query against a large, timestamp-partitioned table, and it is scanning the entire table.
```sql
SELECT COUNT(*)
FROM my_project.my_dataset.events
WHERE FORMAT_TIMESTAMP('%Y-%m-%d', event_timestamp) = '2023-10-01'
```
1.  Explain why this query is not benefiting from partition pruning.
2.  Rewrite the query to correctly leverage partition pruning while achieving the same result.
3.  Describe how the user could have used the query validator in the UI to catch this issue before running the expensive query."