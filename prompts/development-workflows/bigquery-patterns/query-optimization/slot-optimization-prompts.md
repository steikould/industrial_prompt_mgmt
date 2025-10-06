# Prompts for BigQuery Slot Optimization

This file provides prompts related to understanding and optimizing the use of BigQuery "slots," the unit of computational capacity for queries.

**What are Slots?**
- A slot is a virtual CPU that BigQuery uses to execute a SQL query.
- When you run a query, BigQuery allocates a number of slots to it. More slots mean more parallel processing and faster query execution.
- In the on-demand pricing model, you share a large pool of slots with other BigQuery users. In the flat-rate model, you reserve a dedicated number of slots for your organization.

**Why Optimize for Slots?**
- **Inefficient Queries:** A poorly written query can use slots inefficiently, leading to long execution times even if many slots are available. This happens when some stages of the query are idle, waiting for a bottleneck stage to complete.
- **Slot Contention:** In the on-demand model, if many heavy queries are run concurrently in your organization, you may have to wait for slots to become available, slowing everyone down.

**Key Optimization Technique: Reduce Data Shuffling**
- The most common cause of slot inefficiency is shuffling massive amounts of data between query stages, especially for `JOIN`s and `GROUP BY`s.
- **Strategy:** Filter or pre-aggregate your large tables *before* you join them.

**Prompt:**
"The following query joins a massive `events` table with a smaller `user_attributes` table but performs poorly.
```sql
SELECT
  a.user_segment,
  COUNT(DISTINCT e.session_id) as sessions
FROM
  my_project.my_dataset.events AS e -- This is a 10TB table
JOIN
  my_project.my_dataset.user_attributes AS a -- This is a 10GB table
ON
  e.user_id = a.user_id
WHERE
  e.event_date = '2023-10-26'
GROUP BY 1
```
1.  Explain why this query likely leads to a massive data shuffle that underutilizes BigQuery slots.
2.  Rewrite the query using a Common Table Expression (CTE) to pre-aggregate the `events` table *before* joining it to the `user_attributes` table.
3.  Explain how the "Query execution graph" in the BigQuery UI could be used to visually identify the bottleneck stage in the original query."