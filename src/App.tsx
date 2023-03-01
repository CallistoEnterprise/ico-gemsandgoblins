import React, { useEffect, useState } from "react";
import "./App.css";
import { BuyClo } from "./components/buyClo";

import { useWeb3Modal, Web3Button, Web3NetworkSwitch } from "@web3modal/react";

import { useAccount, useContractRead, erc20ABI } from "wagmi";

import priceFeedAbi from "./abi/priceFeed.json";
import icoAbi from "./abi/ico.json";
import { SuccessPopup } from "./SuccessPopup";
import { FailPopup } from "./FailPopup";
import { BigNumber, ethers } from "ethers";
import { BuySoy } from "./components/buySoy";
import { BuyCloe } from "./components/buyCloe";

const contractICO = "0x93026EcAED46d825989bBE298C7EE2B7cdC3c3A3";
const contractGnG = "0x700D226Be058a0110655575082Db12Fd6862EeF6";
const contractPriceFeed = "0x9bFc3046ea26f8B09D3E85bd22AEc96C80D957e3";
const contractCLO = "0x0000000000000000000000000000000000000001";
const contractSOY = "0x9FaE2529863bD691B4A7171bDfCf33C7ebB10a65";
const contractCLOE = "0x1eAa43544dAa399b87EEcFcC6Fa579D5ea4A6187";

// Tokens allocated for the ICO in round 1: 10.000.000
const tokensAllocated = 10000000;

