#!/bin/bash
geth --mine --minerthreads 1 --identity "MguhtNode" --datadir "chains/devtest/" --port "30303" --rpcapi "db,eth,net,web3,personal" --nodiscover --rpc --rpcport "8545"  --rpcaddr="172.19.0.2" --rpccorsdomain "*" --networkid 552
