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
import { displayTaskListType, taskListType } from "../Type/TaskType";
import { refType } from "../../Common/BaseInputComponent";
import useQueryClientWapper from "../../Common/Hook/useQueryClientWrapper";
import useSwitch from "../../Common/Hook/useSwitch";
import ButtonComponent from "../../Common/ButtonComponent";


//画面表示用タスクリスト
export const displayTaskListAtom = atom<displayTaskListType[]>([]);
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

    //取得したタスクリストを画面表示用に加工
    useEffect(() => {
        let tmpDisplayTaskList: displayTaskListType[] = [];
        if (!taskList) {
            return;
        }
        if (!generalDataList) {
            return;
        }
        let isMatchPriority = false;
        let isMatchStatus = false;
        //優先度リスト
        let taskPriorityList = generalDataList.filter((item) => {
            return item.id === "2";
        });
        //ステータスリスト
        let taskStatusList = generalDataList.filter((item) => {
            return item.id === "3";
        });
        taskList.forEach(element => {
            //背景色の設定
            let bdColor: string | undefined = undefined;
            let titleBgColor: string | undefined = undefined;
            let infoBgColor: string | undefined = undefined;
            let bgButtonColor: string | undefined = undefined;
            //期限切れのタスク
            if (element.limitTime < nowDate) {
                switch (element.status) {
                    //未対応
                    case NOCOMP_STATUS:
                        bdColor = "#CD5C5C";
                        titleBgColor = "#F08080";
                        infoBgColor = "#FA8072";
                        bgButtonColor = "#FA8072";
                        break;
                    //保留
                    case HOLD_STATUS:
                        bdColor = "#FFFF00";
                        titleBgColor = "#FFFF66";
                        infoBgColor = "#FFFF66";
                        bgButtonColor = "#FFFF66";
                        break;
                    //対応中
                    case WORKING_STATUS:
                        bdColor = "#33FFFF";
                        titleBgColor = "#66FFFF";
                        infoBgColor = "#66FFCC";
                        bgButtonColor = "#66FFCC";
                        break;
                    default:
                        break;
                }
            }
            //完了したタスク
            if (element.status === COMP_STATUS) {
                bdColor = "#808080";
                titleBgColor = "#808080";
                infoBgColor = "#808080";
                bgButtonColor = "#808080";
            }

            taskPriorityList.some((item) => {
                //優先度が一致
                if (element.priority === item.value) {
                    element.priority = item.label;
                    return isMatchPriority = true;
                }
            });
            taskStatusList.some((item) => {
                //ステータスが一致
                if (element.status === item.value) {
                    element.status = item.label;
                    return isMatchStatus = true;
                }
            });
            //結合に成功したデータのみを画面に表示する
            if (!isMatchPriority || !isMatchStatus) {
                return;
            }


            tmpDisplayTaskList.push({
                id: element.id,
                title: element.title,
                registerTime: element.registerTime,
                updTime: element.updTime,
                limitTime: element.limitTime,
                priority: element.priority,
                status: element.status,
                editButton: <ButtonComponent
                    styleTypeNumber={"BASE"}
                    bgColor={bgButtonColor}
                    title={"編集"}
                    onclick={() => { openModal(element.id); }} />,
                bdColor,
                titleBgColor,
                infoBgColor,
            });
        });
        setDisplayTaskList(tmpDisplayTaskList);
    }, [taskList, generalDataList]);

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