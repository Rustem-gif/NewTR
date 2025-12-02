@echo off

:: =======================
:: Self-elevation block
:: =======================
:: Check if we are already elevated (fltmc needs admin)
>nul 2>&1 fltmc
if not "%errorlevel%"=="0" (
    echo Requesting administrative privileges...
    powershell -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
    exit /b
)

chcp 65001 >nul
setlocal ENABLEDELAYEDEXPANSION

:: ANSI / colors
for /F "delims=" %%A in ('echo prompt $E ^| cmd') do set "ESC=%%A"


:main_menu
cls
echo ████████╗ ██████╗ ███╗   ███╗██████╗    ██████╗ ██╗ ██████╗██╗  ██╗███████╗███████╗
echo ╚══██╔══╝██╔═══██╗████╗ ████║██╔══██╗   ██╔══██╗██║██╔════╝██║  ██║██╔════╝██╔════╝
echo    ██║   ██║   ██║██╔████╔██║██████╔╝   ██████╔╝██║██║     ███████║█████╗  ███████╗
echo    ██║   ██║   ██║██║╚██╔╝██║██╔══██╗   ██╔══██╗██║██║     ██╔══██║██╔══╝  ╚════██║
echo    ██║   ╚██████╔╝██║ ╚═╝ ██║██████╔╝   ██║  ██║██║╚██████╗██║  ██║███████╗███████║
echo    ╚═╝    ╚═════╝ ╚═╝     ╚═╝╚═════╝    ╚═╝  ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝
echo.
echo                           🎰 Automated Testing Framework 🎰
echo.
echo 1) Install Dependencies
echo 2) Pull latest updates from Git
echo 3) Install Playwright browsers
echo 4) Open Playwright Test UI
echo 5) Run Tests ^>^>  Test menu
echo 6) Exit
echo ============================
set /p choice=Please choose an option [1-6]: 

if "%choice%"=="1" goto install_dependencies
if "%choice%"=="2" goto pull_latest
if "%choice%"=="3" goto install_browsers
if "%choice%"=="4" goto open_test_ui
if "%choice%"=="5" goto test_menu
if "%choice%"=="6" goto exit_script

echo Invalid option. Please try again.
timeout /t 2 >nul
goto main_menu


:test_menu
cls
echo ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
echo ┃   🧪  TEST SANCTUARY · AUTOMATED QUALITY GATEWAY  🧪                 ┃
echo ┃      Smoke, regression ^& rituals for bug exorcism 🔥                 ┃
echo ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
echo ┃  [1] Run Smoke Tests        ⚡ Fast health check                      ┃
echo ┃  [2] Run Deposit Tests      %BLUE%📦 Payment flows under fire               ┃
echo ┃  [0] Back to Main Menu      🏠 Return to control center               ┃
echo ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
echo ┃  Tip: Keep an eye on logs, not just the 🎉 green checks.                 ┃
echo ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
echo.
set /p test_choice=Please choose an option [0-2]: 

if "%test_choice%"=="1" goto run_smoke_tests
if "%test_choice%"=="2" goto run_dep_tests
if "%test_choice%"=="0" goto main_menu

echo Invalid option. Please try again.
timeout /t 2 >nul
goto test_menu


:install_dependencies
cls
echo Installing dependencies...
npm install
npm install
if %ERRORLEVEL% EQU 0 (
    echo Dependencies installed successfully!
) else (
    echo Failed to install dependencies.
)
echo.
pause
goto main_menu


:pull_latest
cls
echo Pulling latest updates from Git...
git pull origin main
if %ERRORLEVEL% EQU 0 (
    echo Successfully pulled latest updates!
) else (
    echo Failed to pull updates from Git.
)
echo.
pause
goto main_menu


:install_browsers
cls
echo Installing Playwright browsers...
npx playwright install
if %ERRORLEVEL% EQU 0 (
    echo Playwright browsers installed successfully!
) else (
    echo Failed to install Playwright browsers.
)
echo.
pause
goto main_menu


:run_smoke_tests
cls
echo Running Smoke tests...
npm run test:smoke
if %ERRORLEVEL% EQU 0 (
    echo Smoke tests completed successfully!
) else (
    echo Some Smoke tests failed.
)
echo.
pause
goto test_menu


:run_dep_tests
cls
echo Running Deposit Method tests...
npm run test:dep
if %ERRORLEVEL% EQU 0 (
    echo Deposit Method tests completed successfully!
) else (
    echo Some Deposit Method tests failed.
)
echo.
pause
goto test_menu


:open_test_ui
cls
echo Opening Playwright Test UI...
npx playwright test --ui
echo.
pause
goto main_menu


:exit_script
echo Exiting...
endlocal
exit /b 0
