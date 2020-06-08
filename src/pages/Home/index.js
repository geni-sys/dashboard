import React, { useState, memo } from 'react';

// """IMAGES"""
import Dash from '../../assets/images/dash.svg'
import Informacoes from '../../assets/images/informacoes.svg'
import Labirinto from '../../assets/images/labirinto.svg'
import Lesson from '../../assets/images/lesson.svg'
import User from '../../assets/images/user.svg'

// "STYLES"
import './styles.css';
import './Aside.css'

// "COMPONENTS"
import { AlterData, Aulas, Desafios, UsersInfo, Dashboard } from '../../components/Groups'

const Home = () => {
  const [activedGroup, setActivedGroup] = useState(5);

  function determinateWhoActive(id) {
    if (id === 1)
      return <Dashboard />

    if (id === 2)
      return <UsersInfo />

    if (id === 3)
      return <AlterData />

    if (id === 4)
      return <Aulas />

    if (id === 5)
      return <Desafios />
  }

  return (
    <div id="Container">
      <aside>
        <div id="aside-group">
          <strong>Geral</strong>
          <ul id="nav-group">
            <li
              className={activedGroup === 1 ? 'isActived' : ''}
              onClick={() => setActivedGroup(1)}
            >
              <img src={Dash} alt="*" id="nav-img" />
              <button>
                Dashboard
              </button>
            </li>
            <li
              className={activedGroup === 2 ? 'isActived' : ''}
              onClick={() => setActivedGroup(2)}
            >
              <img src={User} alt="*" id="nav-img" />
              <button>
                Usuários
              </button>
            </li>
            <li
              className={activedGroup === 3 ? 'isActived' : ''}
              onClick={() => setActivedGroup(3)}>
              <img src={Informacoes} alt="*" id="nav-img" />
              <button>
                Alteração
              </button>
            </li>
          </ul>
        </div>

        <div id="aside-group">
          <strong>Conteúdo</strong>
          <ul id="nav-group">
            <li
              className={activedGroup === 4 ? 'isActived' : ''}
              onClick={() => setActivedGroup(4)}>
              <img src={Lesson} alt="*" id="nav-img" />
              <button>
                Aulas
              </button>
            </li>
            <li
              className={activedGroup === 5 ? 'isActived' : ''}
              onClick={() => setActivedGroup(5)}>
              <img src={Labirinto} alt="*" id="nav-img" />
              <button>
                Desafios
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <main>
        <ul>
          {determinateWhoActive(activedGroup)}
        </ul>
      </main>
    </div>
  );
}

export default memo(Home);