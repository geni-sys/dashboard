import React, { useState, useEffect, useCallback } from "react";
import { useCookies } from "react-cookie";
import { FiTrash, FiAlertTriangle } from "react-icons/fi";
import api from "../../../../services/api";
// COMPONENTS
import "./styles.css";

function Users({ disactiveControle }) {
  const [data, setData] = useState([]);
  const [buttonDelete, setButtonDelete] = useState(true);

  const [cookies] = useCookies();
  const { token, user_id } = cookies;

  const handleRequest = useCallback(async () => {
    try {
      const response = await api
        .get(`/users`, {
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
          <th>Apagar</th>
        </tr>

        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.canny ? "SIM" : "NÃO"}</td>
            <td>{item.createdAt}</td>
            <td>
              {buttonDelete ? (
                <button id="exclude" onClick={() => setButtonDelete(false)}>
                  <FiTrash />
                </button>
              ) : (
                <button
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
}

export default Users;