function App() {
  const [loading, setLoading] = useState(false);
  const { open } = useWeb3Modal();

  // state variable for phase 2
  const [phase2, setPhase2] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  // user address as string
  const [userAddress, setUserAddress] = useState("");
  // G&G balance of the user
  const [gngBalance, setGngBalance] = useState("0");
  // G&G balance on the ICO contract
  const [gngBalanceICO, setGngBalanceICO] = useState(0);
  // volumePercentage
  const [volumePercentage, setVolumePercentage] = useState(0);

  // State variable for the selected coin
  // SelectedCoin from the select dropdown
  const [selectedCoin, setSelectedCoin] = useState(
    "0x0000000000000000000000000000000000000001"
  );
  // SelectedCoinPrice from the price feed contract
  const [selectedCoinPrice, setSelectedCoinPrice] = useState("0");
  // SelectedCoinName from the select dropdown + function to change the name
  const [selectedCoinName, setSelectedCoinName] = useState("CLO");
  // GNG amount from the ICO contract, function get_reward
  const [gngAmount, setGngAmount] = useState("0");
  // Money amount input from the input Amount used to purchase
  const [moneyAmountInput, setMoneyAmountInput] = useState(1);
  const [moneyAmountString, setMoneyAmountString] = useState('1');

  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  async function onOpen() {
    setLoading(true);
    await open();
    setLoading(false);
  }

  // Used to toggle popups
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const [errorPopup, setErrorPopup] = useState("Please check again!");

  const { data: balanceOfUser } = useContractRead({
    address: contractGnG,
    abi: erc20ABI,
    functionName: "balanceOf",
    // ignore the typescript check
    // @ts-ignore
    args: [address],
    onSuccess(data) {
      // convert from big number to number
      const data_display = Number(data.toString()) / 1000000000000000000;
      // get only 5 decimals after the comma
      const data_display_rounded = data_display.toFixed(5);
      const gngBalanceString = data_display_rounded.toString();
      setGngBalance(gngBalanceString);
    },
  });

  const { data: balanceOfIco } = useContractRead({
    address: contractGnG,
    abi: erc20ABI,
    functionName: "balanceOf",
    // ignore the typescript check
    // @ts-ignore
    args: [contractICO],
    onSuccess(data) {
      // convert from big number to number
      const data_display = Number(data.toString()) / 1000000000000000000;
      // get only 5 decimals after the comma
      const data_display_rounded = Number(data_display.toFixed(2));
      setGngBalanceICO(data_display_rounded);
    },
  });

  // Calculate the volume percentage for the progress bar
  const styles = {
    progressBar: {
      width: `${volumePercentage}%`,
    },
  } as const;

  const priceFeed = useContractRead({
    // Price Feed Contract Address
    address: contractPriceFeed,
    abi: priceFeedAbi,
    functionName: "getPrice",
    args: [selectedCoin],
    onSuccess(data: any) {
      // transfor data from big number to number
      const data_display = Number(data.toString()) / 1000000000000000000;
      // get only 5 decimals after the comma
      const data_display_rounded = data_display.toFixed(5);
      setSelectedCoinPrice(data_display_rounded);
    },
  });

  const gngAmountFunction = useContractRead({
    // ICO Contract Address
    address: contractICO,
    abi: icoAbi,
    functionName: "get_reward",
    args: [ethers.utils.parseUnits(moneyAmountInput.toString()), selectedCoin],
    onSuccess(data: any) {
      const rewards = (data.reward).toString();
      const rewardEth = ethers.utils.formatUnits(rewards, 18);
      const rewardEthRounded = Number(rewardEth).toFixed(2);
      setGngAmount(rewardEthRounded);
    },
  });

  useEffect(() => {
    if (selectedCoin === "0x0000000000000000000000000000000000000001") {
      setSelectedCoinName("CLO");
    } else if (selectedCoin === "0x9FaE2529863bD691B4A7171bDfCf33C7ebB10a65") {
      setSelectedCoinName("SOY");
    } else if (selectedCoin === "0x1eAa43544dAa399b87EEcFcC6Fa579D5ea4A6187") {
      setSelectedCoinName("CLOE");
    }
  }, [selectedCoin]);

  useEffect(() => {
    // Frontend template javascript refresh
    if ((window as any).presaleRefreshUi) (window as any).presaleRefreshUi();
    else {
      // Delay if unavailable on page load
      const interval = setInterval(() => {
        if ((window as any).presaleRefreshUi) {
          clearInterval(interval);
          (window as any).presaleRefreshUi();
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isConnected]);

  // Scroll to top on navigation to phase 2
  useEffect(() => {
    if (phase2) window.scrollTo(0, 0);

    const volumePercentageEffect = ((tokensAllocated - gngBalanceICO)/tokensAllocated) * 100;
    setVolumePercentage(volumePercentageEffect);

  }, [gngBalanceICO, phase2, volumePercentage]);

  return (
    <div className="App">
      <div className={inProgress? "displayProgress" : "hidePhase"}>
        <div className="loadingPopup">
          <div className="loadingPopup__content">
            <div className="loadingPopup__content__icon">
              <img src="/img/loading.gif" alt="" />
            </div>
            <div className="loadingPopup__content__text">
                <p>Transaction in progress.. please wait!</p>
            </div>
          </div>
        </div>
      </div>
      <div id="phaseOne" className={phase2 ? "content hidePhase" : " content"}>
        <div className="hero-video">
          <video preload="auto" autoPlay muted loop playsInline>
            <source src="/img/hero-section/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="caption">
            <div className="logo hidden-on-desktop">
              <div className="logo-wrapper" id="logo-wrapper">
                <img src="img/hero-section/logo/hero_logo_1.png" alt="" />
                <img src="img/hero-section/logo/hero_logo_2.png" alt="" />
                <img src="img/hero-section/logo/hero_logo_3.png" alt="" />
                <img src="img/hero-section/logo/hero_logo_4.png" alt="" />
                <img src="img/hero-section/logo/hero_logo_5.png" alt="" />
                <img src="img/hero-section/logo/hero_logo_6.png" alt="" />
                <img src="img/hero-section/logo/hero_logo_7.png" alt="" />
                <img src="img/hero-section/logo/hero_logo_8.png" alt="" />
                <img src="img/hero-section/logo/hero_logo_9.png" alt="" />
                <img src="img/hero-section/logo/hero_logo_10.png" alt="" />
                <img src="img/hero-section/logo/hero_logo_11.png" alt="" />
              </div>
            </div>

            <div className="desktop-hero-layout">
              <div className="desktop-hero-left-col">
                  <img src="img/presale/Text_Tokens_Lines_2.png"
                       className="presale-hero-heading hidden-on-mobile"
                       alt="Get your tokens while they're hot!"
                  />
                  <img src="img/presale/Text_Tokens_Line_3A.png"
                       className="presale-hero-heading hidden-on-desktop"
                       alt="Get your tokens while they're hot!"
                  />
                <p className="hero-text">
                  The exclusive pre-sale round of GNG tokens is live! Grab your tokens first and get them at the lowest
                  price ever.
                  <br />
                  <br />
                  The tokens can later be exchanged for bundles of in-game assets or other cryptocurrencies.
                  Get yours now - they're never going to be this cheap again!
                </p>
              </div>
              <div className="desktop-hero-buttons-layout hidden-on-mobile">
                <img
                  src="/img/presale/Asset_Button_Prototype.png"
                  className="presale-prototype-button"
                  alt=""
                />
              </div>
            </div>

            <div className="presale-container">
              <div className="presale-cable-left"></div>
              <div className="presale-cable-right"></div>

              <div className="presale-heading-container">
                <h2 className="presale-heading text-center">
                  Limited token pre-sale
                </h2>
              </div>

              <div className="round-container">
                <div className="round-heading-container">
                  <span className="round-heading"> Round 1 is live </span>
                  <div className="round-heading-indicator">
                    <div className="round-heading-indicator-light"></div>
                  </div>
                </div>
                <span className="round-subheading">
                  GNG tokens are now available in a limited supply...
                </span>
                <div className="round-progress-container">
                  <div className="round-progress-bar-container position-inset">
                    <div className="round-progress-bar position-inset">
                      <div className="round-progress-bar-fill"></div>
                    </div>
                    <div
                      className="round-progress-bar-mask"
                      style={styles.progressBar}
                    >
                      <img
                        src="img/presale/Mask_BarFill_L.png"
                        alt=""
                        className="round-progress-bar-mask-l"
                      />
                      <img
                        src="img/presale/Mask_BarFill_M.png"
                        alt=""
                        className="round-progress-bar-mask-m"
                      />
                      <img
                        src="img/presale/Mask_BarFill_R.png"
                        alt=""
                        className="round-progress-bar-mask-r"
                      />
                    </div>
                    <div className="round-progress-bar-mask-tail flex-1"></div>
                  </div>
                  {/*
                  <div className="round-progress-divider round-progress-divider-l"></div>
*/}
                  <span className="round-progress-value"> {volumePercentage.toFixed(2)}% </span>
                  {/*
                  <div className="round-progress-divider round-progress-divider-r"></div>
*/}
                </div>
                <div className="round-progress-label-container">
                  <span> SOLD: </span>
                  <span>
                    {(tokensAllocated - gngBalanceICO).toFixed(2)} <span className="round-progress-label-dark">/ 10M</span>
                  </span>
                </div>
                <span className="round-price text-center">
                  {" "}
                  $0,02 per GNG token{" "}
                </span>

                <div className="round-time-left-container">
                  <span className="round-time-left-label">
                    time left in round 1
                  </span>
                  <div className="round-time-left-clock-container">
                    <div className="round-time-left-clock-column">
                      <div
                        className="round-time-left-clock-value"
                        data-field="days"
                      >
                        <div className="round-time-left-clock-value-bg">
                          <div className="round-time-left-clock-value-bg-flip"></div>
                        </div>
                        <span className="round-time-left-clock-value-text">
                          {" "}
                          20{" "}
                        </span>
                      </div>
                      <span className="round-time-left-clock-label"> D </span>
                    </div>
                    <div className="round-time-left-clock-column">
                      <div
                        className="round-time-left-clock-value"
                        data-field="hours"
                      >
                        <div className="round-time-left-clock-value-bg">
                          <div className="round-time-left-clock-value-bg-flip"></div>
                        </div>
                        <span className="round-time-left-clock-value-text">
                          {" "}
                          15{" "}
                        </span>
                      </div>
                      <span className="round-time-left-clock-label"> H </span>
                    </div>
                    <div className="round-time-left-clock-column">
                      <div
                        className="round-time-left-clock-value"
                        data-field="minutes"
                      >
                        <div className="round-time-left-clock-value-bg">
                          <div className="round-time-left-clock-value-bg-flip"></div>
                        </div>
                        <span className="round-time-left-clock-value-text">
                          {" "}
                          48{" "}
                        </span>
                      </div>
                      <span className="round-time-left-clock-label"> M </span>
                    </div>
                    <div className="round-time-left-clock-column">
                      <div
                        className="round-time-left-clock-value"
                        data-field="seconds"
                      >
                        <div className="round-time-left-clock-value-bg">
                          <div className="round-time-left-clock-value-bg-flip"></div>
                        </div>
                        <span className="round-time-left-clock-value-text">
                          {" "}
                          15{" "}
                        </span>
                      </div>
                      <span className="round-time-left-clock-label"> S </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="next-rounds-container">
                <span className="next-rounds-heading"> Next rounds </span>
                <div className="next-rounds-cards">
                  <div className="next-rounds-card">
                    <span className="next-rounds-card-title"> Round 2 </span>
                    <span className="next-rounds-card-subtitle">
                      {" "}
                      Coming next{" "}
                    </span>
                    <div className="next-rounds-card-separator"></div>
                    <span className="next-rounds-card-info">
                      $0,025 / token
                      <br />
                      13M tokens
                    </span>
                  </div>
                  <div className="next-rounds-card">
                    <span className="next-rounds-card-title"> Round 3 </span>
                    <span className="next-rounds-card-subtitle"></span>
                    <div className="next-rounds-card-separator"></div>
                    <span className="next-rounds-card-info">
                      $0,05 / token
                      <br />
                      8M tokens
                    </span>
                  </div>
                  <div className="next-rounds-card">
                    <span className="next-rounds-card-title"> Round 4 </span>
                    <span className="next-rounds-card-subtitle"></span>
                    <div className="next-rounds-card-separator"></div>
                    <span className="next-rounds-card-info">
                      $0,06 / token
                      <br />
                      8M tokens
                    </span>
                  </div>
                  <div className="next-rounds-card">
                    <span className="next-rounds-card-title"> Round 5 </span>
                    <span className="next-rounds-card-subtitle"></span>
                    <div className="next-rounds-card-separator"></div>
                    <span className="next-rounds-card-info">
                      $0,085 / token
                      <br />
                      6M tokens
                    </span>
                  </div>
                </div>
              </div>
              <div className="investor-cta-container">
                <span className="investor-cta-label">
                  Are you a venture investor?
                </span>
                <a
                  className="investor-cta-link"
                  href="mailto:wemakegames@wemakegames.sk"
                >
                  {" "}
                  Reach out to us{" "}
                </a>
              </div>

              <div className="presale-buy-button-container">
                <button
                  className="presale-buy-button"
                  onClick={() => setPhase2(true)}
                >
                  <span className="presale-buy-button-img"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="phaseTwo"
        className={phase2 ? "content displayPhase" : " content hidePhase"}
      >
        <div className="hero-video">
          <video preload="auto" autoPlay muted loop playsInline>
            <source src="/img/hero-section/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="caption">
            <div className="logo hidden-on-desktop">
              <div className="logo-wrapper" id="logo-wrapper">
                <img src="img/hero-section/logo/hero_logo_1.png" alt="" />
                <img src="img/hero-section/logo/hero_logo_2.png" alt="" />
                <img src="img/hero-section/logo/hero_logo_3.png" alt="" />
                <img src="img/hero-section/logo/hero_logo_4.png" alt="" />
                <img src="img/hero-section/logo/hero_logo_5.png" alt="" />
                <img src="img/hero-section/logo/hero_logo_6.png" alt="" />
                <img src="img/hero-section/logo/hero_logo_7.png" alt="" />
                <img src="img/hero-section/logo/hero_logo_8.png" alt="" />
                <img src="img/hero-section/logo/hero_logo_9.png" alt="" />
                <img src="img/hero-section/logo/hero_logo_10.png" alt="" />
                <img src="img/hero-section/logo/hero_logo_11.png" alt="" />
              </div>
            </div>

            <div className="presale-container presale-2">
              <div className="presale-cable-right"></div>

              <div className="presale-heading-container">
                <h2 className="presale-heading text-center">Buy GNG tokens</h2>
              </div>

              <div className="round-container">
                <div className="round-heading-container">
                  <span className="round-heading">Round 1 is live</span>
                  <div className="round-heading-indicator">
                    <div className="round-heading-indicator-light"></div>
                  </div>
                </div>
                <span className="round-subheading"></span>
                <div className="round-progress-container">
                  <div className="round-progress-bar-container position-inset">
                    <div className="round-progress-bar position-inset">
                      <div className="round-progress-bar-fill"></div>
                    </div>
                    <div
                      className="round-progress-bar-mask"
                      style={styles.progressBar}
                    >
                      <img
                        src="img/presale/Mask_BarFill_L.png"
                        alt=""
                        className="round-progress-bar-mask-l"
                      />
                      <img
                        src="img/presale/Mask_BarFill_M.png"
                        alt=""
                        className="round-progress-bar-mask-m"
                      />
                      <img
                        src="img/presale/Mask_BarFill_R.png"
                        alt=""
                        className="round-progress-bar-mask-r"
                      />
                    </div>
                    <div className="round-progress-bar-mask-tail flex-1"></div>
                  </div>
                  {/*
                  <div className="round-progress-divider round-progress-divider-l"></div>
*/}
                  <span className="round-progress-value"> {volumePercentage.toFixed(2)}% </span>
                  {/*
                  <div className="round-progress-divider round-progress-divider-r"></div>
*/}
                </div>
                <div className="round-progress-label-container">
                  <span>SOLD:</span>
                  <span>
                    {(tokensAllocated - gngBalanceICO).toFixed(2)} <span className="round-progress-label-dark">/ 10M</span>
                  </span>
                </div>
                <span className="round-price text-center">
                  $0,02 per GNG token
                </span>

                <div className="round-time-left-container">
                  <span className="round-time-left-label">
                    time left in private round
                  </span>
                  <div className="round-time-left-clock-container">
                    <div className="round-time-left-clock-column">
                      <div
                        className="round-time-left-clock-value"
                        data-field="days"
                      >
                        <div className="round-time-left-clock-value-bg">
                          <div className="round-time-left-clock-value-bg-flip"></div>
                        </div>
                        <span className="round-time-left-clock-value-text">
                          20
                        </span>
                      </div>
                      <span className="round-time-left-clock-label">D</span>
                    </div>
                    <div className="round-time-left-clock-column">
                      <div
                        className="round-time-left-clock-value"
                        data-field="hours"
                      >
                        <div className="round-time-left-clock-value-bg">
                          <div className="round-time-left-clock-value-bg-flip"></div>
                        </div>
                        <span className="round-time-left-clock-value-text">
                          15
                        </span>
                      </div>
                      <span className="round-time-left-clock-label">H</span>
                    </div>
                    <div className="round-time-left-clock-column">
                      <div
                        className="round-time-left-clock-value"
                        data-field="minutes"
                      >
                        <div className="round-time-left-clock-value-bg">
                          <div className="round-time-left-clock-value-bg-flip"></div>
                        </div>
                        <span className="round-time-left-clock-value-text">
                          48
                        </span>
                      </div>
                      <span className="round-time-left-clock-label">M</span>
                    </div>
                    <div className="round-time-left-clock-column">
                      <div
                        className="round-time-left-clock-value"
                        data-field="seconds"
                      >
                        <div className="round-time-left-clock-value-bg">
                          <div className="round-time-left-clock-value-bg-flip"></div>
                        </div>
                        <span className="round-time-left-clock-value-text">
                          15
                        </span>
                      </div>
                      <span className="round-time-left-clock-label">S</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="supported-currencies-container">
                <span className="supported-currencies-heading">
                  Supported crypto currency:
                </span>
                <div className="supported-currencies">
                  <div className="supported-currency">
                    <img
                      src="img/presale/tokens/Icon_CLO.png"
                      className="supported-currency-logo"
                      alt=""
                    />
                    <span className="supported-currency-title">CLO</span>
                  </div>
                  <div className="supported-currency">
                    <img
                      src="img/presale/tokens/Icon_SOY.png"
                      className="supported-currency-logo"
                      alt=""
                    />
                    <span className="supported-currency-title">SOY</span>
                  </div>
                  <div className="supported-currency">
                    <img
                      src="img/presale/tokens/Icon_CLOE.png"
                      className="supported-currency-logo"
                      alt=""
                    />
                    <span className="supported-currency-title">CLOE</span>
                  </div>
                  {/*
                  <div className="supported-currency">
                    <img
                      src="img/presale/Supported_Currencies_Placeholder.png"
                      className="supported-currency-logo"
                      alt=""
                    />
                    <span className="supported-currency-title">VGR</span>
                  </div>
                  <div className="supported-currency">
                    <img
                      src="img/presale/Supported_Currencies_Placeholder.png"
                      className="supported-currency-logo"
                      alt=""
                    />
                    <span className="supported-currency-title">BTC</span>
                  </div>
                  <div className="supported-currency">
                    <img
                      src="img/presale/Supported_Currencies_Placeholder.png"
                      className="supported-currency-logo"
                      alt=""
                    />
                    <span className="supported-currency-title">ETH</span>
                  </div>
                  <div className="supported-currency">
                    <img
                      src="img/presale/Supported_Currencies_Placeholder.png"
                      className="supported-currency-logo"
                      alt=""
                    />
                    <span className="supported-currency-title">VER</span>
                  </div>
*/}
                </div>
                <span className="supported-currencies-info">
                  {/*
                  By using CLO, SOY or CLOE you get +5% bonus on GNG tokens!
*/}
                </span>
              </div>
              <div className="backers-container">
                <span className="backers-label">Backed by:</span>
                <div className="backers">
                  <a href="https://callisto.network/?utm_source=gemsandgoblins.com"
                     target="_blank" rel="noreferrer"
                  >
                    <img src="img/presale/backers/callisto.png"
                         alt="Callisto Network"
                         style={{marginTop: '0.3vw'}}
                    />
                  </a>
                  {/*<a href="https://www.esportsinnovation.group/?utm_source=gemsandgoblins.com"
                     target="_blank" rel="noreferrer"
                  >
                    <img src="img/presale/backers/eig.png"
                         alt="EIG"
                    />
                  </a>*/}
                  <a href="https://soy.finance/?utm_source=gemsandgoblins.com"
                     target="_blank" rel="noreferrer"
                  >
                    <img src="img/presale/backers/soy-finance.png"
                         alt="Soy Finance"
                    />
                  </a>
                  <a href="https://absolutewallet.com/?utm_source=gemsandgoblins.com  "
                     target="_blank" rel="noreferrer"
                  >
                    <img src="img/presale/backers/absolute-wallet.png"
                         alt="Absolute Wallet"
                         style={{marginTop: '0.3vw'}}
                    />
                  </a>
                </div>
              </div>
            </div>
            {!isConnected ? (
              <>
                <div className="connect-wallet-container">
                  <div className="connect-wallet-offer-container">
                    <span className="connect-wallet-offer-heading">
                      BUY NOW
                    </span>
                    <span className="connect-wallet-offer-subtitle">
                      with CLO, SOY, CLOE
                    </span>
                    <div className="connect-wallet-offer-chest">
                      <img src="img/presale/Page2_BG_Chest.png" alt="" />
                    </div>
                  </div>
                  <span className="connect-wallet-heading">
                    Connect your wallet
                    <br />
                    to get GNG tokens
                  </span>
                  <div className="connect-wallet-subtitle">
                    <a
                      href="https://whitepaper.gemsandgoblins.com/how-to-buy-tokens"
                      target="_blank"
                      className="connect-wallet-link"
                      rel="noreferrer"
                    >
                      New to crypto?
                    </a>
                  </div>

                  <div className="connect-wallet-cable-left"></div>

                  <div className="connect-wallet-button-container">
                    <button className="connect-wallet-button" onClick={onOpen}>
                      <span className="connect-wallet-button-img"></span>
                    </button>
                  </div>

                  <div className="connect-wallet-footnote-container">
                    <a
                      href="https://explorer.callisto.network/address/0x700D226Be058a0110655575082Db12Fd6862EeF6/transactions"
                      target="_blank"
                      className="connect-wallet-footnote-link connect-wallet-link"
                      rel="noreferrer"
                    >
                      Smart Contract Address
                    </a>
                    <a href="https://callisto.network/gems-goblins-ico-security-audit-report/?utm_source=gemsandgoblins.com"
                       target="_blank"
                       className="connect-wallet-footnote-secure connect-wallet-link"
                       rel="noreferrer"
                    >
                      Security audit report
                    </a>
                  </div>
                </div>

                <div className="backers-container-mobile">
                  <span className="backers-label">Backed by:</span>
                  <div className="backers">
                    <a href="https://callisto.network/?utm_source=gemsandgoblins.com"
                       target="_blank" rel="noreferrer"
                    >
                      <img src="img/presale/backers/callisto.png"
                           alt="Callisto Network"
                           style={{marginTop: '0.3vw'}}
                      />
                    </a>
                    {/*<a href="https://www.esportsinnovation.group/?utm_source=gemsandgoblins.com"
                     target="_blank" rel="noreferrer"
                  >
                    <img src="img/presale/backers/eig.png"
                         alt="EIG"
                    />
                  </a>*/}
                    <a href="https://soy.finance/?utm_source=gemsandgoblins.com"
                       target="_blank" rel="noreferrer"
                    >
                      <img src="img/presale/backers/soy-finance.png"
                           alt="Soy Finance"
                      />
                    </a>
                    <a href="https://absolutewallet.com/?utm_source=gemsandgoblins.com  "
                       target="_blank" rel="noreferrer"
                    >
                      <img src="img/presale/backers/absolute-wallet.png"
                           alt="Absolute Wallet"
                           style={{marginTop: '0.3vw'}}
                      />
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <div className="wallet-connected-container">
                <span className="wallet-connected-heading">
                  Wallet connected:
                </span>
                <span className="wallet-connected-wallet">{address}</span>
                <div className="wallet-connected-change-wallet">
                  <button
                    type="submit"
                    className="connect-wallet-link"
                    onClick={onOpen}
                  >
                    disconnect
                  </button>
                </div>

                <form className="wallet-connected-form">
                  <div className="wallet-connected-form-row">
                    <div className="wallet-connected-form-group highlighted flex-1">
                      <label
                        htmlFor="selected-currency"
                        className="wallet-connected-form-label"
                      >
                        Selected currency:
                      </label>
                      <div className="wallet-connected-form-select">
                        <select
                          id="selected-currency"
                          name=""
                          onChange={(e) => setSelectedCoin(e.target.value)}
                        >
                          <option value="0x0000000000000000000000000000000000000001">
                            CLO
                          </option>
                          <option value="0x9FaE2529863bD691B4A7171bDfCf33C7ebB10a65">
                            SOY
                          </option>
                          <option value="0x1eAa43544dAa399b87EEcFcC6Fa579D5ea4A6187">
                            CLOE
                          </option>
                        </select>
                        <div className="wallet-connected-form-select-arrow">
                          <img src="img/presale/Page3_RollDown.png" alt="" />
                        </div>
                      </div>
                      <span className="wallet-connected-form-info">
                        current price is ${selectedCoinPrice}
                      </span>
                    </div>
                    <div className="wallet-connected-form-group flex-1">
                      <label
                        htmlFor="selected-currency"
                        className="wallet-connected-form-label"
                      >
                        Current price:
                      </label>
                      <div className="wallet-connected-form-text">
                        <span>$0,02</span>
                        <span className="wallet-connected-form-text-subtitle">
                          per GNG Token
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="wallet-connected-form-row">
                    <div className="wallet-connected-form-group flex-1">
                      <label
                        htmlFor="selected-currency"
                        className="wallet-connected-form-label"
                      >
                        Amount used to purchase:
                      </label>
                      <div className="wallet-connected-form-input">
                        <input
                          id=""
                          name=""
                          min={1}
                          step={1}
                          pattern="\d*"
                          inputMode="numeric"
                          className="with-suffix"
                          onChange={(e) => {
                            if (/^\d{0,7}$/.test(e.target.value)) {
                              setMoneyAmountString(e.target.value);

                              const input = parseInt(e.target.value);
                              setMoneyAmountInput(
                                  Math.min(9999999, Math.max(1, isNaN(input) ? 0 : input))
                              );
                            }
                          }}
                          onBlur={() => {
                            setMoneyAmountString(moneyAmountInput.toString());
                          }}
                          value={moneyAmountString}
                        />
                        <div className="wallet-connected-form-input-suffix">
                          {selectedCoinName}
                        </div>
                      </div>
                      <span className="wallet-connected-form-info">
                        Amount in dollars: $
                        {(Number(selectedCoinPrice) * moneyAmountInput).toFixed(
                          3
                        )}
                      </span>
                    </div>
                    <div className="wallet-connected-form-group flex-1">
                      <label
                        htmlFor="selected-currency"
                        className="wallet-connected-form-label"
                      >
                        GNG Tokens:
                      </label>
                      <div className="wallet-connected-form-gngValue">
                        {gngAmount} GnG
                      </div>
                      <span className="wallet-connected-form-info">
                        Amount to be purchased (min 5,000)
                      </span>
                    </div>
                  </div>
                </form>

                <div className="wallet-connected-button-container">
                  <div
                    className={
                      selectedCoin ===
                      "0x0000000000000000000000000000000000000001"
                        ? "oops"
                        : "hidePhase"
                    }
                  >
                    <BuyClo
                      moneyValue={moneyAmountInput}
                      setShowSuccess={setShowSuccess}
                      setShowFail={setShowFail}
                      setErrorPopup={setErrorPopup}
                      setInProgress={setInProgress}
                    />
                  </div>

                  <div
                    className={
                      selectedCoin ===
                      "0x9FaE2529863bD691B4A7171bDfCf33C7ebB10a65"
                        ? "oops"
                        : "hidePhase"
                    }
                  >
                    <BuySoy
                      moneyValue={moneyAmountInput}
                      setShowSuccess={setShowSuccess}
                      setShowFail={setShowFail}
                      setErrorPopup={setErrorPopup}
                      setInProgress={setInProgress}
                    />
                  </div>

                  <div
                    className={
                      selectedCoin ===
                      "0x1eAa43544dAa399b87EEcFcC6Fa579D5ea4A6187"
                        ? "oops"
                        : "hidePhase"
                    }
                  >
                    <BuyCloe
                      moneyValue={moneyAmountInput}
                      setShowSuccess={setShowSuccess}
                      setShowFail={setShowFail}
                      setErrorPopup={setErrorPopup}
                      setInProgress={setInProgress}
                    />
                  </div>
                </div>

                <div className="wallet-connected-footnote-container mobile-hidden">
                  <a
                    href="https://explorer.callisto.network/address/0x700D226Be058a0110655575082Db12Fd6862EeF6/transactions"
                    target="_blank"
                    className="connect-wallet-footnote-link connect-wallet-link"
                    rel="noreferrer"
                  >
                    Smart Contract Address
                  </a>
                  <a href="https://callisto.network/gems-goblins-ico-security-audit-report/?utm_source=gemsandgoblins.com"
                     target="_blank"
                     className="connect-wallet-footnote-secure connect-wallet-link"
                     rel="noreferrer"
                  >
                    Security audit report
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        <SuccessPopup
          title="Thanks for support!"
          tokenCount={gngAmount}
          isOpen={showSuccess}
          onClose={() => setShowSuccess(false)}
        >
          Thanks! <br />
          You're now the proud owner of the GNG tokens below.<br />
          We're excited to have you in the community!<br />
        </SuccessPopup>
        <FailPopup
          title="Something went wrong!"
          isOpen={showFail}
          onClose={() => setShowFail(false)}
        >
          {errorPopup}
        </FailPopup>
      </div>
    </div>
  );
}

export default App;
