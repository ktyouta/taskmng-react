import styled from 'styled-components';
import { taskHistoryType } from '../Home/Type/HomeType';
import HeaderContent from './HeaderContent';
import React from 'react';
import VerticalSpaceComponent from '../Common/VerticalSpaceComponent';
import { popoverClasses } from '@mui/material';

//最上位のスタイル
const OuterDiv = styled.div`
  width: 99%;
  height: 90%;
  overflow: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  padding: 1%;
`;

//引数の型
type propsType = {
  workHistoryList: taskHistoryType[],
  closeModal: () => void,
}


function HeaderContentArea(props: propsType) {

  console.log("HeaderContentArea render");

  return (
    <OuterDiv>
      {
        props.workHistoryList.map((element) => {
          return (
            <React.Fragment>
              <HeaderContent
                workHistory={element}
                closeModal={props.closeModal}
              />
              <VerticalSpaceComponent
                space={'2%'}
              />
            </React.Fragment>
          )
        })
      }
    </OuterDiv>
  );
}

export default HeaderContentArea;
