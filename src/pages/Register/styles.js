import styled from "styled-components";

// FATHER STYLUS
export const Container = styled.div`
  height: 100vh;
  overflow-y: hidden;
  height: 100vh;

  background: url(${(props) =>
        props.Montains ? props.Montains : `var(--force)`})
      repeat-x scroll center bottom,
    url("${(props) => (props.Stars ? props.Stars : `var(--force)`)}") repeat-x
      scroll 0% 0%,
    var(--white) none repeat scroll 0% 0%;
  background-size: auto, auto, auto;
  background-color: #36393f;
`;

// MAIN STYLUS
export const Main = styled.main`
  background: transparent;
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  div#welcome h3 {
    font-size: 30px;
    margin: 30px;
    color: #fff;
  }
`;

export const Form = styled.form`
  display: block;
  position: relative;
  width: 300px;
  height: 290px;

  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  background-color: #fff;
  color: var(--primary);
  margin: auto;

  padding: 10px;

  &:hover {
    box-shadow: 1px 0.5px white;
  }

  div#input-group label {
    font-family: "Ubuntu", Arial, Helvetica, sans-serif;
    font-size: 14px;
    color: #111;
  }

  div#input-group div {
    margin-top: 10px;
  }

  div#loading-form {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 30px;
    width: 100%;
    padding: 10px 0;

    div.css-load {
      margin-top: -19px;
    }
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 30px;
  margin-top: 3px;
  padding: 7px;

  display: block;
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  font-size: 1.4em;

  color: #333;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  outline-color: #7159c1;
`;

export const Submit = styled.button`
  width: 100%;
  height: 30px;
  margin-top: 10px;
  border-radius: 3px;

  cursor: pointer;
  color: #000;
  background-color: #7ed376;

  font-weight: 700;
  font-family: Roboto, arial, sans-serif;
  border: 1px solid #aa9696;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  &:hover {
    background: #50fa7b;
    color: #000;
  }
`;

export const Load = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 30px;
  width: 100%;
  padding: 10px 0;

  div.css-load {
    margin-top: -19px;
  }
`;

export const Card = styled.div`
  color: var(--white);
  font-size: 11px;
  margin-top: 40px;

  display: flex;
  flex-direction: row;
  justify-content: center;

  a {
    color: #bd93f9;
    margin-left: 3px;
  }
`;
