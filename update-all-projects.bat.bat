@echo off
title Smart NPM Updater with Rollback

echo ===============================
echo   AUTO PACKAGE UPDATER START
echo ===============================

:: Function-like structure using labels
call :process_project C:\wsd-server wsd-server
call :process_project C:\websmith websmith

echo.
echo ===============================
echo   ALL PROJECTS COMPLETED
echo ===============================
pause
exit /b


:process_project
set PROJECT_PATH=%1
set PROJECT_NAME=%2

echo.
echo ===============================
echo Processing: %PROJECT_NAME%
echo ===============================

cd /d %PROJECT_PATH%

if not exist package.json (
    echo ❌ package.json not found. Skipping...
    goto :eof
)

echo Creating temporary rollback data...

:: Temp backup (hidden system files)
copy package.json package.json.bak >nul
if exist package-lock.json copy package-lock.json package-lock.json.bak >nul

echo Installing dependencies...
call npm install
if errorlevel 1 goto rollback

echo Updating packages...
call npm update
if errorlevel 1 goto rollback

echo Cleaning temporary rollback data...
del package.json.bak >nul
if exist package-lock.json.bak del package-lock.json.bak >nul

echo ✅ %PROJECT_NAME% updated successfully!
goto :eof


:rollback
echo ❌ ERROR detected! Rolling back...

if exist package.json.bak copy /y package.json.bak package.json >nul
if exist package-lock.json.bak copy /y package-lock.json.bak package-lock.json >nul

echo Reinstalling previous working state...
call npm install

echo ⚠️ %PROJECT_NAME% restored to previous state.

:: Clean temp backup after rollback
del package.json.bak >nul
if exist package-lock.json.bak del package-lock.json.bak >nul

goto :eof