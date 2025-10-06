# Prompts for `pip-tools` Workflow

This file contains prompts for using `pip-tools` to manage dependencies. This is the recommended workflow for all Python projects.

**Workflow:**
1.  **Define abstract dependencies:** Add top-level dependencies to `requirements.in`.
2.  **Compile:** Run `pip-compile requirements.in` to generate a pinned `requirements.txt`.
3.  **Install:** Run `pip-sync` to install the exact versions from `requirements.txt`.
4.  **Update:** To update packages, run `pip-compile --upgrade requirements.in`.

**Prompt:**
"Your project is missing a `pip-tools` workflow. Create a `requirements.in` file, move the abstract dependencies into it, and generate a pinned `requirements.txt`."