import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

import './styles.css';

const Login = () => {
  const [email, setEmail] = useState(String(''))
  const [password, setPassword] = useState(String(''))

  const history = useHistory()

  function handleSubmit(event) {
    event.preventDefault()

    history.push('/home')
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
                <input required onChange={setEmail} placeholder="Digite seu email" type="email" name="email" id="email" />
              </div>

              <div>
                <label htmlFor="senha">Senha</label>
                <input required type="password" onChange={setPassword} placeholder="Digite sua senha secreta" name="senha" id="senha" />
              </div>
            </div>

            <button id="submit" type="submit">
              Entrar
            </button>
          </form>
        </div>
        <div id="card-account">
          <h4>New to Genesys?</h4>
          <a href="/">create an account</a>
        </div>
      </section>
    </div>

  );

}

export default Login;
