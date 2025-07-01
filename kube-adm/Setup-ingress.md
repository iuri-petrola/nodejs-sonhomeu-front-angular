# 1) Pré-requisitos
 # Instalar o Ingress Controller
 # Se ainda não tiver, instale o NGINX Ingress Controller:

  kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.9.5/deploy/static/provider/cloud/deploy.yaml

# 2) Instalar o Cert-Manager

  kubectl apply -f https://github.com/cert-manager/cert-manager/releases/latest/download/cert-manager.yaml

# Verifique:

  kubectl get pods -n cert-manager

# 3) Criar o ClusterIssuer para Let’s Encrypt

   # Salve como: cluster-issuer.yaml

    kubectl apply -f cluster-issuer.yaml

# 4) Crie o Ingress para seu domínio

   # Salve como: ingress-sonhomeu-front-angular.yaml

    kubectl apply -f ingress-front-angular-back.yaml


# 5) Verifique

    kubectl describe ingress ingress-front-angular-back
    kubectl get certificate
    kubectl get secret

