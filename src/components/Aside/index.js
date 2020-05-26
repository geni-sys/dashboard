import React, { useState, memo } from 'react'

import './styles.css'

import Dash from '../../assets/images/dash.svg'
import Informacoes from '../../assets/images/informacoes.svg'
import Labirinto from '../../assets/images/labirinto.svg'
import Lesson from '../../assets/images/lesson.svg'
import User from '../../assets/images/user.svg'

const Aside = () => {
  const [itemActived, setItemActived] = useState(1)

  function ActiveItemClass(id = 1) {
    setItemActived(id)
  }

  return (
    <aside>
      <div id="aside-group">
        <strong>Geral</strong>
        <ul id="nav-group">
          <li className={itemActived === 1 ? 'isActived' : 'inactived'}>
            <img src={Dash} alt="*" id="nav-img" />
            <button onClick={() => ActiveItemClass(1)}>
              Dashboard
            </button>
          </li>
          <li className={itemActived === 2 ? 'isActived' : 'inactived'}>
            <img src={User} alt="*" id="nav-img" />
            <button onClick={() => ActiveItemClass(2)}>
              Usuários
            </button>
          </li>
          <li className={itemActived === 3 ? 'isActived' : 'inactived'}>
            <img src={Informacoes} alt="*" id="nav-img" />
            <button onClick={() => ActiveItemClass(3)}>
              Alteração
            </button>
          </li>
        </ul>
      </div>

      <div id="aside-group">
        <strong>Conteúdo</strong>
        <ul id="nav-group">
          <li className={itemActived === 4 ? 'isActived' : 'inactived'}>
            <img src={Lesson} alt="*" id="nav-img" />
            <button onClick={() => ActiveItemClass(4)}>
              Aulas
            </button>
          </li>
          <li className={itemActived === 5 ? 'isActived' : 'inactived'}>
            <img src={Labirinto} alt="*" id="nav-img" />
            <button onClick={() => ActiveItemClass(5)}>
              Desafios
          </button>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default memo(Aside)
