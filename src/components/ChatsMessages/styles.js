/* eslint-disable quotes */
import styled from "styled-components";

export const Container = styled.ul`
  display: flex;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  margin-bottom: 30px;

  border: 1px solid rgba(0, 0, 0, 0.1);
  max-height: 220px;
  width: 100%;

  overflow-x: auto;
  overflow-y: hidden;
`;

export const Element = styled.li`
  min-width: 300px;
  border: 0.5px solid rgba(0, 0, 0, 0.1);

  cursor: pointer;

  display: flex;
  padding: 5px;
  border-radius: 2px;

  div p {
    font-size: 13px;
    max-height: 110px;
  }

  div#infinity div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  div#infinity {
    margin-left: 5px;
  }

  div span {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

// div#flouter {
//   position: absolute;
//   right: 0;
//   top: 40px;
// }
// div#flouter button {
//   width: 70px;
//   height: 20px;
//   border: 0;
//   cursor: pointer;
//   border-radius: 4px;
//   background: #444;
//   color: #fff;
// }
// div#flouter button:hover {
//   background: #fff;
//   color: #555;
// }

// textarea {
//   border: 1px solid rgba(255, 255, 255, 0.3);
//   resize: vertical;
//   border-radius: 3px;
//   font-size: 18px;
//   padding: 5px;
//   margin-left: 20px;
//   font-family: "Roboto", Arial, sans-serif;
// }

// div#content-group div#body textarea {
//   width: 800px;
//   height: 280px;
//   font-family: "Roboto", Arial, sans-serif;
// }
// div#content-group div#tips textarea {
//   width: 700px;
//   height: 150px;
//   font-family: "Roboto", Arial, sans-serif;
// }

// div#content-group div#body {
//   margin-top: 30px;
// }
/* MESSAGES */
