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
Extra code correctly installed. Now installing the application modules.
" &&
echo "- Creating the nodejs app:" &&
# npm init &&
echo -e "\t- Installing discord's module" &&
npm install discord.js &&
echo -e "\t- Installing dotenv's module (to store the bot-key)" &&
npm install dotenv &&
echo -e "\t- Installing sqlite3's module" &&
npm install sqlite3 &&

echo "All modules installed, installing now the application." &&
echo "- Creating database" &&
mkdir DB &&
touch ./DB/dataBase.db &&

read -p "Enter the BOT key ->" -s apikey; &&
echo -e "DB_LOCATION=./DB/dataBase.db\nAPY_KEY=$apikey" >> .env; &&



echo "
Installation ended.
Tetris installed correctly" ||

echo "
~~~~~~~~    ERROR AT INSTALLATION   ~~~~~~~~
    Not able to install the game.
" #if error, exit