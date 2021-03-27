@echo off
npm version patch && ^
cd "%cd%\projects\ng-let" && ^
npm version patch && ^
cd "%cd%" && ^
npm run build ng-let --prod && ^
copy /y "%cd%\README.md" "%cd%\dist\ng-let\README.md" && ^
copy /y "%cd%\LICENSE" "%cd%\dist\ng-let\LICENSE" && ^
cd "%cd%\dist\ng-let" && ^
npm publish --ignore-scripts && ^
cd "%cd%"
pause