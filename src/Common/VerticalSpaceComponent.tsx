import React from 'react';
import '../App.css';
import styled from "styled-components";


//引数の型
type propsType = {
  space:string
}

function VerticalSpaceComponent(props: propsType) {

  return (
    <div style={{height:props.space}}></div>
  );
}

export default VerticalSpaceComponent;