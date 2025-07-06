# docker build e push image

    docker build -t iuripetrola/nodejs-someu-front-angular:latest . --push
    #--build-arg  NEXT_PUBLIC_API_IMG_URL="http://nodejs-someu-back:3333/files/" 
    #--build-arg baseURL="http://nodejs-someu-back:3333" 
    


# Criar rede
#   docker network create --subnet=10.0.0.0/24 --gateway 10.0.0.1 net_someu


# Iniciar container App
    docker run -itd --name nodejs-someu-front-angular -h nodejs-someu-front-angular --net net_someu --restart unless-stopped -p 80:80 -p 443:443 iuripetrola/nodejs-someu-front-angular:latest 
    #--env baseURL="http://nodejs-someu-back:3333" 
    #--env NEXT_PUBLIC_API_IMG_URL="http://nodejs-someu-back:3333/files/" 
    
    
    # --mount type=bind,source=/app/img/,target=/app/img/
    
    #--mount type=bind,source=/home/iuri/iuri.petrola@gmail.com-OneDrive/Sistema-Sonho-Meu-Kids/Nodejs-Sonho-meu-kids/,target=/app


