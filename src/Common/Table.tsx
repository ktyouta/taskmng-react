import React, { ReactNode, useState } from 'react';
import '../App.css';
import './css/TableComponent.css';
import styled from 'styled-components';

//ヘッダの型
type tableHeadType = {
    content: ReactNode,
    widht?: string,
    height?: string,
}

//ボディの型
type tableBodyType = {
    content: ReactNode,
    widht?: string,
    height?: string,
}

//引数の型
type propsType = {
    tableHead: tableHeadType[],
    tableBody: tableBodyType[],
    tableHeight: string,
    tableMaxHeight: string,
    tableWidth: string,
}


//外側のスタイル
const OuterDiv = styled.div<{ height?: string, maxHeight?: string, width?: string, }>`
  height: ${({ height }) => (height ? height : "400px")};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : "80%")};
  width: ${({ width }) => (width ? width : "90%")};
  overflow: auto;
  overflow-x: hidden;
  margin-left: auto;
  margin-right: auto;
`;

//テーブルのスタイル
const TableTable = styled.table`
  width: 95%;
  margin-left: 3%;
  border: 1px solid #696969;
  border-collapse: separate;
  border-spacing: 0;
`;

//ヘッダのスタイル
const TableTh = styled.th`
  cursor: pointer;
  border-bottom: 1px solid #696969;
  height: 50px;
  background-color: #ddd;
  position: sticky;
  top: 0;
  left: 0;
`;

//行のスタイル
const TableHeadTr = styled.tr`
  cursor: pointer;
`;

//行のスタイル
const TableBodyTr = styled.tr<{ isSelected?: boolean }>`
  background-color: ${({ isSelected }) => (isSelected ? "#00CCCC !important" : "")};
  background-color: #66FFFF;
  &:hover {
    background-color: #46cdcf;
    color: #fff;
    cursor: pointer;
  }
`;

//セルのスタイル
const TableTd = styled.td<{ height?: string }>`
  border-bottom: 1px solid #696969;
  height: ${({ height }) => (height ? height : "50px")};
  &:tr:last-child {
    border-bottom: none;
  }
`;


function Table(props: propsType) {

    console.log("Table render");

    //選択した行データ
    const [selectedElement, setSelectedElement] = useState<{}>({});

    return (
        <OuterDiv>
            <TableTable>
                <thead>
                    <TableHeadTr>
                        {
                            props.tableHead.map((element, i) => {
                                return (
                                    <TableTh key={`${element}-${i}`} onClick={() => { }}>
                                        {element.content}
                                    </TableTh>
                                );
                            })
                        }
                    </TableHeadTr>
                </thead>
                <tbody>
                    {
                        props.tableBody && props.tableBody.map((element, i) => {
                            //テーブルボディの行選択イベント
                            const rowClick = (element: { [key: string]: ReactNode }) => {
                                setSelectedElement(element);
                            }
                            //行ごとにキーを作成
                            let trkey = Object.values(element).join('-');
                            return (
                                <TableBodyTr
                                    key={`${trkey}-${i}`}
                                    onClick={() => { rowClick(element) }}
                                    isSelected={JSON.stringify(element) === JSON.stringify(selectedElement)}
                                >
                                    {
                                        Object.keys(element).map((key, j) => (
                                            <TableTd>
                                                {element.content}
                                            </TableTd>
                                        ))
                                    }
                                </TableBodyTr>
                            );
                        })
                    }
                </tbody>
            </TableTable>
        </OuterDiv>
    );
}

export default Table;