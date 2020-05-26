import React, { useState, memo } from 'react'

import Aside from '../Aside'

import './styles.css'

const Dashboard = () => (
  <>
    <li className="dev-item">
      <header>
        <strong>Aulas criadas</strong>
      </header>
      <div className="user-info">
        <div>
          <p>Criadas</p>
          <label htmlFor="">1234</label>
        </div>
        <div>
          <p>Destaques</p>
          <label htmlFor="">42343</label>
        </div>
        <div>
          <p>In Coming</p>
          <label htmlFor="">2343</label>
        </div>
      </div>
      <div id="footer"></div>
    </li>

    <li className="dev-item">
      <header>
        <strong>Aulas criadas</strong>
      </header>
      <div className="user-info">
        <div>
          <p>Criadas</p>
          <label htmlFor="">1234</label>
        </div>
        <div>
          <p>Destaques</p>
          <label htmlFor="">42343</label>
        </div>
        <div>
          <p>In Coming</p>
          <label htmlFor="">2343</label>
        </div>
      </div>
      <div id="footer"></div>
    </li>

    <li className="dev-item">
      <header>
        <strong>Aulas criadas</strong>
      </header>
      <div className="user-info">
        <div>
          <p>Criadas</p>
          <label htmlFor="">1234</label>
        </div>
        <div>
          <p>Destaques</p>
          <label htmlFor="">42343</label>
        </div>
        <div>
          <p>In Coming</p>
          <label htmlFor="">2343</label>
        </div>
      </div>
      <div id="footer"></div>
    </li>

    <li className="dev-item">
      <header>
        <strong>Aulas criadas</strong>
      </header>
      <div className="user-info">
        <div>
          <p>Criadas</p>
          <label htmlFor="">1234</label>
        </div>
        <div>
          <p>Destaques</p>
          <label htmlFor="">42343</label>
        </div>
        <div>
          <p>In Coming</p>
          <label htmlFor="">2343</label>
        </div>
      </div>
      <div id="footer"></div>
    </li>
  </>
);

const UsersInfo = () => (
  <>
    <div id="user-group">
      <h3>Hello User</h3>
    </div>
  </>
)

const AlterData = () => (
  <>
    <div id="change-group">
      <h3>Hello User</h3>
    </div>
  </>
)

const Aulas = () => (
  <>
    <div id="aulas-group">
      <h3>Hello User</h3>
    </div>
  </>
)

const Desafios = () => (
  <>
    <div id="quiz-group">
      <h3>Hello User</h3>
    </div>
  </>
)

const Main = () => {
  const [activedGroup, setActivedGroup] = useState(1);

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
      <Aside />
      <main>
        <ul>
          {determinateWhoActive(activedGroup)}
        </ul>
      </main>
    </div>
  )
}


export default memo(Main)
