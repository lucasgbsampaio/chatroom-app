import React from 'react';

import { ALL_USERS } from '../services/api';
import searchIcon from '../assets/search-icon.svg';

import style from './ChatRoom.module.css';

export default function ChatRoom() {
  const [message, setMessage] = React.useState('');
  const [showMessages, setShowMessages] = React.useState(false);
  const [users, setUsers] = React.useState(null);
  const [user, setUser] = React.useState('');

  async function handleSubmit(event) {
    event.preventDefault();
  }

  async function handleClick() {
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
                value={user}
                onChange={({ target }) => {
                  setUser(target.value);
                }}
                placeholder="Procurar ou começar uma nova conversa..."
              />
            </div>

            <div className={style.users}>
              {users &&
                users.users.map((user) => {
                  return (
                    <div
                      onClick={handleClick}
                      className={style.userContent}
                      id={user.id}
                    >
                      <div className={style.letter}>{user.username[0]}</div>
                      <span className={style.name}>{user.username}</span>
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
                <h2>Comece uma nova conversa</h2>
                <span>Clique em algum usuário ao lado esquerdo.</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
                value={message}
                onChange={({ target }) => setMessage(target.value)}
              ></textarea>

              <button>ENVIAR</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
