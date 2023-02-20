import * as React from "react";
import { ethers } from "ethers";
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import { useEffect } from "react";

export function BuyClo({
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

  const { config } = usePrepareSendTransaction({
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

  return (
    <button
      type="submit"
      className="wallet-connected-button"
      onClick={() => sendTransaction?.()}
    >
      <span className="wallet-connected-button-img"></span>
    </button>
  );
}
