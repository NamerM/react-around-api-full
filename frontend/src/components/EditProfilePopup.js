import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../src/contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm.js';


function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading}){
  const currentUser = React.useContext(CurrentUserContext)

  const [name, setName] = useState(currentUser.name || '');
  const [description , setDescription] = useState(currentUser.about ||'');

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({  //props.onUpdateUser
      name,
      about: description,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleProfessionChange(e) {
    setDescription(e.target.value);
  }

return(
  <PopupWithForm
    title="Edit Profile"
    name="profile"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    isLoading={isLoading}
  >
    <label className="popup__formfield">
      <input className="popup__input popup__input_type_name" value={name || ''} onChange={handleNameChange} type="text" placeholder="Name" id="name" minLength="2" maxLength="40" required/>
      <span id="name-error" className="popup__input-error"></span>
    </label>
    <label className="popup__formfield">
      <input className="popup__input popup__input_type_profession" value={description || ''} onChange={handleProfessionChange} type="text" placeholder="Profession" id="profession" minLength="2" maxLength="200" required/>
      <span id="profession-error" className="popup__input-error"> </span>
    </label>
  </PopupWithForm>

  )
}

export default EditProfilePopup;

