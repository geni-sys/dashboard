import React, { useState, useEffect, useCallback } from "react";
import * as _ from "lodash";
import { useCookies } from "react-cookie";
import { FiEdit2, FiTrash } from "react-icons/fi";
import api from "../../services/api";
// COMPONENTS SIBLING
import AulasController from "./components/Aulas";
import UserController from "./components/Users";
// TYLUS
import "./groups.css";

const Image =
  "https://avatars0.githubusercontent.com/u/35645590?s=460&u=2b86fc193b30e15abe3ad4df935ee7b7edf4cbd4&v=4";

export const UsersInfo = () => {
  const [isActive, setIsActive] = useState(true);
  const [modalIsActive, setModalIsActive] = useState(false);

  function handleChangeControle() {
    setIsActive(!isActive);
    setModalIsActive(!modalIsActive);
  }
  function handleControl() {
    return <UserController disactiveControle={handleChangeControle} />;
  }

  return (
    <>
      {modalIsActive ? handleControl() : null}
      <ul className={isActive ? "" : "hidden"}>
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
            <strong>Seus logs gravados</strong>
          </header>

          <div className="usr-info">
            <div id="first">
              <div id="header">
                <img src={Image} alt="usr" />
              </div>
              <div id="boody">
                <strong>Elias alexandre</strong>
                <p>Eliminou um artigo</p>
              </div>
            </div>

            <div id="first">
              <div id="header">
                <img src={Image} alt="usr" />
              </div>
              <div id="boody">
                <strong>Elias alexandre</strong>
                <p>Excluiu uma conta</p>
              </div>
            </div>

            <div id="first">
              <div id="header">
                <img src={Image} alt="usr" />
              </div>
              <div id="boody">
                <strong>Elias alexandre</strong>
                <p>Editou um artigo</p>
              </div>
            </div>
          </div>

          <div id="footer-u"></div>
        </li>
      </ul>
      <button onClick={handleChangeControle} id="usr-list-all">
        Listar usuários da plataforma
      </button>
    </>
  );
};

export const AlterData = () => (
  <>
    <div id="change-group">
      <h3>Alterar Dados</h3>
    </div>
  </>
);

export const Aulas = () => {
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [modalIsActive, setModalIsActive] = useState(false);

  const [cookies] = useCookies();
  const { token } = cookies;

  const handleData = useCallback(async () => {
    const response = await api.get(`/issues`, {
      headers: {
        Authorization: `Bearer ${String(token)}`,
      },
    });

    setData(response.data);
  }, [token]);
  function handleChangeControle() {
    setIsActive(!isActive);
    setModalIsActive(!modalIsActive);
  }
  function handleEdit(id) {
    return <AulasController id={id} disactiveControle={handleChangeControle} />;
  }

  useEffect(() => {
    handleData();
  }, [handleData]);

  return (
    <>
      <ul>
        <div id="aulas-group">
          <div id={isActive ? "menu-bar" : "menu-hide"}>
            <h3>Editar Aulas</h3>

            <div id="search-aula">
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Digite para começar a pesquisar"
              />
            </div>
          </div>

          <div id="aulas-group">
            <table id={isActive ? "" : "table-actived"}>
              <tr>
                <th>Título</th>
                <th>Idioma</th>
                <th>Criador</th>
                <th>Controle</th>
              </tr>

              {data.map((item) => (
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
                    <button
                      onClick={() => {
                        setClicked(item.id);
                        handleChangeControle();
                      }}
                      id="edition"
                    >
                      <FiEdit2 width="30" />
                    </button>
                  </td>
                </tr>
              ))}
            </table>
            {modalIsActive ? handleEdit(clicked) : null}
          </div>
        </div>
      </ul>
    </>
  );
};

export const Chats = () => {
  return (
    <ul>
      <div id="quiz-group">
        <div id="flouter">
          <button> LISTAR </button>
        </div>
        <h3>Criar Desafios</h3>

        <div id="content-group">
          <div id="body">
            <strong>Corpo do desafio</strong>
            <textarea
              name="markbody"
              id="markdown"
              cols="30"
              rows="10"
            ></textarea>
          </div>

          <div id="tips">
            <strong>Dicas do desafio</strong>
            <textarea
              name="marktip"
              id="markdown"
              cols="30"
              rows="10"
            ></textarea>
          </div>
        </div>

        <div id="footer">
          <button id="btn-default">Registrar</button>
        </div>
      </div>
    </ul>
  );
};

export const Dashboard = () => (
  <ul>
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
  </ul>
);

export const Playlist = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  async function handleExclude(id) {
    try {
      const res = await api.delete(`/playlists/${id}`).catch((error) => {
        alert(error.message);
      });

      if (res) {
        alert("DELETADA COM SUCESSO!");
      }
    } catch (err) {
      console.log(err.message);
      return alert(err.message);
    }
  }

  function filterData(collection, value) {
    const filtered = _.filter(collection, (item) =>
      String(item.name).toLowerCase().includes(String(value).toLowerCase())
    );

    if (!(filtered.length === 0)) {
      setData(filtered);
      return;
    }
    handleData();

    return filtered;
  }

  const [cookies] = useCookies();
  const { token } = cookies;

  const handleData = useCallback(async () => {
    const response = await api.get(`/playlists`, {
      headers: {
        Authorization: `Bearer ${String(token)}`,
      },
    });

    setData(response.data);
  }, [token]);

  useEffect(() => {
    handleData();
  }, [handleData]);

  return (
    <ul>
      <div id="aulas-group">
        <div>
          <h3>Overview das listas</h3>

          <div id="search-aula">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Digite para começar a pesquisar"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                filterData(data, e.target.value);
              }}
            />
          </div>
        </div>

        <div id="aulas-group">
          <table>
            <tr>
              <th>Nome</th>
              <th>Artigos</th>
              <th>Stars</th>
              <th>Excluir</th>
            </tr>

            {data.map((list) => (
              <tr key={list.id}>
                <td>
                  <strong>{list.name}</strong>
                </td>
                <td>
                  <p>{list.issues.length}</p>
                </td>
                <td>
                  <p>{list.stars}</p>
                </td>
                <td>
                  <button id="edition" onClick={() => handleExclude(list.id)}>
                    <FiTrash width="30" />
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </ul>
  );
};
