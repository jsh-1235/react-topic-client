import React from "react";

import styled from "styled-components";

import { Link, useResolvedPath, useMatch } from "react-router-dom";

const LINKER = styled.div`
  background-color: ${(props) => {
    return props.color || "inhreit";
  }};
  transition-property: background-color;
  transition-duration: 0.5s;

  font-size: calc(var(--page-font-max-size) * ${(props) => props.size || 1});
  text-transform: uppercase;
  border-radius: 0px;
  padding: 10px;

  a {
    color: inherit;

    &:hover {
      color: var(--theme-component-hover);
      transition-property: color;
      transition-duration: 0.5s;
    }

    &:active {
      color: inherit;
    }
  }
`;

export default function Linker({ url, size, selection, children }) {
  const match = useMatch(useResolvedPath(url).pathname);

  const color = getComputedStyle(document.documentElement).getPropertyValue("--theme-component-selected");

  return (
    <LINKER color={selection && match ? color : null} size={size}>
      <Link to={`${url}`}>{children}</Link>
    </LINKER>
  );
}
