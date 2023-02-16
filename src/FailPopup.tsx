import React, {PropsWithChildren} from 'react';

export type FailPopupProps = {
    title: string,
    isOpen: boolean,
    onClose?: () => void,
};

export function FailPopup({title, isOpen, onClose, children}: PropsWithChildren<FailPopupProps>) {
    return (
        <div className="popup-container"
             style={{ display: isOpen ? 'flex' : 'none'}}
        >
            <div className="popup fail">
                <h3 className="popup-title">
                    {title}
                </h3>
                <p className="popup-body">
                    {children}
                </p>

                <div className="popup-button-container">
                    <a href="mailto:support@gemsandgoblins.com">
                        <button className="popup-contact-support-button">
                            <span className="popup-contact-support-button-img"></span>
                        </button>
                    </a>
                </div>

                <div className="popup-close-link-container">
                    <span className="popup-close-link"
                          onClick={onClose}
                          tabIndex={0}
                    >
                        Close
                    </span>
                </div>
            </div>
        </div>
    );
}
