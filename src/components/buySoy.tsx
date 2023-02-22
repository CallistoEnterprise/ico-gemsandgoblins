import * as React from "react";
import { ethers } from "ethers";
import { useEffect } from "react";
import soyAbi from "../abi/soy.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

const contractICO = "0x9c16739A99E3E48FaDB4F8224a1BbaE62b326D1C";
const contractSOY = "0x9FaE2529863bD691B4A7171bDfCf33C7ebB10a65";

export function BuySoy({
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

  const { config } = usePrepareContractWrite({
    address: contractSOY,
    abi: soyAbi,
    functionName: "transfer",
    args: [contractICO, amount],
    onError(error) {
      setErrorPopup(error.message);
    },
  })

  const { data, isError, isLoading, isSuccess, writeAsync } = useContractWrite({
    ...config,
    onSuccess(data) {
      // setShowSuccess(true);
    },
    
  });

  const onClickSendTransaction = async () => {
    try {
      setInProgress(true);
      // @ts-ignore
      const tx = await writeAsync();
      const receipt = await tx.wait();
      console.log({ receipt });
      setInProgress(false);
      setShowSuccess(true); 
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
      onClick={() => onClickSendTransaction()}
    >
      <span className="wallet-connected-button-img"></span>
    </button>
  );
}
