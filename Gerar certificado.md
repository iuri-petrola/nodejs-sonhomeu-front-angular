

## Gerar certificado

# 1. Instale o Certbot (Let's Encrypt)

    apt update && apt install certbot python3-certbot-nginx -y


# 2. Execute o Certbot para obter o certificado SSL

    certbot --nginx -d sonhomeuloja.com
    
    # em modo silent
    certbot --nginx --non-interactive --agree-tos --email iuri.petrola@gmail.com -d sonhomeuloja.com


# 3. Verifique se o certificado foi instalado corretamente: 
    (Os arquivos fullchain.pem (certificado) e privkey.pem (chave privada) devem estar lá.)

    sudo ls -l /etc/letsencrypt/live/sonhomeuloja.com/


# OBS: 
# Renovação automática: O Certbot já configura um cronjob para renovar o certificado. Teste manualmente com:

    sudo certbot renew --dry-run


### RENOVAR CERTIFICADO MANUALMENTE ###

# fazer backup dos arquivos sonhomeu.conf e sonhomeuadmin.conf e comentar temporariamente as config de ssl

    # listen 443 ssl;
    # ssl_certificate /etc/letsencrypt/live/sonhomeuloja.com-0002/fullchain.pem; # managed by Certbot
    # ssl_certificate_key /etc/letsencrypt/live/sonhomeuloja.com-0002/privkey.pem; # managed by Certbot

# gerar certificado

    sudo certbot --nginx -d sonhomeuloja.com -d www.sonhomeuloja.com

   # Saida do comando acima:

    Saving debug log to /var/log/letsencrypt/letsencrypt.log
    Requesting a certificate for sonhomeuloja.com and www.sonhomeuloja.com

    Successfully received certificate.
    Certificate is saved at: /etc/letsencrypt/live/sonhomeuloja.com-0002/fullchain.pem
    Key is saved at:         /etc/letsencrypt/live/sonhomeuloja.com-0002/privkey.pem
    This certificate expires on 2026-02-27.
    These files will be updated when the certificate renews.
    Certbot has set up a scheduled task to automatically renew this certificate in the background.

    Deploying certificate
    Successfully deployed certificate for sonhomeuloja.com to /etc/nginx/sites-enabled/sonhomeuadmin.conf
    Successfully deployed certificate for www.sonhomeuloja.com to /etc/nginx/sites-enabled/default
    Congratulations! You have successfully enabled HTTPS on https://sonhomeuloja.com and https://www.sonhomeuloja.com

    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    If you like Certbot, please consider supporting our work by:
    * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
    * Donating to EFF:                    https://eff.org/donate-le


#  voltar o backup dos arquivos sonhomeu.conf e sonhomeuadmin.conf se necessario alterar o path dos novos certificados gerados de acordo com a saida do comando anterior

    Certificate is saved at: /etc/letsencrypt/live/sonhomeuloja.com-0002/fullchain.pem
    Key is saved at:         /etc/letsencrypt/live/sonhomeuloja.com-0002/privkey.pem

    
# testar configuraçoes nginx

    sudo nginx -t


# Se der error, rever passos acima , se der certo reiniciar nginx

    sudo systemctl restart nginx