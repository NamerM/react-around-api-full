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

function App() {
  const [currentUser, setCurrentUser] = useState({});   // {name, about, avatar }
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(undefined);
  const [cards, setCards] = useState([]);
  const [submitButtonEffect, setSubmitButtonEffect] = useState(false);
  //P14 Additions
  const history = useHistory();
  const [userData, setUserData] = useState({ email: 'email@mail.com', });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState('');

  const onLogin = ({ email, password }) => {
    auth.signin(email, password)
      .then((res) => { //{ data: { _id, email } }
        if(res) {
          setIsLoggedIn(true);
          setUserData({ email });
          localStorage.setItem('token', res.token);
          history.push('/main');
        } else {
          setTooltipStatus('fail');
          setIsInfoToolTipOpen(true);
        }
      })
      .catch((err)=> {
        // console.log("err =>", err);
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

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      auth
        .checkToken(token)
        .then((res) => {
          if(res) {
            setUserData({ email: res.data.email})
            setIsLoggedIn(true);
            setIsCheckingToken(false)
            history.push('/');
          } else {
            localStorage.removeItem('token');
          }
        })
        .catch((err) => {
          // console.log("err =>", err)
          history.push('/signin')
        })
        .finally(() => setIsCheckingToken(false))
    }
  }, [])

   const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    history.push('/signin');
  }


//**p11 parts */
  useEffect(() => {
    api.getUserInfo()
      .then( res => {  // { data: { name, avatar, about, _id}}
        setCurrentUser(res);
      })
      .catch(console.log);
    api.getInitialCards()
      .then( res => {
        setCards(res);
      })
      .catch(console.log);
    }, [])

  useEffect(() => {
      const closeByEscape = (e) => {
        if (e.key === 'Escape') {
          closeAllPopups();
        }
      }

      document.addEventListener('keydown', closeByEscape)

      return () => document.removeEventListener('keydown', closeByEscape)
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

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(undefined);
    setIsInfoToolTipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({name, about}){
    setSubmitButtonEffect(true)
    api.editProfile(name, about)
      .then( res => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch(console.log)
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
      .catch(console.log)
      .finally(() => {
        setSubmitButtonEffect(false)
      })
  }
  //{/* handeLikeClick card._id olduğundan burada sadece id objecti gerekiyor bize api.dele velike card._id card return card*/}
  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    api.cardLikeStatusChange(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
      })
      .catch(console.log)
  }

  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(() => {
        setCards((state) => state.filter((cards) => cards._id !== card))
      })
      .catch(console.log)
   }

  function handleAddPlaceSubmit({ name, link }) {
    setSubmitButtonEffect(true)
    api.addCard(name, link)
      .then( res => {
        setCards([res, ...cards ]);
        closeAllPopups()
      })
      .catch(console.log)
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
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoToolTip
            isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
            status={tooltipStatus}
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
              cards = {cards}
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

