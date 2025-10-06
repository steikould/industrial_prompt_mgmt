# Prompts for Leveraging BigQuery Query Caching

This file provides prompts about BigQuery's automatic query caching feature.

**How Caching Works:**
- When you run a query, BigQuery caches the results in a temporary table.
- If you run the **exact same query string** again, BigQuery will return the results directly from the cache instead of re-running the query.
- **Benefits:**
    - **Instantaneous:** Results are returned in milliseconds.
    - **Free:** Cached query results are free of charge. The query does not process any bytes and does not consume any slots.
- **Cache Invalidation:** The cache is automatically invalidated if the data in any of the tables referenced by the query changes.

**Common Use Cases:**
- Re-running a query during development or analysis.
- A BI dashboard being loaded by multiple users around the same time. The first user pays for the query, and subsequent users get the cached result for free (as long as the underlying data hasn't changed).

**Common Pitfall: Non-Deterministic Functions**
- Using non-deterministic functions in your query will prevent it from being cached.
- **Examples:** `CURRENT_TIMESTAMP()`, `NOW()`.
- If you need to filter by the current time, it's better to pass the timestamp in as a parameter from your application code rather than calling the function directly in SQL.

**Prompt:**
"A developer runs the same complex analytical query multiple times while refining their code, and they are being charged for the full query cost each time. The query is:
```sql
SELECT
  user_segment,
  COUNT(*) as event_count
FROM
  my_project.my_dataset.events
WHERE
  event_timestamp > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 HOUR)
GROUP BY 1
```
1.  Explain why this query is not being served from the BigQuery cache on subsequent runs.
2.  How could the developer modify their workflow to take advantage of caching while still achieving a similar result?
3.  Where in the BigQuery UI's "Job information" tab can you see if a query result was served from the cache?"