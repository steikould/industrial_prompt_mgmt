# Prompts for Type Hint Strictness

This file contains prompts and guidance for enforcing strict type hinting.

**Key Tools:**
- **`mypy`:** The standard for static type checking in Python.
- **`pyright`:** An alternative, often faster type checker from Microsoft.

**Standard `mypy.ini` Configuration:**
```ini
[mypy]
python_version = 3.12
warn_return_any = True
warn_unused_configs = True
disallow_untyped_defs = True
disallow_any_unimported = True
no_implicit_optional = True
check_untyped_defs = True
```

**Prompt:**
"Add a `mypy.ini` configuration file to the project to enforce strict type checking and improve code quality."