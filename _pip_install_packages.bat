@set PATH=venv\Scripts;%PATH%
call activate.bat

python -m pip install --upgrade pip
python -m pip install --upgrade PyYAML
python -m pip install --upgrade Jinja2
python -m pip install --upgrade Pillow
python -m pip install --upgrade python-docx

pause
