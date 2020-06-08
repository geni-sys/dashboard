import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import api from '../../services/api'

import "./styles.css";

const Header = () => {
  const [users, setUsers] = useState(0)
  const [issues, setIssues] = useState(0)
  const [ativos, setAtivos] = useState(0)

  useEffect(() => {
    handleBarItems()
  }, [])

  async function handleBarItems() {
    const usrs = await api.get('/users', {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTU5MTQyODExMiwiZXhwIjoxNTk0MDIwMTEyfQ.Qqc2tlBcHyRhpgjoWFyS8RsKyfcgbGNjRD343FzKheY"
      }
    })

    const issues_res = await api.get('/user/13/issues', {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTU5MTQyODExMiwiZXhwIjoxNTk0MDIwMTEyfQ.Qqc2tlBcHyRhpgjoWFyS8RsKyfcgbGNjRD343FzKheY"
      }
    })

    // "SETTERS"
    setIssues(issues_res.data.issues.length)
    setAtivos(usrs.data.length)
    setUsers(usrs.data.length)
  }

  const history = useHistory()
  function handleQuit() {
    history.push('/')
  }

  return (
    <header id="header-group">
      <nav id="navbar">
        <div id="logo" >
          <h4> <a href="/">GENESYS</a> </h4>
        </div >

        <ul id="itens-group" >
          <li className="itens" >
            <h3>Usuários</h3>
            <label className="info-labels" htmlFor="">{users}</label>
          </li>

          <li className="itens" >
            <h3>Lessons</h3>
            <label className="info-labels" htmlFor="">{issues}</label>
          </li>

          <li className="itens" >
            <h3>Ativos</h3>
            <label className="info-labels" htmlFor="">{ativos}</label>
          </li>
        </ul>

        <div id="session">
          <button onClick={handleQuit} className="button">Sair</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
