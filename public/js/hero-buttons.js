function heroButtonsLoad(){

    intervals = new Set();

    function clearIntervals(){

        for (let item of intervals){
            clearInterval(item)
        }
    }
    
    //animation logic
    function changePosition(object, start, numOfSteps) {

        step = 0
        diff = 100/29;
        speed = 36;


        
        position = start * diff
        
    
        let animationInterval = setInterval(() => {
            object.style.backgroundPosition = `center ${position}%`;

            if (step < numOfSteps) {
                position = position + diff;
                step += 1;
            }
            else {
                clearInterval(animationInterval)
            }
        }, speed);

        intervals.add(animationInterval);
    }

    //whitelist button states

    if (whitelistButtonDesktop) {

        whitelistButtonDesktop.addEventListener('mouseover', () => {
            clearIntervals()
            changePosition(whitelistButtonDesktop, 0, 1)
        });

        whitelistButtonDesktop.addEventListener('mouseout', () => {
            clearIntervals()

            changePosition(whitelistButtonDesktop, 12, 18)


        });

        whitelistButtonDesktop.addEventListener('mousedown', () => {
            clearIntervals()
            changePosition(whitelistButtonDesktop, 2, 2)
        });

        whitelistButtonDesktop.addEventListener('mouseup', () => {
            clearIntervals()
            changePosition(whitelistButtonDesktop, 5, 7)
        });

        whitelistButtonDesktop.addEventListener('click', () => {
            desktopPopup.classList.toggle("desktop-popup-wrapper-active");
            desktopPopupForm.classList.add("popup-element-active");
            desktopPopupFail.classList.remove("popup-element-active");
            desktopPopupSuccess.classList.remove("popup-element-active");
        });

    }

    whitelistButtonDialogue.addEventListener('click', () => {
        desktopPopup.classList.toggle("desktop-popup-wrapper-active");
        desktopPopupForm.classList.add("popup-element-active");
        desktopPopupFail.classList.remove("popup-element-active");
        desktopPopupSuccess.classList.remove("popup-element-active");
        mobilePopup.classList.toggle("mobile-popup-active");
        mobilePopupForm.classList.add("popup-element-active");
        mobilePopupSuccess.classList.remove("popup-element-active");
        mobilePopupFail.classList.remove("popup-element-active");
    });



    //whitepaper button states

/*
    whitepaperButton.addEventListener('mouseover', () => {
        clearIntervals()
        changePosition(whitepaperButton, 0, 2)
    });

    whitepaperButton.addEventListener('mouseout', () => {
        clearIntervals()
        
        changePosition(whitepaperButton, 9, 19)
        
    });

    whitepaperButton.addEventListener('mousedown', () => {
        clearIntervals()
        changePosition(whitepaperButton, 3, 2)
    });

    whitepaperButton.addEventListener('mouseup', () => {
        clearIntervals()
        changePosition(whitepaperButton, 6, 3)
    });
*/

    //POPUP MOBILE

/*
    popupConfirmMobile.addEventListener('click', () => {
        if(validateEmail(mobiieMailInput)){
            confirmEmailMobile()
        }
        else if (!validateEmail(mobiieMailInput)){
            refuseEmailMobile()
        }
        
    });
*/

    //BACK
/*
    mobilePopupBackButton.addEventListener('click', () => {
        mobilePopupForm.classList.add("popup-element-active");
        mobilePopupFail.classList.remove("popup-element-active");
        
    });
*/

    //SUCCESS
/*
    mobilePopupSuccessButton.addEventListener('click', () => {
        mobilePopup.classList.remove("mobile-popup-active");
        mobilePopupForm.classList.remove("popup-element-active");
        mobilePopupSuccess.classList.remove("popup-element-active");
        
    });
*/



/*
    popupCancelMobile.addEventListener('touchend', () => {
        mobilePopup.classList.toggle("mobile-popup-active");
    });


    //whitepaper button states

    popupConfirmDesktop.addEventListener('mouseover', () => {
        clearIntervals()
        changePosition(popupConfirmDesktop, 0, 2)
    });

    popupConfirmDesktop.addEventListener('mouseout', () => {
        clearIntervals()
        changePosition(popupConfirmDesktop, 9, 19)
    });

    popupConfirmDesktop.addEventListener('mousedown', () => {
        clearIntervals()
        changePosition(popupConfirmDesktop, 3, 2)
    });

    popupConfirmDesktop.addEventListener('mouseup', () => {
        clearIntervals()
        changePosition(popupConfirmDesktop, 6, 3)

    });

    popupConfirmDesktop.addEventListener('click', () => {

        clearIntervals()

        if(validateEmail(desktopMailInput)){
            confirmEmail()
        }
        else if (!validateEmail(desktopMailInput)){
            refuseEmail()
        }
        
    });

    desktopPopupBackground.addEventListener("click", () =>{

        desktopPopup.classList.toggle("desktop-popup-wrapper-active");
    })
*/



    //header buttons

    //main

    whitepaperButtonHeader.addEventListener('mouseover', () => {
        clearIntervals()
            changePosition(whitepaperButtonHeader, 0, 1)
    });

    whitepaperButtonHeader.addEventListener('mouseout', () => {
        clearIntervals()
        
        changePosition(whitepaperButtonHeader, 11, 17)
        
    });

    whitepaperButtonHeader.addEventListener('mousedown', () => {
        clearIntervals()
        changePosition(whitepaperButtonHeader, 2, 2)
    });

    whitepaperButtonHeader.addEventListener('mouseup', () => {
        clearIntervals()
        changePosition(whitepaperButtonHeader, 5, 6)
    });

    //sticky
    
    whitepaperButtonSticky.addEventListener('mouseover', () => {
        clearIntervals()
        changePosition(whitepaperButtonSticky, 0, 1)
    });

    whitepaperButtonSticky.addEventListener('mouseout', () => {
        clearIntervals()
        
        changePosition(whitepaperButtonSticky, 11, 17)
        
    });

    whitepaperButtonSticky.addEventListener('mousedown', () => {
        clearIntervals()
        changePosition(whitepaperButtonSticky, 2, 2)
    });

    whitepaperButtonSticky.addEventListener('mouseup', () => {
        clearIntervals()
        changePosition(whitepaperButtonSticky, 5, 6)
    });




    //POPUP DESKTOP
    //BACK

/*
    desktopPopupBackButton.addEventListener('mouseover', () => {
        clearIntervals()
        changePosition(desktopPopupBackButton, 0, 1)
    });

    desktopPopupBackButton.addEventListener('mouseout', () => {
        clearIntervals()
        
        changePosition(desktopPopupBackButton, 11, 17)
        
    });

    desktopPopupBackButton.addEventListener('mousedown', () => {
        clearIntervals()
        changePosition(desktopPopupBackButton, 2, 2)
    });

    desktopPopupBackButton.addEventListener('mouseup', () => {
        clearIntervals()
        changePosition(desktopPopupBackButton, 5, 6)
    });

    desktopPopupBackButton.addEventListener('click', () => {
        desktopPopupForm.classList.toggle("popup-element-active");
        desktopPopupFail.classList.toggle("popup-element-active");
    });

    //SUCCESS
    desktopPopupSuccessButton.addEventListener('mouseover', () => {
        clearIntervals()
        changePosition(desktopPopupSuccessButton, 0, 1)
    });

    desktopPopupSuccessButton.addEventListener('mouseout', () => {
        clearIntervals()
        
        changePosition(desktopPopupSuccessButton, 11, 17)
        
    });

    desktopPopupSuccessButton.addEventListener('mousedown', () => {
        clearIntervals()
        changePosition(desktopPopupSuccessButton, 2, 2)
    });

    desktopPopupSuccessButton.addEventListener('mouseup', () => {
        clearIntervals()
        changePosition(desktopPopupSuccessButton, 5, 6)
    });

    desktopPopupSuccessButton.addEventListener('click', () => {
        desktopPopup.classList.remove("desktop-popup-wrapper-active");
    });

    desktopPopupCloseButton.addEventListener('click', () => {
        desktopPopup.classList.remove("desktop-popup-wrapper-active");
    });
*/

    
}



function validateEmail(inputText)
{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.value.match(mailformat)){
        return true;
    }
    else{
        return false;
    }
}

function confirmEmail(){
    desktopPopupForm.classList.toggle("popup-element-active");
    desktopPopupSuccess.classList.toggle("popup-element-active");
}

function refuseEmail(){
    desktopPopupForm.classList.toggle("popup-element-active");
    desktopPopupFail.classList.toggle("popup-element-active");
}

function confirmEmailMobile(){
    mobilePopupForm.classList.toggle("popup-element-active");
    mobilePopupSuccess.classList.toggle("popup-element-active");
}

function refuseEmailMobile(){
    mobilePopupForm.classList.toggle("popup-element-active");
    mobilePopupFail.classList.toggle("popup-element-active");
}