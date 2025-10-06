# Prompts for Ruff Linter Configuration

This file contains prompts to generate a standard `pyproject.toml` configuration for the Ruff linter. Ruff is significantly faster than Pylint and other traditional linters.

**Standard Configuration:**
```toml
[tool.ruff]
line-length = 88
select = ["E", "F", "W", "I", "N", "D"] # Standard flakes, import sorting, naming, docstrings
ignore = ["E501"] # Ignored by black

[tool.ruff.per-file-ignores]
"__init__.py" = ["F401"] # Allow unused imports in init files
"tests/*" = ["D100", "D101", "D102", "D103"] # Less strict docstrings for tests
```

**Prompt:**
"Generate a `pyproject.toml` file and configure it with the team's standard Ruff linting rules for high performance."