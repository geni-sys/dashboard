import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import api from "../../services/api";

import "./styles.css";

const Header = () => {
  const [users, setUsers] = useState(0);
  const [issues, setIssues] = useState(0);
  const [ativos, setAtivos] = useState(0);

  const [cookies] = useCookies();
  const { token } = cookies;

  const handleBarItems = useCallback(async () => {
    try {
      const usrs = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${String(token)}`,
        },
      });
      const issues_res = await api.get("/issues", {
        headers: {
          Authorization: `Bearer ${String(token)}`,
        },
      });

      // "SETTERS"
      setIssues(issues_res.data.length);
      setAtivos(usrs.data.length);
      setUsers(usrs.data.length);
    } catch (err) {
      console.log(err.message);
      return alert(err.message);
    }
  }, [token]);

  const history = useHistory();
  function handleQuit() {
    history.push("/");
  }

  useEffect(() => {
    handleBarItems();
  }, [handleBarItems]);

  return (
    <header id="header-group">
      <nav id="navbar">
        <div id="logo">
          <h4>
            {" "}
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
            <h3>Lessons</h3>
            <label className="info-labels" htmlFor="">
              {issues}
            </label>
          </li>

          <li className="itens">
            <h3>Ativos</h3>
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
