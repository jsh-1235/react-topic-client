import React from "react";

import styled from "styled-components";
import { IconContext } from "react-icons";

const CONTAINER = styled.div`
  &:hover {
    cursor: pointer;
  }

  & svg * {
    color: inherit;

    &:hover {
      cursor: pointer;
    }

    &:active {
      color: inherit;
    }
  }
`;

export default function ImageButton({ name, color, fontSize, onClick, children }) {
  return (
    <CONTAINER name={name} onClick={onClick}>
      <IconContext.Provider value={{ style: { color, fontSize, verticalAlign: "middle" } }}>{children}</IconContext.Provider>
    </CONTAINER>
  );
}
