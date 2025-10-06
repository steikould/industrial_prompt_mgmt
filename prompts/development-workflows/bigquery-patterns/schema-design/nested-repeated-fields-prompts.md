# Prompts for Using Nested and Repeated Fields (STRUCTs and ARRAYs)

This file provides prompts for designing schemas that use nested (`STRUCT`) and repeated (`ARRAY`) fields, a key feature of BigQuery.

**Why Use Them?**
- **Denormalization:** They allow you to represent nested entities (like the items in an order, or the addresses for a customer) within a single row, avoiding the need for expensive `JOIN` operations with separate tables.
- **Natural Representation:** They map directly to hierarchical data formats like JSON or Avro, making data loading much simpler.

**Key Concepts:**
- **`STRUCT` (or `RECORD`):** A container for a set of named, typed fields. Represents a single, nested object.
    - Example: `customer.address` where `address` is a `STRUCT` containing `street`, `city`, and `zip_code`.
- **`ARRAY`:** A list of items of the same type. The items in the array can be simple types (like `STRING`) or complex `STRUCT`s. This is also called a "repeated" field.
    - Example: `order.line_items` where `line_items` is an `ARRAY` of `STRUCT`s, and each `STRUCT` has `product_id`, `quantity`, and `price`.

**Querying:**
- To query data within `ARRAY`s, you must "flatten" them using the `UNNEST()` function.

**Prompt:**
"You are designing a schema to store customer orders from a JSON API. Each order has a main ID, a customer object, and an array of line item objects.
1.  Design a BigQuery schema that uses a `STRUCT` for the customer information and an `ARRAY<STRUCT>` for the line items.
2.  Provide the `CREATE TABLE` DDL for this schema.
3.  Write an example query that uses `UNNEST()` to calculate the total revenue for each order by multiplying the `quantity` and `price` from the `line_items` array."