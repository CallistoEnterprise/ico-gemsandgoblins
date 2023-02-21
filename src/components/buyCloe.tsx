import * as React from "react";
import { ethers } from "ethers";
import { useEffect } from "react";
import cloeAbi from "../abi/cloe.json";
import icoAbi from "../abi/ico.json";

import { useContractWrite, usePrepareContractWrite } from "wagmi";

const contractICO = "0x9c16739A99E3E48FaDB4F8224a1BbaE62b326D1C";
const contractCLOE = "0x1eAa43544dAa399b87EEcFcC6Fa579D5ea4A6187";

export function BuyCloe({
  moneyValue,
  setShowSuccess,
  setShowFail,
  setErrorPopup,
  setInProgress,
}: {
  moneyValue: any;
  setShowSuccess: any;
  setShowFail: any;
  setErrorPopup: any;
  setInProgress: any;
}) {
  // moneyValue To string
  const moneyValueString = "" + moneyValue;
  // value from ETH to WEI
  const amount = ethers.utils.parseUnits(moneyValueString, "ether");


  // approve CLOE
  const { config } = usePrepareContractWrite({
    address: contractCLOE,
    abi: cloeAbi,
    functionName: "approve",
    args: [contractICO, amount],
    onError(error) {
      setErrorPopup(error.message);
    },
  })
  const { data, isError, isLoading, isSuccess, writeAsync: approve } = useContractWrite({
    ...config,
    onSuccess(data) {
      // setShowSuccess(true);
    },
  });

  // buy CLOE
  const { config: configTransfer } = usePrepareContractWrite({
    address: contractICO,
    abi: icoAbi,
    functionName: "buy",
    args: [contractCLOE, amount],
    onError(error) {
      setErrorPopup(error.message);
    },
  })
  const { writeAsync: buy } = useContractWrite({
    ...configTransfer,
    onSuccess(data) {
      // setShowSuccess(true);
    },
  });


  const onApproveTreansfer = async () => {
    try {
      setInProgress(true);
      // @ts-ignore
      const tx = await buy();
      const receipt = await tx.wait();
      console.log({ receipt });
      setInProgress(false);
      setShowSuccess(true);    
    } catch (error) {
      console.error(error);
      setInProgress(false);
      setShowFail(true);
    }
  }

  const onClickApprove = async () => {
    try {
      setInProgress(true);
      // @ts-ignore
      const tx = await approve();
      const receipt = await tx.wait();
      
      setInProgress(false);
      onApproveTreansfer();
    } catch (error) {
      console.error(error);
      setInProgress(false);
      setShowFail(true);
    } finally {
      
    }
  };

  useEffect(() => {
    if (isSuccess) {
      // setShowSuccess(true);
    }
    if(isError){
      setShowFail(true);
    }
  }, [isSuccess, setShowSuccess, isError, setShowFail]);

  return (
    <button
      type="submit"
      className="wallet-connected-button"
      // ignore onClick warning
      // @ts-ignore
      onClick={() => onClickApprove()}
    >
      <span className="wallet-connected-button-img"></span>
    </button>
  );
}
