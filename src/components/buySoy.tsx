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

  const { config } = usePrepareContractWrite({
    address: contractSOY,
    abi: soyAbi,
    functionName: "transfer",
    args: [contractICO, amount],
    onError(error) {
      setErrorPopup(error.message);
    },
  })

  const { data, isError, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onSuccess(data) {
      setShowSuccess(true);
    },
    
  });

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
    }
    if(isError){
      setShowFail(true);
    }
  }, [isSuccess, setShowSuccess, isError, setShowFail]);

  /* const { config } = usePrepareSendTransaction({
    request: {
      to: "0x9c16739A99E3E48FaDB4F8224a1BbaE62b326D1C",
      value: amount,
    },
    onError(error) {
        setShowFail(true);
        console.log(error);
      },
  });
  const { data, isError, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    ...config,
    onError(error) {
        setErrorPopup(error.message);
      },
  }); 

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
    }
    if(isError){
      setShowFail(true);
    }
  }, [isSuccess, setShowSuccess, isError, setShowFail]);
  */

  return (
    <button
      type="submit"
      className="wallet-connected-button"
      // ignore onClick warning
      // @ts-ignore
      onClick={() => write()}
    >
      <span className="wallet-connected-button-img"></span>
    </button>
  );
}
