# docker build e push image

    docker build 
    #--build-arg  NEXT_PUBLIC_API_IMG_URL="http://nodejs-someu-back:3333/files/" 
    #--build-arg baseURL="http://nodejs-someu-back:3333" 
    -t iuripetrola/nodejs-someu-front:latest . --push


# Criar rede
#   docker network create --subnet=10.0.0.0/24 --gateway 10.0.0.1 net_someu


# Iniciar container App
    docker run -itd 
    #--env baseURL="http://nodejs-someu-back:3333" 
    #--env NEXT_PUBLIC_API_IMG_URL="http://nodejs-someu-back:3333/files/" 
    --name nodejs-someu-front -h nodejs-someu-front --net net_someu --restart unless-stopped  -p 3000:3000 iuripetrola/nodejs-someu-front:latest  
    
    # --mount type=bind,source=/app/img/,target=/app/img/
    
    #--mount type=bind,source=/home/iuri/iuri.petrola@gmail.com-OneDrive/Sistema-Sonho-Meu-Kids/Nodejs-Sonho-meu-kids/,target=/app


