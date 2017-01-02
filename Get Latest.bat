@ECHO OFF

set workingDirectory=%~dp0

@ECHO *** Fetching and merging latest changes from Gitub repo ***

@ECHO *** Adding remote origin ***
git remote add origin https://github.com/fshaikh/FP.git

@ECHO *** Verifying if remote set correctly ***
git remote -v

@ECHO *** Fetching latest changes in local repo from FP Github repo ***
git pull origin master