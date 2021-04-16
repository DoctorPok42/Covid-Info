@echo off
sudo dnf module install nodejs
sudo npm i -g pm2
pm2 start app.js --watchs