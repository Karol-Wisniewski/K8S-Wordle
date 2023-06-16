minikube start --driver=virtualbox --disk-size='10000mb' --cpus='2'
minikube addons enable ingress
./create-init-script-config-map.sh
eval $(minikube docker-env)
# minikube ip się zmienia po minikube delete
