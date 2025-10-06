# Prompts for Test Coverage Requirements

This file outlines the team's standards for test coverage.

**Tool: `pytest-cov`**
- This plugin is used to measure code coverage during `pytest` runs.

**Standard:**
- **Target Coverage:** A minimum of **80%** line coverage is required for all new code.
- **CI/CD Gate:** The GitHub Actions workflow will fail if a pull request causes the total project coverage to drop below 80%.
- **Configuration:**
  ```ini
  [tool.coverage.run]
  branch = true
  source = [
      "src/",
      "main.py"
  ]
  omit = [
      "*/tests/*",
      "*/__main__.py"
  ]

  [tool.coverage.report]
  fail_under = 80
  show_missing = true
  ```

**Prompt:**
"Your latest commit has dropped the test coverage below the 80% threshold. Analyze the coverage report (`htmlcov/index.html`) to identify the untested code and add the necessary tests to meet the requirement."