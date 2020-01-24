import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import like from '../../assets/like.svg';
import dislike from '../../assets/dislike.svg';
import itsamatch from '../../assets/itsamatch.png';

import api from '../../services/api';

import { Container } from './styles';

function Main({ match }) {
  const [users, setUsers] = useState([]); //varios valores dentro de um array
  const [matchDev, setmatchDev] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: {
          user: match.params.id,
        },
      });

      setUsers(response.data);
    }

    loadUsers(); //auto chamar a função [ (funcao)() ]
  }, [match.params.id]); //monitorar a mudaça do headers

  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: { user: match.params.id },
    });

    socket.on('match', dev => {
      setmatchDev(dev);
    });
  }, [match.params.id]);

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: match.params.id }, //headers é o terceiro parametro, body é o segundo
    });

    setUsers(users.filter(user => user._id !== id));
  }

  async function handleDeslike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: match.params.id }, //headers é o terceiro parametro, body é o segundo
    });

    setUsers(users.filter(user => user._id !== id));
  }

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>
      {users.length > 0 ? ( //verificação da qtd de usuario na listagem para exibir cards, ou não
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name} />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>
              <div className="buttons">
                <button
                  type="button"
                  onClick={() => handleDeslike(user._id)} //chamada da função fica altomatica sem essa callback
                >
                  <img src={dislike} alt="Dislike" />
                </button>
                <button
                  type="button"
                  onClick={() => handleLike(user._id)} //chamada da função fica altomatica sem essa callback
                >
                  <img src={like} alt="Like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Acabou :(</div> //senão tiver mais usuario na listagem, aparece isso
      )}

      {matchDev && (
        <div className="match-container">
          <img src={itsamatch} alt="It's a Match" />

          <img className="avatar" src={matchDev.avatar} alt={matchDev.name} />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>

          <button
            type="button"
            onClick={() => {
              setmatchDev(null);
            }}
          >
            Fechar
          </button>
        </div>
      )}
    </Container>
  );
}

export default Main;
