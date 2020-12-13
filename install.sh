clear;
echo "

███████╗████████╗██╗   ██╗██████╗ ██╗   ██╗     ██████╗  ██████╗ ████████╗
██╔════╝╚══██╔══╝██║   ██║██╔══██╗╚██╗ ██╔╝     ██╔══██╗██╔═══██╗╚══██╔══╝
███████╗   ██║   ██║   ██║██║  ██║ ╚████╔╝█████╗██████╔╝██║   ██║   ██║   
╚════██║   ██║   ██║   ██║██║  ██║  ╚██╔╝ ╚════╝██╔══██╗██║   ██║   ██║   
███████║   ██║   ╚██████╔╝██████╔╝   ██║        ██████╔╝╚██████╔╝   ██║   
╚══════╝   ╚═╝    ╚═════╝ ╚═════╝    ╚═╝        ╚═════╝  ╚═════╝    ╚═╝   

Made by Jkutkut
See more at https://github.com/Jkutkut
Instalation will begin shortly.
-Making sure that nodejs and the programs needed are installed";

# echo "-Checking Python3:" &&
# sudo apt install python3 ||
# (echo "
# ~~~~~~~~    ERROR AT INSTALLATION   ~~~~~~~~
#     Please check README.md
# " && exit 1) #if error, exit



echo "-------------------------------------------
All things needed are correctly installed. Now installing the application.
" &&
echo "-Creating icon for the app" &&
sudo cp tetris.png /usr/share/icons/ && # move the icon to the correct dir

echo "-Creating executable" &&
sudo cp tetris.py /usr/bin/tetris && # move the python code
sudo chmod 755 /usr/bin/tetris && # make it able to be executed

echo "-Creating Desktop Entry" &&
echo "[Desktop Entry]
Type=Application
Encoding=UTF-8
Name=Tetris
Comment=Made by Jkutkut
Exec=tetris
Icon=/usr/share/icons/tetris.png
Terminal=false" >> tetris.desktop && # create the .desktop file

sudo mv tetris.desktop /usr/share/applications/ &&
echo "
Installation ended.
Tetris installed correctly" ||

echo "
~~~~~~~~    ERROR AT INSTALLATION   ~~~~~~~~
    Not able to install the game.
" #if error, exit