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

  return { tableHeader }

}

export default useUpdateTableData;