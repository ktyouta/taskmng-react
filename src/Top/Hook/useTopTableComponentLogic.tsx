import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import useFetchJsonData from '../../Common/Hook/useFetchJsonData';
import useUpdateTableData from '../../Common/Hook/useUpdateTableData';
import { masterDataListType, selectedMasterDataType } from '../../Common/Type/CommonType';
import ENV from '../../env.json';
import { refType } from '../../Common/BaseInputComponent';
import IconModalComponent from '../../Common/IconModalComponent';
import { AiOutlineFileText } from "react-icons/ai"
import TableComponent from '../../Common/TableComponent';
import IconComponent from '../../Common/IconComponent';
import useSwitch from '../../Common/Hook/useSwitch';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import useQueryClientWapper from '../../Common/Hook/useQueryClientWapper';

//引数の型
type propsType = {
    tableBody: masterDataListType[],
    orgTableBody: masterDataListType[],
}

/**
 * テーブルコンポーネントのビジネスロジック
 * @param props 
 * @returns 
 */
function useTopTableComponentLogic(props: propsType) {

    //mastertablecomponent内のテーブルデータ(画面上に表示されているデータ)
    const [masterTableBody, setMasterTableBody] = useState<masterDataListType[]>([]);
    //テーブルのカラム設定リスト
    const { data: masterColumnList } = useQueryWrapper<object>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GETTABLECOLUMN}`,
        }
    );

    //エラーメッセージの表示フラグ
    const [isDisplayMessage, setIsDisplayMessage] = useState(false);
    //名称(検索ボックス)参照用
    const textRef: RefObject<refType> = useRef(null);
    //備考(検索ボックス)参照用
    const reamarksRef: RefObject<refType> = useRef(null);
    //マスタデータ取得用URL
    const [masterGetUrl, setMasterUrl] = useState<string>("");
    //モーダルの開閉用フラグ
    const { flag, onFlag, offFlag } = useSwitch();
    //選択しているマスタの名称
    const [selectMasterNm, setSelectMasterNm] = useState("");

    //ヘッダの更新
    let { tableHeader } = useUpdateTableData({ orgTableBody: props.tableBody ? [...props.tableBody] : [], columnData: masterColumnList });

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
        let tmpTableBody = [...props.tableBody].map((element) => {
            //行ごとにモーダル開閉用のsvgをセット
            element.component = <IconComponent
                icon={AiOutlineFileText}
                onclick={() => { modalClick(element) }}
            />
            return element;
        });
        setMasterTableBody(filterTableData(tmpTableBody));
    }, [props.tableBody]);

    /**
     * 検索ボタン押下
     */
    function clickSearchBtn() {
        setMasterTableBody(filterTableData(props.tableBody));
    }

    /**
     * テーブルボディのフィルター
     */
    function filterTableData(table: masterDataListType[]) {
        let tmpTableBody = [...table];
        //名称で絞り込み
        if (textRef.current?.refValue) {
            let textValue = textRef.current?.refValue;
            tmpTableBody = tmpTableBody.filter((element: masterDataListType) => {
                return element.label.includes(textValue);
            });
        }
        //備考で絞り込み
        if (reamarksRef.current?.refValue) {
            let reamarksValue = reamarksRef.current?.refValue;
            tmpTableBody = tmpTableBody.filter((element: masterDataListType) => {
                return element.remarks.includes(reamarksValue);
            });
        }
        //該当するデータがない場合はメッセージを表示する
        setIsDisplayMessage(tmpTableBody.length < 1);
        return tmpTableBody;
    }

    /**
     * クリアイベント
     */
    function clickClearBtn() {
        textRef.current?.clearValue();
        reamarksRef.current?.clearValue();
    }

    /**
     * モーダルオープンイベント
     */
    function modalClick(element: masterDataListType) {
        let apiUrl = "";
        //モーダル内に表示するマスタのURL
        if (element && element.value) {
            apiUrl = `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GETMASTER}?filename=${element.value}`;
        }
        setMasterUrl(apiUrl);
        setSelectMasterNm(element.label);
        onFlag();
    }

    /**
     * useQueryで取得したデータを加工
     * @param data 
     * @returns 
     */
    function selectData(data: { master: selectedMasterDataType[] }) {
        return data.master;
    }

    //選択中のマスタのデータを取得する
    const {
        data: selectedMasterBody,
        isLoading,
        isFetching,
        isError
    } = useQueryWrapper(
        {
            url: masterGetUrl,
            callback: selectData,
            init: { master: [] }
        }
    );

    //ヘッダの更新
    let { tableHeader: masterTableHeader } = useUpdateTableData({
        orgTableBody: selectedMasterBody ?? [],
        columnData: masterColumnList
    });

    return {
        tableHeader,
        masterTableBody,
        textRef,
        reamarksRef,
        isDisplayMessage,
        resultNum,
        flag,
        masterTableHeader,
        selectedMasterBody,
        selectMasterNm,
        isLoading: isLoading || isFetching,
        isError,
        clickSearchBtn,
        clickClearBtn,
        offFlag
    }
}

export default useTopTableComponentLogic;