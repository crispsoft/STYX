import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import ConditionalObols from "../ConditionalObols";

import styled, { css, keyframes } from "styled-components";
import { medGrey } from "./../../constants/colors";

const bounce = keyframes`
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1.1);
  }
`;

const ObolExchange = styled.div`
  position: relative;

  width: 30%;
  height: 5rem;

  margin-bottom: 1rem;

  background: ${medGrey};
  border: 3px solid black;
  border-radius: 3px;

  text-align: center;
  font-size: 3em;
  font-family: ff-providence-sans-web-pro, sans-serif;
  font-weight: 700;
  font-style: normal;

  ${props =>
    props.active && css`
      animation: ${bounce} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)
        alternate-reverse infinite;

      cursor: pointer;

      &:hover {
        /* border-color: #375170; */
      }
    `}
`;

const ConditionContainer = styled.div`
  position: absolute;
  background: #526d78;

  border: 3px solid;
  border-color: inherit;
  border-radius: 3px;

  width: 90%;

  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  transform: translateY(50%);
`;

function DedicationCards({ value, type, colors, selected, ...props }) {

  let title = "";
  switch (type) {
    case "1-all":
      title = "Trade one of each favor";
      break;
    case "3-pair":
      title = "Trade three pairs of favors";
      break;
    case "4-kind":
      title = "Trade four of the same favor";
      break;
    default:;
  }

  return (
    <Tooltip title={title} placement="top">
      <ObolExchange {...props}>
        {value || ""}
        <ConditionContainer>
          <ConditionalObols type={type} colors={colors} selected={selected} />
        </ConditionContainer>
      </ObolExchange>
    </Tooltip>
  );

}

export default DedicationCards;
