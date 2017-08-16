REM ***************************************************************************************
REM 							PS Caller
REM
REM This BAT executes a PS1 script with the same name, at the same directory, with admin
REM privileges
REM
REM So, if your script is named "Deploy.ps1", rename this bat to "Deploy.bat",
REM and put it in the same folder where the script is.
REM ***************************************************************************************

@echo off

set scriptFileName=%~n0
set scriptFolderPath=%~dp0
set powershellScriptFileName=%scriptFileName%.ps1

powershell -Command "Start-Process powershell \"-ExecutionPolicy Bypass -NoExit -Command `\"cd \`\"%scriptFolderPath%`\"; & \`\".\%powershellScriptFileName%\`\"`\"\" -Verb RunAs"