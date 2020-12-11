import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

import { USER_LOGIN, USER_REGISTER } from '../services/api';

import style from './Form.module.css';

export default function Form({ type }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (type === 'Registrar') {
        setError(null);
        setLoading(true);

        const { url, options } = USER_REGISTER({ username, password });
        const res = await fetch(url, options);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error);

        window.localStorage.setItem('token', json.token);

        navigate('/chatroom');
      } else {
        setError(null);
        setLoading(true);

        const { url, options } = USER_LOGIN({ username, password });
        const res = await fetch(url, options);
        const json = await res.json();

        if (!res.ok) throw new Error(json.error);

        window.localStorage.setItem('token', json.token);

        navigate('/chatroom');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={style.container}>
      <h1>ChatApp</h1>
      <h2>{type}</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Usuário: </label>
        <input
          name="username"
          id="username"
          value={username}
          onChange={({ target }) => {
            setUsername(target.value);
          }}
          type="text"
        />

        <label htmlFor="password">Senha: </label>
        <input
          name="password"
          id="password"
          onChange={({ target }) => {
            setPassword(target.value);
          }}
          value={password}
          type="password"
        />

        {loading ? (
          <button disabled>Carregando...</button>
        ) : (
          <button>{type}</button>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      {type === 'Entrar' ? (
        <NavLink to="/register">Não possui uma conta?</NavLink>
      ) : (
        <NavLink to="/">Já possui uma conta?</NavLink>
      )}
    </div>
  );
}
