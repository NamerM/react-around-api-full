import React from 'react';
import tickIcon from '../images/TickIcon.svg';
import errorIcon from '../images/ErrorIcon.svg'

function InfoToolTip({ isOpen, onClose, status}) {
return (
  <div className={`popup ${isOpen && "popup_open"}`}>
    <div className="popup__square">
      <div className="popup__div" noValidate>
        {status === "success"? (
          <div>
            <img className="popup__icon" src={tickIcon} alt="A tick icon stating the registration was successful" />
            <p className="popup__status-message">
              Success! Now you have been registered.
            </p>
          </div>
        ) : (
          <div>
            <img className="popup__icon" src={errorIcon} alt="A red X shaped icon stating that something gone wrong" />
            <p className="popup__status-message">
              Oops, something went wrong! Please try again.
            </p>
          </div>
        )}
        <button type="button" className="popup__close" onClick={onClose}></button>
      </div>
    </div>
  </div>
  );
}


export default InfoToolTip;
