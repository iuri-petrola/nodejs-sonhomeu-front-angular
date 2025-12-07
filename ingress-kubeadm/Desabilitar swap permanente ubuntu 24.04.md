
 ### Desabilitar swap permanente ubuntu 24.04

# Para desativar permanentemente a partição ou arquivo de swap no Ubuntu 24.04, siga estes passos:

# 1. Verifique o swap atual
   # Execute no terminal:

     sudo swapon --show
     ou
     free -h
   
   # Isso mostrará se há swap ativo (ex.: /swapfile ou uma partição /dev/sdXX).


# 2. Desative o swap temporariamente

    sudo swapoff -a


# 3. Remova a entrada do swap do arquivo /etc/fstab
   # Abra o arquivo para edição:

    sudo vim /etc/fstab

   # Localize a linha referente ao swap (ex.: /swapfile none swap sw 0 0) e comente-a (adicione # no início) ou apague-a.


# 4. Remova o arquivo de swap (se for um /swapfile)

    sudo rm /swapfile
   # (Pule esta etapa se você estiver usando uma partição swap em vez de um arquivo.)



# 5. (Opcional) Desative o serviço systemd-swap (se instalado)
   # Verifique se o serviço está ativo:

    sudo systemctl list-units --type=service | grep swap
   # Se existir, desative-o:

    sudo systemctl stop systemd-swap
    sudo systemctl disable systemd-swap


# 6. Reinicie o sistema

    sudo reboot


# 7. Verifique se o swap está desativado
   # Após a reinicialização, execute:

     sudo swapon --show
     ou
     free -h

   # Se a saída mostrar Swap: 0B, significa que foi desativado com sucesso.


# OBS: 
   # ZRAM: O Ubuntu 24.04 pode usar ZRAM (swap em memória RAM compactada). Para desativá-lo:

    sudo systemctl stop zramswap
    sudo systemctl disable zramswap

   # Pronto! O swap estará desativado permanentemente no Ubuntu 24.04.