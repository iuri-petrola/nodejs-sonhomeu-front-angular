#Imagem padrao ubuntu 22 do repositorio oficial
FROM ubuntu:22.04 AS build
#FROM  node:18.20.7-bookworm

# Adicionar Permissao no tmp
RUN chmod 777 /tmp

### Configurar Node ###
# Instala dependências e Node.js 18.20.8 via NodeSource
RUN apt update && apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt install -y nodejs=18.20.8-1nodesource1

# Instale o NVM (Gerenciador de versoes do NODE) NODE e NPM com:
#ENV NODE_VERSION=18.20.8
#RUN apt update && apt install -y curl
#RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
#ENV NVM_DIR=/root/.nvm
#RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
#RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
#RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
#ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
#RUN node --version
#RUN npm --version

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build



# MULTI-STAGE DEPLOY NO NGINX
FROM ubuntu:22.04

# instalação de pacotes basicos
RUN apt update && apt install -y curl vim links unzip telnet wget inetutils-ping net-tools nginx

# Instalação do locale pt_BR
RUN apt update &&  apt install -y locales && rm -rf /var/lib/apt/lists/* && localedef -i pt_BR -c -f UTF-8 -A /usr/share/locale/locale.alias pt_BR.UTF-8
ENV LANG pt_BR.utf8

# Configurar Timezone America/Fortaleza
RUN apt update && apt install tzdata -y 
RUN	echo "America/Fortaleza" > /etc/timezone && rm -f  /etc/localtime && dpkg-reconfigure -f noninteractive tzdata

# copiar o projeto compilado para root do nginx
WORKDIR /var/www/html/
COPY --from=build /app/dist .

# Habilitar SSL
# Instale o Certbot (Let's Encrypt)
RUN  apt update && apt install certbot python3-certbot-nginx -y

# Obter o certificado em modo silent
#RUN certbot --nginx --non-interactive --agree-tos --email iuri.petrola@gmail.com -d sonhomeuloja.com

# Copiar arquivos de configuraçao do ssl
COPY ssl/letsencrypt /etc/

# Copiar arquivos de comfiguraçao do proxy
COPY sonhomeu.conf /etc/nginx/conf.d
COPY sonhomeu.conf /etc/nginx/sites-available
RUN ln -s /etc/nginx/sites-available/sonhomeu.conf /etc/nginx/sites-enabled/

CMD ["nginx", "-g", "daemon off;"]

#ENTRYPOINT service nginx start