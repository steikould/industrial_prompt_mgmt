# Prompts for BigQuery Schema Evolution

This file provides prompts for managing changes to a BigQuery table's schema over time.

**Key Principles:**
- Schema evolution must be managed carefully to avoid breaking existing data loading pipelines, queries, or BI dashboards.
- BigQuery supports several types of non-breaking schema changes.

**Allowed (Non-Breaking) Changes:**
- **Adding a new column:** You can always add a new `NULLABLE` column. Existing rows will have a `NULL` value for this new column.
- **Dropping a column:** This is now supported (it used to be difficult).
- **Widening a column:** You can change a column's type to a more general type (e.g., `INT64` to `NUMERIC`, `NUMERIC` to `BIGNUMERIC`). You cannot "narrow" a column (e.g., `STRING` to `INT64`).
- **Changing a column's mode:** You can change a column from `REQUIRED` to `NULLABLE`. You cannot change from `NULLABLE` to `REQUIRED`.

**Breaking Changes (Require a Table Recreation):**
- Renaming a column.
- Changing a column's data type in a non-compatible way (e.g., `STRING` to `INT64`).
- Changing a column's mode from `NULLABLE` to `REQUIRED`.
- Changing the partitioning or clustering configuration.

**Prompt:**
"Your `users` table needs to be updated. You need to add a new `phone_number` column (which will be a `STRING`) and change the existing `user_id` column from an `INT64` to a `STRING` to support non-numeric IDs.
1.  Identify which of these changes is non-breaking and which is breaking.
2.  Provide the `ALTER TABLE` DDL statement to add the new `phone_number` column.
3.  Describe the strategy you would use to handle the breaking change to the `user_id` column. The strategy should ensure zero downtime for queries against the table."