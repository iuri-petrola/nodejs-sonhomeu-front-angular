# Service tipo LoadBalancer/NodePort com HTTPS externo (Nginx standalone)

# Essa abordagem funciona assim:

# ✔️ Kubernetes expõe seu front como LoadBalancer (ou NodePort, se for bare metal).
# ✔️ Nginx externo (fora do cluster) fica responsável por:

# servir HTTPS
# redirecionar o tráfego para o service do Kubernetes
# gerenciar certificados (Let's Encrypt com certbot)

# ✅ Arquitetura simplificada
# Internet → Nginx (HTTPS) → Kubernetes Service (LoadBalancer/NodePort) → Deployment Angular

# 🔧 PASSO 1 — Criar o Service do front como LoadBalancer

# Se você estiver usando Kubeadm, provavelmente não tem provedor de LoadBalancer.
# Neste caso, vamos usar NodePort (também funciona com Nginx externo).

# Crie o service:

apiVersion: v1
kind: Service
metadata:
  name: someu-front-service
spec:
  type: NodePort
  selector:
    app: someu-front
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30000


# Aplicar:

  kubectl apply -f service.yaml


# 🔧 PASSO 2 — Instalar Nginx + Certbot na máquina que ficará na frente do cluster
# No servidor externo (ou no próprio node, se preferir):

  sudo apt update
  sudo apt install nginx certbot python3-certbot-nginx -y

# 🔧 PASSO 3 — Configurar o Nginx como reverse proxy com HTTPS
#  Exemplo de config:

server {
    listen 80;
    server_name seu-dominio.com www.seu-dominio.com;

    location / {
        proxy_pass http://IP_DO_NODE:30000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}


# Salvar em:  /etc/nginx/sites-available/sonhomeuloja.com


# Habilitar:

  sudo ln -s /etc/nginx/sites-available/sonhomeuloja.com /etc/nginx/sites-enabled/
  sudo nginx -t
  sudo systemctl reload nginx

# 🔧 PASSO 4 — Gerar o HTTPS (Let's Encrypt)

  sudo certbot --nginx -d sonhomeuloja.com -d www.sonhomeuloja.com

# Ele vai:

# ✔️ validar o domínio
# ✔️ gerar o certificado
# ✔️ alterar o nginx automaticamente para HTTPS
# ✔️ configurar renovação automática

