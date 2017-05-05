@echo off

REM Create the directories
IF NOT EXIST Programming MD Programming
IF NOT EXIST Data MD Data
IF NOT EXIST WebDev MD WebDev
IF NOT EXIST WebOps MD WebOps

REM Download the files
powershell -File DownloadEbooks.ps1 -pageUrl "http://www.oreilly.com/programming/free/" -outDir "Programming"
powershell -File DownloadEbooks.ps1 -pageUrl "http://www.oreilly.com/data/free/" -outDir "Data"
powershell -File DownloadEbooks.ps1 -pageUrl "http://www.oreilly.com/web-platform/free/" -outDir "WebDev"
powershell -File DownloadEbooks.ps1 -pageUrl "http://www.oreilly.com/webops/free/" -outDir "WebOps"