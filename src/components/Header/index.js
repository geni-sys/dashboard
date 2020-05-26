import React from "react";

// import { Container } from './styles';
import "./styles.css";

const Header = ({ fixed = true }) => {

  return (
    <header id="header-group">
      <nav id="navbar">
        <div id="logo" >
          <h4> <a href="/">GENESYS</a> </h4>
        </div >

        <ul id="itens-group" >
          <li className="itens" >
            <h3>Usuários</h3>
            <label className="info-labels" htmlFor="">2324</label>
          </li>

          <li className="itens" >
            <h3>Lessons</h3>
            <label className="info-labels" htmlFor="">5352</label>
          </li>

          <li className="itens" >
            <h3>Ativos</h3>
            <label className="info-labels" htmlFor="">235</label>
          </li>
        </ul>

        <div id="session">
          <button className="button">Sair</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
