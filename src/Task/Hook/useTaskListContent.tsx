import { RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchJsonData from "../../Common/Hook/useFetchJsonData";
import { generalDataType, masterDataListType, selectedMasterDataType } from "../../Common/Type/CommonType";
import ENV from '../../env.json';
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { useGlobalAtomValue } from "../../Common/Hook/useGlobalAtom";
import { masterDataListAtom } from "../../Main/Hook/useMainLogic";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { displayTaskListType, taskContentDisplayType, taskContentSettingType, taskListType } from "../Type/TaskType";
import { refType } from "../../Common/BaseInputComponent";
import useQueryClientWapper from "../../Common/Hook/useQueryClientWrapper";
import useSwitch from "../../Common/Hook/useSwitch";
import ButtonComponent from "../../Common/ButtonComponent";


//画面表示用タスクリスト
export const displayTaskListAtom = atom<taskContentDisplayType[]>([]);
//タスク取得用URL
export const taskListUrlAtom = atom(``);
//更新用タスク
export const updTaskAtom = atom([]);

/**
 * 日付の文字列変換
 */
const getNowDate = (now: Date) => {
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const date = (now.getDate()).toString().padStart(2, "0");
    return `${year}${month}${date}`;
};

//ステータス
//未完了
const NOCOMP_STATUS = "1";
//完了
const COMP_STATUS = "2";
//保留
const HOLD_STATUS = "3";
//対応中
const WORKING_STATUS = "4";

/**
 * MasterTopコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useTaskListContent() {

    //タスクリスト取得用URL
    const taskListUrl = useAtomValue(taskListUrlAtom);
    //画面表示用タスクリスト
    const [displayTaskList, setDisplayTaskList] = useAtom(displayTaskListAtom);
    //モーダルの開閉用フラグ
    const { flag: isModalOpen, onFlag, offFlag } = useSwitch();
    //データの取得に失敗した場合のメッセージ
    const [errMessage, setErrMessage] = useState(``);
    //更新用タスクID
    const [updTaskId, setUpdTaskId] = useState(``);
    //汎用詳細リスト
    const { data: generalDataList } = useQueryWrapper<generalDataType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GENERALDETAIL}`,
    });
    //現在日時
    const nowDate = getNowDate(new Date());

    //タスクリストを取得
    const { data: taskList } = useQueryWrapper<taskListType[]>(
        {
            url: taskListUrl,
            afSuccessFn: (data) => {
                let errMessage = "";
                //データが存在しない
                if (!data || data.length === 0) {
                    errMessage = "データが存在しません。";
                }
                setErrMessage(errMessage);
            }
        }
    );

    //タスクの画面表示設定を取得
    const { data: taskContentSetting } = useQueryWrapper<taskContentSettingType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASKCONTENTSETTING}`,
        }
    );

    //取得したタスクリストを画面表示用に加工
    useEffect(() => {
        let tmpDisplayTaskList: taskContentDisplayType[] = [];
        //タスクリスト
        if (!taskList) {
            return;
        }
        //汎用リスト
        if (!generalDataList) {
            return;
        }
        //タスクの画面表示設定リスト
        if (!taskContentSetting) {
            return;
        }

        //設定値から画面に表示する項目を作成
        taskList.forEach(element => {
            //画面表示用タスク
            let displayTaskObj: taskContentDisplayType = {
                title: "",
                bdColor: undefined,
                titleBgColor: undefined,
                infoBgColor: undefined,
                editButton: <></>,
                content: []
            };

            //タスクの状態に応じて背景色を変える
            //ステータス
            let status = element["status"];
            //期限
            let limitTime = element["limitTime"];
            //ステータスと期限が存在しない場合は壊れたデータとして画面に表示しない
            if (!status || !limitTime) {
                return;
            }
            //背景色の設定
            let bgButtonColor: string | undefined = undefined;
            //期限切れのタスク
            if (limitTime < nowDate) {
                switch (status) {
                    //未対応
                    case NOCOMP_STATUS:
                        displayTaskObj.bdColor = "#CD5C5C";
                        displayTaskObj.titleBgColor = "#F08080";
                        displayTaskObj.infoBgColor = "#FA8072";
                        bgButtonColor = "#FA8072";
                        break;
                    //保留
                    case HOLD_STATUS:
                        displayTaskObj.bdColor = "#FFFF00";
                        displayTaskObj.titleBgColor = "#FFFF66";
                        displayTaskObj.infoBgColor = "#FFFF66";
                        bgButtonColor = "#FFFF66";
                        break;
                    //対応中
                    case WORKING_STATUS:
                        displayTaskObj.bdColor = "#33FFFF";
                        displayTaskObj.titleBgColor = "#66FFFF";
                        displayTaskObj.infoBgColor = "#66FFCC";
                        bgButtonColor = "#66FFCC";
                        break;
                    default:
                        break;
                }
            }
            //完了したタスク
            if (status === COMP_STATUS) {
                displayTaskObj.bdColor = "#808080";
                displayTaskObj.titleBgColor = "#808080";
                displayTaskObj.infoBgColor = "#808080";
                bgButtonColor = "#808080";
            }

            //画面に表示するオブジェクトを作成
            taskContentSetting.forEach((item) => {
                //タスクリスト内に設定に一致するプロパティが存在しない場合は画面に表示しない
                if (!element[item.id]) {
                    return;
                }
                //非表示項目
                if (item.isHidden) {
                    return;
                }
                //タイトル
                if (item.id === "title") {
                    displayTaskObj.title = element[item.id];
                    return;
                }
                //選択項目
                if (item.listKey) {
                    //汎用詳細リストからリストキーに一致する要素を抽出する
                    let selectList = generalDataList.filter((list) => {
                        return list.id === item.listKey;
                    });
                    let isMatchPriority = false;
                    selectList.some((list) => {
                        //値の一致する名称を取得
                        if (list.value === element[item.id]) {
                            element[item.id] = list.label;
                            return isMatchPriority = true;
                        }
                    });
                    //結合できなかった要素は画面に表示しない
                    if (!isMatchPriority) {
                        return;
                    }
                }

                //日付項目
                if (item.type === "date") {

                }
                displayTaskObj.content.push({
                    label: item.name,
                    value: element[item.id]
                });
            });

            displayTaskObj["editButton"] = <ButtonComponent
                styleTypeNumber={"BASE"}
                bgColor={bgButtonColor}
                title={"編集"}
                onclick={() => { openModal(element.id); }} />;

            tmpDisplayTaskList.push(displayTaskObj);
        });
        setDisplayTaskList(tmpDisplayTaskList);
    }, [taskList, generalDataList, taskContentSetting]);

    //モーダルオープン
    const openModal = (id: string) => {
        //IDが存在しない
        if (!id) {
            setUpdTaskId(``);
            alert(`データの取得に失敗しました。`);
            return;
        }
        //更新用タスク取得ID
        setUpdTaskId(id)
        onFlag();
    };

    return {
        isModalOpen,
        offFlag,
        displayTaskList,
        errMessage,
        updTaskId,
    };
}

export default useTaskListContent;