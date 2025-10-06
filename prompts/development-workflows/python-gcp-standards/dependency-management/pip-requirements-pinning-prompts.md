# Prompts for Pinning Pip Dependencies

This file contains prompts and guidance on the importance of pinning Python dependencies.

**Why Pin?**
- **Reproducible Builds:** Ensures that every deployment uses the exact same versions of dependencies, eliminating "it works on my machine" issues.
- **Security:** Prevents accidentally pulling in a new, potentially vulnerable version of a library.
- **Faster Installs:** Pip can skip version resolution when versions are pinned.

**Prompt:**
"You have an unpinned `requirements.txt` file. Use `pip-tools` to compile it into a fully pinned `requirements.txt` file, ensuring a reproducible build."