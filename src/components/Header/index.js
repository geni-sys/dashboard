import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import api from "../../services/api";

import "./styles.css";

const Header = () => {
  const [users, setUsers] = useState(0);
  const [issues, setIssues] = useState(0);
  const [ativos, setAtivos] = useState(0);

  const [cookies, , removeCookie] = useCookies();
  const { token } = cookies;

  const handleBarItems = useCallback(async () => {
    try {
      const usrs = await api.get("/users", {
        headers: {
          Authorization: String(token),
        },
      });
      const issues_res = await api.get("/issues", {
        headers: {
          Authorization: String(token),
        },
      });
      const list_res = await api.get("/playlists", {
        headers: {
          Authorization: String(token),
        },
      });

      // "SETTERS"
      setIssues(issues_res.data.length);
      setAtivos(list_res.data.lists.length);
      setUsers(usrs.data.length);
    } catch (err) {
      console.log(err.message);
      return alert(err.message);
    }
  }, [token]);

  const history = useHistory();
  function handleQuit() {
    try {
      removeCookie("token");
      removeCookie("user_id");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("questions_status");
      localStorage.removeItem("github_avatar");

      history.push("/");
    } catch (err) {
      console.log(err.message);
      return alert("Antes de terminar a sessão conclua os campos necessários");
    }
  }

  const middleware = useCallback(() => {
    const { token, user_id } = cookies;

    if (!token || !user_id) {
      removeCookie("token");
      removeCookie("user_id");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("questions_status");
      localStorage.removeItem("github_avatar");

      alert("É necessário fazer o login!");

      history.push("/");
    }
  }, [cookies, history, removeCookie]);

  useEffect(() => {
    middleware();
    handleBarItems();
  }, [handleBarItems]);

  return (
    <header id="header-group">
      <nav id="navbar">
        <div id="logo">
          <h4>
            <a href="/">GENESYS</a>{" "}
          </h4>
        </div>

        <ul id="itens-group">
          <li className="itens">
            <h3>Usuários</h3>
            <label className="info-labels" htmlFor="">
              {users}
            </label>
          </li>

          <li className="itens">
            <h3>Artigos</h3>
            <label className="info-labels" htmlFor="">
              {issues}
            </label>
          </li>

          <li className="itens">
            <h3>Listas</h3>
            <label className="info-labels" htmlFor="">
              {ativos}
            </label>
          </li>
        </ul>

        <div id="session">
          <button onClick={handleQuit} className="button">
            Sair
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
