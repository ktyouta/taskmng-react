import React, { useState } from 'react';
import '../App.css';
import HorizonLabelInputComponent from '../Common/HorizonLabelInputComponent';
import SpaceComponent from '../Common/SpaceComponent';
import ButtonComponent from '../Common/ButtonComponent';
import MessageComponent from '../Common/MessageComponent';
import ResultNumComponent from '../Common/ResultNumComponent';
import TableComponent from '../Common/TableComponent';
import MemoSearch from './MemoSearch';
import MemoList from './MemoList';
import MemoListContent from './MemoListContent';
import './css/MemoTop.css';
import { HeightDiv } from '../Common/StyledComponent/CommonStyledComponent';

//引数の型
type propsType = {
  path: string,
}


function MemoTop(props: propsType) {

  console.log("MemoTop render");

  return (
    <HeightDiv
      height='85%'
    >
      <MemoSearch />
      <MemoListContent
        path={props.path}
      />
    </HeightDiv>
  );
}

export default MemoTop;