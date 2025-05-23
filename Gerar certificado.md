

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