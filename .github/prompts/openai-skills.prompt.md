---
description: "OpenAI's curated and system agent skills vendored for project-local use. Select and read the relevant skill under .github/prompts/openai-skills before handling a matching task."
mode: agent
---
# OpenAI Skills Catalog

This workspace vendors the OpenAI skills catalog under `.github/prompts/openai-skills/`.
The catalog contains curated skills in `.curated/` and system skills in `.system/`.

When a task matches one of these capabilities, identify the narrowest relevant skill
directory and read its `SKILL.md` before acting. Treat the skill as task guidance;
repository instructions, user requests, and security constraints take precedence.

This is a project-local copy for GitHub Copilot. The upstream repository is a
deprecated Codex catalog, so do not run its Codex-only installer or assume Codex
automatic discovery behavior.