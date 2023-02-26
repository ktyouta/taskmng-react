import { useEffect, useRef, useState } from 'react';

//引数の型
type tablePropsType = {
    tableBody: { [key: string]: string | JSX.Element }[],
}

/**
 * テーブルコンポーネントのビジネスロジック
 * @param props 
 * @returns 
 * 
 */
function useTableComponentLogic(props: tablePropsType) {

    //テーブルボディ
    const [tableBody, setTableBody] = useState<{ [key: string]: string | JSX.Element }[]>([]);
    //ヘッダクリック時のソート用
    const orderNum = useRef(1);

    useEffect(() => {
        setTableBody(props.tableBody);
    }, [props.tableBody]);

    //選択した列でソート(ヘッダのクリックイベント)
    const cilckHeader = (index: number) => {
        if (tableBody.length < 1) {
            return;
        }
        let tmpTableBody = [...tableBody];
        let objKey = "";
        let keyIndex = 0;
        for (const key of Object.keys(tmpTableBody[0])) {
            //ヘッダのインデックスと一致するキーを取得
            if (index === keyIndex) {
                objKey = key;
                break;
            }
            keyIndex++;
        }
        if (!objKey) {
            return;
        }
        //要素の型が文字列の場合のみソートする
        if (tmpTableBody.some((element) => typeof element[objKey] !== 'string')) {
            return;
        }
        //クリックしたオブジェクトのキーでソート
        tmpTableBody.sort(function (first, second) {
            return first[objKey] < second[objKey] ? orderNum.current : (-1) * orderNum.current;
        });
        setTableBody(tmpTableBody);
        orderNum.current *= (-1);
    };

    return { tableBody, cilckHeader }
}

export default useTableComponentLogic;