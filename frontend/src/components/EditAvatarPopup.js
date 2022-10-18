import React, { useRef} from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading}){
  const avatarRef =  useRef()

  React.useEffect(() => {
    avatarRef.current.value =""
  }, [isOpen])

  function handleSubmit(e) {
    const avatarValue = avatarRef.current.value;
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarValue,
    });
  }

  return (
  <PopupWithForm
    title="Change Profile Picture"
    name="avatar-change"
    isOpen={isOpen}
    onClose={onClose}
    buttonText = "Change Avatar"
    onSubmit={handleSubmit}
    isLoading={isLoading}
  >
  <label className="popup__formfield">
    <input className="popup__input popup__input_type_link" ref={avatarRef} type="url" placeholder="Picture Url"  id="link" name="link"  required />
    <span id="link-error" className="popup__input-error"></span>
  </label>
  </PopupWithForm>

  )
}

export default EditAvatarPopup;



