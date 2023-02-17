import React, {PropsWithChildren} from 'react';

export type SuccessPopupProps = {
    title: string,
    tokenCount: number,
    isOpen: boolean,
    onClose?: () => void,
};

export function SuccessPopup({title, tokenCount, isOpen, onClose, children}: PropsWithChildren<SuccessPopupProps>) {
    return (
        <div className="popup-container"
             style={{ display: isOpen ? 'flex' : 'none'}}
        >
            <div className="popup success">
                <h3 className="popup-title">
                    {title}
                </h3>
                <p className="popup-body">
                    {children}
                </p>

                <div className="popup-token-count">
                    <span className="popup-token-count-label">
                        GNG tokens bought:
                    </span>
                    <span className="popup-token-count-value">
                        {tokenCount}
                    </span>
                    <div className="popup-token-count-dice">
                        <div className="popup-token-count-dice-img"></div>
                    </div>
                </div>

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
