import React, { useState } from 'react';
import '../App.css';
import './css/TableComponent.css';
import useTableComponentLogic from './Hook/useTableComponentLogic';
import Loading from './Loading';
import TableComponent from './TableComponent';

//引数の型
type tablePropsType = {
    tableHeight?: string,
    tableHeader: string[],
    tableBody: { [key: string]: string | JSX.Element }[],
    isLoading:boolean,
    isError:boolean,
    onclick?: React.Dispatch<React.SetStateAction<{ [key: string]: string | JSX.Element }>>,
}


function LoadingTableComponent(props: tablePropsType) {

    //ローディング
    if (props.isLoading) {
        return <Loading height='50vh'/>;
    }

    //エラー
    if(props.isError){
        return <div>エラーが発生しました。</div>;
    }

    return (
        <TableComponent
            {...props}
        />
    );
}

export default LoadingTableComponent;