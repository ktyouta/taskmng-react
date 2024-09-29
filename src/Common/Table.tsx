import React, { ReactNode, useState } from 'react';
import '../App.css';
import styled from 'styled-components';

//ヘッダの型
export type tableHeadType = {
    content: ReactNode,
    width?: string,
    height?: string,
}

//ボディのセルの型
export type tableBodyType = {
    content: ReactNode,
    width?: string,
    height?: string,
}

//テーブルデータの型
export type tableType = {
    tableHead: tableHeadType[],
    tableBody: tableBodyType[][],
    tableHeight?: string,
    tableWidth?: string,
}

//引数の型
type propsType = {
    tableDatas: tableType,
    tableStyle?: { [key: string]: string },
    thStyle?: { [key: string]: string },
    trStyle?: { [key: string]: string },
    tdStyle?: { [key: string]: string },
}


//テーブルのスタイル
const TableTable = styled.table<{ height?: string, width?: string, }>`
  width: ${({ width }) => (width ? width : "90%")};
  height: ${({ height }) => (height ? height : "90%")};
  margin-left: 3%;
  border: 1px solid #696969;
  border-collapse: separate;
  border-spacing: 0;
`;

//ヘッダのスタイル
const TableTh = styled.th<{ width?: string, }>`
  width: ${({ width }) => (width ? width : "")};
  cursor: pointer;
  border-bottom: 1px solid #696969;
  height: 50px;
  background-color: #ddd;
  position: sticky;
  top: 0;
  left: 0;
`;

//行のスタイル
const TableHeadTr = styled.tr<{ height?: string }>`
  height: ${({ height }) => (height ? height : "")};
  cursor: pointer;
`;

//行のスタイル
const TableBodyTr = styled.tr`
  &:last-child td{
    border-bottom: none;
  }
`;

//セルのスタイル
const TableTd = styled.td`
  border-bottom: 1px solid #696969;
`;


function Table(props: propsType) {

    console.log("Table render");

    return (
        <React.Fragment>
            <TableTable
                height={props.tableDatas.tableHeight}
                width={props.tableDatas.tableWidth}
                style={props.tableStyle}
            >
                <thead>
                    <TableHeadTr
                        style={props.trStyle}
                    >
                        {
                            props.tableDatas.tableHead.map((element, i) => {
                                //thのキー
                                let tmpTime = new Date().getTime();
                                return (
                                    <TableTh
                                        key={`th-${tmpTime}-${i}`}
                                        onClick={() => { }}
                                        width={element.width}
                                        style={props.thStyle}
                                    >
                                        {element.content}
                                    </TableTh>
                                );
                            })
                        }
                    </TableHeadTr>
                </thead>
                <tbody>
                    {
                        props.tableDatas.tableBody && props.tableDatas.tableBody.map((element, i) => {
                            //キー用
                            let tmpTime = new Date().getTime();
                            let trKey = `tr-${tmpTime}-${i}`;
                            return (
                                <TableBodyTr
                                    key={trKey}
                                    style={props.trStyle}
                                >
                                    {
                                        element.map((item, j) => {
                                            //キー用
                                            let tmpTdTime = new Date().getTime();
                                            let tdKey = `tr-${tmpTdTime}-${j}`;
                                            return (
                                                <TableTd
                                                    key={tdKey}
                                                    style={props.tdStyle}
                                                >
                                                    {item.content}
                                                </TableTd>
                                            )
                                        })
                                    }
                                </TableBodyTr>
                            );
                        })
                    }
                </tbody>
            </TableTable>
        </React.Fragment>
    );
}

export default Table;