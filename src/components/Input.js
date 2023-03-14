import styled from "styled-components";

import React, { forwardRef } from "react";

const CONTAINER = styled.input`
  width: ${(props) => props.width || "inherit"};
  height: ${(props) => props.height || "inherit"};
  border: none;
  outline: 1px solid #e0e0e0;
  border-radius: ${(props) => props.corner || "inherit"};
  color: black;
  font-size: ${(props) => props.fontSize || "inherit"};
  padding: ${(props) => props.padding || "0.5rem"};
  margin: ${(props) => props.margin || "inherit"};

  @media (max-width: 1280px) {
    font-size: var(--page-font-size);
  }

  @media (hover: hover) {
    &:hover {
      outline: 1px solid var(--theme-component-hover);
    }
  }

  &:focus {
    outline: 2px solid var(--theme-component-active);
    transition-property: outline;
    transition-duration: 0.5s;
  }

  &:autofill,
  &:-webkit-autofill {
    border: none;
    -webkit-text-fill-color: var(--theme-component-active);
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
  }

  &:disabled {
    background-color: var(--theme-component-disabled);
    color: var(--theme-accent-text-disabled);
  }
`;

function Input(props, ref) {
  return <CONTAINER ref={ref} name={props.name} type={props.type} width={props.width} height={props.height} fontSize={props.fontSize} corner={props.corner} padding={props.padding} margin={props.margin} placeholder={props.placeholder} required={props.required} disabled={props.disabled} onClick={props.onClick} />;
}

export default forwardRef(Input);
