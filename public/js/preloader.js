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

//assigning elements
window.onload=function(){
    header = document.getElementById('header');
    headerButton = document.getElementById('header-button');
    headerBackground = document.getElementById("header-background");

    whitelistButtonMobile = document.getElementById("button-whitelist-mobile");
    whitelistButtonDesktop = document.getElementById("button-whitelist-desktop");
    whitelistButtonDialogue = document.getElementById("join-whitelist-dialogue-button");

    whitepaperButtonHeader = document.getElementById("button-whitepaper-header");
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

    if (window.heroButtonsLoad)
        window.heroButtonsLoad();

    if (window.presale)
        window.presale();
}



//load start

document.onreadystatechange = function()
{
    if (document.readyState === 'interactive')
    {
        console.log("dom loaded")
        content = document.getElementsByClassName("content");
        contentDelayed = document.getElementsByClassName("content-delayed");
        loadingScreen = document.getElementById("loading-screen");

        
    }
};




var loadingSrc = '../img/universal/loading/loader/loader.svg';
var loadingBack = new Image();
loadingBack.src = loadingSrc;

loadingBack.addEventListener('load', function() {
    console.log("loading loaded");
    
    try{
        loadingScreen.classList.add("loading-screen-active");
    }
    catch{}
});


var logoInterval;
var logoDesktopInterval;

//animations initialisation after load
window.addEventListener("load", function(){
    console.log("window loaded")
    window.scrollTo(0, 0);

    loadingScreen.classList.add("loading-screen-active");
    setTimeout(function(){
        for (let index = 0; index < content.length; index++) {
            content[index].classList.toggle("content-active");
        }
        loadingScreen.classList.remove("loading-screen-active");
    }, 1000);

    setTimeout(function(){
        for (let index = 0; index < contentDelayed.length; index++) {
            contentDelayed[index].classList.toggle("content-delayed-active");
            
        }
        startAnimation(logo, 17, 100, 109, 0, logoInterval);
        startAnimation(logoDesktop, 17, 100, 109, 0, logoDesktopInterval);
    }, 1500);


    
});



//header button animation
var animationInterval;
var position = 0;
var open = 0

function startAnim() {
    const speed = 36;
    const diff = 3.571428571428571;
    var step = 0
    const numOfSteps = 14;

    if (open == 2){
        open = 0
        position = 0
    }
  
    animationInterval = setInterval(() => {
        headerButton.style.backgroundPosition = `${position}% center`;
  
        if (step < numOfSteps) {
            position = position + diff;
            step += 1;
            
        }
    }, speed);

    open += 1 
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
    breakingPoint = document.documentElement.clientWidth * 0.2;

    if (window.pageYOffset > breakingPoint) {
        headerSticky.classList.add("desktop-header-sticky-active");
        logoDesktopSticky.style.transform = `translateX(-10900%)`;
        
    }
    else {
        headerSticky.classList.remove("desktop-header-sticky-active");
    }
}