import React, { useState, memo } from 'react'

import { AlterData, Aulas, Desafios, UsersInfo } from '../Groups'

import Aside from '../Aside'

import './styles.css'

const Dashboard = () => (
  <>
    <li className="dev-item">
      <header>
        <strong>Aulas</strong>
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
        <strong>Notas de feedback</strong>
      </header>
      <div className="user-info">
        <div>
          <p>0 á 5</p>
          <label htmlFor="">1234</label>
        </div>
        <div>
          <p>6 á 8</p>
          <label htmlFor="">42343</label>
        </div>
        <div>
          <p>9 á 10</p>
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

const Main = () => {
  const [activedGroup, setActivedGroup] = useState(2);

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
