/* eslint-disable quotes */
import React, { useState, memo } from "react";

// """IMAGES"""
import Dash from "../../assets/images/dash.svg";
import Informacoes from "../../assets/images/informacoes.svg";
import Labirinto from "../../assets/images/labirinto.svg";
import Lesson from "../../assets/images/lesson.svg";
import User from "../../assets/images/user.svg";

// "STYLES"
import "./styles.css";
import "./Aside.css";

// "COMPONENTS"
import { FiMessageSquare } from "react-icons/fi";
import {
  AlterData,
  Aulas,
  Chats,
  UsersInfo,
  Dashboard,
  Playlist,
} from "../../components/Groups";

const Home = ({ configs }) => {
  const [activedGroup, setActivedGroup] = useState(() => {
    const params = new URLSearchParams(configs.location.search);
    const tab = parseInt(params.get("tab"));
    return tab || 0;
  });

  function determinateWhoActive(id) {
    if (id === 1) {
      return <Dashboard />;
    }

    if (id === 2) {
      return <UsersInfo />;
    }

    if (id === 3) {
      return <AlterData />;
    }

    if (id === 4) {
      return <Aulas />;
    }

    if (id === 5) {
      return <Playlist />;
    }
    if (id === 6) {
      return <Chats />;
    }

    setActivedGroup(1);
    return <Dashboard />;
  }

  return (
    <div id="Container">
      <aside>
        <div id="aside-group">
          <strong>Geral</strong>
          <ul id="nav-group">
            <li
              className={activedGroup === 1 ? "isActived" : ""}
              onClick={() => setActivedGroup(1)}
            >
              <img src={Dash} alt="*" id="nav-img" />
              <button>Dashboard</button>
            </li>
            <li
              className={activedGroup === 2 ? "isActived" : ""}
              onClick={() => setActivedGroup(2)}
            >
              <img src={User} alt="*" id="nav-img" />
              <button>Usuários</button>
            </li>
            <li
              className={activedGroup === 3 ? "isActived" : ""}
              onClick={() => setActivedGroup(3)}
            >
              <img src={Informacoes} alt="*" id="nav-img" />
              <button>Alteração</button>
            </li>
          </ul>
        </div>

        <div id="aside-group">
          <strong>Conteúdo</strong>
          <ul id="nav-group">
            <li
              className={activedGroup === 4 ? "isActived" : ""}
              onClick={() => setActivedGroup(4)}
            >
              <img src={Lesson} alt="*" id="nav-img" />
              <button>Artigos</button>
            </li>

            <li
              className={activedGroup === 5 ? "isActived" : ""}
              onClick={() => setActivedGroup(5)}
            >
              <img src={Labirinto} alt="*" id="nav-img" />
              <button>Listas</button>
            </li>

            <li
              className={activedGroup === 6 ? "isActived" : ""}
              onClick={() => setActivedGroup(6)}
            >
              <FiMessageSquare id="nav-img" />
              <button>Chats</button>
            </li>
          </ul>
        </div>
      </aside>

      <main>{determinateWhoActive(activedGroup)}</main>
    </div>
  );
};

export default memo(Home);
