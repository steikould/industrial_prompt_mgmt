# Developer Quick Start - Get Productive in 30 Minutes

## Setup (5 min)
```bash
# Clone prompt repo
git clone <repo>
cd prompts

# Install Jules Async CLI
pip install jules-async

# Configure GCP
gcloud auth application-default login
export GCP_PROJECT=your-project
```

## Generate Your First Cloud Function (10 min)
```bash
# Use velocity booster prompt
jules generate cloud-function \
  --name process-scada-data \
  --trigger pubsub \
  --topic scada-realtime \
  --destination bigquery://scada_data.realtime_tags

# This generates:
# - main.py (Cloud Function code)
# - requirements.txt
# - tests/
# - terraform/
# - README.md
```

## Deploy (10 min)
```bash
cd process-scada-data

# Test locally
pytest

# Deploy via Terraform
cd terraform
terraform init
terraform apply

# Verify
gcloud functions describe process-scada-data
```

## Common Patterns (5 min)
- **SCADA Integration**: Use `scada-pi-integration/aveva-pi-system/`
- **BigQuery Loading**: Use `bigquery-patterns/data-loading/`
- **Data Quality**: Use `data-quality-discovery/quality-checks/`