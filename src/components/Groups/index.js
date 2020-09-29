/* eslint-disable react/jsx-filename-extension */
/* eslint-disable camelcase */
/* eslint-disable quotes */
import React, { useState, useEffect, useCallback } from "react";
import * as _ from "lodash";
import { useCookies } from "react-cookie";
import { FiEdit2, FiTrash, FiArrowDown } from "react-icons/fi";
import api from "../../services/api";
import Miniature from "../Miniature";
import formatTimeStamps from "../Utils/formatTimeStamps";
// COMPONENTS SIBLING
import ChatsMessages from "../ChatsMessages";
import AulasController from "./components/Aulas";
import UserController from "./components/Users";
// TYLUS
import "./groups.css";

export const UsersInfo = () => {
  const [logs, setLogs] = useState([]);
  const [name] = useState(
    () => localStorage.getItem("name") || "recarrege a página"
  );
  const [isActive, setIsActive] = useState(true);
  const [modalIsActive, setModalIsActive] = useState(false);

  const [cookies] = useCookies();
  const { token, user_id } = cookies;

  function handleChangeControle() {
    setIsActive(!isActive);
    setModalIsActive(!modalIsActive);
  }
  function handleControl() {
    return <UserController disactiveControle={handleChangeControle} />;
  }

  const handleRequest = useCallback(async () => {
    try {
      const response = await api.get(`/admin_logs/${user_id}`, {
        headers: {
          Authorization: String(token),
        },
      });

      if (response.data) {
        return setLogs(response.data);
      }
    } catch (err) {
      console.log(err.message);
    }

    return null;
  }, []);

  useEffect(() => {
    handleRequest();
  }, []);

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
              <label htmlFor="">18%</label>
            </div>
          </div>

          <div id="footer-u" />
        </li>

        <li className="dev-item">
          <header>
            <strong>Seus logs gravados: {name}</strong>
          </header>

          {logs.map((log) => (
            <div className="usr-info" key={log.id}>
              <div id="first">
                <div id="header">
                  <Miniature width="40px" height="40px" />
                </div>
                <div id="boody">
                  <strong>Artigos</strong>
                  <p>{log.issues_updateds}</p>
                </div>
              </div>

              <div id="first">
                <div id="header">
                  <Miniature width="40px" height="40px" />
                </div>
                <div id="boody">
                  <strong>Playlists</strong>
                  <p>{log.lists_updateds}</p>
                </div>
              </div>

              <div id="first">
                <div id="header">
                  <Miniature width="40px" height="40px" />
                </div>
                <div id="boody">
                  <strong>Edições</strong>
                  <p>{log.any_updateds}</p>
                </div>
              </div>
            </div>
          ))}
          <div id="footer-u" />
        </li>
      </ul>
      <button type="button" onClick={handleChangeControle} id="usr-list-all">
        Listar usuários da plataforma
      </button>
    </>
  );
};

