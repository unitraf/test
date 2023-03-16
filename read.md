<!-- créez un nouveau dépôt en ligne de commande -->

echo "# electron" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/unitraf/electron.git
git push -u origin main


<!-- poussez un dépôt existant depuis la ligne de commande -->

git remote add origin https://github.com/unitraf/electron.git
git branch -M main
git push -u origin main