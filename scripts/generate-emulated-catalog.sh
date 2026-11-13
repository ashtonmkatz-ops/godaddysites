#!/usr/bin/env bash
set -euo pipefail

# Generate the browser catalog from the exams repository's default branch.
# Override these when needed, for example:
#   REPO=owner/repo BRANCH=main OUTPUT=otheremulated/catalog.json ./scripts/generate-emulated-catalog.sh
REPO="${REPO:-ashtonmkatz-ops/exams}"
BRANCH="${BRANCH:-main}"
OUTPUT="${OUTPUT:-otheremulated/catalog.json}"

api="https://api.github.com/repos/${REPO}/git/trees/${BRANCH}?recursive=1"
raw="https://raw.githubusercontent.com/${REPO}/${BRANCH}"

curl -fsSL "$api" | jq --arg raw "$raw" '
  [.tree[]
    | select(.type == "blob")
    | .path as $path
    | ($path | split("/")) as $segments
    | ($segments[0] | ascii_downcase) as $system
    | ($path | ascii_downcase) as $lower
    | select(($segments | length) > 1)
    | select(($segments | map(ascii_downcase) | any(. == "bootleg" or . == "randomizers" or . == "3ds" or . == "etc" or . == "swf")) | not)
    | select($lower | test("\\.md$") | not)
    | select($lower | test("\\.(nds|gba|gbc|gb|nes|sfc|smc|n64|z64|v64|a26|gen|md|gg|d64|t64|chd|bin|iso|cue|zip|7z)$"))
    | select($lower | test("\\.part[^/]*$") | not)
    | {system: $system,
       name: ($segments[-1]),
       path: $path,
       link: ($raw + "/" + ($path | split("/") | map(@uri) | join("/"))),
       core: (if $system == "nds" then "nds"
         elif ($system == "gba" or $system == "gb" or $system == "gbc") then "gba"
         elif ($system == "nes") then "nes"
         elif ($system == "snes" or $system == "sfc" or $system == "smc") then "snes"
         elif ($system == "n64" or $system == "nintendo64") then "n64"
         elif ($system == "genesis" or $system == "megadrive" or $system == "md") then "segaMD"
         elif ($system == "gamegear" or $system == "gg") then "segaGG"
         elif ($system == "atari2600" or $system == "a26") then "atari2600"
         elif ($system == "psx" or $system == "ps1" or $system == "playstation") then "psx"
         else $system end)}]
  | sort_by(.system, (.name | ascii_downcase))
  | group_by(.system)
  | map({key: .[0].system, value: map(del(.system))})
  | from_entries
' > "$OUTPUT"

printf 'Wrote %s from %s (%s branch)\n' "$OUTPUT" "$REPO" "$BRANCH"
