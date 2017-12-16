FROM ubuntu:16.04

RUN echo "net.ipv6.conf.all.forwarding=1" >>  /etc/sysctl.conf

RUN apt-get update

RUN apt-get -y install software-properties-common

RUN add-apt-repository -y ppa:ethereum/ethereum

RUN apt-get update

RUN apt-get install -y ethereum

RUN apt install -y net-tools

COPY scripts /scripts

WORKDIR /scripts

RUN geth --rpc --rpcport "8000" --rpccorsdomain "*" --datadir "./chains/devtest" --port "30303" --nodiscover --rpcapi "db,eth,net,web3" --syncmode "fast" --nousb --networkid 1900 init "CustomGenesis.json" 

RUN geth --datadir "chains/devtest" --password "./pswd" account new 

RUN chmod 777 ./run.sh 

RUN chmod 777 ./attachOne.sh

CMD ["./run.sh"]
