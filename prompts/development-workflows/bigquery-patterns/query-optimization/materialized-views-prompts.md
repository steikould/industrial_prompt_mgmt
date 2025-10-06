# Prompts for Using BigQuery Materialized Views

This file provides prompts for creating and using Materialized Views (MVs) to accelerate common and predictable queries, especially for BI dashboards.

**What is a Materialized View?**
- A materialized view pre-computes the result of a query and caches it.
- When you query the MV, you are reading the pre-computed, cached data, which is extremely fast and processes far less data than running the full query on the base tables.
- BigQuery automatically and transparently refreshes the MV in the background when the base tables change.
- **Smart Tuning:** BigQuery's query optimizer is "MV-aware." If you query the *base tables* with a query that matches the MV's definition, BigQuery will automatically rewrite your query to use the MV instead, without you needing to change your dashboard's SQL.

**When to Use:**
- The perfect use case is a BI dashboard (Looker, Tableau, etc.) that runs the same aggregation query over and over again.
- For pre-aggregating data to a different granularity (e.g., creating a daily summary from a raw events table).
- For pre-joining a large fact table with smaller dimension tables.

**Prompt:**
"A Looker dashboard is powered by a query that calculates daily active users. This query runs every time the dashboard is loaded, is slow, and is becoming expensive. The query is:
```sql
SELECT
  event_date,
  COUNT(DISTINCT user_id) as daily_active_users
FROM
  my_project.raw_data.events
GROUP BY 1
```
1.  Explain how creating a Materialized View based on this query would improve dashboard performance and reduce cost.
2.  Write the `CREATE MATERIALIZED VIEW` DDL statement to create this view.
3.  Explain how BigQuery's "smart tuning" feature would allow the existing Looker dashboard to benefit from this MV without changing its own SQL code."