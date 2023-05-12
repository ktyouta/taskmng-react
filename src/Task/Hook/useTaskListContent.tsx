import { RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchJsonData from "../../Common/Hook/useFetchJsonData";
import { masterDataListType, selectedMasterDataType } from "../../Common/Type/CommonType";
import ENV from '../../env.json';
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { useGlobalAtomValue } from "../../Common/Hook/useGlobalAtom";
import { masterDataListAtom } from "../../Main/Hook/useMainLogic";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { displayTaskListType, taskListType } from "../Type/TaskType";
import { refType } from "../../Common/BaseInputComponent";
import useQueryClientWapper from "../../Common/Hook/useQueryClientWapper";
import useSwitch from "../../Common/Hook/useSwitch";
import ButtonComponent from "../../Common/ButtonComponent";


//画面表示用タスクリスト
export const displayTaskListAtom = atom<displayTaskListType[]>([]);
//タスク取得用URL
export const taskListUrlAtom = atom(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}`);
//更新用タスク
export const updTaskAtom = atom([]);

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
    //更新用タスク取得用URL
    const [updTaskUrl, setUpdTaskUrl] = useState(``);

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
        taskList.forEach(element => {
            tmpDisplayTaskList.push({
                id: element.id,
                content: element.content,
                registerTime: element.registerTime,
                updTime: element.updTime,
                limiTtime: element.limiTtime,
                priority: element.priority,
                status: element.status,
                editButton: <ButtonComponent
                    styleTypeNumber={"BASE"}
                    title={"編集"}
                    onclick={() => { openModal(element.id) }}
                />
            });
        });
        setDisplayTaskList(tmpDisplayTaskList);
    }, [taskList]);

    //モーダルオープン
    const openModal = (id: string) => {
        //IDが存在しない
        if (!id) {
            setUpdTaskUrl(``);
            alert(`データの取得に失敗しました。`);
            return;
        }
        //更新用タスク取得URL
        setUpdTaskUrl(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}/${id}`);
        onFlag();
    };

    return {
        isModalOpen,
        offFlag,
        displayTaskList,
        errMessage,
        updTaskUrl,
    };
}

export default useTaskListContent;