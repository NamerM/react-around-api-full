import React from 'react';
import { CurrentUserContext } from '../../src/contexts/CurrentUserContext';
// import { logger } from '../utils/logger';


function Card({ card, onClick, onCardLike, onCardDelete }) {
  const { name, link} = card;
  const currentUser = React.useContext(CurrentUserContext)
  function handleClick() {
   onClick(card);
  }

  const isOwn = card.owner === currentUser._id;
  // console.log(isOwn);
  const cardDeleteButtonClassName = `elements__button-delete ${isOwn ? '' : 'elements__button-delete_hidden'}`

  const isLiked = card.likes.some(user => user === currentUser._id);   //user._id
  const cardLikeButtonClassName = `elements__button-like ${isLiked ? 'elements__button-like_active' : ''}`

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

return (
    <li className="elements__card">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}></button>
      <img className="elements__image"
        src={link}
        alt={name}
        onClick={handleClick}
        />
      <div className="elements__handle">
        <h2 className="elements__card-text">{name}</h2>
        <div className="elements__handle_likecolumn">
          <button
            className={cardLikeButtonClassName}
           type="button"
           onClick={handleLikeClick}
           ></button>
          <p className="elements__card_likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;


