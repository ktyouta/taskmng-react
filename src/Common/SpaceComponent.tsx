import React from 'react';
import '../App.css';
import styled from "styled-components";


//引数の型
type propsType = {
  space: string
}

function SpaceComponent(props: propsType) {

  return (
    <div style={{ width: props.space, display: 'inline-block' }}></div>
  );
}

export default SpaceComponent;