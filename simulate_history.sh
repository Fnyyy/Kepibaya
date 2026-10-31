#!/usr/bin/env bash
# Git Log History Simulation Script (Backfill Commits)
# Range: 2026-10-01 to 2026-10-31 (6-8 commits/day)

MESSAGES=(
  "feat: update capybara interaction logic"
  "chore: config test environment"
  "refactor: logic structure for map views"
  "fix: minor adjustments to layout spacing"
  "feat: optimize audio synthesizer gain nodes"
  "chore: update component prop types and interfaces"
  "refactor: modularize habitat card rendering"
  "fix: resolve touch event latency on mobile"
  "feat: add subtle sound cues for feeding events"
  "test: verify math calculation unit tests"
  "chore: clean up unused style variables"
  "docs: add inline comments to state handlers"
  "refactor: streamline navigation transition states"
  "fix: fine-tune modal backdrop opacity"
  "feat: enhance responsive card dimensions"
)

echo "Starting commit generation simulation from 2026-10-01 to 2026-10-31..."

for day in $(seq -w 1 31); do
  # 6 to 8 commits per day
  commits_today=$(( 6 + RANDOM % 3 ))
  
  # Generate ascending hours between 08 and 21
  hours=(8 10 12 14 16 18 20 21)
  
  for (( i=0; i<commits_today; i++ )); do
    hour=${hours[$i]}
    min=$(( RANDOM % 50 + 5 ))
    sec=$(( RANDOM % 50 + 5 ))
    
    # Pad single digits
    h_str=$(printf "%02d" $hour)
    m_str=$(printf "%02d" $min)
    s_str=$(printf "%02d" $sec)
    
    date_str="2026-10-${day} ${h_str}:${m_str}:${s_str} +0700"
    
    msg_idx=$(( RANDOM % ${#MESSAGES[@]} ))
    msg="${MESSAGES[$msg_idx]}"
    
    export GIT_AUTHOR_DATE="$date_str"
    export GIT_COMMITTER_DATE="$date_str"
    
    git commit --allow-empty -m "$msg" --date="$date_str" --quiet
  done
done

echo "Simulation completed successfully!"
echo "Total commits in repository:"
git rev-list --count HEAD
