param(
    [Int32] $minutes 
)

function Beep {
    param (
        [Int32] $freq = 600
    )
    [Console]::Beep($freq,200)
    Start-Sleep -Milliseconds 500
    [Console]::Beep($freq,200)
    Start-Sleep -Milliseconds 500
    [Console]::Beep($freq,200)
    Start-Sleep -Milliseconds 500
    [Console]::Beep($freq,200)
    Start-Sleep -Milliseconds 500
    [Console]::Beep($freq,800)
    Start-Sleep -Milliseconds 500
}

$2dpattern = "00"
while ($true)
{
    $endTime = [DateTime]::Now.AddMinutes($minutes)

    while ($endTime -gt [DateTime]::Now)
    {
        [timespan]$diffTime = $endTime.Subtract([DateTime]::Now)
        Write-Progress "$($diffTime.Hours.ToString($2dpattern)):$($diffTime.Minutes.ToString($2dpattern)):$($diffTime.Seconds.ToString($2dpattern))"
        Start-Sleep 1
    }
    Beep 840
    Write-Host "Novo intervalo (min)... <Enter>"

    $strTime = [Console]::ReadLine()
    if (-not [Int32]::TryParse($strTime,  [ref] $minutes))
    {
        break;
    }
}