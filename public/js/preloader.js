var header;
var headerButton;
var headerBackground;

var whitelistButtonDesktop;
var whitelistButtonMobile;
var mobilePopup;

var popupConfirmMobile;

var desktopPopupForm;
var desktopPopupSuccess;
var desktopPopupFail;

var desktopPopupBackButton;
var desktopPopupSuccessButton;
var desktopPopupCloseButton;

var mobilePopupForm;
var mobilePopupSuccess;
var mobilePopupFail;

var mobilePopupBackButton;
var mobilePopupSuccessButton;

var imgLoadingScreen = new Image();
var imgLoadingLoader = new Image();

var loadingScreen;
var loadingLoader;
var loadingWrapper;

imgLoadingScreen.onload = () => {
    loadingScreen = document.querySelector("#loading-screen");
    loadingScreen.style.backgroundImage = `url(${imgLoadingScreen.src})`;
    loadingScreen.classList.add("loading-element-loaded");
}

imgLoadingLoader.onload = () => {
    loadingLoader = document.querySelector("#loader");
    loadingLoader.style.backgroundImage = `url(${imgLoadingLoader.src})`;
    loadingLoader.classList.add("loading-element-loaded");
}

imgLoadingScreen.src = "../img/universal/loading/loading-background.png";
imgLoadingLoader.src = "../img/universal/loading/loader/loader.svg";

//assigning elements
window.onload = function(){

    initialise();

    //header button click
    headerButton.addEventListener('click', () => {
        header.classList.toggle('header-active');
        headerBackground.classList.toggle('header-background-active');
        startAnim();
    });


    if (whitelistButtonMobile) {
        whitelistButtonMobile.addEventListener('click', () => {
            mobilePopup.classList.toggle("mobile-popup-active");
            mobilePopupForm.classList.add("popup-element-active");
            mobilePopupSuccess.classList.remove("popup-element-active");
            mobilePopupFail.classList.remove("popup-element-active");
        });
    }

    for (let index = 0; index < headerTexts.length; index++) {
        headerTexts[index].addEventListener('click', () => {
            header.classList.toggle('header-active');
            headerBackground.classList.toggle('header-background-active');
            startAnim();
        });
    }

    window.addEventListener("scroll", showStickyHeader);

    heroButtonsLoad();


    window.scrollTo(0, 0);

    window.addEventListener('click', (e) => {
        document.body.appendChild(clickParticleCreate(e));
    });

}



var logoInterval;
var logoDesktopInterval;


particles = [1,2,3]

function clickParticleCreate(e) {
    if(particles.length){
        const random = Math.floor(Math.random() * particles.length);
        const el = particles.splice(random, 1)[0];

        clickBase = document.getElementById("click_" + el)
    }
    else{
        //console.log("done");
        particles = [1,2,3]

        const random = Math.floor(Math.random() * particles.length);
        const el = particles.splice(random, 1)[0];

        clickBase = document.getElementById("click_" + el)
    }

    var clickParticle = clickBase.cloneNode(true);

    clickParticle.style.left = e.pageX + "px";
    clickParticle.style.top = e.pageY + "px";
    clickParticle.style.transform = "translate(-50%, -50%)"

    clickParticle.style.zIndex = "10";
    clickParticle.style.position = "absolute";

    setTimeout(() => {
        clickParticle.remove();
    }, 500);

    return clickParticle

}





//header button animation
var animationInterval;
var position = 0;
var startAnimOpen = 0;


function startAnim() {
    const speed = 36;
    const diff = 3.571428571428571;
    var step = 0
    const numOfSteps = 14;

    if (startAnimOpen == 2){
        startAnimOpen = 0
        position = 0
    }

    animationInterval = setInterval(() => {
        headerButton.style.backgroundPosition = `${position}% center`;

        if (step < numOfSteps) {
            position = position + diff;
            step += 1;

        }
    }, speed);

    startAnimOpen += 1
}


function startAnimation(object, speed, diff, numOfSteps, repeat, interval) {
    var position = 0;
    var step = 0


    interval = setInterval(() => {
        object.style.transform = `translateX(-${position}%)`;

        if (step < numOfSteps) {
            position = position + diff;
            step += 1;
        }
        else if (repeat == 1){
            startAnimation(object, speed, diff, numOfSteps, repeat)
            clearInterval(interval);

        }


    }, speed);

}

function showStickyHeader(){
    breakingPoint = document.documentElement.clientWidth * 0.1;

    if (window.pageYOffset > breakingPoint) {
        headerSticky.classList.add("desktop-header-sticky-active");
        logoDesktopSticky.style.transform = `translateX(-10900%)`;

    }
    else {
        headerSticky.classList.remove("desktop-header-sticky-active");
    }
}


