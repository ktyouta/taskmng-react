import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { refType } from '../../Common/BaseInputComponent';
import useFetchJsonData from '../../Common/Hook/useFetchJsonData';
import useUpdateTableData from '../../Common/Hook/useUpdateTableData';
import { selectedMasterDataType } from '../../Common/Type/CommonType';
import ENV from '../../env.json';

//引数の型
type propsType = {
    tableBody: selectedMasterDataType[],
    //orgTableBody: selectedMasterDataType[],
}


/**
 * テーブルコンポーネントのビジネスロジック
 * @param props 
 * @returns 
 */
function useMasterTableComponentLogic(props: propsType) {

    //mastertablecomponent内のテーブルデータ(画面上に表示されているデータ)
    const [masterTableBody, setMasterTableBody] = useState<selectedMasterDataType[]>([]);
    //テーブルのカラム設定リスト
    const masterColumnList: object = useFetchJsonData(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GETTABLECOLUMN}`);
    //エラーメッセージの表示フラグ
    const [isDisplayMessage, setIsDisplayMessage] = useState(false);
    //名称(検索ボックス)参照用
    const textRef: RefObject<refType> = useRef(null);
    //備考(検索ボックス)参照用
    const reamarksRef: RefObject<refType> = useRef(null);

    //ヘッダとボディの更新
    const { tableHeader } = useUpdateTableData({ orgTableBody: props.tableBody ? [...props.tableBody] : [], columnData: masterColumnList });

    //表示件数
    const resultNum = useMemo(() => {
        if (!masterTableBody) {
            return 0;
        }
        return masterTableBody.length;
    }, [masterTableBody]);

    //コンボボックスの切り替えによるテーブルの更新
    useEffect(() => {
        if (!props.tableBody || props.tableBody.length < 1) {
            return;
        }
        setMasterTableBody(filterTableData());
    }, [props.tableBody]);

    /**
     * 検索ボタン押下
     */
    function clickSearchBtn() {
        setMasterTableBody(filterTableData());
    }

    /**
     * テーブルボディのフィルター
     */
    function filterTableData() {
        let tmpTableBody = [...props.tableBody];
        //名称で絞り込み
        if (textRef.current?.refValue) {
            let textValue = textRef.current?.refValue;
            tmpTableBody = tmpTableBody.filter((element: selectedMasterDataType) => {
                return element.name.includes(textValue);
            });
        }
        //備考で絞り込み
        if (reamarksRef.current?.refValue) {
            let reamarksValue = reamarksRef.current?.refValue;
            tmpTableBody = tmpTableBody.filter((element: selectedMasterDataType) => {
                return element.remarks.includes(reamarksValue);
            });
        }
        //該当するデータがない場合はメッセージを表示する
        setIsDisplayMessage(tmpTableBody.length < 1);
        return tmpTableBody;
    }

    /**
     * クリアボタン押下
     */
    function clickClearBtn() {
        textRef.current?.clearValue();
        reamarksRef.current?.clearValue();
    }

    return { tableHeader, masterTableBody, textRef, reamarksRef, isDisplayMessage, resultNum, clickSearchBtn, clickClearBtn }
}

export default useMasterTableComponentLogic;