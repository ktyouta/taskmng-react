import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

const override: CSSProperties = {
    display: "block",
    margin: "auto",
    borderColor: "#a9a9a9",
};

function LoadingBase() {

    return (
        <ClipLoader
            color="#a9a9a9"
            cssOverride={override}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    );
}

export default LoadingBase;