import React from 'react';
import io from 'socket.io-client';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import { ALL_USERS, DISPLAY_CHATROOM, NEW_MESSAGE } from '../services/api';
import searchIcon from '../assets/search-icon.svg';
import send from '../assets/send.svg';

import style from './ChatRoom.module.css';

export default function ChatRoom() {
  const [message, setMessage] = React.useState('');
  const [userFiltered, setUserFiltered] = React.useState('');
  const [showMessages, setShowMessages] = React.useState(false);
  const [showUsers, setShowUsers] = React.useState(false);
  const [loadingUsers, setLoadingUsers] = React.useState(false);
  const [loadingMessages, setLoadingMessages] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const [filteredUsers, setFilteredUsers] = React.useState(null);
  const [chatId, setChatId] = React.useState(null);
  const [socket, setSocket] = React.useState(null);
  const [allMessages, setAllMessages] = React.useState(null);

  const messagesEndRef = React.useRef(null);

  function handleClick(event) {
    const userData = JSON.parse(event.currentTarget.dataset.user);
    setUser(userData);
    setShowMessages(true);
  }

  function handleKeyPress(event) {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (message.length > 0 && chatId) {
      if (socket) {
        socket.emit('chatroomMessage', chatId.id, message);
      }

      const message_text = message;
      setMessage('');

      const { url, options } = NEW_MESSAGE(users && users.userId, {
        message_text,
        chat_id: chatId.id,
      });

      await fetch(url, options);
    }
  }

  React.useEffect(() => {
    if (!socket) {
      const newSocket = io('http://localhost:5000');
      setSocket(newSocket);
    }
  }, [socket]);

  React.useEffect(() => {
    async function getUsers() {
      setLoadingUsers(true);

      const { url, options } = ALL_USERS();
      const res = await fetch(url, options);
      const json = await res.json();

      setLoadingUsers(false);
      setUsers(json);
    }

    getUsers();
  }, []);

  React.useEffect(() => {
    if (users) {
      const filteredUsers = users.users.filter((user) =>
        user.username
          .toLocaleLowerCase()
          .includes(userFiltered.toLocaleLowerCase())
      );

      const { user, userId } = users;
      const newUsers = {
        user,
        userId,
        users: filteredUsers,
      };

      const allUsers = userFiltered.length > 0 ? newUsers : users;
      setFilteredUsers(allUsers);
    }
  }, [userFiltered, users]);

  React.useEffect(() => {
    async function displayChatRoom() {
      if (user) {
        setLoadingMessages(true);

        const { url, options } = DISPLAY_CHATROOM(user.id);
        const res = await fetch(url, options);
        const json = await res.json();

        if (json.id) {
          setChatId({ id: json.id });
          setLoadingMessages(false);
          setAllMessages(null);
        } else {
          const id = json[0].chat_id;
          setChatId({ id });
          setLoadingMessages(false);
          setAllMessages(json);
        }
      }
    }

    displayChatRoom();
  }, [socket, user]);

  React.useEffect(() => {
    if (socket && chatId) socket.emit('joinRoom', chatId.id);

    return () => {
      if (socket && chatId) socket.emit('leaveRoom', chatId.id);
    };
  }, [socket, chatId]);

  React.useEffect(() => {
    if (socket) {
      socket.on('newMessage', (message) => {
        const newMessage = {
          message_text: message,
          sender_user: users && users.user,
        };

        if (!allMessages) {
          setAllMessages([newMessage]);
        } else {
          setAllMessages([...allMessages, newMessage]);
        }
      });
    }
  }, [socket, allMessages, users]);

  React.useEffect(() => {
    if (allMessages)
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }, [allMessages]);

  return (
    <div className="wrapper">
      <div className={style.container}>
        <div className={style.leftSide}>
          <div className={style.topContainer}>
            <div className={style.avatar}>
              {loadingUsers ? (
                <div className={style.spinner}>
                  <div className="spinner-border" role="status"></div>
                </div>
              ) : (
                <div>
                  <div className={style.letter}>{users && users.user[0]}</div>
                  <span className={style.name}>{users && users.user}</span>
                </div>
              )}
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
                autoComplete="off"
              />
            </div>

            <div className={style.users}>
              {loadingUsers ? (
                <div style={{ height: '50vh' }} className={style.spinner}>
                  <div className="spinner-border" role="status"></div>
                </div>
              ) : (
                filteredUsers &&
                filteredUsers.users.map((userr) => {
                  return (
                    <div
                      onClick={handleClick}
                      key={userr.id}
                      className={style.userContent}
                      style={{
                        borderBottomColor:
                          user && userr.id === user.id && '#fb8500',
                      }}
                      data-user={JSON.stringify(userr)}
                    >
                      <div className={style.letter}>{userr.username[0]}</div>
                      <span className={style.name}>{userr.username}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* ajuste para parte Mobile */}
        <div className={style.leftSideMobile}>
          <div
            className={style.menuBars}
            onClick={() => setShowUsers(!showUsers)}
          >
            <FaIcons.FaBars />
          </div>

          <div className={showUsers ? style.menuUsersOn : style.menuUsers}>
            <div
              className={style.menuClose}
              onClick={() => setShowUsers(!showUsers)}
            >
              <AiIcons.AiOutlineClose />
            </div>

            <div className={style.textUsers}>LISTA DE USUÁRIOS</div>

            {users &&
              users.users.map((userr) => {
                return (
                  <div
                    onClick={handleClick}
                    key={userr.id}
                    className={style.userContent}
                    style={{
                      borderBottomColor:
                        user && userr.id === user.id && '#fb8500',
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

              <div
                style={{ justifyContent: loadingMessages && 'center' }}
                className={style.conversation}
              >
                <div ref={messagesEndRef} className={style.conversationWrapper}>
                  {loadingMessages ? (
                    <div className={style.spinner}>
                      <div className="spinner-border" role="status"></div>
                    </div>
                  ) : (
                    allMessages &&
                    allMessages.map((message, index) => {
                      return (
                        <div key={index} className={style.messageContainer}>
                          {users && message.sender_user === users.user ? (
                            <div className={style.messageOutContainer}>
                              <div className={style.messageOut}>
                                <div className={style.textMessage}>
                                  <div>{message.message_text}</div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className={style.messageInContainer}>
                              <div className={style.messageIn}>
                                <div className={style.textMessage}>
                                  <div className={style.textMessageName}>
                                    <span
                                      style={{
                                        color: '#ffc600',
                                        fontSize: '14px',
                                      }}
                                    >
                                      {message.sender_user}
                                    </span>

                                    <div>{message.message_text}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className={style.messageBox}>
                <form onSubmit={handleSubmit}>
                  <textarea
                    name="message"
                    id="message"
                    cols="90"
                    rows="1"
                    placeholder="Digite uma mensagem..."
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
