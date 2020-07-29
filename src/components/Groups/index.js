import React, { useState, useEffect, useCallback } from "react";
import * as _ from "lodash";
import { useCookies } from "react-cookie";
import { FiEdit2, FiTrash, FiCpu, FiStar, FiArrowDown } from "react-icons/fi";
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

export const AlterData = () => {
  const [admins, setAdmins] = useState([]);

  const [cookies] = useCookies();
  const { token, user_id } = cookies;
  const handleRequest = useCallback(async () => {
    try {
      const response = await api.get(`/users`, {
        headers: {
          Authorization: `Bearer ${String(token)}`,
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
            Authorization: `Bearer ${String(token)}`,
          },
        }
      );

      if (response) {
        handleRequest();
        return alert("Usuário rebaixado!");
      }
    } catch (err) {
      alert(err.message);
    }
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
                <p>{adm.updatedAt || "recente"}</p>
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

export const Dashboard = () => {
  const [artigos, setArtigos] = useState({});
  // const [users, setUsers] = useState({});
  // const [lists, setLists] = useState({});

  const [cookies] = useCookies();
  const { token } = cookies;

  const handleRequest = useCallback(async () => {
    try {
      const response = await api.get("/counts/issues", {
        headers: {
          Authorization: `Bearer ${String(token)}`,
        },
      });

      setArtigos(response.data);
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
        <div id="footer"></div>
      </li>

      <li className="dev-item">
        <header>
          <strong>Notas de feedback</strong>
        </header>
        <div className="user-info">
          <div>
            <p style={{ color: "var(--notification)" }}>0 á 5</p>
            <label htmlFor="">1234</label>
          </div>
          <div>
            <p style={{ color: "var(--mention-detail)" }}>6 á 8</p>
            <label htmlFor="">42343</label>
          </div>
          <div>
            <p style={{ color: "green" }}>9 á 10</p>
            <label htmlFor="">2343</label>
          </div>
        </div>
        <div id="footer"></div>
      </li>

      <li className="dev-item">
        <header>
          <strong>Usuários</strong>
        </header>
        <div className="user-info">
          <div>
            <p style={{ color: "var(--notification)" }}>Fecharam a conta |</p>
            <label htmlFor="">1234</label>
          </div>
          <div>
            <p style={{ color: "green" }}>Destaques</p>
            <label htmlFor="">42343</label>
          </div>
        </div>
        <div id="footer"></div>
      </li>

      <li className="dev-item">
        <header>
          <strong>Listas</strong>
        </header>
        <div className="user-info">
          <div>
            <p style={{ color: "var(--notification)" }}>Criadas</p>
            <label htmlFor="">1234</label>
          </div>
          <div>
            <p style={{ color: "var(--mention-detail)" }}>Destaques</p>
            <label htmlFor="">42343</label>
          </div>
          <div>
            <p style={{ color: "green" }}>Excluídos</p>
            <label htmlFor="">42343</label>
          </div>
        </div>
        <div id="footer"></div>
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

export const Chats = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isActived, setIsActived] = useState(false);

  const [cookies] = useCookies();
  const { token } = cookies;

  const handleRequest = useCallback(async () => {
    try {
      const resFeed = await api.get("/feedbacks", {
        headers: {
          Authorization: `Bearer ${String(token)}`,
        },
      });

      setFeedbacks(resFeed.data);
    } catch (err) {
      console.log(err.messge);
      alert(err.messge);
    }
  }, [token]);

  useEffect(() => {
    handleRequest();
  }, [handleRequest]);

  function Maneger({ id }) {
    const [feed, setFeed] = useState({});

    const getFeedData = useCallback(async () => {
      try {
        const response = await api.get(`/feedbacks/${id}`, {
          headers: {
            Authorization: `Bearer ${String(token)}`,
          },
        });

        setFeed(response.data);
      } catch (err) {
        console.log(err.messge);
        alert(err.messge);
      }
    }, [token]);

    useEffect(() => {
      getFeedData();
    }, [getFeedData]);

    return (
      <div key={id} id="manege-returns">
        <div id="item">
          <div id="left">
            <FiCpu />
          </div>

          <div id="right">
            <div>
              <strong>Elias alexandre</strong>
              <span>
                <FiStar /> {feed.stars}
              </span>
            </div>

            <p id="delimited">{feed.message}</p>
          </div>
        </div>

        <div id="resolver">
          <label htmlFor="reply">Mensagem:</label>
          <textarea
            placeholder="Mensagem de resposta"
            name="reply"
            id="reply"
            cols="30"
            rows="10"
          ></textarea>
          <button id="btn-default">Enviar</button>
        </div>
      </div>
    );
  }

  function HandleComponents({ item }) {
    if (isActived) {
      return <Maneger id={item} />;
    }

    return (
      <ul id="mensagens">
        {feedbacks.map((feed) => (
          <li key={feed.id} id="mensagens-group">
            <div id="ilustration">
              <FiCpu />
            </div>

            <div id="infinity">
              <div>
                <strong>{feed.title}</strong>
                <span>
                  <FiStar /> {feed.stars}
                </span>
              </div>

              <p id="limitation">{feed.message}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul>
      <div id="quiz-group">
        <h3>GERENCIAR:</h3>

        <div id="content-group">
          <div id="body">
            <strong>Retornos</strong>

            <HandleComponents item={4} />
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

        <div id="footer">
          <button onClick={() => setIsActived(!isActived)} id="btn-default">
            Recarregar
          </button>
        </div>
      </div>
    </ul>
  );
};
