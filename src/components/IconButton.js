import React from "react";

import styled from "styled-components";
import { IconContext } from "react-icons";

const CONTAINER = styled.span`
  &:hover {
    cursor: pointer;
  }

  & svg * {
    color: inherit;
  }
`;

export default function IconButton({ color, fontSize, children }) {
  return (
    <CONTAINER>
      <IconContext.Provider value={{ color, style: { fontSize, verticalAlign: "middle" } }}>{children}</IconContext.Provider>
    </CONTAINER>
  );
}
