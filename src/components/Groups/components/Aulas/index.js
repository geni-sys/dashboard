import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import api from '../../../../services/api'

import './styles.css';

function AulaControle({ id, disactiveControle }) {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [body, setBody] = useState('')
  const [link, setLink] = useState('')

  const [cookies] = useCookies()
  const history = useHistory()
  const { user_id } = cookies
  const { token } = cookies

  async function handleRequest() {
    try {
      const response = await api.get(`/issues/${id}`, {
        headers: {
          "Authorization": `Bearer ${String(token)}`
        }
      }).catch(error => {
        console.log(error.message)
      })

      setTitle(response.data.title)
      setTags(response.data.tags)
      setBody(response.data.body)
      setLink(response.data.link)
    } catch (err) {
      console.log(err.message)
      return alert(err.message)
    }
  }
  async function handleDelete() {
    try {
      const response = api.delete(`/admin/${user_id}/destroy/issue/${id}`,
        {
          headers: {
            "Authorization": `Bearer ${String(token)}`
          }
        }
      ).catch(error => alert(error.message))

      if (response) {
        alert("ISSUE DELETADA!")
        disactiveControle()
        return history.push('/home?tab=4')
      } else {
        return alert('Erro deletando a issue')
      }
    } catch (err) {
      return alert(err.message)
    }
  }
  async function handleSave() { }

  useEffect(() => {
    handleRequest()
  }, [])

  return (
    <div id="aula-controler">
      <ul id="edit-father">
        <li id="edit-all">
          <div id="top">
            <strong># {id}</strong>
            <strong>{title}</strong>
          </div>
          <div id="edit-aula-user">
            <div>
              <strong>Criador: </strong>
              <a
                target="_BLANK"
                rel=""
                href="localhost:3332/users/ceo@gmail.com">
                {link}
              </a>
            </div>
            <div>
              <strong>Tags: </strong>
              <span>{tags}</span>
            </div>
          </div>
          <div id="edit-aula-body">
            <strong>Corpo: </strong>
            <div id="transcription">{body} </div>
          </div>
          <div id="edit-aula-info">
            <span>Stars: 24343</span>
            <span>Users: 234</span>
          </div>
          <div id="comtroller">
            <button className="green">Salvar</button>
            <button onClick={handleDelete} className="red">Excluir</button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default AulaControle;
