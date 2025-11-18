@echo off
chcp 65001 >nul
echo ========================================
echo   PSILOUP - Iniciando Servidores LOCAL
echo ========================================
echo.

echo [1/2] Iniciando Backend (porta 3000)...
start "PsiloUp Backend" cmd /k "cd /d %~dp0back && echo === BACKEND PSILOUP === && echo Porta: 3000 && echo. && npm run dev"

timeout /t 5 /nobreak >nul

echo [2/2] Iniciando Frontend (porta 8000)...
start "PsiloUp Frontend" cmd /k "cd /d %~dp0front && echo === FRONTEND PSILOUP === && echo Porta: 8000 && echo. && yarn dev"

echo.
echo ========================================
echo   Servidores iniciados!
echo ========================================
echo.
echo Backend:  http://localhost:3000
echo Frontend: http://localhost:8000
echo.
echo Aguarde alguns segundos para compilar...
echo Pressione qualquer tecla para fechar esta janela.
pause >nul



