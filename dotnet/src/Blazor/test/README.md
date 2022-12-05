dotnet build
./bin/Debug/net7.0/playwright.ps1 install chromium # /Users/yamachu/Library/Caches/ms-playwright/chromium-1033
./bin/Debug/net7.0/playwright.ps1 codegen http://localhost:5039
dotnet test -- Playwright.LaunchOptions.Headless=false
