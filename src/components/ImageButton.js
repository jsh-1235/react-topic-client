import React from "react";

import styled from "styled-components";
import { IconContext } from "react-icons";

const CONTAINER = styled.span`
  &:hover {
    cursor: pointer;
  }

  & svg * {
    color: inherit;

    &:hover {
      cursor: pointer;
      color: var(--theme-component-hover);
      transition-property: color;
      transition-duration: 0.5s;
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
