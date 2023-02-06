import React from 'react';
import ReactDOM from 'react-dom/client';
import { Chain } from "@wagmi/core";
import {
  configureChains,
  createClient,
  WagmiConfig,
} from "wagmi";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import {
  Web3Modal,
} from "@web3modal/react";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

export const callisto = {
  id: 820,
  name: "Callisto Network",
  network: "callisto",
  nativeCurrency: {
    decimals: 18,
    name: "Callisto Network",
    symbol: "CLO",
  },
  rpcUrls: {
    public: { http: ["https://rpc.callisto.network/"] },
    default: { http: ["https://rpc.callisto.network/"] },
  },
  blockExplorers: {
    etherscan: {
      name: "Callisto Explorer",
      url: "https://explorer.callisto.network/",
    },
    default: {
      name: "Callisto Explorer",
      url: "https://explorer.callisto.network/",
    },
  },
} as const satisfies Chain;

const chains = [callisto];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "69250fcb30fcb0f6eae87953297da021" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <WagmiConfig client={wagmiClient}>
      <App />
    </WagmiConfig>
    <Web3Modal
      projectId="69250fcb30fcb0f6eae87953297da021"
      ethereumClient={ethereumClient}
    />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
