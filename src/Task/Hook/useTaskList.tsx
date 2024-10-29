import { createRef, ReactNode, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, comboType, generalDataType, inputMasterSettingType, inputSettingType, refConditionType, refInfoType } from "../../Common/Type/CommonType";
import { refType } from "../../Common/BaseInputComponent";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import useQueryClientWrapper from "../../Common/Hook/useQueryClientWrapper";
import { taskContentDisplayType, taskListType } from "../Type/TaskType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { buttonType } from "../../Common/ButtonComponent";
import { createRequestBody } from "../../Common/Function/Function";
import useGetTaskInputSetting from "./useGetTaskInputSetting";
import React from "react";
import SpaceComponent from "../../Common/SpaceComponent";
import TaskContent from "../TaskContent";
import VerticalSpaceComponent from "../../Common/VerticalSpaceComponent";
import styled from "styled-components";
import CenterLoading from "../../Common/CenterLoading";
import { useGlobalAtomValue } from "../../Common/Hook/useGlobalAtom";
import { userInfoAtom } from "../../Content/Atom/ContentAtom";


const TaskListLi = styled.li`
    list-style: none;
    padding: 0% 1% 0% 2%;
    height: 18%;
`;

//引数の型
type propsType = {
    displayTaskList: taskContentDisplayType[] | null,
    isLoading: boolean,
    detailHoverId: string,
    checkDelTask: (taskId: string) => void,
    delTaskIdList: string[],
    checkRecTask: (taskId: string) => void,
    recTaskIdList: string[],
}


/**
 * useTaskConditionコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useTaskList(props: propsType) {

    // ログインユーザー情報
    const userInfo = useGlobalAtomValue(userInfoAtom);

    //タスクのコンテンツリスト
    let taskContentList: ReactNode = useMemo(() => {

        //タスクデータから画面表示用domを作成
        return props.displayTaskList?.map((element: taskContentDisplayType, index) => {
            let id = element.taskContent.id as string;
            return (
                <React.Fragment key={`tasklist-${id}-${index}`}>
                    <TaskListLi key={`li-${id}`}>
                        <TaskContent
                            key={`content-${id}`}
                            contentObj={element}
                            detailHoverId={props.detailHoverId}
                            checkDelTask={props.checkDelTask}
                            delTaskIdList={props.delTaskIdList}
                            userInfo={userInfo}
                            checkRecTask={props.checkRecTask}
                            recTaskIdList={props.recTaskIdList}
                        />
                    </TaskListLi>
                    <VerticalSpaceComponent
                        key={`verticalspace-${id}`}
                        space='2%'
                    />
                </React.Fragment>
            );
        });
    }, [props.displayTaskList, props.detailHoverId]);

    return {
        taskContentList
    }
}

export default useTaskList;