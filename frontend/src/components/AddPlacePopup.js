import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit, isLoading }){

  const [cardName, setCardName] = useState("");
  const [cardLink , setCardLink] = useState("");

  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [isOpen])

  function handleSubmit(e){

    e.preventDefault();

    onAddPlaceSubmit({
      name: cardName,
      link: cardLink });
  }

  function handleAddCardName(e) {
    setCardName(e.target.value);
  }

  function handleAddCardLink(e) {
    setCardLink(e.target.value);
  }

  return (
    <PopupWithForm
      title="New Place"
      name="add-card"
      isOpen={isOpen}
      onClose={onClose}
      buttonText ="Create"
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
    <label className="popup__formfield">
      <input className="popup__input popup__input_type_title"  value={cardName} onChange={handleAddCardName} type="text" placeholder="Title" id="cardTitle" name="cardTitle" minLength="1" maxLength="30" required />
      <span id="cardTitle-error" className="popup__input-error"></span>
    </label>
    <label className="popup__formfield">
      <input className="popup__input popup__input_type_link"  value={cardLink} onChange={handleAddCardLink} type="url" placeholder="Link"  id="cardImageLink" name="cardImageLink"  required/>
      <span id="cardImageLink-error" className="popup__input-error"></span>
    </label>
  </PopupWithForm>

  )
}

export default AddPlacePopup;
