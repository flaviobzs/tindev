import React from 'react';

import logo from '../../assets/logo.svg';
import like from '../../assets/like.svg';
import dislike from '../../assets/dislike.svg';

import { Container } from './styles';

function Main({match}) {
  return (
    <Container>
      <img src={logo} alt="Tindev"></img>
      <ul>
        <li>
          <img src={logo}></img>
          <footer>
            <strong>Flávio BS</strong>
            <p>Engenheiro e programador</p>
          </footer>

          <div>
            <button type="button">
              <img src={dislike} alt="Dislike"></img>
            </button>
            <button type="button">
            <img src={like} alt="Like"></img>
            </button>
          </div>
        </li>

        <li>
          <img src={logo}></img>
          <footer>
            <strong>Flávio BS</strong>
            <p>Engenheiro e programador</p>
          </footer>

          <div>
            <button type="button">
              <img src={dislike} alt="Dislike"></img>
            </button>
            <button type="button">
            <img src={like} alt="Like"></img>
            </button>
          </div>
        </li>

        <li>
          <img src={logo}></img>
          <footer>
            <strong>Flávio BS</strong>
            <p>Engenheiro e programador</p>
          </footer>

          <div>
            <button type="button">
              <img src={dislike} alt="Dislike"></img>
            </button>
            <button type="button">
            <img src={like} alt="Like"></img>
            </button>
          </div>
        </li>

        
        
      </ul>


    </Container>
  );
}

export default Main;
