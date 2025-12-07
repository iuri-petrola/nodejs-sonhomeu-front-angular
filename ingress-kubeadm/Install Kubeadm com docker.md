#  Instalar Docker Engine oficial
  
  sudo apt update && sudo apt install -y ca-certificates curl gnupg lsb-release


# Adicionar repositório Docker:

  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker.gpg

  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar:

  sudo apt update
  sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Habilitar Docker:

  sudo systemctl enable --now docker

# Criar config do Docker compatível com Kubernetes
# O kubeadm exige CgroupDriver = systemd.

  sudo mkdir -p /etc/docker

  cat <<EOF | sudo tee /etc/docker/daemon.json
  {
    "exec-opts": ["native.cgroupdriver=systemd"],
    "log-driver": "json-file",
    "log-opts": {
      "max-size": "100m"
    },
    "storage-driver": "overlay2"
  }
  EOF


# Reiniciar Docker:

  sudo systemctl restart docker


# Adicionar seu usuário ao grupo docker

  sudo usermod -aG docker $USER

# FAÇA LOGOUT E LOGIN para aplicar o grupo.



# Instalar Kubernetes (kubeadm / kubelet / kubectl)

# Adicionar repo:

  sudo apt update
  sudo apt install -y apt-transport-https curl
  curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.30/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt.gpg

  echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt.gpg] https://pkgs.k8s.io/core:/stable:/v1.30/deb/ /" | sudo tee /etc/apt/sources.list.d/kubernetes.list


# Instalar:

  sudo apt update && sudo apt install -y kubelet kubeadm kubectl

# Marcar como não atualizados automaticamente.

  sudo apt-mark hold kubelet kubeadm kubectl


# Instalar o cri-dockerd
# O cri-dockerd é o “adaptador CRI” que permite o Kubernetes usar Docker novamente.

# Baixar o pacote .deb correspondente à sua arquitetura (amd64)

  wget https://github.com/Mirantis/cri-dockerd/releases/download/v0.3.21/cri-dockerd_0.3.21.3-0.ubuntu-jammy_amd64.deb


# Instalar o pacote

  sudo apt install ./cri-dockerd_0.3.21.3-0.ubuntu-jammy_amd64.deb

# Verificar se o serviço subiu

  systemctl status cri-docker.service

# Se aparecer active (running) → OK


# Iniciar o cluster usando Docker como runtime

  sudo kubeadm init --cri-socket unix:///var/run/cri-dockerd.sock

# Configurar kubectl para seu usuário

  mkdir -p $HOME/.kube
  sudo cp /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

# Instalar rede (Calico ou Flannel)

# Calico
  kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.31.0/manifests/calico.yaml
# OU 
# Flannel
  kubectl apply -f https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml



**Gerando o comando join e executando nos nodes**

  kubeadm token create --print-join-command


  EX saida: kubeadm join 159.223.123.99:6443 --token 4qefmj.lj9hx9atef5a9xnj --discovery-token-ca-cert-hash sha256:7f72c6d435aba7d320661741df4c1d3b8830414057e0c13d0ba1fa84ef4e4306



# Teste de instalação

# Pra saber se está tudo funcionando, vamos fazer o deploy de algo e ver se tudo dá certo.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
        ports:
        - containerPort: 80
--- 
apiVersion: v1
kind: Service
metadata:
  name: nginx
spec:
  selector:
    app: nginx
  ports:
  - port: 80
    targetPort: 80
    nodePort: 30000
  type: NodePort
```

# Agora sim, você tem o cluster Kubernetes instalado e funcionando. Lembrando que você só deve usar esse setup em testes e NUNCA EM PRODUÇÃO !!!


# Opcional 
# Permita que pods sejam executados no master

  kubectl taint nodes --all node-role.kubernetes.io/control-plane-


# Opcional 
# Alterar range de porta do nodeport

  sudo vim /etc/kubernetes/manifests/kube-apiserver.yaml

  # adicionar 

  - --service-node-port-range=80-40000