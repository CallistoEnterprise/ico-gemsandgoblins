import React from 'react';

export type VestingPopupProps = {
    isOpen: boolean,
    onClose?: () => void,
};

export function VestingPopup({isOpen, onClose}: VestingPopupProps) {
    return (
        <div className="popup-container"
             style={{ display: isOpen ? 'flex' : 'none'}}
        >
            <div className="popup vesting">
                <h3 className="popup-title">
                    Vesting notice:
                </h3>
                <p className="popup-subtitle">
                    20% of your tokens now,<br/>
                    the rest over 4 months.
                </p>
                <p className="popup-body">
                    To protect you from malicious pump-and-dump techniques, the first round of GNG token pre-sale is
                    subject to vesting, meaning that you get 20% of the tokens instantly, then additional 20% each
                    month after your purchase until the whole 100% of tokens is paid. Don't be alarmed if you received
                    less than expected: this is by design and you will be receiving everything you paid for.
                </p>

                <div className="popup-button-container">
                    <button className="popup-close-button"
                            onClick={onClose}
                    >
                        <span className="popup-close-button-img"></span>
                    </button>
                </div>
            </div>
        </div>
    );
}
