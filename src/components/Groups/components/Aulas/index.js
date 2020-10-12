/* eslint-disable no-alert */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable camelcase */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import api from '../../../../services/api';

import './styles.css';

function AulaControle({ id, disactiveControle }) {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [body, setBody] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [cookies] = useCookies();
  const history = useHistory();
  const { user_id, token } = cookies;

  const handleRequest = useCallback(async () => {
    try {
      const response = await api
        .get(`/issues/${id}`, {
          headers: {
            Authorization: String(token),
          },
        })
        .catch((error) => {
          console.log(error.message);
        });

      setTitle(response.data.title);
      setTags(response.data.tags);
      setBody(response.data.body);
      setEmail(response.data.user.email);
      setName(response.data.user.name);

      return;
    } catch (err) {
      console.log(err.message);
      return alert(err.message);
    }
  }, [token, id]);
  async function handleDelete() {
    try {
      const response = await api
        .delete(`/admin/${user_id}/destroy/issue/${id}`, {
          headers: {
            Authorization: String(token),
          },
        })
        .catch((error) => alert(error.message));

      if (response.data.message) {
        alert('ARTIGO DELETADO!');
        disactiveControle();

        await api.put(`/dashboard/excludeds/${user_id}?issue=true`, {}, {
          headers: {
            Authorization: String(token),
          },
        })
          .catch((error) => alert(error.message));

        window.location.href = '/home?tab=4';
        return;
      }
      return alert('Erro deletando a issue');
    } catch (err) {
      return alert(err.message);
    }
  }
  async function handleSave() {
    try {
      const response = api
        .put(
          `/admin/${user_id}/edit/issue/${id}`,
          {
            tags,
            body: `${body}`,
          },
          {
            headers: {
              Authorization: String(token),
            },
          },
        )
        .catch((error) => alert(error.message));

      if (response) {
        alert('ISSUE EDITADA!');
        disactiveControle();
        return history.push('/home?tab=4');
      }
      return alert('ERRO EDITANDO a issue');
    } catch (err) {
      return alert(err.message);
    }
  }

  useEffect(() => {
    handleRequest();
  }, [handleRequest]);

  return (
    <div id="aula-controler">
      <ul id="edit-father">
        <li id="edit-all">
          <div id="top">
            <strong>
              #
              {' '}
              {id}
            </strong>
            <strong>{title}</strong>
            <button
              style={{
                background: 'var(--white)',
                display: 'flex',
                alignItems: 'center',
                margin: 0,
                padding: 0,
                width: '20px',
                justifyContent: 'center',
                borderRadius: '5px',
                border: '1px solid',
              }}
              type="button"
              onClick={() => disactiveControle()}
            >
              X
            </button>
          </div>
          <div id="edit-aula-user">
            <div>
              <strong>Criador: </strong>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`http://localhost:3337/users/${email}`}
              >
                {name}
              </a>
            </div>
            <div>
              <strong>Tags: </strong>
              <input
                type="text"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
                required
              />
            </div>
          </div>
          <div id="edit-aula-body">
            <strong>Corpo: </strong>
            <div id="transcription">
              <textarea
                onChange={(e) => {
                  console.log(body);
                  setBody(String(e.target.value));
                }}
                value={String(body)}
                name="area"
                id="are"
                required
              />
            </div>
          </div>
          <div id="edit-aula-info">
            {/* <span>Stars: 24343</span>
            <span>Users: 234</span> */}
          </div>
          <div id="comtroller">
            <button type="submit" onClick={handleSave} className="green">
              Salvar
            </button>
            <button type="button" onClick={handleDelete} className="red">
              Excluir
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

AulaControle.propTypes = {
  id: PropTypes.number.isRequired,
  disactiveControle: PropTypes.func.isRequired,
};

export default AulaControle;
