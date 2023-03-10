import React from "react";

import styled from "styled-components";
import { IconContext } from "react-icons";

const CONTAINER = styled.span`
  svg * {
    &:hover {
      color: var(--theme-component-hover);
      transition-property: color;
      transition-duration: 0.5s;
    }

    &:active {
      color: var(--theme-component-active);
    }
  }
`;

export default function ImageButton({ color, fontSize, children }) {
  return (
    <CONTAINER>
      <IconContext.Provider className="image" value={{ style: { color, fontSize, verticalAlign: "middle" } }}>
        {children}
      </IconContext.Provider>
    </CONTAINER>
  );
}
