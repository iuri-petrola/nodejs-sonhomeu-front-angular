
npm run build

ssh administrator@69.197.134.140

cd /var/www/html/loja && rm -rf * && exit

scp -r dist/*  administrator@69.197.134.140:/var/www/html/loja