export const AlterData = () => {
  const [admins, setAdmins] = useState([]);

  const [cookies] = useCookies();
  const { token, user_id } = cookies;
  const handleRequest = useCallback(async () => {
    try {
      const response = await api.get("/users", {
        headers: {
          Authorization: String(token),
        },
      });

      setAdmins(response.data.filter((admin) => admin.canny));
    } catch (err) {
      console.log(err.message);
    }
  }, [token]);

  async function handleDemote(id) {
    try {
      const response = await api.put(
        `/admin/${user_id}/demote/${id}`,
        {
          canny: false,
        },
        {
          headers: {
            Authorization: String(token),
          },
        }
      );

      if (response) {
        handleRequest();
        return alert("Usuário rebaixado!");
      }
    } catch (err) {
      console.log(err);
      return alert("Apenas CEO pode rebaixar usuários");
    }

    return 1;
  }

  useEffect(() => {
    handleRequest();
  }, [handleRequest]);

  return (
    <>
      <div id="change-group">
        <h3>Alterar permissões</h3>

        <table id="admins">
          <tr>
            <th>Nome</th>
            <th>Indetificação</th>
            <th>Atualizado</th>
            <th>Downgreed</th>
          </tr>

          {admins.map((adm) => (
            <tr key={adm.id}>
              <td>
                <strong>{adm.name}</strong>
              </td>
              <td>
                <p>{adm.email}</p>
              </td>
              <td>
                <p>{formatTimeStamps(adm.updatedAt) || "recente"}</p>
              </td>
              <td>
                <button onClick={() => handleDemote(adm.id)} id="edition">
                  <FiArrowDown width="30" />
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};

export const Aulas = () => {
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [modalIsActive, setModalIsActive] = useState(false);

  const [cookies] = useCookies();
  const { token } = cookies;

  const handleData = useCallback(async () => {
    const response = await api.get("/issues", {
      headers: {
        Authorization: String(token),
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
                <th>Recurso</th>
                <th>Criador</th>
                <th>Controle</th>
              </tr>

              {data.map((item) => (
                <tr key={item.id}>
                  <td>
                    <a
                      href={`http://localhost:3337/user/learning/${item.id}`}
                      rel="noreferrer"
                      target="_BLANK"
                    >
                      {item.title}
                    </a>
                  </td>
                  <td>
                    <p>{item.language}</p>
                  </td>
                  <td>
                    <p>{item.user.name}</p>
                  </td>
                  <td>
                    <button
                      type="button"
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

export const Dashboard = () => {
  const [artigos, setArtigos] = useState({});
  const [users, setUsers] = useState({});
  const [lists, setLists] = useState({});
  const [feedbacks, setFeedbacks] = useState({});

  const [cookies] = useCookies();
  const { token } = cookies;

  const handleRequest = useCallback(async () => {
    try {
      const response_issue = await api.get("/counts/issues", {
        headers: {
          Authorization: String(token),
        },
      });

      const response_users = await api.get("/counts/users", {
        headers: {
          Authorization: String(token),
        },
      });

      const response_lists = await api.get("/counts/lists", {
        headers: {
          Authorization: String(token),
        },
      });

      const response_feedbacks = await api.get("/counts/feedbacks", {
        headers: {
          Authorization: String(token),
        },
      });

      setArtigos(response_issue.data);
      setUsers(response_users.data);
      setLists(response_lists.data);
      setFeedbacks(response_feedbacks.data);
    } catch (err) {
      console.log(err.messge);
      alert(err.messge);
    }
  }, [token]);

  useEffect(() => {
    handleRequest();
  }, [handleRequest]);

  return (
    <ul>
      <li className="dev-item">
        <header>
          <strong>Artigos</strong>
        </header>
        <div className="user-info">
          <div>
            <p style={{ color: "var(--mention-detail)" }}>Criados</p>
            <label htmlFor="">{artigos.criadas}</label>
          </div>
          <div>
            <p style={{ color: "green" }}>Destaques</p>
            <label htmlFor="">{artigos.destaques}</label>
          </div>
          <div>
            <p style={{ color: "var(--notification)" }}>Excluídos</p>
            <label htmlFor="">2343</label>
          </div>
        </div>
        <div id="footer" />
      </li>

      <li className="dev-item">
        <header>
          <strong>Notas de feedback</strong>
        </header>
        <div className="user-info">
          <div>
            <p style={{ color: "var(--notification)" }}>0 á 5</p>
            <label htmlFor="">{feedbacks.basic}</label>
          </div>
          <div>
            <p style={{ color: "var(--mention-detail)" }}>6 á 8</p>
            <label htmlFor="">{feedbacks.normal}</label>
          </div>
          <div>
            <p style={{ color: "green" }}>9 á 10</p>
            <label htmlFor="">{feedbacks.advanced}</label>
          </div>
        </div>
        <div id="footer" />
      </li>

      <li className="dev-item">
        <header>
          <strong>Usuários</strong>
        </header>
        <div className="user-info">
          <div>
            <p style={{ color: "var(--notification)" }}>Fecharam a conta |</p>
            <label htmlFor="">{users.excluded}</label>
          </div>
          <div>
            <p style={{ color: "green" }}>Destaques</p>
            <label htmlFor="">{users.destaques}</label>
          </div>
        </div>
        <div id="footer" />
      </li>

      <li className="dev-item">
        <header>
          <strong>Listas</strong>
        </header>
        <div className="user-info">
          <div>
            <p style={{ color: "var(--notification)" }}>Criadas</p>
            <label htmlFor="">{lists.createds}</label>
          </div>
          <div>
            <p style={{ color: "var(--mention-detail)" }}>Destaques</p>
            <label htmlFor="">{lists.destaques}</label>
          </div>
          <div>
            <p style={{ color: "green" }}>Excluídos</p>
            <label htmlFor="">{lists.excludeds}</label>
          </div>
        </div>
        <div id="footer" />
      </li>
    </ul>
  );
};

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
    const response = await api.get("/playlists", {
      headers: {
        Authorization: String(token),
      },
    });

    setData(response.data.lists);
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
                  <a
                    href={`http://localhost:3337/playlists?watch=${list.id}`}
                    rel="noreferrer"
                    target="_BLANK"
                  >
                    {list.name}
                  </a>
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

export const Chats = () => (
  <ul>
    <div id="quiz-group">
      <h3>GERENCIAR:</h3>

      <div id="content-group">
        <div id="body">
          <strong>Retornos</strong>

          <ChatsMessages />
        </div>

        <div id="tips">
          <strong>Controles</strong>
          <span>Não é possível deletar nenhuma mensagem.</span>
          <span>
            Ao responder será retirada da lista, mais podera ser requisitada
            caso necessário. (pelo ID)
          </span>
        </div>
      </div>

      {/* <div id="footer">
          <button onClick={() => setIsActived(!isActived)} id="btn-default">
            Recarregar
          </button>
        </div> */}
    </div>
  </ul>
);
