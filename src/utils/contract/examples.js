import { contractReader } from ".";

export const participateInVpool = (vpoolId, signature, account, value) =>
  contractReader({
    contractName: "VPool",
    functionName: "subscribeForVPool",
    params: [signature, vpoolId],
    sendParams: { from: account, value },
  });

export const getHpoolInfo = (web3HpoolId) =>
  contractReader({
    contractName: "VPool",
    functionName: "getPoolInfo",
    params: [web3HpoolId],
  });
