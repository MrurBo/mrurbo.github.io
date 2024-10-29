@ECHO OFF
IF [%1] == [] (GOTO :exit) ELSE GOTO :run
:exit
echo Please specify commit message.
exit

:run
git add *
git commit -u -m %1 
git push -u origin main