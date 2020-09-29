import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import api from "../../services/api";

import "./styles.css";

const Login = () => {
  const [email, setEmail] = useState(String(""));
  const [password, setPassword] = useState(String(""));

  const [cookies, setCookie, removeCookie] = useCookies();
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api
        .post("/ok/authenticate", {
          password,
          email,
        })
        .catch((err) => {
          return alert(err.message);
        });

      const { token, user } = response.data;

      // SE É ADMIN
      if (user.canny) {
        setCookie("token", `Bearer ${token}`.trim());
        setCookie("user_id", user.id);
        localStorage.setItem("name", String(user.name));
        localStorage.setItem("email", String(user.email));
        localStorage.setItem("questions_status", String(user.completed));
        localStorage.setItem("github_avatar", String(user.github + ".png"));

        return history.push("/home");
      }

      return alert("Apenas administradores podem fazer esse Login!");
    } catch (err) {
      console.log(err.message);
      return alert("Erro ao efetuar o login");
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
      // alert("BEM VINDO!");
    } else {
      return history.push("/home");
    }
  }, [cookies, history, removeCookie]);

  useEffect(() => {
    middleware();
  }, []);

  return (
    <div id="App-login">
      <section className="form-section">
        <header>
          <h3>Apenas para administradores</h3>
        </header>

        <div id="form-wrapper">
          <form onSubmit={handleSubmit}>
            <div id="input-group">
              <div>
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email"
                  type="email"
                  name="email"
                  id="email"
                />
              </div>

              <div>
                <label htmlFor="senha">Senha</label>
                <input
                  value={password}
                  required
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha secreta"
                  name="senha"
                  id="senha"
                />
              </div>
            </div>

            <button id="submit" type="submit">
              Entrar
            </button>
          </form>
        </div>
        <div id="card-account">
          <h4>Novo na Wheezy?</h4>
          <a href="/admin/register">Crie uma conta</a>
        </div>
      </section>
    </div>
  );
};

export default Login;
