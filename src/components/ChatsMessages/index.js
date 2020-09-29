/* eslint-disable quotes */
/* eslint-disable react/jsx-filename-extension */
// eslint-disable-next-line quotes
import React, { useState, useEffect, useCallback } from "react";
import { useCookies } from "react-cookie";
import { FiCpu, FiStar } from "react-icons/fi";
import api from "../../services/api";

import ChatsElement from "../ChatsElement";
import { Container, Element } from "./styles";

const ChatsMessages = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [elementSelected, setElementSelected] = useState(null);
  const [toUser, setToUser] = useState(null);
  const [messageTitle, setMessageTitle] = useState("");
  const [username, setUsername] = useState("");

  const [cookies] = useCookies();
  const { token } = cookies;

  const handleRequest = useCallback(async () => {
    try {
      const resFeed = await api.get("/feedbacks", {
        headers: {
          Authorization: String(token),
        },
      });

      setFeedbacks(resFeed.data);
    } catch (err) {
      console.log(err.messge);
      alert(err.messge);
    }
  }, [token]);

  useEffect(() => {
    handleRequest();
  }, [handleRequest]);

  function SelectElement(id, to, msg, usr) {
    setToUser(to);
    setMessageTitle(msg);
    setUsername(usr);
    return setElementSelected(id);
  }

  return (
    <Container id="mensagens">
      {!elementSelected && (
        <>
          {feedbacks.map((feedback) => (
            <Element
              key={feedback.id}
              onClick={() =>
                SelectElement(
                  feedback.id,
                  feedback.user_id,
                  feedback.title,
                  feedback.user.name
                )
              }
            >
              <div id="ilustration">
                <FiCpu />
              </div>

              <div id="infinity">
                <div>
                  <strong>{feedback.title}</strong>
                  <span>
                    <FiStar />
                    {feedback.stars}
                  </span>
                </div>

                <p id="limitation">{feedback.message}</p>
              </div>
            </Element>
          ))}
        </>
      )}

      {elementSelected && (
        <ChatsElement
          chatID={elementSelected}
          to={toUser}
          CloseThisElement={setElementSelected}
          messageTitle={messageTitle}
          username={username}
        />
      )}
    </Container>
  );
};

export default ChatsMessages;
