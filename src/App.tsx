import React, { useState } from "react";
import "./App.css";

import { useWeb3Modal, Web3Button, Web3NetworkSwitch } from "@web3modal/react";

import { useAccount } from "wagmi";

import { useContractRead, erc20ABI } from "wagmi";

function App() {
  const [loading, setLoading] = useState(false);
  const { open } = useWeb3Modal();

  // state variable for phase 2
  const [phase2, setPhase2] = useState(false);

  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  async function onOpen() {
    setLoading(true);
    await open();
    setLoading(false);
  }

  const { data, isError, isLoading } = useContractRead({
    address: "0x9FaE2529863bD691B4A7171bDfCf33C7ebB10a65",
    abi: erc20ABI,
    functionName: "balanceOf",
    args: ["0x584FE1D2Df3A0CD34d588139227b23bb268CECDe"],
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const volumePercentage = "20%";
  const styles = {
    progressBar: {
      width: volumePercentage,
    },
  } as const;

  return (
    <div className="App">
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
                <h2>Take your heroes on a daring adventure</h2>
                <p className="hero-text">
                  Assemble your team, explore mysterious places and fight in
                  epic battles to earn crypto tokens, NFTs and other precious
                  rewards.
                  <br />
                  <br />
                  Gems & Goblins is a play-to-earn game with a scheduled beta
                  release in Q1 2023. Tokens are now in limited pre-sale round –
                  get yours while they're cheap!
                </p>
              </div>
              <div className="desktop-hero-buttons-layout hidden-on-mobile">
                <button
                  id="button-whitelist-desktop"
                  className="button-whitelist desktop-hero-button"
                ></button>
              </div>
            </div>
            <div className="hero-buttons unselectable hidden-on-desktop">
              <button
                id="button-whitelist-mobile"
                className="button-whitelist unselectable"
              ></button>
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
                  Gng tokens are now available in a limited supply...
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
                  <div className="round-progress-divider round-progress-divider-l"></div>
                  <span className="round-progress-value"> 20% </span>
                  <div className="round-progress-divider round-progress-divider-r"></div>
                </div>
                <div className="round-progress-label-container">
                  <span> SOLD: </span>
                  <span>
                    3M <span className="round-progress-label-dark">/ 15M</span>
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
                      $X per token X tokens
                    </span>
                  </div>
                  <div className="next-rounds-card">
                    <span className="next-rounds-card-title"> Round 3 </span>
                    <span className="next-rounds-card-subtitle"></span>
                    <div className="next-rounds-card-separator"></div>
                    <span className="next-rounds-card-info">
                      $X per token X tokens
                    </span>
                  </div>
                  <div className="next-rounds-card">
                    <span className="next-rounds-card-title"> Round 4 </span>
                    <span className="next-rounds-card-subtitle"></span>
                    <div className="next-rounds-card-separator"></div>
                    <span className="next-rounds-card-info">
                      $X per token X tokens
                    </span>
                  </div>
                  <div className="next-rounds-card">
                    <span className="next-rounds-card-title"> Round 5 </span>
                    <span className="next-rounds-card-subtitle"></span>
                    <div className="next-rounds-card-separator"></div>
                    <span className="next-rounds-card-info">
                      $X per token X tokens
                    </span>
                  </div>
                </div>
              </div>
              <div className="investor-cta-container">
                <span className="investor-cta-label">
                  Are you a venture investor?
                </span>
                <a className="investor-cta-link" href="http://google.com/">
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
                  <div className="round-progress-divider round-progress-divider-l"></div>
                  <span className="round-progress-value">20%</span>
                  <div className="round-progress-divider round-progress-divider-r"></div>
                </div>
                <div className="round-progress-label-container">
                  <span>SOLD:</span>
                  <span>
                    3M <span className="round-progress-label-dark">/ 15M</span>
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
                  <div className="supported-currency highlighted">
                    <img
                      src="img/presale/Supported_Currencies_Placeholder.png"
                      className="supported-currency-logo"
                      alt=""
                    />
                    <span className="supported-currency-title">CLO</span>
                  </div>
                  <div className="supported-currency highlighted">
                    <img
                      src="img/presale/Supported_Currencies_Placeholder.png"
                      className="supported-currency-logo"
                      alt=""
                    />
                    <span className="supported-currency-title">SOY</span>
                  </div>
                  <div className="supported-currency highlighted">
                    <img
                      src="img/presale/Supported_Currencies_Placeholder.png"
                      className="supported-currency-logo"
                      alt=""
                    />
                    <span className="supported-currency-title">CLOE</span>
                  </div>
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
                </div>
                <span className="supported-currencies-info">
                  By using CLO, SOY or CLOE you get +5% bonus on GNG tokens!
                </span>
              </div>
              <div className="backers-container">
                <span className="backers-label">Backed by:</span>
                <div className="backers">
                  <img
                    src="img/presale/backers/callisto.png"
                    alt="Callisto Network"
                  />
                  <img src="img/presale/backers/eig.png" alt="EIG" />
                  <img
                    src="img/presale/backers/soy-finance.png"
                    alt="Soy Finance"
                  />
                  <img
                    src="img/presale/backers/absolute-wallet.png"
                    alt="Absolute Wallet"
                  />
                </div>
              </div>
            </div>
            {!isConnected ? (
              <div className="connect-wallet-container">
                <div className="connect-wallet-offer-container">
                  <span className="connect-wallet-offer-heading">
                    5% MORE TOKENS
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
                    href="https://google.com/"
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
                    href="https://google.com/"
                    target="_blank"
                    className="connect-wallet-footnote-link connect-wallet-link"
                    rel="noreferrer"
                  >
                    Smart Contract Address
                  </a>
                  <span className="connect-wallet-footnote-secure">
                    Secure payment
                  </span>
                </div>
              </div>

            ) : (

              <div className="wallet-connected-container">
                <span className="wallet-connected-heading">
                  Wallet connected:
                </span>
                <span className="wallet-connected-wallet">
                  {address}
                </span>
                <div className="wallet-connected-change-wallet">
                  <button type="submit" className="connect-wallet-link" onClick={onOpen}>
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
                        <select id="selected-currency" name="">
                          <option>CLO</option>
                          <option>SOY</option>
                          <option>CLOE</option>
                        </select>
                        <div className="wallet-connected-form-select-arrow">
                          <img src="img/presale/Page3_RollDown.png" alt="" />
                        </div>
                      </div>
                      <span className="wallet-connected-form-info">
                        +5% bonus on GNG tokens
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
                          type="text"
                          inputMode="numeric"
                          className="with-suffix"
                        />
                        <div className="wallet-connected-form-input-suffix">
                          CLO
                        </div>
                      </div>
                      <span className="wallet-connected-form-info">
                        Amount in dollars: $1000
                      </span>
                    </div>
                    <div className="wallet-connected-form-group flex-1">
                      <label
                        htmlFor="selected-currency"
                        className="wallet-connected-form-label"
                      >
                        GNG Tokens:
                      </label>
                      <div className="wallet-connected-form-input">
                        <input
                          type="text"
                          readOnly
                          disabled
                          value="52,500 GNG"
                        />
                      </div>
                      <span className="wallet-connected-form-info">
                        Amount to be purchased (min 5,000)
                      </span>
                    </div>
                  </div>
                </form>

                <div className="wallet-connected-button-container">
                  <button type="submit" className="wallet-connected-button">
                    <span className="wallet-connected-button-img"></span>
                  </button>
                </div>

                <div className="wallet-connected-footnote-container">
                  <a
                    href="#"
                    target="_blank"
                    className="connect-wallet-footnote-link connect-wallet-link"
                  >
                    Smart Contract Address
                  </a>
                  <span className="connect-wallet-footnote-secure">
                    Secure payment
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
