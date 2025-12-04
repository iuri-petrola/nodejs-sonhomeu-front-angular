
# pacote completo para ativar HTTPS automático no seu Ingress com Let's Encrypt utilizando o cert-manager no seu cluster kubeadm.

# ✅ 1. Instalar o Ingress-NGINX (método oficial — obrigatório no kubeadm)

# Execute no control-plane:

  kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/baremetal/deploy.yaml

# Esse é o manifesto oficial para Bare Metal / kubeadm, com Deployment + Service NodePort.

# A instalação leva +- 1 minuto.

# ✅ 2. Verificar se o ingress subiu

  kubectl get pods -n ingress-nginx

# Você deve ver algo como:

# ingress-nginx-controller-xxxxx   Running


# 🟦 3. Instalar o cert-manager (oficial e recomendado)

# Execute no cluster:

  kubectl apply -f https://github.com/cert-manager/cert-manager/releases/latest/download/cert-manager.yaml

# Aguarde de 30 a 60 segundos e confira:
  
  kubectl get pods -n cert-manager

# Você deve ver:

  #cert-manager-xxxxxxx     Running
  #cert-manager-webhook.... Running
  #cert-manager-cainjector. Running


# 🟩 4. ClusterIssuer – Let's Encrypt (STAGING)

# Use para testar sem limite de requisições.

# Crie o arquivo: clusterissuer-staging.yaml

  apiVersion: cert-manager.io/v1
  kind: ClusterIssuer
  metadata:
    name: letsencrypt-staging
  spec:
    acme:
      email: iuri.petrola@gmail.com
      server: https://acme-staging-v02.api.letsencrypt.org/directory
      privateKeySecretRef:
        name: letsencrypt-staging-key
      solvers:
        - http01:
            ingress:
              class: nginx
# Aplicar:

  kubectl apply -f clusterissuer-staging.yaml

# 🟥 5. ClusterIssuer – Let's Encrypt (PRODUÇÃO)

# O que você vai usar no seu domínio sonhomeuloja.com.

# Crie o arquivo: clusterissuer-prod.yaml

  apiVersion: cert-manager.io/v1
  kind: ClusterIssuer
  metadata:
    name: letsencrypt-prod
  spec:
    acme:
      email: iuri.petrola@gmail.com
      server: https://acme-v02.api.letsencrypt.org/directory
      privateKeySecretRef:
        name: letsencrypt-prod-key
      solvers:
        - http01:
            ingress:
              class: nginx

# Aplicar:

  kubectl apply -f clusterissuer-prod.yaml

# 📝 Verificar se está OK

  kubectl describe clusterissuer letsencrypt-prod

# Se aparecer:

  Status: True
  Ready: True

# ➡️ cert-manager está funcionando.

# 🔐 Agora seu Ingress vai gerar certificado automático


# 🟥 6 Criar o Ingress (HTTPS com domínio sonhomeuloja.com)

  apiVersion: networking.k8s.io/v1
  kind: Ingress
  metadata:
    name: someu-front-ingress
    annotations:
      kubernetes.io/ingress.class: nginx
      cert-manager.io/cluster-issuer: letsencrypt-prod
  spec:
    tls:
      - hosts:
          - sonhomeuloja.com
        secretName: someu-front-tls
    rules:
      - host: sonhomeuloja.com
        http:
          paths:
            - path: /
              pathType: Prefix
              backend:
                service:
                  name: nodejs-someu-front-angular
                  port:
                    number: 443


# Então basta aplicar o ingress:

  kubectl apply -f ingress.yaml

# Depois acompanhe:

  kubectl get certificate
  kubectl get challenge
  kubectl get order

# E no final você verá:

# someu-front-tls   True

# Esse é o certificado gerado.

# 🎉 Pronto! HTTPS automatizado funcionando no kubeadm + ingress-nginx.
