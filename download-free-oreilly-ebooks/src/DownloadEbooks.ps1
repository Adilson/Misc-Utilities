param([String]$pageUrl = '', [String]$outDir = 'Download')

if ($pageUrl -eq '')
{
	Write-Output "Missing parameter pageUrl"
}
else
{
	$freeBooksContent = (New-Object System.Net.WebClient).DownloadString($pageUrl)
	$rxStr = '<a[^>]+href=\"(.*/free/.*\.csp.*)\"[^>]*>'
	$rx = (New-Object System.Text.RegularExpressions.Regex $rxStr)
	$rxFileName = (New-Object System.Text.RegularExpressions.Regex ".*/([^/]+\.pdf)")
	$matches = $rx.Matches($freeBooksContent)
	for ($i=0; $i -lt $matches.Count; $i++ )
	{
		$match = $matches[$i]
		$bookPageUrl = $match.Groups[1].Value
		$bookPdfUrl = $bookPageUrl.Replace(".csp",".pdf").Replace("/free/","/free/files/")
		$bookFileName = $rxFileName.Match($bookPdfUrl).Groups[1].Value
		
		Write-Host "Downloading $($bookFileName) ..."
	
		try
		{
			(New-Object System.Net.WebClient).DownloadFile($bookPdfUrl, "$outDir\$($bookFileName.Replace("-"," "))")
			Write-Host "$($bookFileName) successfully downloaded!" -ForegroundColor Green
		}
		catch
		{
			Write-Host "Fail to download $bookFileName" -ForegroundColor Red
		}
		Write-Host ""
	}
}

