import React from "react";

import styled from 'styled-components';

const StyledAboutCard = styled.div`
  // height: 65vh;
  width: 40vh;

  background-color: grey;

  display: flex;
  align-items: center;
  flex-flow: column nowrap;

  position: relative;

  margin: auto;
  margin-top: 50vh;
  margin-bottom: 5vh;
  padding: 0.7rem;

  border-radius: 10px;

  font-family: ff-providence-sans-web-pro, sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const AboutTitle = styled.span`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const AboutImg = styled.img`
  border-radius: 50%;
  height: 30vh;
  width: 30vh;

  background: ${props => props.color};
`;

const AboutDescript = styled.p`
  font-family: 'Imprima', 'sansSerif';
  text-align: center;
`;

const AboutLinks = styled.div`
  position: absolute;
  bottom: 0;
  left: 0; right: 0;

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  
  display: flex;
  justify-content: space-evenly;

  height: 20px;
  background: black;
  opacity: 0.5;
`;


function AboutCard({ name, img, color, description }) {
  return (
    <StyledAboutCard>

      <AboutImg alt={name} src={img} color={color} />

      <AboutTitle as="h3">{name}</AboutTitle>

      <AboutDescript>{description}</AboutDescript>


      <AboutLinks>
      </AboutLinks>

    </StyledAboutCard>
  )
}

export default AboutCard;