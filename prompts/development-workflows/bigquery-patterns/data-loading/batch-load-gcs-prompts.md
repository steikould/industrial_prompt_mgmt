# Prompts for Batch Loading Data from GCS into BigQuery

This file provides prompts for the standard, most cost-effective method of loading large amounts of data into BigQuery: batch loading from Google Cloud Storage (GCS).

**Why Batch Load from GCS?**
- **Cost:** Loading data into BigQuery from GCS is **free**. You only pay for storing the data in GCS and BigQuery.
- **Speed & Scalability:** It is a massively parallel process capable of loading terabytes of data quickly.
- **Supported Formats:** Supports numerous formats, including CSV, JSON (newline-delimited), Parquet, Avro, and ORC. Parquet and Avro are highly recommended as they are self-describing (include the schema) and compressed.

**How it Works:**
- You use a BigQuery client library (or the `bq` command-line tool) to start a "Load Job".
- You provide the GCS URI of the source file(s) (wildcards are supported).
- You provide the destination table ID.
- You configure the `LoadJobConfig` to specify the file format, schema (or enable auto-detection), partitioning/clustering, and how to handle existing data (overwrite or append).

**Prompt:**
"You have a 1TB Parquet file in a GCS bucket that you need to load into a new BigQuery table. The table should be partitioned by a `transaction_date` column that exists in the file.
1.  Explain why a batch load job is the appropriate method for this task.
2.  Write a Python function that uses the `google-cloud-bigquery` client library to start this load job.
3.  In the `LoadJobConfig`, configure the job to:
    - Specify the source format as Parquet.
    - Set the `write_disposition` to `WRITE_TRUNCATE` to overwrite the table if it exists.
    - Configure time-based partitioning on the `transaction_date` column."