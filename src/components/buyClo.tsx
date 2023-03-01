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

  const { config } = usePrepareSendTransaction({
    request: {
      to: "0x93026EcAED46d825989bBE298C7EE2B7cdC3c3A3",
      value: amount,
    },
    onError(error) {
        // setShowFail(true);
        console.log(error);
      },
  });
  const { data, isError, isLoading, isSuccess, sendTransactionAsync } = useSendTransaction({
    ...config,
    onError(error) {
      console.error(error);
        setErrorPopup(error.message);
      },
  });

  const onClickSendTransaction = async () => {
    try {
      setInProgress(true);
      // @ts-ignore
      const tx = await sendTransactionAsync();
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
      onClick={() => onClickSendTransaction()}
    >
      <span className="wallet-connected-button-img"></span>
    </button>
  );
}