function initialise(){
    header = document.getElementById('header');
    headerButton = document.getElementById('header-button');
    headerBackground = document.getElementById("header-background");

    whitelistButtonMobile = document.getElementById("button-whitelist-mobile");
    whitelistButtonDesktop = document.getElementById("button-whitelist-desktop");
    whitelistButtonDialogue = document.getElementById("join-whitelist-dialogue-button");

    whitepaperButtonHeader = document.getElementsByClassName("button-whitepaper-header").item(1);
    whitepaperButtonSticky = document.getElementById("button-whitepaper-sticky");

    desktopPopupCloseButton = document.getElementById("desktop-popup-close-button");

    popupConfirmMobile = document.getElementById("button-whitelist-confirm-mobile");
    popupConfirmDesktop = document.getElementById("button-whitelist-confirm-desktop");
    popupCancelMobile = document.getElementById("button-whitelist-cancel-mobile");

    desktopPopupForm = document.getElementById("desktop-popup-form");
    desktopPopupSuccess = document.getElementById("desktop-popup-success");
    desktopPopupFail = document.getElementById("desktop-popup-fail");

    desktopPopupBackButton = document.getElementById("desktop-button-popup-back");
    desktopPopupSuccessButton  = document.getElementById("desktop-button-popup-success");

    mobilePopupForm = document.getElementById("mobile-popup-form");
    mobilePopupSuccess = document.getElementById("mobile-popup-success");
    mobilePopupFail = document.getElementById("mobile-popup-fail");

    mobilePopupBackButton = document.getElementById("mobile-button-popup-back");
    mobilePopupSuccessButton  = document.getElementById("mobile-button-popup-success");


    whitepaperButton = document.getElementById("button-whitepaper");

    mobilePopup = document.getElementById("mobile-popup");
    desktopPopup = document.getElementById("desktop-popup");
    desktopPopupBackground = document.getElementById("desktop-popup-background");

    desktopMailInput = document.getElementById("popup-email-desktop")
    mobiieMailInput = document.getElementById("popup-email-mobile")

    headerTexts = document.getElementsByClassName("header-text");

    logo = new Array();
    logo = document.getElementById("logo-wrapper");

    logoDesktop = new Array();
    logoDesktop = document.getElementById("logo-wrapper-desktop");

    logoDesktopSticky = new Array();
    logoDesktopSticky = document.getElementById("logo-wrapper-desktop-sticky");

    headerSticky = document.getElementById("header-sticky");


    clickWrapper = document.getElementById("click-container");
}

var content;
document.onreadystatechange = function() {
    if (document.readyState === 'interactive') {
        console.log("dom loaded")
        content = document.getElementsByClassName("content");
        contentDelayed = document.getElementsByClassName("content-delayed");
        loadingScreen = document.getElementById("loading-screen");
        loadingLoader = document.querySelector("#loader");
        loadingLoader.style.backgroundImage = `url(${imgLoadingLoader.src})`;
        loadingLoader.classList.add("loading-element-loaded");

        const interval = setInterval(() => {
            const app = document.querySelector('.App');
            if (!app)
                return;

            clearInterval(interval);

            if (window.presale)
                window.presale();

            const bgItems = document.querySelectorAll('*[data-bgi="1"]');
            const imgItems = document.querySelectorAll('.logo img, .logo-wrapper img');
            const context = {
                state: bgItems.length + imgItems.length,
            };
            const finishLoading = () => {
                loadingWrapper.classList.add("loading-finished");
                setTimeout(function () {
                    startAnimation(logo, 17, 100, 109, 0, logoInterval);
                    startAnimation(logoDesktop, 17, 100, 109, 0, logoDesktopInterval);
                }, 300);
            }

            bgItems.forEach(e => {
                const bgi = window.getComputedStyle(e).getPropertyValue('background-image');
                const src = bgi.slice(5, -2);

                const img = new Image();
                img.onload = () => {
                    if (--context.state === 0)
                        finishLoading();
                };
                img.src = src;
            });

            imgItems.forEach(e => {
                const src = e.src;

                const img = new Image();
                img.onload = () => {
                    if (--context.state === 0)
                        finishLoading();
                };
                img.src = src;
            });
        }, 100);

        loadingWrapper = document.querySelector("#loading-wrapper");

        loadingScreen = document.querySelector("#loading-screen");
        loadingScreen.style.backgroundImage = `url(${imgLoadingScreen.src})`;
        loadingScreen.classList.add("loading-element-loaded");

        loadingLoader = document.querySelector("#loader");
        loadingLoader.style.backgroundImage = `url(${imgLoadingLoader.src})`;
        loadingLoader.classList.add("loading-element-loaded");
    }
};

