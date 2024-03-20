import '../App.css';
import MemoTop from './MemoTop';
import MemoFooter from './MemoFooter';
import './css/Memo.css';
import React from 'react';

//引数の型
type propsType = {
    path: string,
}

function MemoMain(props: propsType) {

    console.log("MemoMain render");

    return (
        <React.Fragment>
            <MemoTop
                path={props.path}
            />
            <MemoFooter
                path={props.path}
            />
        </React.Fragment>
    );
}

export default MemoMain;