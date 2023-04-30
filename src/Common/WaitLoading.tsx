import React from "react";
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import Loading from "./Loading";

const override: CSSProperties = {
    display: "block",
    margin: "auto",
    borderColor: "#a9a9a9",
};

//ローディング領域のスタイル
const WaitLoadingDiv = styled.div`
  background-color: #3333331a;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

//引数の型
type propsType = {
    isLoading: boolean,
}


function WaitLoading(props: propsType) {

    return (
        <React.Fragment>
            {
                props.isLoading && (
                    <WaitLoadingDiv>
                        <Loading />
                    </WaitLoadingDiv>
                )
            }
        </React.Fragment>
    );
}

export default WaitLoading;