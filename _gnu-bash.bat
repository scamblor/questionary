@echo off
set PATH=venv\Scripts;%PATH%
call activate.bat

set PATH=\Bin\cygwin64\bin;%PATH%
set PATH=\Bin\ImageMagick;%PATH%
set PATH=\Bin\imagetools;%PATH%
set PATH=\Bin\7-Zip;%PATH%
set PATH=\Bin\xpdf;%PATH%
set PATH=\Bin\Python39;%PATH%

bash.exe %1 %2 %3 %4 %5