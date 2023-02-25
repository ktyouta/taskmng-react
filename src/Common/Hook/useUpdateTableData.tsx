import { useEffect, useMemo, useState } from 'react';

//引数の型
type propsType<T, U> = {
  orgTableBody: T[],
  columnData: U,
}

//返り値の型
type retType = {
  tableHeader: string[],
  //tableBody: { [key: string]: string }[]
}

/**
 * テーブルヘッダとボディの作成(更新)
 * @param props 
 */
function useUpdateTableData<T extends {}, U extends object>(props: propsType<T, U>): retType {

  //ヘッダ
  const tableHeader = useMemo(() => {
    let headList: string[] = [];
    if (!props.orgTableBody) {
      return headList;
    }
    if (props.orgTableBody.length === 0) {
      return headList;
    }
    if (Object.keys(props.columnData).length === 0) {
      return headList;
    }

    for (const [key] of Object.entries(props.orgTableBody[0])) {
      let strHeader = "";
      for (const [columnKey, value] of Object.entries(props.columnData as {})) {
        if (key === columnKey) {
          strHeader = value as string;
          break;
        }
      }
      headList.push(strHeader);
    }
    return headList;
  }, [props.orgTableBody, props.columnData]);

  //ボディ
  // const tableBody = useMemo(() => {
  //   let tableBodyList: string[][] = [];
  //   let bodyList: string[] = [];
  //   if (!props.tableData) {
  //     return props.tableData;
  //   }
  //   if (props.tableData.length === 0) {
  //     return props.tableData;
  //   }

  //   props.tableData.forEach((element) => {
  //     for (const [key, value] of Object.entries(element as {})) {
  //       let strBody = value as string;
  //       bodyList.push(strBody);
  //     }
  //     tableBodyList.push(bodyList);
  //     bodyList = [];
  //   });
  //   return props.tableData;
  // }, [props.tableData])

  //ボディ
  // const tableBody = useMemo(() => {
  //   let tableBodyList: string[][] = [];
  //   let bodyList: string[] = [];
  //   if (!props.tableData) {
  //     return tableBodyList;
  //   }
  //   if (props.tableData.length === 0) {
  //     return tableBodyList;
  //   }

  //   props.tableData.forEach((element) => {
  //     for (const [key, value] of Object.entries(element as {})) {
  //       let strBody = value as string;
  //       bodyList.push(strBody);
  //     }
  //     tableBodyList.push(bodyList);
  //     bodyList = [];
  //   });
  //   return tableBodyList;
  // }, [props.tableData])


  //ヘッダ
  // useEffect(() => {
  //   let headList: string[] = [];
  //   if (!props.tableData) {
  //     return;
  //   }
  //   if (props.tableData.length === 0) {
  //     return;
  //   }
  //   if (Object.keys(props.columnData).length === 0) {
  //     return;
  //   }

  //   for (const [key] of Object.entries(props.tableData[0])) {
  //     let strHeader = "";
  //     for (const [columnKey, value] of Object.entries(props.columnData as {})) {
  //       if (key === columnKey) {
  //         strHeader = value as string;
  //         break;
  //       }
  //     }
  //     headList.push(strHeader);
  //   }
  //   //props.updateHeader(headList);
  // }, [props.tableData, props.columnData]);

  // //ボディ
  // useEffect(() => {
  //   let tableBodyList: string[][] = [];
  //   let bodyList: string[] = [];
  //   if (!props.tableData) {
  //     return;
  //   }
  //   if (props.tableData.length === 0) {
  //     return;
  //   }

  //   props.tableData.forEach((element) => {
  //     let strId: string = "";
  //     for (const [key, value] of Object.entries(element as {})) {
  //       let strBody = value as string;
  //       bodyList.push(strBody);
  //     }
  //     tableBodyList.push(bodyList);
  //     bodyList = [];
  //   });
  //   //props.updateBody(tableBodyList);
  // }, [props.tableData]);

  return { tableHeader }

}

export default useUpdateTableData;