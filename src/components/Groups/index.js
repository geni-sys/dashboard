import React, { useState, useEffect } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import api from '../../services/api'

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
      <h3>Alterar Dados</h3>
    </div>
  </>
)

export const Aulas = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    handleData()
  }, [])

  async function handleData() {
    const response = await api.get('/user/13/issues', {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTU5MTQyODExMiwiZXhwIjoxNTk0MDIwMTEyfQ.Qqc2tlBcHyRhpgjoWFyS8RsKyfcgbGNjRD343FzKheY"
      }
    })

    setData(response.data.issues)
  }

  return (<>
    <div id="aulas-group">
      <div id="menu-bar">
        <h3>Editar Aulas</h3>

        <div id="search-aula">
          <input type="search" name="search" id="search" placeholder="Digite para começar a pesquisar" />
        </div>
      </div>

      <div id="aulas-group">
        <table>
          <tr>
            <th>Título</th>
            <th>Language</th>
            <th>Controle</th>
          </tr>

          {data.map(item => (
            <tr key={item.id}>
              <td>
                <strong>{item.title}</strong>
              </td>
              <td>
                <p>{item.language}</p>
              </td>
              <td>
                <button id="edition">
                  <FiEdit2 width="30" />
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  </>)
}

export const Desafios = () => {

  return (<>
    <div id="quiz-group">
      <div id="flouter">
        <button> LISTAR </button>
      </div>
      <h3>Criar Desafios</h3>

      <div id="content-group">
        <div id="body">
          <strong>Corpo do desafio</strong>
          <textarea name="markbody" id="markdown" cols="30" rows="10"></textarea>
        </div>

        <div id="tips">
          <strong>Dicas do desafio</strong>
          <textarea name="marktip" id="markdown" cols="30" rows="10"></textarea>
        </div>
      </div>

      <div id="footer">
        <button id="btn-default">Registrar</button>
      </div>
    </div>
  </>)
}

export const Dashboard = () => (
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
