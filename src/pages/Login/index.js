import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import api from '../../services/api'

import './styles.css';

const Login = () => {
  const [email, setEmail] = useState(String(''))
  const [password, setPassword] = useState(String(''))

  const [, setCookie] = useCookies()

  const history = useHistory()

  async function handleSubmit(event) {
    event.preventDefault()

    try {

      const response = await api.post('/ok/authenticate', {
        password,
        email,
      }).catch(err => {
        return alert(err.message)
      });

      const { token, ...rest } = response.data

      setCookie('token', token)
      setCookie('user_id', rest.user.id)
      localStorage.setItem('username', String(rest.user.name))
      localStorage.setItem('email', String(rest.user.email))

      history.push('/home')
    } catch (err) {
      console.log(err.message)
      return alert("Erro ao efetuar o login")
    }
  }

  return (
    <div id="App-login">
      <section className="form-section">
        <header>
          <h3>Only Admin</h3>
        </header>

        <div id="form-wrapper">
          <form onSubmit={handleSubmit}>
            <div id="input-group">
              <div>
                <label htmlFor="email">Email</label>
                <input value={email} required onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email" type="email" name="email" id="email" />
              </div>

              <div>
                <label htmlFor="senha">Senha</label>
                <input value={password} required type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua senha secreta" name="senha" id="senha" />
              </div>
            </div>

            <button id="submit" type="submit">
              Entrar
            </button>
          </form>
        </div>
        <div id="card-account">
          <h4>New to Genesys?</h4>
          <a href="/admin/register">create an account</a>
        </div>
      </section>
    </div>

  );

}

export default Login;
