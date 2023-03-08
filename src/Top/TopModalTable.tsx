import React, { useState } from 'react';
import '../App.css';
import LabelComponent from '../Common/LabelComponent';
import LoadingTableComponent from '../Common/LoadingTableComponent';
//import './css/TableComponent.css';

//引数の型
type tablePropsType = {
    selectMasterNm: string,
    tableHeight?: string,
    tableHeader: string[],
    tableBody: { [key: string]: string | JSX.Element }[],
    isLoading: boolean,
    isError: boolean,
    onclick?: React.Dispatch<React.SetStateAction<{ [key: string]: string | JSX.Element }>>,
}

function TopModalTable(props: tablePropsType) {

    return (
        <div style={{textAlign:"center"}}>
            <div style={{marginBottom:"3%"}}>
                <LabelComponent
                    title={props.selectMasterNm ? `『${props.selectMasterNm}』のコンポーネント一覧` : "コンポーネント一覧"}
                />
            </div>
            <LoadingTableComponent
                {...props}
            />
        </div>

    );
}

export default TopModalTable;