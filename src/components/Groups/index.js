import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { FiEdit2 } from 'react-icons/fi'
import api from '../../services/api'
// COMPONENTS SIBLING
import AulasController from './components/Aulas'
// TYLUS
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
  const [clicked, setClicked] = useState(null)
  const [isActive, setIsActive] = useState(true)
  const [modalIsActive, setModalIsActive] = useState(false)

  const [cookies] = useCookies()

  useEffect(() => {
    handleData()
  }, [])

  async function handleData() {
    const { token } = cookies
    const response = await api.get(`/issues`, {
      headers: {
        "Authorization": `Bearer ${String(token)}`
      }
    })

    setData(response.data)
  }
  function handleChangeControle() {
    setIsActive(!isActive)
    setModalIsActive(!modalIsActive)
  }
  function handleEdit(id) {
    return <AulasController id={id} disactiveControle={handleChangeControle} />
  }

  return (<>
    <div id="aulas-group">
      <div id={isActive ? 'menu-bar' : 'menu-hide'}>
        <h3>Editar Aulas</h3>

        <div id="search-aula">
          <input type="search" name="search" id="search" placeholder="Digite para começar a pesquisar" />
        </div>
      </div>

      <div id="aulas-group">
        <table id={isActive ? '' : 'table-actived'}>
          <tr>
            <th>Título</th>
            <th>Idioma</th>
            <th>Criador</th>
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
                <p>{item.user.name}</p>
              </td>
              <td>
                <button onClick={() => {
                  setClicked(item.id)
                  handleChangeControle()
                }} id="edition">
                  <FiEdit2 width="30" />
                </button>
              </td>
            </tr>
          ))}
        </table>
        {modalIsActive ? handleEdit(clicked) : null}
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
