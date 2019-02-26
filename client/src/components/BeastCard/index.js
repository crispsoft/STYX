import React from "react";


import styled from 'styled-components';

const StyledBeastCard = styled.div`
  height: 65vh;
  width: 40vh;
  background-color: grey;

  display: flex;
  align-items: center;
  flex-flow: column nowrap;

  margin: auto;
  margin-top: 10vh;
  margin-bottom: 5vh;
  border-radius: 10px;
  padding: 0.7rem;

  font-family: ff-providence-sans-web-pro, sans-serif;
  font-weight: 700;
  font-style: normal;
`;


const BeastTitle = styled.span`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;


const BeastImg = styled.img`
  border-radius: 50%;
  height: 30vh;
  width: 30vh;

  background: ${props => props.color};
`;

const BeastDescript = styled.p`
  font-family: 'Imprima', 'sansSerif';
  text-align: center;
`;


function BeastCard(props) {
  return (
    <StyledBeastCard>

      <BeastImg alt={props.name} src={props.img} color={props.color}/>

      <BeastTitle as="h3">{props.name}</BeastTitle>

      <BeastDescript>{props.description}</BeastDescript>

    </StyledBeastCard>
  )
}

export default BeastCard;