import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
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


const TaskListLi = styled.li`
    list-style: none;
    padding: 0% 5% 0% 2%
`;

//引数の型
type propsType = {
    displayTaskList: taskContentDisplayType[]
}


/**
 * useTaskConditionコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useTaskList(props: propsType) {

    //タスクのコンテンツリスト
    let taskContentList = useMemo(() => {
        return props.displayTaskList.map((element, index) => {
            let id = element.id as string;
            return (
                <React.Fragment key={`tasklist-${id}-${index}`}>
                    <TaskListLi key={`li-${id}`}>
                        <TaskContent
                            key={`content-${id}`}
                            contentObj={element}
                        />
                    </TaskListLi>
                    <VerticalSpaceComponent
                        key={`verticalspace-${id}`}
                        space='2%'
                    />
                </React.Fragment>
            );
        });
    }, [props.displayTaskList]);

    return {
        taskContentList
    }
}

export default useTaskList;