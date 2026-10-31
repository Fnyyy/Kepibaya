# Git Log History Simulation Script (PowerShell for Windows)
# Range: 2026-10-01 to 2026-10-31 (6-8 commits/day)

$messages = @(
    "feat: update capybara interaction logic",
    "chore: config test environment",
    "refactor: logic structure for map views",
    "fix: minor adjustments to layout spacing",
    "feat: optimize audio synthesizer gain nodes",
    "chore: update component prop types and interfaces",
    "refactor: modularize habitat card rendering",
    "fix: resolve touch event latency on mobile",
    "feat: add subtle sound cues for feeding events",
    "test: verify math calculation unit tests",
    "chore: clean up unused style variables",
    "docs: add inline comments to state handlers",
    "refactor: streamline navigation transition states",
    "fix: fine-tune modal backdrop opacity",
    "feat: enhance responsive card dimensions",
    "refactor: extract reusable badge components",
    "chore: verify type definitions across views",
    "fix: polish color contrast on dark elements",
    "feat: enhance feeding snack particle trajectory",
    "chore: audit dependencies and package manifest"
)

$baseHours = @(8, 10, 12, 14, 16, 18, 20, 21)

Write-Host "Memulai simulasi git commit log history dari 2026-10-01 sampai 2026-10-31..." -ForegroundColor Cyan

$totalAdded = 0

for ($day = 1; $day -le 31; $day++) {
    $dayStr = "{0:D2}" -f $day
    $commitsToday = Get-Random -Minimum 6 -Maximum 9 # 6, 7, or 8 commits
    
    for ($i = 0; $i -lt $commitsToday; $i++) {
        $hour = $baseHours[$i]
        $min = Get-Random -Minimum 5 -Maximum 55
        $sec = Get-Random -Minimum 10 -Maximum 58
        
        $hStr = "{0:D2}" -f $hour
        $mStr = "{0:D2}" -f $min
        $sStr = "{0:D2}" -f $sec
        
        $dateStr = "2026-10-$dayStr ${hStr}:${mStr}:${sStr} +0700"
        $msg = $messages | Get-Random
        
        $env:GIT_AUTHOR_DATE = $dateStr
        $env:GIT_COMMITTER_DATE = $dateStr
        
        git commit --allow-empty -m "$msg" --date="$dateStr" --quiet
        $totalAdded++
    }
}

Write-Host "Selesai! $totalAdded commit berhasil dibuat." -ForegroundColor Green
Write-Host "Total commits di repository saat ini:" -ForegroundColor Yellow
git rev-list --count HEAD
