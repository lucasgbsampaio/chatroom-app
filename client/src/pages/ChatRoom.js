import React from 'react';

import { ALL_USERS } from '../services/api';
import searchIcon from '../assets/search-icon.svg';
import send from '../assets/send.svg';

import style from './ChatRoom.module.css';

export default function ChatRoom() {
  const [message, setMessage] = React.useState('');
  const [userFiltered, setUserFiltered] = React.useState('');
  const [showMessages, setShowMessages] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [users, setUsers] = React.useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(message);
    setMessage('');
  }

  function handleKeyPress(event) {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  async function handleClick(event) {
    setUser(JSON.parse(event.currentTarget.dataset.user));
    setShowMessages(true);
  }

  React.useEffect(() => {
    async function getUsers() {
      const { url, options } = ALL_USERS();
      const res = await fetch(url, options);
      const json = await res.json();
      setUsers(json);
    }

    getUsers();
  }, []);

  return (
    <div className="wrapper">
      <div className={style.container}>
        <div className={style.leftSide}>
          <div className={style.topContainer}>
            <div className={style.avatar}>
              <div className={style.letter}>{users && users.user[0]}</div>
              <span className={style.name}>{users && users.user}</span>
            </div>
          </div>

          <div className={style.mainContentLeftSide}>
            <div className={style.containerInput}>
              <img src={searchIcon} alt="search" />
              <input
                type="text"
                id="user"
                name="user"
                value={userFiltered}
                onChange={({ target }) => {
                  setUserFiltered(target.value);
                }}
                placeholder="Procurar ou começar uma nova conversa..."
              />
            </div>

            <div className={style.users}>
              {users &&
                users.users.map((userr) => {
                  return (
                    <div
                      onClick={handleClick}
                      key={userr.id}
                      className={style.userContent}
                      style={{
                        borderBottomColor:
                          user && userr.id === user.id && '#f9826c',
                      }}
                      data-user={JSON.stringify(userr)}
                    >
                      <div className={style.letter}>{userr.username[0]}</div>
                      <span className={style.name}>{userr.username}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className={style.rightSide}>
          {!showMessages ? (
            <div className={style.homeMessage}>
              <div>
                <h2>Comece uma nova conversa...</h2>
                <span>Clique em algum usuário ao lado esquerdo.</span>
              </div>
            </div>
          ) : (
            <div className={style.mainContent}>
              <div className={style.headerChat}>
                <div className={style.avatar}>
                  <div className={style.letter}>{user.username[0]}</div>
                  <span className={style.name}>{user.username}</span>
                </div>
              </div>

              <div className={style.conversation}></div>

              <div className={style.messageBox}>
                <form onSubmit={handleSubmit}>
                  <textarea
                    name="message"
                    id="message"
                    cols="90"
                    rows="1"
                    placeholder="Digite uma mensagem"
                    value={message}
                    onChange={({ target }) => setMessage(target.value)}
                    onKeyDown={handleKeyPress}
                  ></textarea>

                  <button type="submit">
                    <img className={style.sendIcon} src={send} alt="send" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
