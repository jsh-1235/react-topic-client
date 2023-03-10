import React from "react";

import Linker from "./Linker";

import styled from "styled-components";

const MENU = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: stretch;
  justify-content: space-around;
  align-items: stretch;
  background-color: #2ec4b6;
  color: white;
  list-style-type: none;

  li {
    padding: 0px;
    margin: 0px;
  }
`;

export default function Menu({ urls }) {
  return (
    <MENU>
      {urls.map((url, i) => {
        return (
          <li key={i}>
            <Linker url={`${url}`} size={1} selection={true}>
              {url}
            </Linker>
          </li>
        );
      })}
    </MENU>
  );
}
