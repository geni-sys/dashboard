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
  const [, setFeedbacks] = useState([]);
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
          <Element
            onClick={() => SelectElement(1, 2, "nova funcção 1", "elias al3x")}
          >
            <div id="ilustration">
              <FiCpu />
            </div>

            <div id="infinity">
              <div>
                <strong>Nova funcionalidade</strong>
                <span>
                  <FiStar />
                  2345
                </span>
              </div>

              <p id="limitation">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque,
                ipsa sunt. Autem quasi quaerat amet voluptatum beatae voluptates
                sed voluptatibus itaque quisquam, mollitia repudiandae dolore
                dolores
              </p>
            </div>
          </Element>

          <Element onClick={() => SelectElement(1, 2, "nova funcção 2")}>
            <div id="ilustration">
              <FiCpu />
            </div>

            <div id="infinity">
              <div>
                <strong>Nova funcionalidade</strong>
                <span>
                  <FiStar />
                  2345
                </span>
              </div>

              <p id="limitation">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque,
                ipsa sunt. Autem quasi quaerat amet voluptatum beatae voluptates
                sed voluptatibus itaque quisquam, mollitia repudiandae dolore
                dolores
              </p>
            </div>
          </Element>

          <Element onClick={() => SelectElement(1, 2, "nova funcção 3")}>
            <div id="ilustration">
              <FiCpu />
            </div>

            <div id="infinity">
              <div>
                <strong>Nova funcionalidade</strong>
                <span>
                  <FiStar />
                  2345
                </span>
              </div>

              <p id="limitation">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque,
                ipsa sunt. Autem quasi quaerat amet voluptatum beatae voluptates
                sed voluptatibus itaque quisquam, mollitia repudiandae dolore
                dolores
              </p>
            </div>
          </Element>

          <Element onClick={() => SelectElement(1, 2, "nova funcção 4")}>
            <div id="ilustration">
              <FiCpu />
            </div>

            <div id="infinity">
              <div>
                <strong>Nova funcionalidade</strong>
                <span>
                  <FiStar />
                  2345
                </span>
              </div>

              <p id="limitation">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque,
                ipsa sunt. Autem quasi quaerat amet voluptatum beatae voluptates
                sed voluptatibus itaque quisquam, mollitia repudiandae dolore
                dolores
              </p>
            </div>
          </Element>
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
