import React from "react";
import profileButton from "../images/edit-pen.svg";
import addButton from "../images/add-button.svg";
import Card from "./Card";

import { CurrentUserContext } from '../../src/contexts/CurrentUserContext'

function Main({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete

}) {

  const currentUser = React.useContext(CurrentUserContext)


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image" onClick={onEditAvatarClick}>
          {" "}
          <img
            className="profile__imagecontent"
            src={currentUser.avatar}
            alt="Profile User"
          />{" "}
        </div>

        <div className="profile__info">
          <div className="profile__line-header">
            <h2 className="profile__header">{currentUser.name} </h2>
            <button
              type="button"
              className="profile__button"
              onClick={onEditProfileClick}
            >
              <img
                src={profileButton}
                className="profile__button_image"
                alt="Button"
              />
            </button>
          </div>
          <p className="profile__profession">{currentUser.about}</p>
        </div>

        <button type="button" className="add-button" onClick={onAddPlaceClick}>
          <img
            src={addButton}
            className="add-button__image"
            alt="Add Cards Button"
          />
        </button>
      </section>

      <section className="elements page__section">
        <ul className="elements__cards">
         {cards.map((card) => (
            <Card key={card._id} card={card} onClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
