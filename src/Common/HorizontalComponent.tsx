import React, { ReactNode } from 'react';
import '../App.css';
import styled from "styled-components";


//引数の型
type propsType = {
    children: ReactNode,
}

//外側のスタイル
const OuterDiv = styled.div`
    display: flex;
    align-items: center;
`;

function HorizontalComponent(props: propsType) {

    return (
        <OuterDiv>
            {props.children}
        </OuterDiv>
    );
}

export default HorizontalComponent;