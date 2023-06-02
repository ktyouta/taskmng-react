import { ReactNode, RefObject, createRef, useContext, useEffect, useMemo, useRef, useState } from "react";
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
import SpaceComponent from "../../Common/SpaceComponent";
import React from "react";


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


    /**
     * 初期表示タスク取得用URLと検索条件オブジェクトの作成
     */
    const createDefaultUrlCondition = () => {
        if (!taskSearchConditionList) {
            return;
        }
        let tmpCondition: { [key: string]: string } = {};
        let tmpUrl = `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}`;
        let query = "?";
        taskSearchConditionList.forEach((element) => {
            //値が存在するプロパティをクエリストリングに設定
            if (!element.value) {
                return;
            }
            if (query !== "?") {
                query += "&";
            }
            query += `${element.id}=${element.value}`;
            tmpCondition[element.id] = element.value;
        });
        if (query.length > 1) {
            tmpUrl += query;
        }
        //初期表示タスク取得用URLの作成
        setTaskListUrl(tmpUrl);
        //検索条件オブジェクトの作成
        setSearchConditionObj(tmpCondition);
    }


    //初期表示タスク取得用URLと検索条件オブジェクトの作成
    useEffect(() => {
        createDefaultUrlCondition();
    }, [taskSearchConditionList]);


    //現在の検索条件(画面表示用)
    const displaySearchConditionList = useMemo(() => {
        let tmpDisplayList: ReactNode[] = [];
        if (!taskSearchConditionList) {
            return;
        }
        if (!searchConditionObj) {
            return;
        }
        if (!generalDataList) {
            return;
        }
        Object.keys(searchConditionObj).forEach((element) => {
            taskSearchConditionList.some((item) => {
                //値がセットされている検索条件
                if (element === item.id) {
                    if (!searchConditionObj[element]) {
                        return true;
                    }
                    let value = searchConditionObj[element];
                    //複数選択項目
                    if (item.listKey) {
                        value = "";
                        let tmpSelectLits: comboType[] = [];
                        tmpSelectLits = generalDataList.filter((list) => {
                            return list.id === item.listKey;
                        });
                        let valArray = searchConditionObj[element].split(",");
                        //選択値に対応したラベルを取得
                        valArray.forEach((val) => {
                            tmpSelectLits.some((list) => {
                                if (val === list.value) {
                                    value += ` ${list.label} /`;
                                    return true;
                                }
                            });
                        });
                        //末尾の/を削除
                        if (value.slice(-1) === "/") {
                            value = value.slice(0, -1);
                        }
                    }
                    //画面表示用の検索条件を追加
                    tmpDisplayList.push(
                        <React.Fragment>
                            <div className="display-task-condition-item">
                                <dt>{`${item.name}：`}</dt>
                                <dt>{`${value}`}</dt>
                            </div>
                            <SpaceComponent space={"3%"} />
                        </React.Fragment>
                    );
                    return true;
                }
            });
        });
        return tmpDisplayList;
    }, [searchConditionObj, taskSearchConditionList, generalDataList]);


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
        Object.keys(searchConditionObj).forEach((element) => {
            //値が存在するプロパティをクエリストリングに設定
            if (!searchConditionObj[element]) {
                return;
            }
            if (query !== "?") {
                query += "&";
            }
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
        createDefaultUrlCondition();
    }

    /**
     * モーダルオープンイベント
     */
    function openModal() {
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
        //検索条件の参照を作成
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
                length: element.length,
                disabled: false,
                visible: !element.isHidden,
            });
        });
        setRefInfoArray(tmpRefInfoArray);
        onFlag();
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
        openModal,
        closeModal,
        refInfoArray,
        displaySearchConditionList,
    };
}

export default useTaskSearch;