const findInContracts = (contractName) => {
  let newContractsObject = {};

  Object.entries(contracts).forEach(([key, value]) => {
    const newKey = key.toLocaleLowerCase();
    newContractsObject = { ...newContractsObject, [newKey]: value };
  });

  const lowerCasedName = contractName.toLocaleLowerCase();
  return newContractsObject?.[lowerCasedName];
};

export const getContractAddress = async (
  contractName,
  network = configJson.network
) => {
  if (!window.contracts) {
    await wait(150);
    return getContractAddress(contractName);
  }
  const contract = findInContracts(contractName);
  const contractAddress = getValueByMultiProps(contract?.networks?.[network], [
    "Proxy",
    "address",
  ]);
  return contractAddress;
};

export const contractReader = async ({
  contractName,
  functionName = "",
  params = [],
  contractAddress: _contractAddress, // could be passed in cases like HPool contract
  sendParams, // like from and value that are passed to send function
  onTxHash = () => {}, // could be extended to events param in Future
}) =>
  new Promise(async (resolve, reject) => {
    await loadContracts();
    const contractAddress =
      _contractAddress || (await getContractAddress(contractName));
    const _contract = await createContract(
      contractName,
      contractAddress,
      contracts
    );
    const contractInstance = await _contract();
    try {
      if (!sendParams) {
        const result = await contractInstance.methods?.[functionName]?.(
          ...params
        ).call();
        resolve(result);
      } else {
        contractInstance.methods?.[functionName]?.(...params)
          .send({ ...sendParams })
          .once("receipt", (rec) => resolve(rec))
          .once("transactionHash", onTxHash)
          .on("error", (err) => reject(err));
      }
    } catch (error) {
      reject(error.message);
    }
  });
