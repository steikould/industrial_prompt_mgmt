# Prompts for Docstring Enforcement

This file contains prompts for enforcing consistent and useful docstrings.

**Standard:**
- **Google Style Docstrings:** Chosen for its readability and compatibility with Sphinx for documentation generation.
- **Ruff `D` rules:** Enforce the presence and style of docstrings.

**Example Prompt:**
"The function `process_data` is missing a docstring. Generate a Google-style docstring that explains its purpose, arguments, and return value."

**Guidance:**
- Every public function, class, and module should have a docstring.
- Docstrings should clearly explain *what* the code does, not *how* it does it.
- Use the `Args`, `Returns`, and `Raises` sections.