/* eslint-disable quotes */
import styled from "styled-components";

export const Container = styled.div`
  padding: 10px;
  max-width: 400px;
`;

export const Top = styled.article`
  div strong {
    margin-left: 5px;
  }
`;

export const Type = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export const Textarea = styled.textarea`
  height: 71px;
  width: 300px;
  resize: none;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 5px;
`;

export const Responder = styled.main`
  margin: 0;
`;

export const Enviar = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  background: #dedede;
  color: #333;

  width: 100px;
  /* height: 25px; */
  cursor: pointer;
  margin: 5px 0;

  :hover {
    border: 1px solid rgba(0, 0, 0, 0.5);
    background: #fff;
    color: #777;
  }
`;
