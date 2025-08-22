Param(
    [string]$OutDir = "src/assets/icons"
)

$ErrorActionPreference = 'Stop'

# Map our icon keys to Simple Icons slugs
$iconMap = @{
    'java' = 'java'
    'python' = 'python'
    'javascript' = 'javascript'
    'typescript' = 'typescript'
    'cpp' = 'cplusplus'

    'angular' = 'angular'
    'react' = 'react'
    'ngrx' = 'ngrx'
    'rxjs' = 'rxjs'
    'tailwind' = 'tailwindcss'
    'primeng' = $null  # fallback

    'quarkus' = 'quarkus'
    'spring' = 'spring'
    'nodejs' = 'nodedotjs'
    'api' = $null
    'camel' = 'apachecamel'

    'mongodb' = 'mongodb'
    'mysql' = 'mysql'
    'sql' = $null

    'docker' = 'docker'
    'kubernetes' = 'kubernetes'
    'jenkins' = 'jenkins'
    'git' = 'git'
    'aws' = 'amazonaws'
    'azure' = 'microsoftazure'
    'cicd' = $null

    'junit' = 'junit5'
    'mockito' = $null
    'jest' = 'jest'
    'karma' = 'karma'
    'jasmine' = 'jasmine'

    'leader' = $null
    'team'   = $null
    'curious'= $null
    'problem'= $null
}

# Ensure output directory
if (!(Test-Path -LiteralPath $OutDir)) {
    New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
}

# Ensure generic.svg exists (simple placeholder)
$genericPath = Join-Path $OutDir 'generic.svg'
if (!(Test-Path -LiteralPath $genericPath)) {
$genericSvg = @'
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none">
  <rect x="3" y="3" width="18" height="18" rx="4" fill="#9CA3AF"/>
  <path d="M7 12h10" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
  <path d="M12 7v10" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
</svg>
'@
    Set-Content -LiteralPath $genericPath -Value $genericSvg -Encoding UTF8
}

$client = New-Object System.Net.WebClient
foreach ($key in $iconMap.Keys) {
    $slug = $iconMap[$key]
    $dest = Join-Path $OutDir ("{0}.svg" -f $key)
    try {
        if ([string]::IsNullOrWhiteSpace($slug)) {
            Copy-Item -LiteralPath $genericPath -Destination $dest -Force
            Write-Host "[fallback] $key -> generic.svg"
        } else {
            $url = "https://cdn.simpleicons.org/$slug"
            $client.DownloadFile($url, $dest)
            Write-Host "[ok] $key <- $url"
        }
    } catch {
        Write-Warning "[fail] $key ($slug): $($_.Exception.Message) - using generic"
        Copy-Item -LiteralPath $genericPath -Destination $dest -Force
    }
}

Write-Host "Icons downloaded to $OutDir"
