import React, { useState } from 'react';
import '../App.css';
import './css/TableComponent.css';
import useTableComponentLogic from './Hook/useTableComponentLogic';

//引数の型
type tablePropsType = {
  tableHeight?: string,
  tableHeader: string[],
  tableBody: { [key: string]: string }[],
  onclick?: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>,
}


function TableComponent(props: tablePropsType) {

  console.log("tablecomponent render");

  //ヘッダとボディ
  const { tableBody, cilckHeader } = useTableComponentLogic({ tableBody: props.tableBody });
  //選択した行データ
  const [selectedElement, setSelectedElement] = useState<{}>({});

  return (
    <div className="tablecomponent" style={{ height: props.tableHeight ? props.tableHeight : "400px" }}>
      <table className="tablecomponent-table-tag">
        <thead className="tablecomponent-thead">
          <tr>
            {
              props.tableHeader.map((element, i) => {
                return (
                  <th key={`${element}-${i}`} onClick={() => { cilckHeader(i) }}>
                    {element}
                  </th>
                );
              })
            }
          </tr>
        </thead>
        <tbody className="tablecomponent-tbody">
          {
            tableBody && tableBody.length > 0 && tableBody.map((element, i) => {
              let cssNm = ""
              //選択行を強調
              if (JSON.stringify(element) === JSON.stringify(selectedElement)) {
                cssNm = "selected"
              }
              //テーブルボディの行選択イベント
              const rowClick = (element: { [key: string]: string }) => {
                setSelectedElement(element);
                //呼び出し元からメソッドを受け取っている場合は実行
                if (props.onclick) {
                  props.onclick(element);
                }
              }
              //行ごとにキーを作成
              let trkey = Object.values(element).join('-');
              return (
                <tr
                  key={`${trkey}-${i}`}
                  onClick={() => { rowClick(element) }}
                  className={cssNm}
                >
                  {
                    Object.keys(element).map((key, j) => (
                      <td
                        key={`${element[key]}-${j}`}>
                        {element[key]}
                      </td>
                    ))
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default TableComponent;