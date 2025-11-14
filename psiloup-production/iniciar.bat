@echo off
chcp 65001 >nul
echo ========================================
echo   PSILOUP - Iniciando Servidores
echo ========================================
echo.

echo [1/2] Iniciando Backend (porta 3000)...
start "PsiloUp Backend" cmd /k "cd /d %~dp0back && echo === BACKEND PSILOUP === && echo Porta: 3000 && echo. && npm run dev"

timeout /t 3 /nobreak >nul

echo [2/2] Iniciando Frontend (porta 3001)...
start "PsiloUp Frontend" cmd /k "cd /d %~dp0front-garanti && echo === FRONTEND PSILOUP === && echo Porta: 3001 && echo. && npm run dev"

echo.
echo ========================================
echo   Servidores iniciados!
echo ========================================
echo.
echo Backend:  http://localhost:3000
echo Frontend: http://localhost:3001
echo.
echo Aguarde alguns segundos para compilar...
echo Pressione qualquer tecla para fechar esta janela.
pause >nul


