import React from "react";

import "styles.css";

export const Chats = () => {
  return (
    <ul>
      <div id="quiz-group">
        <div id="flouter">
          <button> LISTAR </button>
        </div>
        <h3>Criar Desafios</h3>

        <div id="content-group">
          <div id="body">
            <strong>Corpo do desafio</strong>
            <textarea
              name="markbody"
              id="markdown"
              cols="30"
              rows="10"
            ></textarea>
          </div>

          <div id="tips">
            <strong>Dicas do desafio</strong>
            <textarea
              name="marktip"
              id="markdown"
              cols="30"
              rows="10"
            ></textarea>
          </div>
        </div>

        <div id="footer">
          <button id="btn-default">Registrar</button>
        </div>
      </div>
    </ul>
  );
};
