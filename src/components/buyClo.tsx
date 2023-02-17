import * as React from "react";
import { ethers } from "ethers";
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";

export function BuyClo({ moneyValue }: { moneyValue: any }) {
  console.log("moneyValue: ", moneyValue);
  // moneyValue yo string
  const moneyValueString = "" + moneyValue;
  console.log("moneyValueString: ", moneyValueString);
  // value from ETH to WEI
  const amount = ethers.utils.parseUnits(moneyValueString, "ether");
  console.log("amount: ", amount);
 
  const { config } = usePrepareSendTransaction({
    request: { to: '0x9c16739A99E3E48FaDB4F8224a1BbaE62b326D1C', value: amount },
  })
  const { data, isLoading, isSuccess, sendTransaction } =
    useSendTransaction(config)

  return (
    <button type="submit" className="wallet-connected-button" onClick={() => sendTransaction?.()}>
      <span className="wallet-connected-button-img"></span>
    </button>
  );
}
