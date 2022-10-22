import React, { useEffect, useState }  from 'react';
import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Footer from '../components/Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Register from './Register.js';
import Login from './Login.js';
import InfoToolTip from './InfoToolTip.js';
import ProtectedRoute from './ProtectedRoute.js';
import '../index.js';
import api from '../../src/utils/api';
import * as auth from "../utils/auth.js";
import { CurrentUserContext } from '../../src/contexts/CurrentUserContext'
import { Redirect, Switch, useHistory, Route } from 'react-router-dom';
// import { set } from 'mongoose';

function App() {
  const [currentUser, setCurrentUser] = useState({});   // {name, about, avatar }
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: '',
    link: ''
  }); //undefined degistirdik
  const [cards, setCards] = useState([]);
  const [submitButtonEffect, setSubmitButtonEffect] = useState(false);
  //P14 Additions
  const history = useHistory();
  const [userData, setUserData] = useState({ email: 'email@mail.com', });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState('');

  //P15
  const [token, setToken] = useState(localStorage.getItem("jwt"));

 //p11
  useEffect(() => {
    if (token) {  // token && isLoggedIn
        api.getUserInfo(token)
        .then( res => {  // { data: { name, avatar, about, _id}}
          setCurrentUser(res);
        })
        .catch((err) => console.log(err));
      api.getInitialCards(token)
        .then( res => {
          setCards(res);
        })
        .catch((err) => console.log(err));
    }
    }, [token])   // token, isLoggedIn

  //P14 check token
  useEffect(() => {
    const token = localStorage.getItem("jwt")
    if(token) {
      auth
        .checkToken(token)
        .then((res) => {
          if(res._id) {
            setIsLoggedIn(true);
            setUserData({ email: res.data.email})
            history.push('/');
          } else {
            localStorage.removeItem(token);
          }
        })
        .catch((err) => {
          console.log('err =>', err)
          history.push('/signin')
        })
        .finally(() => setIsCheckingToken(false))
    }
  }, [history])

       //   Login & Logout  Register p14+
       const onLogin = ({ email, password }) => {
        auth.signin(email, password)
          .then((res) => { //{ data: { _id, email } }
            if(res.token) {
              setIsLoggedIn(true);
              setUserData({ email });
              localStorage.setItem("jwt", res.token);
              setToken(res.token);
              history.push('/');
            } else {
              setTooltipStatus('fail');
              setIsInfoToolTipOpen(true);
            }
          })
          .catch((err)=> {
            console.log("err =>", err);
            setTooltipStatus('fail');
            setIsInfoToolTipOpen(true);
          })
      }

      const onRegisterUser = ({ email, password }) => {
        auth.signup(email, password)
          .then((res) => {
            if(res) {  //res.data._id
              setTooltipStatus('success');
              history.push('/signin')
            } else {
              setTooltipStatus('fail');
            }
          })
          .catch((err) => {
            // console.log("err =>", err);
            setTooltipStatus('fail');
          })
          .finally(() => setIsInfoToolTipOpen(true))
      }

      const handleSignOut = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("jwt");
        history.push('/signin');
      }

  //p11  the effect for modal window closure - esc + mouse click //
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };
    const closeByModal = (e) => {
      if (e.target.classList.contains("popup_open")) {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', closeByEscape);
    document.addEventListener('click', closeByModal);

    return () => {
      document.removeEventListener('keydown', closeByEscape);
      document.removeEventListener('click', closeByModal);
    }
}, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(undefined);
    setIsInfoToolTipOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleUpdateUser({name, about}){
    setSubmitButtonEffect(true)
    api.editProfile({ name, about }, token)
      .then( res => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setSubmitButtonEffect(false)
      })
  }

  function handleUpdateAvatar({avatar}) {
    setSubmitButtonEffect(true)
    api.editAvatar(avatar)
      .then( res => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setSubmitButtonEffect(false)
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user === currentUser._id);
    console.log(card._id, isLiked);
    api
      .cardLikeStatusChange(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map(currentCard => {
            return currentCard._id === card._id ? newCard : currentCard
          })
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    setSubmitButtonEffect(true);
    api.deleteCard(card._id)
      .then(() => {
        const state = cards.filter(
          stateCards => stateCards._id !== card._id
        );
        setCards(state);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setSubmitButtonEffect(false);
      })
   }

  function handleAddPlaceSubmit({ name, link }) { //{ name, link }
    setSubmitButtonEffect(true)
    api
      .addCard({ name, link })
      .then( res => {
        setCards([res, ...cards]);
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setSubmitButtonEffect(false)
      })
    }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__content">
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={submitButtonEffect}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={submitButtonEffect}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
            isLoading={submitButtonEffect}
          />
          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
            name="imagePopup"
          />
          <InfoToolTip
            isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
            status={tooltipStatus}
            name="tool-tip"
          />
          <Header
            isLoggedIn={isLoggedIn}
            path="/signup"
            email={userData.email}
            handleSignOut={handleSignOut}
          />
          <Switch>
            <ProtectedRoute exact path={"/"} isLoggedIn={isLoggedIn} isCheckingToken={isCheckingToken}>
              <Main
              onEditAvatarClick={handleEditAvatarClick}
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              />
            </ProtectedRoute>
            <Route path={"/signin"}>
              <Login onLogin={onLogin} />
            </Route>
            <Route path={"/signup"}>
              <Register onRegisterUser={onRegisterUser} />
            </Route>
            <Route>
              {isLoggedIn ? ( <Redirect to="/" /> ) : ( <Redirect to="/signin" /> ) }
            </Route>
          </Switch>
          <Footer />
        </div>
      </CurrentUserContext.Provider>
  );
}

export default App;

