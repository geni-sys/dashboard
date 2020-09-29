/* eslint-disable camelcase */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-alert */
/* eslint-disable quotes */
/* eslint-disable react/jsx-filename-extension */
// eslint-disable-next-line quotes
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import api from "../../services/api";
// COMPONENTS | STATIC
import { Container, Top, Type, Responder, Enviar, Textarea } from "./styles";

const ChatsElement = ({
  chatID,
  CloseThisElement,
  to,
  messageTitle,
  username,
}) => {
  const [message, setMessage] = useState("");

  const [cookies] = useCookies();
  const { token, user_id } = cookies;

  const sendResponse = async () => {
    if (!message) return alert("Preencha a mensagem!");

    try {
      const response = await api.post(
        `/notifications/${user_id}/to/${to}`,
        {
          transcription: `${message}`,
          state: "complete",
          type: "ourteam",
        },
        {
          headers: {
            Authorization: String(token),
          },
        }
      );

      if (response.data) {
        alert("Resposta enviada");
        return CloseThisElement(null);
      }
    } catch (err) {
      alert(err.messge);
    }
  };

  return (
    <Container>
      <Top>
        <div>
          <span>Assunto:</span>
          <strong>{messageTitle}</strong>
          <span onClick={() => CloseThisElement(null)}> #{chatID}</span>
        </div>
        <div>
          <span>De:</span>
          <strong>{username}</strong>
        </div>

        <Type>
          <span>Tipo de resposta:</span>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete="false"
            autoFocus
            autoCorrect="false"
          />
        </Type>
      </Top>

      <Responder>
        <Enviar type="button" onClick={sendResponse}>
          Enviar
        </Enviar>
      </Responder>
    </Container>
  );
};

ChatsElement.propTypes = {
  chatID: PropTypes.number.isRequired,
  CloseThisElement: PropTypes.func.isRequired,
  to: PropTypes.number.isRequired,
  messageTitle: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default ChatsElement;
