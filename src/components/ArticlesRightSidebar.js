import React from 'react';
import styled from 'styled-components';

import Actions from './Actions';
import Content from '../container/ArticlesContent';

const StyledRightSidebar = styled.div`
  @media(min-width: 768px){
    width: 75%;
  }
`;

const RightSidebar = (props) => {
  return (
  <StyledRightSidebar className="float-md-right">
    <Content />
    <Actions history={props.history} />
  </StyledRightSidebar>    
  );
};

export default RightSidebar;