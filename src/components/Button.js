import React from "react";

import styled from "styled-components";

const CONTAINER = styled.button`
  width: ${(props) => props.width || "inherit"};
  height: ${(props) => props.height || "inherit"};
  border: none;
  outline: inherit;
  border-radius: ${(props) => props.corner || "inherit"};
  background-color: var(--theme-component-color);
  color: white;
  font-size: ${(props) => props.fontSize || "inherit"};
  text-transform: uppercase;
  padding: ${(props) => props.padding || "0.5rem"};
  margin: ${(props) => props.margin || "inherit"};

  @media (hover: hover) {
    &:hover {
      background-color: var(--theme-component-hover);
      cursor: pointer;
      transition-property: background-color, cursor;
      transition-duration: 0.5s;
    }
  }

  &:active {
    background-color: var(--theme-component-active);
    transition-property: background-color;
    transition-duration: 0.5s;
  }

  &:disabled {
    background-color: var(--theme-component-disabled);
    color: var(--theme-accent-text-disabled);
  }
`;

export default function Button({ children, ...props }) {
  return (
    <CONTAINER name={props.name} width={props.width} height={props.height} fontSize={props.fontSize} corner={props.corner} padding={props.padding} margin={props.margin} onClick={props.onClick}>
      {children}
    </CONTAINER>
  );
}
