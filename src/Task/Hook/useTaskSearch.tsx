import { RefObject, createRef, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchJsonData from "../../Common/Hook/useFetchJsonData";
import { comboType, masterDataListType, refConditionType, refInfoType, searchConditionType, selectedMasterDataType, taskSearchConditionType } from "../../Common/Type/CommonType";
import ENV from '../../env.json';
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { useGlobalAtomValue } from "../../Common/Hook/useGlobalAtom";
import { masterDataListAtom } from "../../Main/Hook/useMainLogic";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { taskListType } from "../Type/TaskType";
import { refType } from "../../Common/BaseInputComponent";
import { taskListUrlAtom } from "./useTaskListContent";
import useSwitch from "../../Common/Hook/useSwitch";
import useGetGeneralDataList from "../../Common/Hook/useGetGeneralDataList";


/**
 * タスクの検索条件リストを取得
 * @param data 
 * @returns 
 */
function createSearchConditionList(data: searchConditionType): taskSearchConditionType[] {
    return data.task;
}


/**
 * MasterTopコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useTaskSearch() {

    //登録するタスク内容
    const contentRef: RefObject<refType> = useRef(null);
    //タスクリスト取得用URL
    const setTaskListUrl = useSetAtom(taskListUrlAtom);
    //モーダルの開閉用フラグ
    const { flag: isModalOpen, onFlag, offFlag } = useSwitch();
    //検索条件参照用リスト
    const [refInfoArray, setRefInfoArray] = useState<refInfoType[]>([]);
    //検索条件用オブジェクト
    const [searchConditionObj, setSearchConditionObj] = useState<{ [key: string]: string }>({});

    //検索条件リスト
    const { data: taskSearchConditionList } = useQueryWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SEARCHCONDITION}`,
        callback: createSearchConditionList
    });
    //汎用詳細リスト
    const { generalDataList } = useGetGeneralDataList();


    //検索条件参照用refの作成
    useEffect(() => {
        let tmpRefInfoArray: refInfoType[] = [];
        if (!taskSearchConditionList) {
            return;
        }
        if (!searchConditionObj) {
            return;
        }
        if (!generalDataList) {
            return;
        }
        taskSearchConditionList.forEach((element) => {
            let tmpValue: string | undefined = undefined;
            for (const [columnKey, value] of Object.entries(searchConditionObj as {})) {
                //キーの一致する要素を取り出す
                if (element.id === columnKey) {
                    tmpValue = value as string;
                    break;
                }
            }
            let tmpSelectLits: comboType[] = [];
            //リストキーが存在する(選択項目)
            if (element.listKey) {
                tmpSelectLits = generalDataList.filter((item) => {
                    return item.id === element.listKey;
                });
            }
            tmpRefInfoArray.push({
                id: element.id,
                name: element.name,
                type: element.type,
                //キーに一致するデータが存在する場合はその値を表示
                value: tmpValue ?? element.value,
                selectList: tmpSelectLits,
                ref: createRef(),
                lenght: 0,
                disabled: false,
                visible: true
            });
        });
        setRefInfoArray(tmpRefInfoArray);
    }, [taskSearchConditionList, searchConditionObj, generalDataList]);


    /**
     * 検索ボタン押下
     */
    function clickSearchBtn() {
        let tmpUrl = `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}`;
        let query = "?";
        if (contentRef.current && contentRef.current?.refValue) {
            query += `keyword=${contentRef.current?.refValue}`;
        }
        //モーダル内の検索条件を取得
        Object.keys(searchConditionObj).forEach((element)=>{
            query += `${element}=${searchConditionObj[element]}`; 
        });
        if (query.length > 1) {
            tmpUrl += query;
        }
        //URLを更新
        setTaskListUrl(tmpUrl);
    }

    /**
     * クリアボタン押下
     */
    function clickClearBtn() {
        //入力値を初期化してタスクリストを取得する
        contentRef.current?.clearValue();
        setTaskListUrl(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}`);
    }

    /**
     * モーダルクローズイベント
     */
    function closeModal() {
        if (!refInfoArray) {
            offFlag();
        }
        //検索条件を保存する
        let tmpCondition: { [key: string]: string } = {};
        refInfoArray.forEach((element) => {
            if (!element.ref.current) {
                return true;
            }
            tmpCondition[element.id] = element.ref.current.refValue;
        });
        setSearchConditionObj(tmpCondition);
        offFlag();
    }

    return {
        contentRef,
        clickSearchBtn,
        clickClearBtn,
        isModalOpen,
        onFlag,
        closeModal,
        refInfoArray,
    };
}

export default useTaskSearch;