import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
    display: "block",
    margin: "auto",
    borderColor: "#a9a9a9",
};

//引数の型
type propsType = {
    isLoading: boolean,
    height?:string,
}

function Loading(props: propsType) {

    return (
        <div
            className="sweet-loading"
            style={{ display: "flex", justifyContent: "center", alignItems: "cneter", textAlign: "center",height:props.height?props.height:"40vh" }}
        >
            <ClipLoader
                color="#a9a9a9"
                loading={props.isLoading}
                cssOverride={override}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}

export default Loading;