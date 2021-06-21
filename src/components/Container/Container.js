import React from 'react'
import styled from 'styled-components';

const Container = ({children}) => {
  return (
    <StyledContainer>
      {children}
    </StyledContainer>
  )
}

export default Container

const whiteColor = 'white';
const blackColor = "#999";

const StyledContainer = styled.div`
width: fit-content;
max-width: 100%;
background: ${whiteColor};
border: 1px solid ${blackColor};
box-shadow: 1px 1px 2px hsla(0, 0%, 0%, 0.25),
  0px 0px 2px hsla(0, 0%, 0%, 0.25);
border-radius: 8px;
padding: 30px;
`;
