@ECHO OFF
REM Build force (pass force as the first argument to continue te grunt tasks with warning)

set workingDirectory=%~dp0
set arg1 = %1  

cd "%workingDirectory%/Grunt"

@ECHO Running Grunt Tasks

grunt --%1