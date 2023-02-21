import * as React from "react";
import { ethers } from "ethers";
import { useEffect } from "react";
import cloeAbi from "../abi/cloe.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

const contractICO = "0x9c16739A99E3E48FaDB4F8224a1BbaE62b326D1C";
const contractCLOE = "0x1eAa43544dAa399b87EEcFcC6Fa579D5ea4A6187";

export function BuyCloe({
  moneyValue,
  setShowSuccess,
  setShowFail,
  setErrorPopup,
}: {
  moneyValue: any;
  setShowSuccess: any;
  setShowFail: any;
  setErrorPopup: any;
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

  const onClickApprove = async () => {
    try {
      // @ts-ignore
      const tx = await approve();
      const receipt = await tx.wait();
      console.log({ receipt });
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
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
