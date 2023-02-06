import React, { useState } from "react";
import "./App.css";

import {
  useWeb3Modal,
  Web3Button,
  Web3NetworkSwitch,
} from "@web3modal/react";

import {
  useAccount,
} from "wagmi";

import { useContractRead, erc20ABI } from "wagmi";

function App() {
  const [loading, setLoading] = useState(false);
  const { open } = useWeb3Modal();

  const { address, isConnecting, isDisconnected } = useAccount();

  async function onOpen() {
    setLoading(true);
    await open();
    setLoading(false);
  }

  const { data, isError, isLoading } = useContractRead({
    address: '0x9FaE2529863bD691B4A7171bDfCf33C7ebB10a65',
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: ['0x584FE1D2Df3A0CD34d588139227b23bb268CECDe'],
    onSuccess(data) {
      console.log('Success', data)
    },
  })

  const volumePercentage = "20%"
  const styles = {
    progressBar: {
      width: volumePercentage,
    },
  } as const;

  return (
    <div className="App">

    <div className="content">

      <div className="hero-video">
        <video preload="auto" autoPlay muted loop playsInline>
          <source src="/img/hero-section/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="caption">
          <div className="logo hidden-on-desktop">
            <div className="logo-wrapper" id="logo-wrapper">
              <img src="img/hero-section/logo/hero_logo_1.png" alt=""/>
              <img src="img/hero-section/logo/hero_logo_2.png" alt=""/>
              <img src="img/hero-section/logo/hero_logo_3.png" alt=""/>
              <img src="img/hero-section/logo/hero_logo_4.png" alt=""/>
              <img src="img/hero-section/logo/hero_logo_5.png" alt=""/>
              <img src="img/hero-section/logo/hero_logo_6.png" alt=""/>
              <img src="img/hero-section/logo/hero_logo_7.png" alt=""/>
              <img src="img/hero-section/logo/hero_logo_8.png" alt=""/>
              <img src="img/hero-section/logo/hero_logo_9.png" alt=""/>
              <img src="img/hero-section/logo/hero_logo_10.png" alt=""/>
              <img src="img/hero-section/logo/hero_logo_11.png" alt=""/>
            </div>
          </div>

          <div className="desktop-hero-layout">
            <div className="desktop-hero-left-col">
              <h2>Take your heroes on a daring adventure</h2>
              <p className="hero-text">
                Assemble your team, explore mysterious places and fight in epic
                battles to earn crypto tokens, NFTs and other precious
                rewards.<br />
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
                  <div className="round-progress-bar-mask" style={styles.progressBar}>
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
                <div
                  className="round-progress-divider round-progress-divider-l"
                ></div>
                <span className="round-progress-value"> 20% </span>
                <div
                  className="round-progress-divider round-progress-divider-r"
                ></div>
              </div>
              <div className="round-progress-label-container">
                <span> SOLD: </span>
                <span>
                  3M <span className="round-progress-label-dark">/ 15M</span>
                </span>
              </div>
              <span className="round-price text-center"> $0,02 per GNG token </span>

              <div className="round-time-left-container">
                <span className="round-time-left-label">
                  time left in round 1
                </span>
                <div className="round-time-left-clock-container">
                  <div className="round-time-left-clock-column">
                    <div className="round-time-left-clock-value" data-field="days">
                      <div className="round-time-left-clock-value-bg">
                        <div className="round-time-left-clock-value-bg-flip"></div>
                      </div>
                      <span className="round-time-left-clock-value-text"> 20 </span>
                    </div>
                    <span className="round-time-left-clock-label"> D </span>
                  </div>
                  <div className="round-time-left-clock-column">
                    <div className="round-time-left-clock-value" data-field="hours">
                      <div className="round-time-left-clock-value-bg">
                        <div className="round-time-left-clock-value-bg-flip"></div>
                      </div>
                      <span className="round-time-left-clock-value-text"> 15 </span>
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
                      <span className="round-time-left-clock-value-text"> 48 </span>
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
                      <span className="round-time-left-clock-value-text"> 15 </span>
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
                  <span className="next-rounds-card-subtitle"> Coming next </span>
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
              <a className="investor-cta-link" href="http://google.com/"> Reach out to us </a>
            </div>

            <div className="presale-buy-button-container">
              <button className="presale-buy-button">
                <span className="presale-buy-button-img"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

      <div className="web3stuff">      
        <h1>Testing:</h1>
        <div>
          <Web3Button icon="show" label="Connect Wallet" balance="show" />
        </div>
        <div>
          <Web3NetworkSwitch />
        </div>
        <div>
          <button onClick={onOpen} disabled={loading}>
            {loading ? "Loading..." : "Custom Button"}
          </button>
        </div>
        <div>{address}</div>
        <div>balanceOf: {data && data.toString()}</div>
        
      </div>
    </div>
  );
}

export default App;
