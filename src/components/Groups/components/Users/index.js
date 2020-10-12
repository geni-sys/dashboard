/* eslint-disable no-alert */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/button-has-type */
/* eslint-disable quotes */
import React, { useState, useEffect, useCallback } from "react";
import { useCookies } from "react-cookie";
import PropTypes from "prop-types";
import { FiTrash, FiAlertTriangle } from "react-icons/fi";
import api from "../../../../services/api";
import formatTimeStamps from "../../../Utils/formatTimeStamps";
// COMPONENTS
import "./styles.css";

const Users = ({ disactiveControle }) => {
  const [data, setData] = useState([]);
  const [buttonDelete, setButtonDelete] = useState(true);

  const [cookies] = useCookies();
  const { token, user_id } = cookies;

  const handleRequest = useCallback(async () => {
    try {
      const response = await api
        .get("/users", {
          headers: {
            Authorization: String(token),
          },
        })
        .catch((error) => alert(error.message));

      setData(response.data);
    } catch (err) {
      console.log(err.message);
      return alert(err.message);
    }
    return null;
  }, [token]);
  async function handleExclude(id) {
    try {
      const response = await api
        .delete(`/admin/${user_id}/delete/user/${id}`, {
          headers: { Authorization: String(token) },
        })
        .catch((error) => alert(error.message));

      if (response) {
        alert("Usuário Deletado");
        handleRequest();
      }
    } catch (err) {
      console.log(err.message);
      return alert(err.message);
    }
    return disactiveControle();
  }
  async function setUserAsFeatured(id) {
    try {
      const response = await api.put(`/configurate/user/${id}/destaque`, {
        destaque: 2,
      }, {
        headers: {
          Authorization: String(token),
        },
      })
        .catch((error) => alert(error.message));

      if (response.data) {
        await api.put(`/admin_logs/${user_id}`, {
          lists_logs: "Marcou um novo usuário como destaque",
        }, {
          headers: {
            Authorization: String(token),
          },
        })
          .catch((error) => alert(error.message));

        await api.post(
          `/notifications/${user_id}/to/${id}`,
          {
            transcription: `(PARABÉNS) Você foi marcado como um usuário destaque. ❤😊❤👏👏`,
            state: "complete",
            type: "ourteam",
          },
          {
            headers: {
              Authorization: String(token),
            },
          },
        );

        window.location.href = '/home?tab=2';
      }
      return;
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  }

  useEffect(() => {
    handleRequest();
  }, [handleRequest]);

  return (
    <div id="user-list-app">
      <table>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Admin?</th>
          <th>Inscrição</th>
          <th>Destaque</th>
          <th>Apagar</th>
        </tr>

        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.canny ? "SIM" : "NÃO"}</td>
            <td>{formatTimeStamps(item.createdAt)}</td>
            <td>
              <button disabled={item.destaque} onClick={() => setUserAsFeatured(item.id)} type="button">Destacar</button>
            </td>
            <td>
              {buttonDelete ? (
                <button
                  type="button"
                  id="exclude"
                  onClick={() => setButtonDelete(false)}
                >
                  <FiTrash />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    handleExclude(item.id);
                    setButtonDelete(true);
                  }}
                  id="exclude"
                >
                  <FiAlertTriangle color="#F25" />
                </button>
              )}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

Users.propTypes = {
  disactiveControle: PropTypes.func.isRequired,
};

export default Users;
