import React from 'react'

import './groups.css'

const Image = "https://avatars0.githubusercontent.com/u/35645590?s=460&u=2b86fc193b30e15abe3ad4df935ee7b7edf4cbd4&v=4"

export const UsersInfo = () => (
  <>
    <li className="dev-item-t">
      <header>
        <strong>Tempo de uso</strong>
      </header>

      <div className="time-info">
        <div>
          <p>30min - 1h</p>
          <label htmlFor="">27%</label>
        </div>
        <div>
          <p>1h - 1h:30</p>
          <label htmlFor="">55%</label>
        </div>
        <div>
          <p>Mais..</p>
          <label htmlFor="">55%</label>
        </div>
      </div>

      <div id="footer-u"></div>
    </li>

    <li className="dev-item">
      <header>
        <strong>Log de usuários</strong>
      </header>

      <div className="usr-info">
        <div id="first">
          <div id="header">
            <img src={Image} alt="usr" />
          </div>
          <div id="boody">
            <strong>Elias alexandre</strong>
            <p>Iniciou o login</p>
          </div>
        </div>

        <div id="first">
          <div id="header">
            <img src={Image} alt="usr" />
          </div>
          <div id="boody">
            <strong>Elias alexandre</strong>
            <p>Excluiu a conta</p>
          </div>
        </div>

        <div id="first">
          <div id="header">
            <img src={Image} alt="usr" />
          </div>
          <div id="boody">
            <strong>Elias alexandre</strong>
            <p>Foi denunciádo</p>
          </div>
        </div>
      </div>

      <div id="footer-u"></div>
    </li>
  </>
)

export const AlterData = () => (
  <>
    <div id="change-group">
      <h3>Hello User</h3>
    </div>
  </>
)

export const Aulas = () => (
  <>
    <div id="aulas-group">
      <h3>Hello User</h3>
    </div>
  </>
)

export const Desafios = () => (
  <>
    <div id="quiz-group">
      <h3>Hello User</h3>
    </div>
  </>
)
