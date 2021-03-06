# This config file is sourced by the pre-commit script.

# Change 1 to 0 to disable linting.
enabled=1

# Directories containing Node.js projects to be linted, separated by spaces.
node_dirs='backend mobile'

# Command used to run a lint check.
check_command='npm run lint-check'

# Command used to autofix lint errors.
fix_command='npm run lint-fix'

# Escape sequences for formatted output.
format_error="$(tput setaf 3 2> /dev/null)"
format_warn="$(tput setaf 1 2> /dev/null)"
format_clear="$(tput sgr0 2> /dev/null)"

# The preceding commands may fail in environments where tput is not available.
# Return 0 explicitly to indicate that the config was sourced successfully.
return 0
